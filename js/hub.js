/* =====================================================================
   HUB — Gestor de estudos
   Junta as três frentes numa agenda só. O hub não tem plano próprio: ele
   divide os MINUTOS de cada dia entre as frentes, e o planejador de cada
   app encaixa o conteúdo na sua fatia. A agenda é a soma dos três.
   Seções: frentes · estado · disponibilidade · agenda · vistas · ações · início
   ===================================================================== */

/* ---------- frentes ---------- */
const FRENTES = [
  { id: 'civil3d', tipo: 'ultra', curto: 'Civil 3D', nome: 'Ultra-Aprendizado Civil 3D', arq: 'civil3d.html' },
  { id: 'revit',   tipo: 'ultra', curto: 'Revit',    nome: 'Ultra-Aprendizado Revit',    arq: 'revit.html' },
  { id: 'pos',     tipo: 'pos',   curto: 'Pós BIM',  nome: 'Especialização em Building Information Modeling', sub: 'Projetos de Infraestrutura', arq: 'pos.html' }
];
const frente = id => FRENTES.find(f => f.id === id);
const DIAS = ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom'];
const DIAS_LONGOS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

/* ---------- utilitários ---------- */
const $ = s => document.querySelector(s);
const { iso, deIso, addDias, dow, hoje } = UltraNucleo;
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = n => String(n).padStart(2, '0');
const fData = s => DIAS[dow(s)] + ', ' + s.slice(8) + '/' + s.slice(5, 7);
const fCurta = s => s.slice(8) + '/' + s.slice(5, 7);
const fMin = m => { m = Math.round(m); return m < 60 ? m + ' min' : Math.floor(m / 60) + ' h' + (m % 60 ? ' ' + pad(m % 60) : ''); };
const segunda = s => addDias(s, -dow(s));
const emMin = h => { const [a, b] = String(h || '19:30').split(':').map(Number); return (a || 0) * 60 + (b || 0); };
const emHora = m => pad(Math.floor(m / 60) % 24) + ':' + pad(m % 60);
const posDow = i => (i + 1) % 7;                       // a Pós conta a semana a partir de domingo

/* ---------- estado ---------- */
let H;                       // estado do hub (disponibilidade, tema)
const E = {};                // estado de cada ultra-aprendizado
let storageOk = true;
const ui = { semana: null, oculto: {} };

const D = id => ULTRA[id].dados;
const posOk = () => !!(Store.state && L.course());

function hubNovo() {
  const disp = {};
  for (let i = 0; i < 7; i++) {
    const min = {}, horas = [];
    FRENTES.forEach(f => {
      if (f.tipo === 'ultra') { const x = E[f.id].config.disp[i]; min[f.id] = x.ativo ? (x.min || 0) : 0; if (min[f.id]) horas.push(x.hora); }
      else min[f.id] = Store.state.settings.availability[posDow(i)] || 0;
    });
    disp[i] = { ativo: FRENTES.some(f => min[f.id] > 0), hora: horas.sort()[0] || '19:30', min };
  }
  return { v: 1, tema: 'auto', disp, novo: true };
}

function carregar() {
  FRENTES.filter(f => f.tipo === 'ultra').forEach(f => {
    try { E[f.id] = UltraNucleo.carregar(D(f.id), ULTRA[f.id].chave); }
    catch (e) { storageOk = false; E[f.id] = UltraNucleo.estadoNovo(D(f.id)); }
  });
  Store.load(); Store.rev++;                            // rev novo: o planejador da Pós refaz a conta
  let salvo = null;
  try { salvo = Armazenamento.ler(Armazenamento.CHAVES.hub); } catch (e) { storageOk = false; }
  H = salvo && salvo.disp ? salvo : hubNovo();
  if (puxarDisp()) salvarHub();
}
function salvarHub() { gravar(Armazenamento.CHAVES.hub, H); }
function salvarFrente(id) { if (id === 'pos') Store.save(); else gravar(ULTRA[id].chave, E[id]); }
function gravar(chave, obj) {
  try { Armazenamento.gravar(chave, obj); } catch (e) { storageOk = false; toast('Não foi possível salvar neste navegador.'); }
}

