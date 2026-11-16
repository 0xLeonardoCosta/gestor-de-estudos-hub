/* =====================================================================
   GRADE REAL DA PÓS — capturada das telas do Canvas (PUC Minas)
   Substitui, disciplina por disciplina, a estimativa do seed (js/pos-nucleo.js).

   Cada entrada é aplicada UMA vez sobre os dados salvos (inclusive os que já
   estão na nuvem): quando a "versao" muda, o app reaplica. Ao reaplicar,
   uma aula marcada como feita no app continua feita, mesmo que o portal
   ainda não mostre.

   · unidades → viram os assuntos da disciplina; cada aula vira um subtópico
     e a contagem de aulas assistidas acompanha as marcadas.
   · aula feita = "Marcado como concluído" no portal. Os anexos (pptx, pdf,
     zip) ficam de fora: o portal marca todos como "Visualizou".
   · avaliacoes → entram em Avaliações; a nota nunca é sobrescrita.
   ===================================================================== */
window.POS_GRADE = {
  d1: {
    versao: '2026-11-12', // data da exportação do portal
    unidades: [
      { nome: 'Unidade 1 · Parametrização', aulas: [
        { nome: '1. O termo BIM', feita: true },
        { nome: '2. O que é BIM', feita: true },
        { nome: '3. O que não é BIM', feita: true },
        { nome: '4. OpenBIM', feita: true },
        { nome: '5. Parametrização', feita: true },
        { nome: '6. Nível de Informação', feita: true },
        { nome: '7. Dimensões do BIM', feita: true },
        { nome: '8. Decreto Federal 10.306', feita: true },
      ] },
      { nome: 'Unidade 2 · Colaboração', aulas: [
        { nome: '1. Colaboração Integrada' },
        { nome: '2. Mapas de Processos' },
        { nome: '3. Planos (PIB e PEB)', feita: true },
        { nome: '4. ISO 19.650' },
        { nome: '5. IDS e Controle de Qualidade' },
        { nome: '6. CDE' },
      ] },
      { nome: 'Unidade 3 · Interoperabilidade', aulas: [
        { nome: '1. Programação Orientada a Objetos (POO)' },
        { nome: '2. IFC · Princípios Básicos' },
        { nome: '3. IFC · Arquitetura de dados' },
        { nome: '4. IFC · Estrutura de dados' },
        { nome: '5. IFC File · STEP parte 1' },
        { nome: '6. IFC File · STEP parte 2' },
        { nome: '7. Interoperabilidade' },
        { nome: '8. Orientações' },
      ] },
    ],
    avaliacoes: [
      { titulo: 'Atividade Objetiva 1', tipo: 'atividade', pontos: 20, min: 60, entregue: true },
      { titulo: 'Atividade Objetiva 2', tipo: 'atividade', pontos: 20, min: 60 },
      { titulo: 'Atividade Objetiva 3', tipo: 'atividade', pontos: 20, min: 60 },
      { titulo: 'Pesquisa da disciplina (libera a prova)', tipo: 'outro', pontos: 0, min: 10 },
      { titulo: 'Prova Final', tipo: 'prova', pontos: 40, min: 90 },
    ],
  },
};
