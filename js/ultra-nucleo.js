/* =====================================================================
   NÚCLEO DOS ULTRA-APRENDIZADOS — o que o app (civil3d.html / revit.html)
   e o hub (index.html) precisam calcular do mesmo jeito: estado inicial,
   migração e as datas das sessões. Não toca na tela.
   D = dados do projeto (dados/*.js) · S = estado salvo.
   Dias da semana: 0 = segunda … 6 = domingo.
   ===================================================================== */
const UltraNucleo = (() => {
  const pad = n => String(n).padStart(2, '0');
  const iso = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const deIso = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const addDias = (s, n) => { const d = deIso(s); d.setDate(d.getDate() + n); return iso(d); };
  const dow = s => (deIso(s).getDay() + 6) % 7;
  const hoje = () => iso(new Date());

  function estadoNovo(D) {
    const aulas = {}; D.aulas.forEach(a => { if (a.feita) aulas[a.id] = true; });
    const cards = [];
    D.marcos.forEach(m => m.flashcards.forEach((c, i) => cards.push({ id: 'c-' + m.id + '-' + i, marco: m.id, q: c.q, a: c.a, ef: 2.5, reps: 0, iv: 0, due: null, visto: 0 })));
    return {
      v: 2,
      config: { inicio: D.projeto.inicio, pomodoro: 50, metaFlash: 15, tema: 'auto', disp: JSON.parse(JSON.stringify(D.disponibilidade)) },
      tarefas: {}, aulas, feynman: {}, concluido: {}, sessoes: {}, registros: [], cards,
      flashDia: { data: '', n: 0 }, recup: {}, erros: [], dias: {}, timer: null, dispensados: {}, plano: { base: null }
    };
  }

  /* v1 guardava datas fixas vindas do "Recalcular"; a v2 calcula as datas pela disponibilidade */
  function migrar(S) {
    if (!S.plano) S.plano = { base: null };
    if ((S.v || 1) < 2) { Object.values(S.sessoes).forEach(x => { if (x.data && !x.fixa) delete x.data; }); S.v = 2; }
    return S;
  }

  /** Estado salvo (já migrado) ou um estado novo. Lança erro se o armazenamento falhar. */
  function carregar(D, chave) {
    const t = Armazenamento.ler(chave);
    return t ? migrar(Object.assign(estadoNovo(D), t)) : estadoNovo(D);
  }

  const sessoes = D => D.sessoes.map((s, i) => Object.assign({ id: 's' + i }, s));

  /* ---------- datas das sessões ----------
     As sessões seguem a ordem do plano e são encaixadas nos dias de estudo,
     respeitando os MINUTOS disponíveis de cada dia:
     · cabe no que sobra do dia? fica no mesmo dia; não cabe? vai para o próximo dia de estudo;
     · uma sessão maior que um dia inteiro é dividida em partes, em dias seguidos de estudo;
     · Folga ocupa um dia de estudo inteiro;
     · sem "Recalcular", tudo parte da data de início; depois dele, o que falta parte de hoje;
     · sessão reagendada à mão fica presa na data escolhida e esse dia sai da sequência. */
  function calcDatas(D, S) {
    const est = s => S.sessoes[s.id] || {};
    const presa = s => !!(est(s).fixa && !est(s).feita);
    const diaUtil = d => { const x = S.config.disp[dow(d)]; return x.ativo && x.min > 0; };
    const temDisponivel = Object.values(S.config.disp).some(d => d.ativo && d.min > 0);
    const r = {}, partes = {}, lista = sessoes(D);
    const uma = (s, d) => { r[s.id] = d; partes[s.id] = [{ d, min: s.min || 0 }]; };
    if (!temDisponivel) { lista.forEach(s => uma(s, est(s).data || addDias(S.config.inicio, (s.sem - 1) * 7 + s.dia))); return { r, partes }; }
    const ocupados = new Set();
    lista.forEach(s => { if (presa(s)) { uma(s, est(s).data); ocupados.add(est(s).data); } });
    const base = S.plano && S.plano.base;
    let cur = null, sobra = 0, usados = 0;
    const proximoDia = () => {
      let d = cur ? addDias(cur, 1) : (base || S.config.inicio), k = 0;
      while ((!diaUtil(d) || ocupados.has(d)) && k++ < 400) d = addDias(d, 1);
      cur = d; sobra = S.config.disp[dow(d)].min; usados = 0;
    };
    lista.forEach(s => {
      if (presa(s)) return;
      if (base && est(s).feita) { uma(s, est(s).dataFeita || base); return; }
      if (s.tipo === 'Folga') { if (cur === null || usados > 0) proximoDia(); uma(s, cur); usados++; sobra = 0; return; }
      let resta = s.min || 0;
      if (cur === null || sobra <= 0 || (usados > 0 && resta > sobra)) proximoDia();
      r[s.id] = cur; partes[s.id] = [];
      for (let k = 0; k < 60; k++) {
        const usa = Math.min(resta, sobra);
        partes[s.id].push({ d: cur, min: usa }); resta -= usa; sobra -= usa; usados++;
        if (resta <= 0) break;
        proximoDia();
      }
    });
    return { r, partes };
  }

  /* ---------- progresso (usado pelos cartões do hub) ---------- */
  function progresso(D, S) {
    let f = 0, t = 0;
    D.marcos.forEach(m => { t += m.tarefas.length; f += S.concluido[m.id] ? m.tarefas.length : m.tarefas.filter((_, i) => S.tarefas[m.id + '-' + i]).length; });
    return {
      pct: t ? Math.round(f / t * 100) : 0,
      marcosFeitos: D.marcos.filter(m => S.concluido[m.id]).length,
      marcos: D.marcos.length,
      marcoAtual: D.marcos.find(m => !S.concluido[m.id]) || D.marcos[D.marcos.length - 1]
    };
  }

  return { estadoNovo, migrar, carregar, sessoes, calcDatas, progresso, iso, deIso, addDias, dow, hoje };
})();