/* ---------- disponibilidade ----------
   A grade do hub manda. Cada frente recebe os seus minutos do dia:
   · ultra-aprendizados: config.disp[dia] = { ativo, hora, min }
   · Pós: settings.availability[dia] = minutos
   Se alguém mexer na disponibilidade dentro de um app, o hub adota o valor de lá. */
const minDe = (i, id) => { const d = H.disp[i]; return d.ativo ? (d.min[id] || 0) : 0; };
const totalDia = i => FRENTES.reduce((a, f) => a + minDe(i, f.id), 0);
function minNoApp(i, id) {
  if (id === 'pos') return Store.state.settings.availability[posDow(i)] || 0;
  const x = E[id].config.disp[i]; return x.ativo ? (x.min || 0) : 0;
}
/** início de cada bloco do dia: as frentes vêm uma depois da outra, a partir do horário do dia */
function blocos(i) {
  let t = emMin(H.disp[i].hora); const r = {};
  FRENTES.forEach(f => { r[f.id] = emHora(t); t += minDe(i, f.id); });
  return r;
}
function puxarDisp() {
  let mudou = false;
  for (let i = 0; i < 7; i++) FRENTES.forEach(f => {
    const la = minNoApp(i, f.id);
    if (la === minDe(i, f.id)) return;
    H.disp[i].min[f.id] = la; if (la > 0) H.disp[i].ativo = true;
    mudou = true;
  });
  return mudou;
}
function empurrarDisp() {
  for (let i = 0; i < 7; i++) {
    const ini = blocos(i);
    FRENTES.forEach(f => {
      const m = minDe(i, f.id);
      if (f.tipo === 'pos') Store.state.settings.availability[posDow(i)] = m;
      else { const x = E[f.id].config.disp[i]; E[f.id].config.disp[i] = { ativo: m > 0, hora: ini[f.id], min: m > 0 ? m : x.min }; }
    });
  }
  FRENTES.forEach(f => salvarFrente(f.id));
  salvarHub();
}

/* ---------- agenda ----------
   item = { frente, id, data, min, tipo, titulo, sub, feita, atrasada, parte, fixa, folga } */
let cache = null;
function agenda() {
  if (cache) return cache;
  const dias = {}, atrasadas = {}, h = hoje();
  const add = it => (dias[it.data] = dias[it.data] || []).push(it);
  FRENTES.filter(f => f.tipo === 'ultra').forEach(f => {
    const d = D(f.id), S = E[f.id], c = UltraNucleo.calcDatas(d, S);
    atrasadas[f.id] = 0;
    UltraNucleo.sessoes(d).forEach(s => {
      const e = S.sessoes[s.id] || {}, m = d.marcos.find(x => x.id === s.marco), partes = c.partes[s.id];
      const atrasada = !e.feita && c.r[s.id] < h;
      if (atrasada) atrasadas[f.id]++;
      partes.forEach((p, k) => add({
        frente: f.id, id: s.id, data: p.d, min: p.min, tipo: s.tipo, titulo: s.titulo, sub: m ? 'M' + m.num + ' · ' + m.nome : '',
        feita: !!e.feita, atrasada, parte: partes.length > 1 ? (k + 1) + '/' + partes.length : '', fixa: !!e.fixa && !e.feita,
        folga: s.tipo === 'Folga', inicio: c.r[s.id]
      }));
    });
  });
  if (posOk()) {
    const plano = Planner.build(), p = Store.state.plan;
    Object.keys(plano.days).forEach(d => plano.days[d].forEach(i => add({
      frente: 'pos', id: i.key, data: d, min: i.minutes, tipo: Planner.KIND[i.kind] || 'Tarefa', titulo: tituloPos(i), sub: i.sub,
      feita: false, atrasada: false, parte: '', fixa: !!p.pins[i.key], inicio: d
    })));
    Object.keys(p.log || {}).forEach(d => p.log[d].forEach(x => add({
      frente: 'pos', id: x.key, data: d, min: x.min || 0, tipo: Planner.KIND[(x.key || '')[0]] || 'Tarefa', titulo: x.title, sub: x.sub || '',
      feita: true, atrasada: false, parte: '', registro: true, inicio: d
    })));
  }
  const ordem = FRENTES.map(f => f.id);
  Object.values(dias).forEach(l => l.sort((a, b) => ordem.indexOf(a.frente) - ordem.indexOf(b.frente)));
  return (cache = { dias, atrasadas });
}
function tituloPos(i) {
  if (i.kind !== 'L') return i.title;
  const n = Math.round(i.count * 10) / 10;
  return (n < 1 ? 'Assistir parte da aula' : n === 1 ? 'Assistir 1 aula' : 'Assistir ' + U.fmtNum(n) + ' aulas') + ': ' + i.title;
}
const visiveis = d => (agenda().dias[d] || []).filter(it => !ui.oculto[it.frente]);
/** próximo item pendente de uma frente, de hoje em diante (ou o atrasado mais antigo) */
function proximo(id) {
  const a = agenda(), datas = Object.keys(a.dias).sort();
  for (const d of datas) { const it = a.dias[d].find(x => x.frente === id && !x.feita && !x.folga); if (it) return it; }
  return null;
}

