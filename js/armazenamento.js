/* =====================================================================
   ARMAZENAMENTO — único ponto por onde o hub e os três apps leem e gravam.

   Cada estado é um JSON guardado numa chave do localStorage (rápido e funciona
   sem internet). Com o Supabase configurado em js/config.js, além disso:
   · ninguém entra sem login (login.html);
   · ao abrir a página, o progresso é baixado da tabela "estados";
   · cada gravação é enviada para lá logo em seguida.
   Regra de conflito, por chave: vale a versão gravada por último.
   ===================================================================== */
const Armazenamento = (() => {
  const CHAVES = {
    hub: 'hub-estudos-v1',
    civil3d: 'ultra-civil3d-v1',
    revit: 'ultra-revit-v1',
    pos: 'posbim.gestor.v1'
  };
  const SINCRONIZADAS = Object.values(CHAVES);
  const META = 'hub-sync-meta';            // { usuario, chaves: { chave: { mod: ISO, sujo: bool } } }
  const cfg = window.SUPABASE_CONFIG || {};
  const remoto = !!(cfg.url && cfg.anonKey);
  const ouvintes = [], ouvintesStatus = [];
  let cli = null, usuario = null, status = remoto ? 'conectando' : 'local';

  /* ---------- leitura e gravação (iguais com ou sem Supabase) ---------- */
  /** Devolve o objeto salvo ou null. Lança erro se o armazenamento estiver indisponível ou o JSON corrompido. */
  function ler(chave) {
    const t = localStorage.getItem(chave);
    return t ? JSON.parse(t) : null;
  }
  /** Grava o objeto. Lança erro se não couber ou se o armazenamento estiver bloqueado. */
  function gravar(chave, obj) {
    localStorage.setItem(chave, JSON.stringify(obj));
    if (remoto && SINCRONIZADAS.includes(chave)) { marcar(chave, { mod: new Date().toISOString(), sujo: true }); agendarEnvio(); }
  }
  function remover(chave) { localStorage.removeItem(chave); }

  /** Avisa quando uma chave mudou por fora desta página: outra aba ou outro computador. */
  function aoMudar(fn) { ouvintes.push(fn); }
  window.addEventListener('storage', e => { if (SINCRONIZADAS.includes(e.key)) ouvintes.forEach(fn => fn(e.key)); });

  /* ---------- status: local · conectando · sincronizado · salvando · offline ---------- */
  function mudarStatus(s) { if (s === status) return; status = s; ouvintesStatus.forEach(fn => fn(s)); }
  function aoMudarStatus(fn) { ouvintesStatus.push(fn); }

  /* ---------- controle do que já subiu ---------- */
  function meta() { try { return JSON.parse(localStorage.getItem(META)) || { chaves: {} }; } catch (e) { return { chaves: {} }; } }
  function gravarMeta(m) { try { localStorage.setItem(META, JSON.stringify(m)); } catch (e) { /* sem espaço: tenta de novo na próxima gravação */ } }
  function marcar(chave, v) { const m = meta(); m.chaves[chave] = v; gravarMeta(m); }
  const pendentes = () => { const m = meta(); return SINCRONIZADAS.filter(k => m.chaves[k] && m.chaves[k].sujo); };

  /* ---------- envio ---------- */
  let relogio = null, enviando = null;
  function agendarEnvio() { if (!usuario) return; mudarStatus('salvando'); clearTimeout(relogio); relogio = setTimeout(enviar, 900); }
  function enviar() {
    clearTimeout(relogio);
    if (!cli || !usuario) return Promise.resolve();
    if (enviando) return enviando.then(enviar);
    enviando = (async () => {
      let falhou = false;
      for (const chave of pendentes()) {
        const texto = localStorage.getItem(chave), mod = meta().chaves[chave].mod;
        if (!texto) { marcar(chave, { mod, sujo: false }); continue; }
        try {
          const { error } = await cli.from('estados').upsert({ user_id: usuario.id, chave, dados: JSON.parse(texto), atualizado_em: mod }, { onConflict: 'user_id,chave' });
          if (error) throw error;
          const agora = meta().chaves[chave];
          if (agora && agora.mod === mod) marcar(chave, { mod, sujo: false });   // se mudou durante o envio, continua pendente
        } catch (e) { falhou = true; console.error('Não enviou ' + chave, e); }
      }
      mudarStatus(falhou ? 'offline' : pendentes().length ? 'salvando' : 'sincronizado');
    })();
    const p = enviando; p.then(() => { enviando = null; if (status === 'salvando') agendarEnvio(); });
    return p;
  }

  /* ---------- download ---------- */
  const t = iso => Date.parse(iso) || 0;
  async function baixar() {
    const { data, error } = await cli.from('estados').select('chave,dados,atualizado_em');
    if (error) throw error;
    const m = meta(), mudadas = [], vistas = new Set();
    (data || []).forEach(linha => {
      if (!SINCRONIZADAS.includes(linha.chave)) return;
      vistas.add(linha.chave);
      const loc = m.chaves[linha.chave], texto = localStorage.getItem(linha.chave);
      if (loc && texto && t(loc.mod) === t(linha.atualizado_em)) return;              // já é a mesma versão
      if (loc && texto && loc.sujo && t(loc.mod) > t(linha.atualizado_em)) return;    // o daqui é mais novo: vai subir
      /* dado local de antes de existir sincronização: guarda uma cópia antes de trocar pelo da nuvem */
      if (texto && !loc) { try { localStorage.setItem('antes-da-sincronizacao:' + linha.chave, texto); } catch (e) { /* sem espaço */ } }
      localStorage.setItem(linha.chave, JSON.stringify(linha.dados));
      m.chaves[linha.chave] = { mod: linha.atualizado_em, sujo: false };
      mudadas.push(linha.chave);
    });
    /* o que existe aqui e ainda não existe na nuvem sobe (primeiro login neste computador) */
    SINCRONIZADAS.forEach(k => {
      if (vistas.has(k) || !localStorage.getItem(k)) return;
      m.chaves[k] = { mod: (m.chaves[k] && m.chaves[k].mod) || new Date().toISOString(), sujo: true };
    });
    gravarMeta(m);
    return mudadas;
  }
  let ultimaBusca = 0;
  async function atualizar() {
    if (!usuario || Date.now() - ultimaBusca < 15000) return;
    ultimaBusca = Date.now();
    try { const mudadas = await baixar(); await enviar(); mudadas.forEach(k => ouvintes.forEach(fn => fn(k))); if (!pendentes().length) mudarStatus('sincronizado'); }
    catch (e) { mudarStatus('offline'); }
  }

  /* ---------- conexão e login ---------- */
  let biblioteca = null;
  function carregarBiblioteca() {
    if (window.supabase) return Promise.resolve();
    return biblioteca || (biblioteca = new Promise((ok, erro) => {
      const s = document.createElement('script'); s.src = 'js/vendor/supabase.js'; s.onload = ok; s.onerror = () => erro(new Error('Biblioteca do Supabase não carregou.'));
      document.head.appendChild(s);
    }));
  }
  async function conectar() {
    await carregarBiblioteca();
    if (!cli) cli = window.supabase.createClient(cfg.url, cfg.anonKey);
    return cli;
  }
  function irParaLogin() {
    const aqui = location.pathname.split('/').pop() || 'index.html';
    location.replace('login.html?voltar=' + encodeURIComponent(aqui + location.search + location.hash));
    return new Promise(() => { });                       // a página atual não segue
  }
  const comPrazo = (p, ms) => Promise.race([p, new Promise((_, erro) => setTimeout(() => erro(new Error('tempo esgotado')), ms))]);

  /** Resolve quando os dados locais estão prontos para uso. Sem Supabase, na hora. */
  let promessa = null;
  function pronto() { return promessa || (promessa = preparar()); }
  async function preparar() {
    if (!remoto) return;
    let sessao = null;
    try { await conectar(); sessao = (await cli.auth.getSession()).data.session; }
    catch (e) { console.error(e); }
    if (!sessao) return irParaLogin();
    usuario = sessao.user;
    const m = meta();
    if (m.usuario && m.usuario !== usuario.id) { SINCRONIZADAS.forEach(remover); gravarMeta({ usuario: usuario.id, chaves: {} }); }   // outra conta neste navegador
    else if (!m.usuario) { m.usuario = usuario.id; gravarMeta(m); }
    try { ultimaBusca = Date.now(); await comPrazo(baixar(), 8000); mudarStatus(pendentes().length ? 'salvando' : 'sincronizado'); enviar(); }
    catch (e) { console.error('Sem conexão com o Supabase; seguindo com os dados deste navegador.', e); mudarStatus('offline'); }
    document.addEventListener('visibilitychange', () => { if (document.hidden) enviar(); else atualizar(); });
    window.addEventListener('online', () => { ultimaBusca = 0; atualizar(); });
    cli.auth.onAuthStateChange(ev => { if (ev === 'SIGNED_OUT') location.replace('login.html'); });
  }

  /** Login com e-mail e senha. Devolve '' se entrou ou a mensagem de erro. */
  async function entrar(email, senha) {
    try {
      await conectar();
      const { error } = await cli.auth.signInWithPassword({ email, password: senha });
      if (!error) return '';
      return /invalid login/i.test(error.message) ? 'E-mail ou senha incorretos.' : /not confirmed/i.test(error.message) ? 'Este e-mail ainda não foi confirmado no Supabase.' : 'Não foi possível entrar: ' + error.message;
    } catch (e) { return 'Sem conexão com o servidor. Confira a internet e os dados em js/config.js.'; }
  }
  async function temSessao() { try { await conectar(); return !!(await cli.auth.getSession()).data.session; } catch (e) { return false; } }

  /** Envia o que falta, encerra a sessão e limpa o progresso deste navegador. Devolve false se ainda há algo sem enviar. */
  async function sair(mesmoAssim) {
    await enviar();
    if (pendentes().length && !mesmoAssim) return false;
    SINCRONIZADAS.forEach(remover); remover(META);
    try { await cli.auth.signOut({ scope: 'local' }); } catch (e) { /* sem rede: a sessão local já foi apagada */ }
    location.replace('login.html');
    return true;
  }

  return {
    CHAVES, ler, gravar, remover, aoMudar, pronto,
    remoto, entrar, sair, temSessao, aoMudarStatus,
    get status() { return status; },
    get email() { return usuario ? usuario.email : ''; }
  };
})();
