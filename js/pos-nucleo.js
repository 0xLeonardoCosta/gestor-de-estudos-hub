/* =====================================================================
   NÚCLEO DA PÓS BIM — utilitários, dados iniciais, estado, regras e
   planejador. Usado por pos.html (o app) e por index.html (a agenda do hub).
   Não toca na tela.
   ===================================================================== */
/* utils.js — funções utilitárias (datas, formatação, DOM) */
const U = (() => {
  const pad = n => String(n).padStart(2, '0');
  const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const today = () => iso(new Date());
  const addDays = (s, n) => { const d = parse(s); d.setDate(d.getDate() + n); return iso(d); };
  const utc = s => { const [y, m, d] = s.split('-').map(Number); return Date.UTC(y, m - 1, d); };
  /** dias de a até b (positivo se b é depois de a) */
  const diff = (a, b) => Math.round((utc(b) - utc(a)) / 864e5);
  const dow = s => parse(s).getDay();
  const weekStart = s => addDays(s, -((dow(s) + 6) % 7)); // segunda-feira
  const DOW = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const DOW_FULL = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const fmtDate = s => s ? s.split('-').reverse().join('/') : '—';
  const fmtShort = s => s ? s.slice(8, 10) + '/' + s.slice(5, 7) : '—';
  const fmtLong = s => `${DOW_FULL[dow(s)]}, ${Number(s.slice(8, 10))} de ${MONTHS[Number(s.slice(5, 7)) - 1]}`;
  const fmtMonth = s => `${MONTHS[Number(s.slice(5, 7)) - 1]} de ${s.slice(0, 4)}`;
  const fmtMin = m => { m = Math.round(m || 0); const h = Math.floor(m / 60), r = m % 60; return h ? (r ? `${h}h${pad(r)}` : `${h}h`) : `${r}min`; };
  const fmtNum = n => (Math.round(n * 10) / 10).toLocaleString('pt-BR');
  const relDays = n => n === 0 ? 'hoje' : n === 1 ? 'amanhã' : n === -1 ? 'ontem' : n > 0 ? `em ${n} dias` : `há ${-n} dias`;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const sum = (arr, f = x => x) => arr.reduce((s, x) => s + (Number(f(x)) || 0), 0);
  const num = (v, def = 0) => { const n = parseFloat(String(v).replace(',', '.')); return isFinite(n) ? n : def; };
  const safeUrl = u => /^(https?:|file:|mailto:)/i.test(u) ? u : 'https://' + u;
  return { pad, iso, parse, today, addDays, diff, dow, weekStart, DOW, DOW_FULL, MONTHS, fmtDate, fmtShort, fmtLong, fmtMonth, fmtMin, fmtNum, relDays, esc, uid, clamp, sum, num, safeUrl };
})();
/* seed.js — dados pré-carregados da pós BIM (inseridos somente no primeiro acesso) */
const Seed = (() => {
  const CURRICULUM = [
    ['Introdução à Building Information Modeling', 'Conceitos fundamentais, definições, objetivos e benefícios do BIM no ciclo de vida · Dimensões do BIM (projeto, construção, operação e manutenção) · Modelagem da informação · Fluxos colaborativos, interoperabilidade e formatos de troca · BEP, EIR e casos de uso do BIM · Plataformas e softwares BIM · Normas, diretrizes e políticas de adoção · Carreiras e oportunidades em BIM'],
    ['Gestão de Projetos BIM', 'Fundamentos da gestão de projetos · Trabalho colaborativo e BIM · Gerenciamento × coordenação × compatibilização · Estrutura do processo de projeto BIM · Plano de Gestão de Projetos BIM · Plano de Execução BIM e implantação'],
    ['Compatibilização de Projetos BIM Multidisciplinar', 'Comunicação e colaboração entre partes interessadas · Detecção e resolução de conflitos · Gestão de alterações · Compatibilização de projeto BIM de infraestrutura'],
    ['Topografia e Geoprocessamento Aplicados', 'Geodésia e topografia · Instrumentos topográficos · Medição de ângulos e distâncias · Orientação · Planimetria e altimetria · Métodos de levantamento · Nivelamento · Locação de obras · Fotogrametria, geoprocessamento, georreferenciamento e sensoriamento remoto · GPS · SIG'],
    ['Ambiente Construído: Laser 3D e Termografia', 'Princípios da captura da realidade · BIM aplicado ao ambiente construído · 3D Laser Scanning · Análises com nuvem de pontos · Imageamento térmico'],
    ['Modelagem Paramétrica em Geotecnia e Infraestrutura', 'Representação geométrica · Parametrização · Atributos · Visualização e renderização · Objetos e modelo · Uso de software em infraestrutura e geotecnia'],
    ['Modelos de Estruturas de Fundações, Contenções e Obras Geotécnicas', 'Normas técnicas · Investigações geotécnicas e ensaios · Dimensionamento de fundações e contenções · Fluxo de trabalho, templates e estratégias de modelagem · Bibliotecas de componentes · Ferramentas de modelagem geotécnica · Modelo parametrizado · Navegação e organização do modelo · Análise geotécnica do modelo · Detalhamento e documentação · Interoperabilidade e IFC · Estudo de caso'],
    ['Projetos de Infraestrutura Viária', 'Estudos preliminares e diretrizes · Fluxo de trabalho, templates e estratégias de modelagem · Bibliotecas de componentes · Ferramentas de modelagem · Projeto geométrico · Terraplenagem · Sinalização · Drenagem viária · Navegação, organização e análise do modelo · Detalhamento e documentação · Interoperabilidade e IFC · Estudo de caso'],
    ['Projetos de Drenagem em BIM', 'Estudos preliminares e diretrizes · Fluxo de trabalho, templates e estratégias de modelagem · Bibliotecas de componentes · Ferramentas de modelagem · Organização e análise do modelo · Detalhamento e documentação · Interoperabilidade · Estudo de caso'],
    ['Projetos de Infraestrutura Ferroviária', 'Normas técnicas · Estudos preliminares e diretrizes · Fluxo de trabalho, templates e estratégias de modelagem · Bibliotecas de componentes · Ferramentas de modelagem · Projeto geométrico · Terraplenagem · Sinalização · Drenagem · Navegação, organização e análise do modelo · Detalhamento e documentação · Interoperabilidade e IFC · Estudo de caso'],
    ['Projetos de Infraestrutura Aeroportuária', 'Estudos preliminares e diretrizes · Fluxo de trabalho, templates e estratégias de modelagem · Bibliotecas de componentes · Ferramentas de modelagem aeroportuária · Concepção e modelo parametrizado · Navegação, organização e análise do modelo · Detalhamento e documentação · Interoperabilidade · Estudo de caso'],
    ['Projetos de Infraestrutura Aquaviária', 'Normas técnicas · Estudos preliminares e diretrizes · Fluxo de trabalho, templates e estratégias de modelagem · Bibliotecas de componentes · Ferramentas de modelagem aquaviária · Concepção e modelo parametrizado · Navegação, organização e análise do modelo · Detalhamento e documentação · Interoperabilidade · Estudo de caso'],
    ['Projetos de Obras de Artes Especiais', 'Normas técnicas · Fluxo de trabalho, templates e estratégias de modelagem · Bibliotecas de componentes · Ferramentas de modelagem estrutural · Modelo parametrizado · Navegação, organização e análise do modelo · Detalhamento e documentação · Estudo de caso'],
    ['Custos e Orçamento em Obras', 'Engenharia de custos · Metodologias orçamentárias · Parametrização e estimativa de custos · Interoperabilidade · Aplicações em BIM'],
    ['Planejamento de Obras de Infraestrutura', 'Logística e transporte · Operações, produção e estrutura organizacional · Cronograma e planejamento de obra · Interoperabilidade · Integração e colaboração'],
  ];
  const TCC_STAGES = ['Tema', 'Orientação', 'Cronograma', 'Escrita', 'Revisão', 'Entrega'];

  function defaultSettings() {
    return {
      theme: 'light',
      availability: [120, 90, 90, 90, 90, 90, 180], // minutos: dom..sáb
      dailyGoalMin: 0, weeklyGoalMin: 0,            // 0 = usar a disponibilidade
      reviewIntervals: [1, 7, 15, 30],
      reviewMin: 15,
      practiceRatio: 30,                            // % do tempo de aula dedicado à prática
      allowAdvance: false,
      softwares: ['Autodesk Civil 3D', 'Autodesk Revit', 'Autodesk Navisworks', 'Autodesk InfraWorks', 'Autodesk ReCap', 'QGIS'],
    };
  }

  /** Distribui igualmente os períodos das disciplinas entre duas datas. */
  function spread(discs, from, to) {
    const n = discs.length; if (!n) return;
    const total = Math.max(n, U.diff(from, to) + 1);
    discs.forEach((d, i) => {
      d.start = U.addDays(from, Math.round(i * total / n));
      d.end = U.addDays(from, Math.round((i + 1) * total / n) - 1);
      d.estimated = true;
    });
  }

  function build() {
    const courseId = 'c_bim';
    const state = {
      version: 1, seeded: true, firstRun: true,
      settings: Object.assign(defaultSettings(), { activeCourseId: courseId }),
      courses: [{
        id: courseId, name: 'Especialização em Building Information Modeling – Projetos de Infraestrutura',
        institution: 'PUC Minas – Oferta 5, Turma 1 · EAD (aulas gravadas)',
        start: '2026-07-10', end: '2028-01-10', goalDate: '2027-10-31',
        totalHours: 360, passScore: 70, tccEnabled: false,
      }],
      disciplines: [], topics: [], assessments: [], sessions: [], practices: [], reviewLog: [], manual: [], tcc: [],
      plan: { pins: {}, snooze: {}, cap: {}, log: {}, snap: null, missed: null },
      timer: null,
    };
    CURRICULUM.forEach(([name, list], i) => {
      const names = list.split(' · ');
      const per = Math.max(1, Math.round(24 / names.length));
      const d = {
        id: 'd' + (i + 1), courseId, order: i + 1, name, hours: 24, start: '', end: '', estimated: true,
        priority: 2, difficulty: 2, lessonMin: Math.round(24 * 60 / (per * names.length)), notes: '',
        deliverables: names.includes('Estudo de caso')
          ? ['Modelo parametrizado do estudo de caso', 'Detalhamento e documentação (pranchas)', 'Exportação/interoperabilidade (IFC)', 'Relatório ou entrega final no AVA'].map(text => ({ id: U.uid(), text, done: false }))
          : [],
      };
      state.disciplines.push(d);
      names.forEach((tn, j) => state.topics.push(newTopic(d.id, tn, j + 1, per)));
    });
    spread(state.disciplines, '2026-07-10', '2027-10-31');
    TCC_STAGES.forEach((s, i) => state.tcc.push({ id: 'tcc' + i, courseId, stage: s, title: s, due: '', status: 'todo', notes: '' }));
    return state;
  }

  function newTopic(disciplineId, name, order, lessons) {
    return {
      id: U.uid(), disciplineId, order, name, status: 'nao', priority: 2, difficulty: 2,
      lessons: lessons || 1, watched: 0, practiceMin: 0, noPractice: false,
      notes: '', links: [], subtopics: [], selfRating: 0,
      studiedAt: '', lastReviewAt: '', reviewStage: 0, nextReviewAt: '',
    };
  }
  return { build, newTopic, spread, defaultSettings, TCC_STAGES };
})();
/* store.js — estado da aplicação; a persistência passa por js/armazenamento.js */
const Store = (() => {
  const KEY = 'posbim.gestor.v1';
  const api = { state: null, rev: 0 };

  api.load = () => {
    let raw = null;
    try { raw = Armazenamento.ler(KEY); } catch (e) { console.error('Armazenamento indisponível ou dados corrompidos.', e); }
    if (raw) {
      try { api.state = normalize(raw); if (Grade.aplicar(api.state)) api.save(); return; } catch (e) { console.error('Dados corrompidos; recriando.', e); }
    }
    api.state = Seed.build(); // somente no primeiro acesso
    Grade.aplicar(api.state);
    api.save();
  };

  /** Garante que todo campo esperado exista (backups antigos, versões futuras). */
  function normalize(s) {
    const base = Seed.build();
    ['courses', 'disciplines', 'topics', 'assessments', 'sessions', 'practices', 'reviewLog', 'manual', 'tcc'].forEach(k => { if (!Array.isArray(s[k])) s[k] = k === 'courses' ? base.courses : []; });
    s.settings = Object.assign(Seed.defaultSettings(), s.settings || {});
    s.plan = Object.assign({ pins: {}, snooze: {}, cap: {}, log: {}, snap: null, missed: null }, s.plan || {});
    if (!s.courses.find(c => c.id === s.settings.activeCourseId)) s.settings.activeCourseId = s.courses[0] ? s.courses[0].id : null;
    s.version = 1; s.seeded = true;
    return s;
  }

  api.save = () => {
    api.rev++;
    try { Armazenamento.gravar(KEY, api.state); }
    catch (e) { console.error(e); if (window.UI) UI.toast('Não foi possível salvar os dados neste navegador.', 'bad'); }
  };

  api.exportJSON = () => JSON.stringify({ app: 'gestor-pos-bim', exportedAt: new Date().toISOString(), data: api.state }, null, 2);

  api.importJSON = text => {
    const obj = JSON.parse(text);
    const data = obj && obj.data ? obj.data : obj;
    if (!data || !Array.isArray(data.courses) || !Array.isArray(data.disciplines)) throw new Error('Arquivo de backup inválido.');
    api.state = normalize(data); api.state.firstRun = false; Grade.aplicar(api.state); api.save();
  };

  api.reset = () => { api.state = Seed.build(); Grade.aplicar(api.state); api.save(); };
  return api;
})();
/* logic.js — regras de negócio: progresso, notas, situação, revisão espaçada, sessões */
const L = (() => {
  const S = () => Store.state;
  const STATUS = [['nao', 'Não iniciado'], ['aula', 'Assistindo aula'], ['pratica', 'Praticando'], ['revisao', 'Revisão pendente'], ['dominado', 'Dominado']];
  const STATUS_LABEL = Object.fromEntries(STATUS);
  const LEVEL = { 1: 'Baixa', 2: 'Média', 3: 'Alta' };
  const DIFF = { 1: 'Fácil', 2: 'Média', 3: 'Difícil' };
  const RATING = { 1: 'Fácil', 2: 'Médio', 3: 'Difícil' };
  const SESSION_TYPES = { aula: 'Aula', pratica: 'Prática', revisao: 'Revisão', avaliacao: 'Avaliação' };
  const ASSESS_TYPES = { prova: 'Prova', atividade: 'Atividade', trabalho: 'Trabalho', forum: 'Fórum', outro: 'Outro' };

  const course = () => S().courses.find(c => c.id === S().settings.activeCourseId) || null;
  const disciplines = cid => S().disciplines.filter(d => d.courseId === cid).sort((a, b) => a.order - b.order);
  const discipline = id => S().disciplines.find(d => d.id === id);
  const topics = did => S().topics.filter(t => t.disciplineId === did).sort((a, b) => a.order - b.order);
  const topic = id => S().topics.find(t => t.id === id);
  const assessments = did => S().assessments.filter(a => a.disciplineId === did).sort((a, b) => (a.due || '9').localeCompare(b.due || '9'));
  const courseTopics = cid => { const ids = new Set(disciplines(cid).map(d => d.id)); return S().topics.filter(t => ids.has(t.disciplineId)); };
  const courseAssessments = cid => { const ids = new Set(disciplines(cid).map(d => d.id)); return S().assessments.filter(a => ids.has(a.disciplineId)); };
  const inCourse = (x, cid) => { const d = discipline(x.disciplineId); return d ? d.courseId === cid : x.courseId === cid; };

  /* ---------- progresso ---------- */
  const watchedOf = t => t.status === 'dominado' ? t.lessons : Math.min(t.watched, t.lessons);
  const practiceTarget = t => { const d = discipline(t.disciplineId); return t.noPractice ? 0 : Math.round(t.lessons * (d ? d.lessonMin : 60) * S().settings.practiceRatio / 100 / 5) * 5; };
  const practiceLeft = t => t.status === 'dominado' ? 0 : Math.max(0, practiceTarget(t) - (t.practiceMin || 0));

  function discStats(d) {
    const ts = topics(d.id);
    const lessons = U.sum(ts, t => t.lessons), watched = U.sum(ts, watchedOf);
    const remLessonMin = (lessons - watched) * d.lessonMin, remPractice = U.sum(ts, practiceLeft);
    return {
      topics: ts.length, lessons, watched, pct: lessons ? watched / lessons : 0,
      pendingTopics: ts.filter(t => watchedOf(t) < t.lessons).length,
      mastered: ts.filter(t => t.status === 'dominado').length,
      remMin: remLessonMin + remPractice, hoursDone: d.hours * (lessons ? watched / lessons : 0),
    };
  }

  /* ---------- notas ---------- */
  function grade(d) {
    const c = S().courses.find(x => x.id === d.courseId), pass = c ? c.passScore : 70;
    const as = assessments(d.id), graded = as.filter(a => a.score !== null && a.score !== '' && a.score !== undefined);
    const pending = as.filter(a => !graded.includes(a));
    const obtained = U.sum(graded, a => a.score), total = U.sum(as, a => a.points), pendingPts = U.sum(pending, a => a.points);
    return { pass, count: as.length, graded, pending, obtained, total, pendingPts, gradedPts: U.sum(graded, a => a.points), missing: Math.max(0, pass - obtained) };
  }

  /** Situação da disciplina: aprovado / risco / cursando / concluida / futura (+ motivos do risco). */
  function situation(d) {
    const g = grade(d), st = discStats(d), today = U.today(), risks = [];
    if (g.count && g.obtained >= g.pass) return { key: 'aprovado', label: 'Aprovado', risks };
    const overdue = g.pending.filter(a => a.due && a.due < today && !a.delivered);
    if (overdue.length) risks.push(`${overdue.length} avaliação(ões) com prazo vencido`);
    if (g.total >= 100 && g.obtained + g.pendingPts < g.pass) risks.push(`máximo alcançável: ${U.fmtNum(g.obtained + g.pendingPts)} pts`);
    else if (g.graded.length && g.pendingPts > 0 && g.missing / g.pendingPts > 0.8 && (g.total >= 100 || g.missing <= g.pendingPts)) risks.push(`precisa de ${U.fmtNum(g.missing)} dos ${U.fmtNum(g.pendingPts)} pts restantes`);
    else if (g.graded.length && g.total >= 100 && !g.pending.length) risks.push('nota final abaixo do mínimo');
    if (d.end && st.pct < 1) {
      const left = U.diff(today, d.end);
      if (left < 0) risks.push(`prazo no AVA vencido ${U.relDays(left)}`);
      else if (left <= 14 && st.pct < 0.6) risks.push(`fecha ${U.relDays(left)} com ${Math.round(st.pct * 100)}% das aulas`);
    }
    if (risks.length) return { key: 'risco', label: 'Em risco', risks };
    const started = st.watched > 0 || g.count > 0 || (d.start && d.start <= today);
    if (st.pct >= 1 && !g.pending.length) return { key: 'concluida', label: 'Aulas concluídas', risks };
    return started ? { key: 'cursando', label: 'Cursando', risks } : { key: 'futura', label: 'Não iniciada', risks };
  }

  function courseStats(c) {
    const ds = disciplines(c.id);
    const totalH = U.sum(ds, d => d.hours) || c.totalHours || 1;
    const doneH = U.sum(ds, d => discStats(d).hoursDone);
    const sits = ds.map(d => situation(d).key);
    return { ds, totalH, doneH, pctHours: doneH / totalH, approved: sits.filter(k => k === 'aprovado').length, risk: sits.filter(k => k === 'risco').length, count: ds.length };
  }

  /* ---------- sessões e metas ---------- */
  const sessions = cid => S().sessions.filter(s => !cid || s.courseId === cid);
  const minutesOn = (date, cid) => U.sum(S().sessions.filter(s => s.date === date && (!cid || s.courseId === cid)), s => s.minutes);
  const minutesBetween = (a, b, cid) => U.sum(S().sessions.filter(s => s.date >= a && s.date <= b && (!cid || s.courseId === cid)), s => s.minutes);
  const dailyGoal = date => S().settings.dailyGoalMin || S().settings.availability[U.dow(date)] || 0;
  const weeklyGoal = () => S().settings.weeklyGoalMin || U.sum(S().settings.availability);

  function logSession(o) {
    const d = o.disciplineId ? discipline(o.disciplineId) : null;
    const s = Object.assign({ id: U.uid(), createdAt: Date.now(), date: U.today(), minutes: 0, type: 'aula', disciplineId: '', topicId: '', note: '', courseId: d ? d.courseId : S().settings.activeCourseId }, o);
    s.minutes = Math.max(0, Math.round(s.minutes));
    if (s.minutes > 0) S().sessions.push(s);
    return s;
  }

  /* ---------- revisão espaçada ---------- */
  function ensureReview(t, from) {
    if (t.nextReviewAt || t.status === 'dominado') return;
    t.reviewStage = 0; t.nextReviewAt = U.addDays(from || U.today(), S().settings.reviewIntervals[0] || 1);
  }
  /** rating: 1 fácil (pula uma etapa), 2 médio (próxima etapa), 3 difícil (volta uma etapa). */
  function doReview(t, rating) {
    const iv = S().settings.reviewIntervals, today = U.today();
    S().reviewLog.push({ id: U.uid(), topicId: t.id, date: today, rating, stage: t.reviewStage });
    const next = rating === 1 ? t.reviewStage + 2 : rating === 2 ? t.reviewStage + 1 : Math.max(0, t.reviewStage - 1);
    t.lastReviewAt = today; t.selfRating = rating;
    if (next >= iv.length) { t.nextReviewAt = ''; t.reviewStage = iv.length; if (watchedOf(t) >= t.lessons && !practiceLeft(t)) t.status = 'dominado'; return null; }
    t.reviewStage = next; t.nextReviewAt = U.addDays(today, iv[next]);
    return t.nextReviewAt;
  }

  /* ---------- transições de estudo ---------- */
  function autoStatus(t) {
    if (t.status === 'dominado') return;
    if (t.watched >= t.lessons) {
      if (!t.studiedAt) t.studiedAt = U.today();
      ensureReview(t);
      t.status = practiceLeft(t) > 0 ? 'pratica' : 'revisao';
    } else t.status = t.watched > 0 ? 'aula' : 'nao';
  }
  function watch(t, n, rating) {
    t.watched = U.clamp(t.watched + n, 0, t.lessons);
    if (t.fromGrade) { // aulas do portal: marca/desmarca a próxima aula da lista
      if (n > 0) t.subtopics.filter(x => !x.done).slice(0, n).forEach(x => { x.done = true; });
      else if (n < 0) t.subtopics.filter(x => x.done).slice(n).forEach(x => { x.done = false; });
      t.watched = t.subtopics.filter(x => x.done).length;
    }
    if (rating) t.selfRating = rating;
    if (t.watched < t.lessons) { t.studiedAt = ''; }
    autoStatus(t);
  }
  /** Assunto vindo da grade do portal: a lista de aulas (subtópicos) manda na contagem. */
  function syncAulas(t) {
    if (!t.fromGrade) return;
    t.lessons = Math.max(1, t.subtopics.length);
    t.watched = t.subtopics.filter(x => x.done).length;
    autoStatus(t);
  }
  function setStatus(t, status) {
    t.status = status;
    if (status === 'dominado') { t.nextReviewAt = ''; }
    else if (status === 'revisao') ensureReview(t);
    else if (status === 'nao') { t.nextReviewAt = ''; t.reviewStage = 0; }
  }
  function addPractice(t, minutes, difficulty) {
    t.practiceMin = (t.practiceMin || 0) + minutes;
    if (difficulty) t.selfRating = difficulty;
    if (t.status !== 'dominado' && t.watched >= t.lessons) autoStatus(t);
    else if (t.status === 'nao') t.status = 'pratica';
  }

  /* ---------- exclusões em cascata ---------- */
  function removeTopic(id) {
    const s = S();
    s.topics = s.topics.filter(t => t.id !== id);
    s.practices = s.practices.filter(p => p.topicId !== id);
    s.reviewLog = s.reviewLog.filter(r => r.topicId !== id);
    s.sessions.forEach(x => { if (x.topicId === id) x.topicId = ''; });
  }
  function removeDiscipline(id) {
    const s = S();
    topics(id).forEach(t => removeTopic(t.id));
    s.assessments = s.assessments.filter(a => a.disciplineId !== id);
    s.sessions.forEach(x => { if (x.disciplineId === id) x.disciplineId = ''; });
    s.disciplines = s.disciplines.filter(d => d.id !== id);
  }
  function removeCourse(id) {
    const s = S();
    disciplines(id).forEach(d => removeDiscipline(d.id));
    s.sessions = s.sessions.filter(x => x.courseId !== id);
    s.tcc = s.tcc.filter(x => x.courseId !== id);
    s.manual = s.manual.filter(x => x.courseId !== id);
    s.courses = s.courses.filter(c => c.id !== id);
    if (s.settings.activeCourseId === id) s.settings.activeCourseId = s.courses[0] ? s.courses[0].id : null;
  }

  return { STATUS, STATUS_LABEL, LEVEL, DIFF, RATING, SESSION_TYPES, ASSESS_TYPES, course, disciplines, discipline, topics, topic, assessments, courseTopics, courseAssessments, inCourse,
    watchedOf, practiceTarget, practiceLeft, discStats, grade, situation, courseStats, sessions, minutesOn, minutesBetween, dailyGoal, weeklyGoal, logSession,
    ensureReview, doReview, autoStatus, watch, syncAulas, setStatus, addPractice, removeTopic, removeDiscipline, removeCourse };
})();
/* grade.js — aplica a grade real do portal (dados/pos-grade.js) sobre os dados salvos */
const Grade = (() => {
  /** Aplica cada disciplina de window.POS_GRADE cuja versão ainda não está no estado. Devolve true se mudou algo. */
  function aplicar(s) {
    const G = window.POS_GRADE || {};
    let mudou = false;
    Object.entries(G).forEach(([did, g]) => {
      const d = s.disciplines.find(x => x.id === did);
      if (!d || d.gradeVersao === g.versao) return;
      const antes = s.topics.filter(t => t.disciplineId === did), usados = new Set();
      g.unidades.forEach((u, i) => {
        let t = antes.find(x => x.name === u.nome);
        if (!t) { t = Seed.newTopic(did, u.nome, i + 1, u.aulas.length); s.topics.push(t); }
        usados.add(t.id);
        // aula já marcada no app continua marcada, mesmo que o portal ainda não mostre
        const ja = new Set(t.fromGrade ? t.subtopics.filter(x => x.done).map(x => x.text) : []);
        t.order = i + 1; t.fromGrade = true;
        t.subtopics = u.aulas.map(a => ({ id: U.uid(), text: a.nome, done: !!a.feita || ja.has(a.nome) }));
        L.syncAulas(t);
      });
      // assuntos estimados pelo seed que não existem no portal saem (sessões registradas ficam, sem o assunto)
      antes.filter(t => !usados.has(t.id)).forEach(t => {
        s.topics = s.topics.filter(x => x !== t);
        s.reviewLog = s.reviewLog.filter(r => r.topicId !== t.id);
        s.sessions.concat(s.practices).forEach(x => { if (x.topicId === t.id) x.topicId = ''; });
        ['L:', 'P:', 'R:'].forEach(k => { delete s.plan.pins[k + t.id]; delete s.plan.snooze[k + t.id]; });
      });
      g.avaliacoes.forEach(a => {
        let x = s.assessments.find(y => y.disciplineId === did && y.title === a.titulo);
        if (!x) { x = { id: U.uid(), disciplineId: did, type: a.tipo, title: a.titulo, due: '', points: a.pontos, score: null, estMin: a.min, delivered: false }; s.assessments.push(x); }
        x.points = a.pontos;
        if (a.entregue) x.delivered = true;
      });
      const aulas = U.sum(g.unidades, u => u.aulas.length);
      d.lessonMin = Math.round(d.hours * 60 / aulas); // as horas da disciplina se dividem pelas aulas reais
      d.gradeVersao = g.versao;
      mudou = true;
    });
    return mudou;
  }
  return { aplicar };
})();
/* planner.js — planejamento inteligente (lógica própria, sem IA externa).
 *
 * Simula dia a dia, de hoje em diante, preenchendo o tempo disponível de cada dia com as
 * tarefas de maior pontuação. Como o plano é recalculado a partir do estado atual, tudo o
 * que não foi feito é redistribuído automaticamente.
 *
 * Pontuação (0–100), sempre acompanhada dos motivos:
 *   avaliação próxima · prazo da disciplina no AVA × carga pendente · distância para a nota
 *   mínima · dificuldade · prioridade manual · autoavaliação · atraso de revisão · ritmo da meta
 */