/* ---------- vistas ---------- */
function vFrentes() {
  const h = hoje(), a = agenda();
  const deHoje = (a.dias[h] || []).filter(x => !x.feita && !x.folga);
  const sem = segunda(h); let minSem = 0;
  for (let i = 0; i < 7; i++) minSem += (a.dias[addDias(sem, i)] || []).reduce((s, x) => s + x.min, 0);
  let o = `<a class="frente atual" href="#agenda" aria-current="page"><h2>Agenda</h2><span class="sub">Programação semanal das três frentes</span>
    <span class="grande">${deHoje.length} <small>${deHoje.length === 1 ? 'atividade para hoje' : 'atividades para hoje'}${deHoje.length ? ' · ' + fMin(deHoje.reduce((s, x) => s + x.min, 0)) : ''}</small></span>
    <span class="prox">Esta semana: <b>${fMin(minSem)}</b> planejados</span><span class="abrir">Você está aqui</span></a>`;
  FRENTES.forEach(f => {
    let pct = 0, linha = '', vivo = false;
    if (f.tipo === 'ultra') {
      const p = UltraNucleo.progresso(D(f.id), E[f.id]);
      pct = p.pct; linha = `Marco <b>M${p.marcoAtual.num} · ${esc(p.marcoAtual.nome)}</b> · ${p.marcosFeitos} de ${p.marcos} concluídos`; vivo = !!E[f.id].timer;
    } else if (posOk()) {
      const st = L.courseStats(L.course());
      pct = Math.round(st.pctHours * 100); linha = `<b>${U.fmtNum(st.doneH)} h</b> de ${U.fmtNum(st.totalH)} h · ${st.approved} de ${st.count} disciplinas aprovadas`; vivo = !!Store.state.timer;
    } else linha = 'Nenhum curso cadastrado.';
    const px = proximo(f.id);
    o += `<a class="frente f-${f.id}" href="${f.arq}"><h2>${esc(f.nome)}</h2>${f.sub ? `<span class="sub">${esc(f.sub)}</span>` : ''}
      <span class="grande num">${pct}% <small>concluído</small></span><div class="barra"><i style="width:${pct}%"></i></div>
      <span class="prox">${linha}</span>
      <span class="prox">${px ? `Próxima: <b>${fData(px.data)}</b> · ${esc(px.titulo)}` : 'Nada pendente no plano.'}</span>
      ${vivo ? '<span class="aovivo">● Sessão em andamento</span>' : ''}<span class="abrir">Abrir ›</span></a>`;
  });
  return o;
}

function cartaoItem(it) {
  const f = frente(it.frente);
  let acoes = '';
  if (it.registro) acoes = '';
  else if (f.tipo === 'ultra') {
    acoes = `<button class="btn mini${it.feita ? ' lig' : ''}" data-a="feita" data-f="${f.id}" data-id="${it.id}">${it.feita ? 'Feita ✓' : 'Marcar feita'}</button>`;
    if (!it.feita) acoes += `<button class="btn mini" data-a="reagendar" data-f="${f.id}" data-id="${it.id}">Reagendar</button>`;
    if (!it.feita && !it.folga) acoes += `<a class="btn mini" href="${f.arq}?iniciar=${encodeURIComponent(it.id)}">Iniciar</a>`;
  } else {
    acoes = `<a class="btn mini" href="${f.arq}?concluir=${encodeURIComponent(it.id)}" title="Abre a Pós para registrar aulas assistidas, tempo e autoavaliação">Marcar feita</a>
      <button class="btn mini" data-a="reagendar" data-f="pos" data-id="${esc(it.id)}" data-d="${it.data}">Reagendar</button>
      <a class="btn mini" href="${f.arq}?iniciar=${encodeURIComponent(it.id)}">Iniciar</a>`;
  }
  return `<div class="item s-${it.tipo}${it.feita ? ' feita' : ''}${it.atrasada ? ' atrasada' : ''}">
    <div class="linha entre"><span class="chip t-${it.tipo}">${it.tipo}</span><span class="num">${it.min ? fMin(it.min) : ''}</span></div>
    <span class="tt">${esc(it.titulo)}${it.parte ? ` <span class="suave">(parte ${it.parte})</span>` : ''}</span>
    <span class="ss">${esc(it.sub)}${it.fixa ? ' · data fixada' : ''}${it.atrasada ? ' · atrasada' : ''}</span>
    ${acoes ? `<div class="acoes">${acoes}</div>` : ''}</div>`;
}

function vAgenda() {
  const h = hoje(), a = agenda();
  if (!ui.semana) ui.semana = segunda(h);
  const ini = ui.semana, atual = ini === segunda(h);
  let o = `<div class="linha entre"><div><h2>Agenda da semana</h2><p class="suave peq">${fCurta(ini)} a ${fCurta(addDias(ini, 6))} · cada frente ocupa a sua fatia do dia, na ordem do plano de cada uma.</p></div>
    <div class="linha"><div class="filtros" role="group" aria-label="Mostrar frentes">${FRENTES.map(f => `<button class="filtro f-${f.id}" data-a="filtro" data-f="${f.id}" aria-pressed="${!ui.oculto[f.id]}">${esc(f.curto)}</button>`).join('')}</div>
    <button class="btn" data-a="semAnt">‹ Anterior</button><button class="btn${atual ? ' lig' : ''}" data-a="semHoje">Hoje</button><button class="btn" data-a="semProx">Próxima ›</button></div></div>`;
  if (!storageOk) o += `<div class="alerta critico"><span><b>Este navegador não está deixando salvar.</b> O que você marcar aqui se perde ao fechar a página.</span></div>`;
  if (H.novo) o += `<div class="alerta"><span><b>Primeira vez no hub.</b> Trouxe a disponibilidade que estava em cada app, então os dias podem estar somados além do que você tem. Ajuste os minutos por frente na tabela abaixo; os três planos se reorganizam na hora.</span><button class="btn" data-a="entendi">Entendi</button></div>`;
  FRENTES.forEach(f => { const n = a.atrasadas[f.id]; if (n) o += `<div class="alerta critico"><span><b>${esc(f.curto)}: ${n} ${n > 1 ? 'sessões atrasadas' : 'sessão atrasada'}.</b> Recalcular faz o que falta recomeçar a partir de hoje, na mesma ordem.</span><button class="btn" data-a="recalcular" data-f="${f.id}">Recalcular ${esc(f.curto)}</button></div>`; });
  o += `<div class="semana">`;
  for (let i = 0; i < 7; i++) {
    const d = addDias(ini, i), itens = visiveis(d), disp = H.disp[i], total = totalDia(i), ini_ = blocos(i);
    const carga = itens.filter(x => !x.registro).reduce((s, x) => s + x.min, 0);
    o += `<section class="dia${d === h ? ' hoje' : ''}${disp.ativo && total ? '' : ' fora'}${itens.length ? '' : ' vazio'}"><header><b>${fData(d)}${d === h ? ' · hoje' : ''}</b>
      <span>${disp.ativo && total ? `${disp.hora} · <span class="${carga > total ? 'excede' : ''}" title="Planejado ${fMin(carga)}; disponível ${fMin(total)}">${fMin(carga)} de ${fMin(total)}</span>` : 'sem estudo'}</span></header>`;
    if (!itens.length) o += `<span class="peq suave">${disp.ativo && total ? 'Livre' : '—'}</span>`;
    FRENTES.forEach(f => {
      const meus = itens.filter(x => x.frente === f.id); if (!meus.length) return;
      o += `<div class="bloco-f f-${f.id}"><span>${esc(f.curto)}<span class="num">${minDe(i, f.id) ? ini_[f.id] : ''}</span></span>${meus.map(cartaoItem).join('')}</div>`;
    });
    o += `</section>`;
  }
  return o + `</div>`;
}