const Planner = (() => {
  let cache = null, cacheKey = '';

  function build() {
    const key = Store.rev + '|' + U.today() + '|' + Store.state.settings.activeCourseId;
    if (cache && cacheKey === key) return cache;
    cacheKey = key; cache = simulate(); return cache;
  }

  function simulate() {
    const S = Store.state, set = S.settings, c = L.course(), today = U.today();
    const out = { days: {}, forecast: null, complete: false, pace: null, totalRemMin: 0 };
    if (!c) return out;
    const avgCap = Math.max(1, U.sum(set.availability) / 7), iv = set.reviewIntervals, plan = S.plan;

    /* ---- itens de trabalho (cópias mutáveis) ---- */
    const DW = L.disciplines(c.id).map(d => {
      const g = L.grade(d);
      return { d, pass: g.pass, current: g.obtained, gap: g.missing, hasAssess: g.count > 0, rem: 0, topics: [], assess: [] };
    });
    const reviews = [], assess = [];
    DW.forEach(w => {
      L.topics(w.d.id).forEach(t => {
        if (t.status === 'dominado') return;
        const tw = { t, w, remL: t.lessons - L.watchedOf(t), remP: L.practiceLeft(t), rating: t.selfRating };
        w.rem += tw.remL * w.d.lessonMin + tw.remP; w.topics.push(tw);
        if (t.nextReviewAt) reviews.push({ t, w, due: t.nextReviewAt, stage: t.reviewStage, last: t.lastReviewAt || t.studiedAt });
      });
      L.assessments(w.d.id).forEach(a => {
        if ((a.score !== null && a.score !== '' && a.score !== undefined) || a.delivered) return;
        const it = { a, w, rem: a.estMin || 60 }; w.assess.push(it); assess.push(it);
      });
    });
    const manual = S.manual.filter(m => m.courseId === c.id && !m.done).map(m => ({ m }));
    const tcc = c.tccEnabled ? S.tcc.filter(x => x.courseId === c.id && x.status !== 'done' && x.due).map(x => ({ x, rem: 60 })) : [];
    out.totalRemMin = U.sum(DW, w => w.rem) + U.sum(assess, a => a.rem);

    const goal = c.goalDate || c.end;
    const daysToGoal = goal ? Math.max(1, U.diff(today, goal) + 1) : 0;
    const paceRatio = daysToGoal ? out.totalRemMin / (daysToGoal * avgCap) : 0;
    out.pace = { needPerWeek: daysToGoal ? out.totalRemMin / daysToGoal * 7 : 0, capPerWeek: avgCap * 7, ratio: paceRatio };

    const horizon = U.clamp(U.diff(today, c.end || goal || today) + 240, 120, 1100);
    let workDoneDay = null, tail = 0;

    for (let n = 0, day = today; n < horizon; n++, day = U.addDays(day, 1)) {
      const workLeft = DW.some(w => w.rem > 0.5) || assess.some(a => a.rem > 0);
      if (!workLeft) { if (!reviews.length && !manual.length || ++tail > 75) break; }
      let cap = plan.cap[day] !== undefined ? plan.cap[day] : set.availability[U.dow(day)];
      if (n === 0) cap = Math.max(0, cap - L.minutesOn(today, c.id));
      const cands = [];
      const allowed = k => { // respeita "adiar" e "fixar em data"
        if (plan.snooze[k] && day < plan.snooze[k]) return 0;
        if (plan.pins[k]) return plan.pins[k] <= day ? 2 : 0;
        return 1;
      };
      const add = (k, o) => { const al = allowed(k); if (!al) return; o.key = k; if (al === 2) { o.forced = true; o.reasons.unshift({ p: 99, t: 'fixado por você' }); } cands.push(o); };

      /* contexto por disciplina neste dia */
      DW.forEach(w => {
        const d = w.d, R = []; let base = 10;
        const open = !d.start || d.start <= day;
        if (!open && !set.allowAdvance) { w.ctx = null; return; }
        if (!open) { base -= 15 + Math.min(20, U.diff(day, d.start) / 10); R.push({ p: 1, t: 'adiantando disciplina ainda não aberta' }); }
        const na = w.assess.filter(x => x.rem > 0 && x.a.due && x.a.due >= day).sort((x, y) => x.a.due.localeCompare(y.a.due))[0];
        if (na) {
          const dd = U.diff(day, na.a.due), p = 30 * Math.max(0, 1 - dd / 21) * (0.6 + 0.4 * Math.min(1, (na.a.points || 0) / 40));
          if (p > 0.5) { base += p; R.push({ p, t: `${L.ASSESS_TYPES[na.a.type] || 'avaliação'} ${U.relDays(U.diff(today, na.a.due))}` }); }
        }
        if (d.end) {
          const left = U.diff(day, d.end);
          if (left < 0) { base += 30; R.push({ p: 30, t: `prazo da disciplina venceu ${U.relDays(U.diff(today, d.end))}` }); }
          else {
            const r = w.rem / ((left + 1) * avgCap), p = 25 * Math.min(1, r);
            base += p; if (r > 0.45) R.push({ p, t: `disciplina fecha ${U.relDays(U.diff(today, d.end))} · faltam ${U.fmtMin(w.rem)}` });
          }
        }
        if (w.hasAssess && w.gap > 0) { const p = 12 * w.gap / w.pass; base += p; R.push({ p, t: `nota atual ${U.fmtNum(w.current)}/${w.pass}` }); }
        if (d.priority !== 2) { const p = (d.priority - 2) * 4; base += p; if (p > 0) R.push({ p, t: 'disciplina prioritária' }); }
        w.ctx = { base, R };
      });

      /* revisões vencidas */
      reviews.forEach(r => {
        if (r.due > day) return;
        const late = U.diff(r.due, day), R = [{ p: 35, t: late > 0 ? `revisão atrasada ${late} ${late === 1 ? 'dia' : 'dias'}` : 'revisão programada' }];
        let sc = 38 + Math.min(25, late * 3);
        if (r.last) R.push({ p: 2, t: `último estudo ${U.relDays(U.diff(today, r.last))}` });
        if (r.t.selfRating === 3) { sc += 8; R.push({ p: 8, t: 'autoavaliação: difícil' }); }
        if (r.w.ctx) sc += Math.max(0, r.w.ctx.base - 10) * 0.3;
        add('R:' + r.t.id, { kind: 'R', ref: r, min: set.reviewMin, units: 1, score: sc, reasons: R, title: 'Revisar: ' + r.t.name, sub: r.w.d.name, disciplineId: r.w.d.id, topicId: r.t.id });
      });

      /* avaliações */
      assess.forEach(it => {
        if (it.rem <= 0) return;
        const a = it.a, dd = a.due ? U.diff(day, a.due) : 30;
        if (dd > 10 && !plan.pins['A:' + a.id]) return;
        const R = [{ p: 50, t: a.due ? (dd < 0 ? `prazo venceu ${U.relDays(U.diff(today, a.due))}` : `${L.ASSESS_TYPES[a.type] || 'avaliação'} ${U.relDays(U.diff(today, a.due))}`) : 'sem data definida' }];
        let sc = dd < 0 ? 100 : 50 + 40 * Math.max(0, 1 - dd / 7) + 10 * Math.min(1, (a.points || 0) / 40);
        if (a.points) R.push({ p: 10, t: `vale ${U.fmtNum(a.points)} pts` });
        if (it.w.gap > 0) { sc += 12 * it.w.gap / it.w.pass; R.push({ p: 9, t: `nota atual ${U.fmtNum(it.w.current)}/${it.w.pass}` }); }
        add('A:' + a.id, { kind: 'A', ref: it, min: Math.min(it.rem, 90), units: Math.ceil(it.rem / 90), score: sc, forced: dd <= 1, reasons: R, title: `${L.ASSESS_TYPES[a.type] || 'Avaliação'}: ${a.title}`, sub: it.w.d.name, disciplineId: it.w.d.id });
      });

      /* aulas e prática */
      DW.forEach(w => {
        if (!w.ctx) return; let pos = 0;
        w.topics.forEach(tw => {
          if (tw.remL <= 0 && tw.remP <= 0) return;
          const t = tw.t, R = w.ctx.R.slice(); let sc = w.ctx.base - Math.min(12, pos * 1.5); pos++;
          const dif = t.difficulty || w.d.difficulty;
          if (dif === 3) { sc += 6; R.push({ p: 6, t: 'assunto difícil' }); } else if (dif === 1) sc -= 2;
          if (t.priority !== 2) { const p = (t.priority - 2) * 6; sc += p; if (p > 0) R.push({ p, t: 'prioridade alta' }); }
          if (paceRatio > 0.9) { const p = Math.min(8, (paceRatio - 0.9) * 20); sc += p; if (paceRatio > 1) R.push({ p, t: 'ritmo abaixo do necessário para a meta' }); }
          if (tw.remL > 0) {
            if (t.watched > 0) { sc += 5; R.push({ p: 3, t: `em andamento (${t.watched}/${t.lessons} aulas)` }); }
            else { const k = Math.ceil(tw.remL - 0.01); R.push({ p: 0.5, t: `${k} ${k === 1 ? 'aula pendente' : 'aulas pendentes'}` }); }
            add('L:' + t.id, { kind: 'L', ref: tw, min: w.d.lessonMin, units: tw.remL, score: sc, reasons: R, title: t.name, sub: w.d.name, disciplineId: w.d.id, topicId: t.id });
          } else {
            sc += 7; R.push({ p: 5, t: 'fixar na prática o que foi visto em aula' });
            if (tw.rating === 3) { sc += 5; R.push({ p: 5, t: 'autoavaliação: difícil' }); }
            const chunk = Math.min(tw.remP, 60);
            add('P:' + t.id, { kind: 'P', ref: tw, min: chunk, units: Math.ceil(tw.remP / 60), score: sc, reasons: R, title: 'Praticar: ' + t.name, sub: w.d.name, disciplineId: w.d.id, topicId: t.id });
          }
        });
      });

      /* tarefas manuais e TCC */
      manual.forEach(o => {
        if (o.done || (o.m.date || today) > day) return;
        add('M:' + o.m.id, { kind: 'M', ref: o, min: o.m.minutes || 30, units: 1, score: 90, forced: true, reasons: [{ p: 90, t: 'tarefa adicionada por você' }], title: o.m.title, sub: 'Tarefa manual' });
      });
      tcc.forEach(o => {
        if (o.rem <= 0) return; const dd = U.diff(day, o.x.due); if (dd > 14) return;
        add('T:' + o.x.id, { kind: 'T', ref: o, min: 60, units: 1, score: dd < 0 ? 85 : 35 + 40 * Math.max(0, 1 - dd / 14), reasons: [{ p: 40, t: dd < 0 ? 'prazo do TCC vencido' : `etapa do TCC vence ${U.relDays(U.diff(today, o.x.due))}` }], title: 'TCC: ' + o.x.title, sub: 'Trabalho de conclusão' });
      });

      /* preenchimento do dia */
      cands.sort((a, b) => (b.forced ? 1e3 : 0) + b.score - (a.forced ? 1e3 : 0) - a.score);
      const items = []; let left = cap, used = 0, nRev = 0;
      const maxRev = Math.max(1, Math.floor(cap * 0.25 / Math.max(5, set.reviewMin)));
      for (const cd of cands) {
        if (cap <= 0 && !cd.forced) continue;
        let count = 0, mins = 0; const r = cd.ref;
        if ('LPA'.includes(cd.kind)) {
          /* tarefas divisíveis: ocupam o tempo que restar no dia (mínimo de 20 min) */
          const rem = cd.kind === 'L' ? r.remL * cd.min : cd.kind === 'P' ? r.remP : r.rem;
          let take = 0;
          if (left >= Math.min(rem, 20) || (used === 0 && left > 0)) take = Math.min(rem, Math.max(left, 1));
          if (cd.forced && take < rem) take = cd.kind === 'A' ? rem : Math.max(take, Math.min(rem, cd.min));
          if (take <= 0) continue;
          mins = take; left -= take; used += take; r.w.rem -= cd.kind === 'A' ? 0 : take;
          if (cd.kind === 'L') {
            count = take / cd.min; r.remL -= count;
            if (r.remL < 0.01) { r.remL = 0; if (!r.t.nextReviewAt && !reviews.some(x => x.t === r.t)) reviews.push({ t: r.t, w: r.w, due: U.addDays(day, iv[0] || 1), stage: 0, last: day }); }
          } else if (cd.kind === 'P') { r.remP -= take; count = 1; }
          else { r.rem -= take; count = 1; }
        } else {
          if (cd.kind === 'R' && nRev >= maxRev && !cd.forced) continue;
          if (!(cd.min <= left || (used === 0 && cap > 0) || cd.forced)) continue;
          count = 1; mins = cd.min; left -= cd.min; used += cd.min;
          if (cd.kind === 'R') {
            nRev++; reviews.splice(reviews.indexOf(r), 1);
            if (r.stage + 1 < iv.length) reviews.push({ t: r.t, w: r.w, due: U.addDays(day, iv[r.stage + 1]), stage: r.stage + 1, last: day });
          } else if (cd.kind === 'M') { r.done = true; manual.splice(manual.indexOf(r), 1); }
          else if (cd.kind === 'T') r.rem = 0;
        }
        if (!count) continue;
        if ('LPA'.includes(cd.kind)) workDoneDay = day;
        const rs = cd.reasons.slice().sort((a, b) => b.p - a.p);
        items.push({ key: cd.key, kind: cd.kind, title: cd.title, sub: cd.sub, count, minutes: Math.round(mins), score: Math.round(U.clamp(cd.score, 1, 100)), reasons: rs, why: rs.slice(0, 3).map(x => x.t).join(' · '), disciplineId: cd.disciplineId || '', topicId: cd.topicId || '', refId: cd.key.slice(2) });
      }
      if (items.length) out.days[day] = items;
    }
    out.complete = !DW.some(w => w.rem > 0.5) && !assess.some(a => a.rem > 0);
    out.forecast = out.complete ? (workDoneDay || today) : null;
    return out;
  }

  /** Registra o plano de hoje e detecta itens de dias anteriores que não foram feitos. */
  function trackToday() {
    const p = Store.state.plan, today = U.today(), items = build().days[today] || [];
    if (p.snap && p.snap.date === today) return;
    if (p.snap && p.snap.date < today) {
      const done = new Set((p.log[p.snap.date] || []).map(x => x.key));
      const missed = p.snap.items.filter(x => !done.has(x.key));
      p.missed = missed.length ? { from: p.snap.date, items: missed.slice(0, 8), count: missed.length } : null;
    }
    p.snap = { date: today, items: items.map(i => ({ key: i.key, title: i.title })) };
    Object.keys(p.snooze).forEach(k => { if (p.snooze[k] <= today) delete p.snooze[k]; });
    Object.keys(p.cap).forEach(k => { if (k < today) delete p.cap[k]; });
    Store.save();
  }

  const KIND = { L: 'Aula', P: 'Prática', R: 'Revisão', A: 'Avaliação', M: 'Tarefa', T: 'TCC' };
  return { build, trackToday, KIND };
})();