function vDisp() {
  const tot = {}; FRENTES.forEach(f => tot[f.id] = 0); let geral = 0;
  let linhas = '';
  for (let i = 0; i < 7; i++) {
    const d = H.disp[i], t = totalDia(i); geral += t;
    FRENTES.forEach(f => tot[f.id] += minDe(i, f.id));
    linhas += `<tr class="${d.ativo ? '' : 'desl'}"><td><label class="linha" style="gap:8px;flex-wrap:nowrap"><input type="checkbox" data-c="disp" data-i="${i}" data-k="ativo"${d.ativo ? ' checked' : ''}><span>${DIAS_LONGOS[i]}</span></label></td>
      <td><input type="time" aria-label="Início em ${DIAS_LONGOS[i]}" data-c="disp" data-i="${i}" data-k="hora" value="${esc(d.hora)}"${d.ativo ? '' : ' disabled'}></td>
      ${FRENTES.map(f => `<td><input type="number" min="0" max="900" step="5" inputmode="numeric" aria-label="Minutos de ${esc(f.curto)} em ${DIAS_LONGOS[i]}" data-c="disp" data-i="${i}" data-k="${f.id}" value="${d.min[f.id] || 0}"${d.ativo ? '' : ' disabled'}></td>`).join('')}
      <td class="num">${t ? fMin(t) : '—'}</td></tr>`;
  }
  return `<div class="cartao"><div><h2>Disponibilidade semanal</h2><p class="suave peq">Quantos minutos de cada dia vão para cada frente. Ao mudar aqui, os cronogramas do Civil 3D e do Revit e o planejamento da Pós se reencaixam sozinhos. Zero deixa a frente fora daquele dia.</p></div>
    <div class="rolar"><table><thead><tr><th>Dia</th><th>Início</th>${FRENTES.map(f => `<th class="f-${f.id}"><span class="ponto"></span>${esc(f.curto)} (min)</th>`).join('')}<th>Total</th></tr></thead>
    <tbody>${linhas}</tbody><tfoot><tr><td>Semana</td><td></td>${FRENTES.map(f => `<td class="num">${fMin(tot[f.id])}</td>`).join('')}<td class="num">${fMin(geral)}</td></tr></tfoot></table></div></div>`;
}

function render() {
  cache = null;
  $('#hoje-txt').textContent = DIAS_LONGOS[dow(hoje())] + ', ' + hoje().split('-').reverse().join('/');
  $('#btn-tema').textContent = 'Tema: ' + ({ auto: 'automático', light: 'claro', dark: 'escuro' })[H.tema || 'auto'];
  $('#frentes').innerHTML = vFrentes();
  $('#agenda').innerHTML = vAgenda();
  $('#disp').innerHTML = vDisp();
}
function aplicarTema() { const r = document.documentElement; if (!H.tema || H.tema === 'auto') r.removeAttribute('data-theme'); else r.setAttribute('data-theme', H.tema); }
function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('on'), 3200); }
function modal(html) { $('#modal-cx').innerHTML = html; $('#modal').classList.add('on'); const f = $('#modal-cx input,#modal-cx select,#modal-cx textarea,#modal-cx button'); if (f) f.focus(); }
function fecharModal() { $('#modal').classList.remove('on'); }

/* ---------- backup único ---------- */
function pacote() {
  const dados = {};
  Object.values(Armazenamento.CHAVES).forEach(k => { try { const v = Armazenamento.ler(k); if (v) dados[k] = v; } catch (e) { /* chave ilegível fica de fora */ } });
  return { app: 'hub-estudos', v: 1, exportadoEm: new Date().toISOString(), dados };
}
/** Descobre de quem é um backup: do hub (tudo), da Pós ou de um dos ultra-aprendizados. */
function identificar(o) {
  if (o && o.app === 'hub-estudos' && o.dados) return { tipo: 'hub' };
  const pos = o && o.data ? o.data : o;
  if (pos && Array.isArray(pos.courses) && Array.isArray(pos.disciplines)) return { tipo: 'pos' };
  if (o && o.config && Array.isArray(o.cards) && Array.isArray(o.registros)) {
    const pontos = id => { const qs = new Set(); D(id).marcos.forEach(m => m.flashcards.forEach(c => qs.add(c.q))); return o.cards.filter(c => qs.has(c.q)).length; };
    const c = pontos('civil3d'), r = pontos('revit');
    return { tipo: 'ultra', palpite: c === r ? '' : c > r ? 'civil3d' : 'revit' };
  }
  return null;
}
let pendente = null;
function receberBackup(txt) {
  let o; try { o = JSON.parse(txt); } catch (e) { return toast('Esse arquivo não é um JSON válido.'); }
  const id = identificar(o); if (!id) return toast('Não reconheci esse arquivo como backup do hub nem de um dos três apps.');
  pendente = { o, id };
  if (id.tipo === 'hub') {
    const nomes = Object.keys(o.dados).map(k => ({ [Armazenamento.CHAVES.hub]: 'agenda e disponibilidade', [Armazenamento.CHAVES.civil3d]: 'Civil 3D', [Armazenamento.CHAVES.revit]: 'Revit', [Armazenamento.CHAVES.pos]: 'Pós BIM' })[k]).filter(Boolean);
    modal(`<h2>Importar backup completo?</h2><p>O arquivo traz: <b>${esc(nomes.join(', '))}</b>. O que está neste navegador para esses itens será substituído.</p>
      <div class="linha"><button class="btn per" data-a="importarOk">Importar e substituir</button><button class="btn" data-a="fecharModal">Cancelar</button></div>`);
  } else if (id.tipo === 'pos') {
    modal(`<h2>Importar backup da Pós BIM?</h2><p>O progresso atual da Pós neste navegador será substituído. Civil 3D e Revit não mudam.</p>
      <div class="linha"><button class="btn per" data-a="importarOk">Importar e substituir</button><button class="btn" data-a="fecharModal">Cancelar</button></div>`);
  } else {
    modal(`<h2>Importar backup de ultra-aprendizado</h2><p>${id.palpite ? 'Pelos flashcards, este backup parece ser de <b>' + esc(frente(id.palpite).curto) + '</b>. Confirme o destino:' : 'Não deu para saber de qual projeto é este backup. Escolha o destino:'}</p>
      <label class="campo" for="imp-dest">Destino<select id="imp-dest">${FRENTES.filter(f => f.tipo === 'ultra').map(f => `<option value="${f.id}"${f.id === id.palpite ? ' selected' : ''}>${esc(f.nome)}</option>`).join('')}</select></label>
      <p class="suave peq">O progresso atual desse projeto neste navegador será substituído. As outras frentes não mudam.</p>
      <div class="linha"><button class="btn per" data-a="importarOk">Importar e substituir</button><button class="btn" data-a="fecharModal">Cancelar</button></div>`);
  }
}

/* ---------- ações (cliques) ---------- */
const A = {
  semAnt() { ui.semana = addDias(ui.semana, -7); render(); },
  semProx() { ui.semana = addDias(ui.semana, 7); render(); },
  semHoje() { ui.semana = segunda(hoje()); render(); },
  filtro(el) { ui.oculto[el.dataset.f] = !ui.oculto[el.dataset.f]; render(); },
  entendi() { delete H.novo; salvarHub(); render(); },
  tema() { H.tema = ({ auto: 'light', light: 'dark', dark: 'auto' })[H.tema || 'auto']; salvarHub(); aplicarTema(); render(); },
  feita(el) {
    const id = el.dataset.f, S = E[id], sid = el.dataset.id, x = S.sessoes[sid] || {}, d = UltraNucleo.calcDatas(D(id), S).r[sid];
    x.feita = !x.feita;
    if (x.feita) { x.dataFeita = d <= hoje() ? d : hoje(); S.dias[hoje()] = true; } else delete x.dataFeita;
    S.sessoes[sid] = x; salvarFrente(id); render();
    toast(x.feita ? 'Sessão marcada como feita.' : 'Sessão reaberta.');
  },
  reagendar(el) {
    const id = el.dataset.f, sid = el.dataset.id; let titulo, data, fixa;
    if (id === 'pos') { const it = (agenda().dias[el.dataset.d] || []).find(x => x.frente === 'pos' && x.id === sid); if (!it) return; titulo = it.titulo; data = Store.state.plan.pins[sid] || it.data; fixa = !!Store.state.plan.pins[sid]; }
    else { const s = UltraNucleo.sessoes(D(id)).find(x => x.id === sid), e = E[id].sessoes[sid] || {}; titulo = s.titulo; data = UltraNucleo.calcDatas(D(id), E[id]).r[sid]; fixa = !!e.fixa; }
    modal(`<h2>Reagendar</h2><p><span class="chip f-${id}" style="color:var(--cor)">${esc(frente(id).curto)}</span> ${esc(titulo)}</p>
      <label class="campo" for="rg-data">Nova data<input type="date" id="rg-data" value="${data}"${id === 'pos' ? ` min="${hoje()}"` : ''}></label>
      <p class="suave peq">${id === 'pos' ? 'A tarefa entra obrigatoriamente no plano do dia escolhido.' : 'A sessão fica presa na data escolhida e as demais seguem a sequência nos outros dias.'}</p>
      <div class="linha"><button class="btn pri" data-a="reagendarOk" data-f="${id}" data-id="${esc(sid)}">Salvar</button>${fixa ? `<button class="btn" data-a="soltar" data-f="${id}" data-id="${esc(sid)}">Voltar à sequência</button>` : ''}<button class="btn" data-a="fecharModal">Cancelar</button></div>`);
  },
  reagendarOk(el) {
    const v = $('#rg-data').value, id = el.dataset.f, sid = el.dataset.id; if (!v) return;
    if (id === 'pos') { if (v < hoje()) return toast('Escolha hoje ou uma data futura.'); const p = Store.state.plan; p.pins[sid] = v; delete p.snooze[sid]; }
    else E[id].sessoes[sid] = Object.assign({}, E[id].sessoes[sid], { data: v, fixa: true });
    salvarFrente(id); fecharModal(); ui.semana = segunda(v); render(); toast('Reagendado para ' + fData(v) + '.');
  },
  soltar(el) {
    const id = el.dataset.f, sid = el.dataset.id;
    if (id === 'pos') delete Store.state.plan.pins[sid]; else { const x = E[id].sessoes[sid]; if (x) { delete x.data; delete x.fixa; } }
    salvarFrente(id); fecharModal(); render(); toast('Voltou para a sequência do plano.');
  },
  recalcular(el) { const id = el.dataset.f; E[id].plano.base = hoje(); salvarFrente(id); ui.semana = segunda(hoje()); render(); toast(frente(id).curto + ': o que faltava recomeça hoje, nos seus dias de estudo.'); },
  backup() {
    modal(`<h2>Backup</h2><p>Um arquivo só com tudo: agenda, Civil 3D, Revit e Pós. Enquanto a sincronização não está ligada, é assim que você leva os dados de um computador para o outro.</p>
      <div class="linha"><button class="btn pri" data-a="exportar">Baixar backup completo</button></div>
      <label class="campo" for="bk-arq">Importar um arquivo .json<input type="file" id="bk-arq" accept=".json,application/json" data-c="arquivo"></label>
      <p class="suave peq">Aceita o backup completo do hub e também os backups antigos de cada app (Civil 3D, Revit ou Pós); o hub reconhece de quem é.</p>
      <div class="linha"><button class="btn" data-a="fecharModal">Fechar</button></div>`);
  },
  exportar() {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(pacote(), null, 1)], { type: 'application/json' }));
    a.download = 'backup-gestor-de-estudos-' + hoje() + '.json'; document.body.appendChild(a); a.click(); a.remove();
  },
  importarOk() {
    const { o, id } = pendente; pendente = null;
    try {
      if (id.tipo === 'hub') Object.values(Armazenamento.CHAVES).forEach(k => { if (o.dados[k]) Armazenamento.gravar(k, o.dados[k]); });
      else if (id.tipo === 'pos') Store.importJSON(JSON.stringify(o));
      else { const dest = $('#imp-dest').value; Armazenamento.gravar(ULTRA[dest].chave, UltraNucleo.migrar(Object.assign(UltraNucleo.estadoNovo(D(dest)), o))); }
    } catch (e) { fecharModal(); return toast('Não foi possível importar: ' + (e.message || 'erro ao salvar') + '.'); }
    fecharModal(); carregar(); aplicarTema(); ui.semana = null; render(); toast('Backup importado.');
  },
  fecharModal
};

/* ---------- mudanças em campos ---------- */
const C = {
  disp(el) {
    const d = H.disp[el.dataset.i], k = el.dataset.k;
    if (k === 'ativo') d.ativo = el.checked;
    else if (k === 'hora') { if (!el.value) return; d.hora = el.value; }
    else d.min[k] = Math.max(0, Math.min(900, parseInt(el.value, 10) || 0));
    delete H.novo; empurrarDisp(); render();
    toast(k === 'hora' ? 'Horário salvo.' : 'Agenda reencaixada na nova disponibilidade.');
  },
  arquivo(el) { const f = el.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => receberBackup(r.result); r.readAsText(f); }
};

/* ---------- início ---------- */
document.addEventListener('click', e => { const el = e.target.closest('[data-a]'); if (el && A[el.dataset.a]) { if (el.tagName === 'BUTTON') e.preventDefault(); A[el.dataset.a](el); } else if (e.target.id === 'modal') fecharModal(); });
document.addEventListener('change', e => { const el = e.target.closest('[data-c]'); if (el && C[el.dataset.c]) C[el.dataset.c](el); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') fecharModal(); });
/* outra aba (um dos apps) salvou: recarrega e redesenha, a menos que haja um diálogo aberto */
Armazenamento.aoMudar(() => { if (!$('#modal').classList.contains('on')) { carregar(); aplicarTema(); render(); } });
window.addEventListener('pageshow', e => { if (e.persisted) { carregar(); render(); } });
let diaAberto = hoje();
setInterval(() => { if (hoje() !== diaAberto) { diaAberto = hoje(); carregar(); render(); } }, 60000);

carregar(); aplicarTema(); render();
