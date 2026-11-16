/* Dados do projeto «Civil 3D — Via de 400 m»: marcos, sessões, flashcards e ficha.
   Usado por civil3d.html (o app) e por index.html (a agenda do hub). */
window.ULTRA = window.ULTRA || {};
window.ULTRA['civil3d'] = {
  id: 'civil3d',
  chave: 'ultra-civil3d-v1',
  dados: {
  projeto: {
    nome: 'Civil 3D — Via de 400 m',
    ferramenta: 'Autodesk Civil 3D 2026',
    entregavel: 'Trecho de via de cerca de 400 m com superfície do terreno, alinhamento, perfil, corredor e tabela de volumes de corte e aterro por estaca.',
    inicio: '2026-11-16',
    meta: { Direto: 60, Drill: 20, 'Recuperação': 20 }   // % do tempo de prática
  },

  /* Disponibilidade padrão: 0 = segunda … 6 = domingo */
  disponibilidade: {
    0: { ativo: false, hora: '19:30', min: 150 },
    1: { ativo: true,  hora: '19:30', min: 150 },
    2: { ativo: false, hora: '19:30', min: 150 },
    3: { ativo: true,  hora: '19:30', min: 150 },
    4: { ativo: false, hora: '19:30', min: 150 },
    5: { ativo: true,  hora: '19:00', min: 180 },
    6: { ativo: true,  hora: '15:00', min: 120 }
  },

  /* Aulas do guia. "feita: true" = já assistida antes de começar o plano. */
  aulas: [
    { id: 'a0',  nome: 'Aula 0 – Preparação do ambiente', feita: true },
    { id: 'a1',  nome: 'Aula 1 – Pontos e levantamento', feita: true },
    { id: 'a2',  nome: 'Aula 2 – Superfícies (MDT)' },
    { id: 'a3',  nome: 'Aula 3 – Alinhamento horizontal' },
    { id: 'a4',  nome: 'Aula 4 – Perfil longitudinal e greide' },
    { id: 'a5',  nome: 'Aula 5 – Seção tipo (só o conceito; usar subassemblies Basic)' },
    { id: 'a6',  nome: 'Aula 6 – Corredor' },
    { id: 'a7',  nome: 'Aula 7 – Seções e volumes (Brückner opcional)' },
    { id: 'a8',  nome: 'Aula 8 – só o trecho do Volumes Dashboard' }
  ],
  aulasDepois: [
    'Aula 8 – Grading de platô (fora o Volumes Dashboard)',
    'Aula 9 – Drenagem: canal e rede de tubulação',
    'Aula 10 – Pranchas e Data Shortcuts',
    'Aula 11 – BIM e drone (volta quando o MDT do Metashape entrar no Civil 3D)'
  ],

  marcos: [
    {
      id: 'm0', num: 0, nome: 'Configurar o desenho',
      objetivo: 'Criar o VIA400.dwg com o template do Civil 3D e o sistema SIRGAS 2000 / UTM 22S.',
      pronto: 'Arquivo salvo com o sistema de coordenadas definido; barra de status na faixa E 780.200–780.700 / N 9.838.400–9.838.600.',
      aulas: ['a0'],
      tarefas: [
        'Conferir o espaço de trabalho: Civil 3D (não Drafting & Annotation)',
        'Desenho novo com o template _Autodesk Civil 3D (Metric) NCS.dwt',
        'MAPCSASSIGN › buscar 31982 › SIRGAS2000.UTM-22S › Assign',
        'Conferir Drawing Settings › Units and Zone: Meters e Degrees',
        'Salvar como VIA400.dwg'
      ],
      drill: 'Criar 3 desenhos do zero e configurar unidades e coordenadas em menos de 3 min cada.',
      recuperacao: 'Do Civil 3D fechado até o desenho configurado e salvo, sem consultar nada.',
      feedback: 'Desenhar uma linha e conferir a ordem de grandeza das coordenadas na barra de status.',
      feynman: 'Por que definir o sistema de coordenadas antes do primeiro ponto, e o que dá errado se você esquecer?',
      recall: [
        { q: 'Qual comando atribui o SIRGAS 2000 exato ao desenho?', a: 'MAPCSASSIGN, buscando o código 31982 (SIRGAS2000.UTM-22S).' },
        { q: 'O que acontece se o desenho nascer do acad.dwt?', a: 'Os estilos e formatos do Civil 3D não vêm; pontos, superfícies e rótulos ficam sem estilo.' },
        { q: 'Por que zona 22S para Belém?', a: 'Belém fica perto de 48,5° W (faixa de 54° a 48° W = zona 22) e ao sul do Equador.' }
      ],
      flashcards: [
        { q: 'O Ribbon não mostra as abas do Civil 3D (Analyze, Survey). Qual a causa provável?', a: 'Espaço de trabalho em Drafting & Annotation; trocar para Civil 3D na engrenagem.' },
        { q: 'Como definir o SIRGAS 2000 exato (EPSG 31982)?', a: 'MAPCSASSIGN › buscar 31982 › SIRGAS2000.UTM-22S › Assign.' },
        { q: 'Onde ficam unidades e zona do desenho?', a: 'Toolspace › Settings › botão direito no desenho › Edit Drawing Settings › Units and Zone.' },
        { q: 'Qual template usar num projeto métrico?', a: '_Autodesk Civil 3D (Metric) NCS.dwt.' },
        { q: 'O Toolspace sumiu. Como reabrir?', a: 'Comando SHOWTS (ou Home › Palettes › Toolspace).' }
      ]
    },
    {
      id: 'm1', num: 1, nome: 'Importar os pontos',
      objetivo: 'Importar os 722 pontos do levantamento e separar nos grupos TN e CORREGO.',
      pronto: '722 pontos com estilo e rótulo legíveis; TN + CORREGO somam 722.',
      aulas: ['a1'],
      tarefas: [
        'IMPORTPOINTS › formato PNEZD (comma delimited)',
        'Deixar as três Advanced options desmarcadas e conferir o Preview',
        'Zoom Extents (ZE) e conferir a área de 500 × 200 m',
        'Point Group TN (Include › With raw descriptions matching: TN)',
        'Point Group CORREGO (matching: CORREGO)',
        'Description Key Set com TN* e CORREGO* (camadas e símbolos diferentes)',
        'Apply Description Keys nos pontos já importados',
        'Contar os pontos de cada grupo (Select + Ctrl+1)'
      ],
      drill: 'Importar de propósito com o formato errado (PENZD), perceber o erro, apagar e reimportar certo.',
      recuperacao: 'Do desenho vazio até os dois grupos prontos, sem consultar, em até 20 min.',
      feedback: 'Contagem por grupo (botão direito › Select › Ctrl+1) e coordenadas na barra de status.',
      feynman: 'Por que um point group é um filtro e não uma pasta, e o que isso muda quando a superfície usa esse grupo?',
      recall: [
        { q: 'O que significa cada letra de PNEZD?', a: 'Ponto (número), Norte, Este, Z (cota), Descrição.' },
        { q: 'Um ponto pode estar em dois grupos ao mesmo tempo?', a: 'Sim. O grupo é um filtro; o ponto existe uma vez só no desenho.' },
        { q: 'Como aplicar description keys a pontos já importados?', a: 'Prospector › botão direito no grupo › Apply Description Keys.' }
      ],
      flashcards: [
        { q: 'PNEZD × PENZD: o que muda?', a: 'A ordem Norte/Este; o formato errado joga os pontos longe.' },
        { q: 'Import Points mostra "No point file format match found". O que conferir?', a: 'Separador (vírgula), decimal (ponto), cabeçalho, quebra de linha (CRLF) e configuração regional do Windows.' },
        { q: 'Por que desmarcar "Do elevation adjustment"?', a: 'Para as cotas entrarem exatamente como no arquivo.' },
        { q: 'Como contar os pontos de um grupo?', a: 'Botão direito no grupo › Select, depois Ctrl+1 (Properties).' },
        { q: 'Para que serve uma Description Key?', a: 'Dar camada, símbolo e rótulo automáticos a partir da descrição do ponto.' },
        { q: 'O que o asterisco faz em TN*?', a: 'Pega variações: TN, TN1, TN-A.' },
        { q: 'O grupo mostra um ícone de aviso. O que fazer?', a: 'Botão direito em Point Groups › Update.' }
      ]
    },
    {
      id: 'm2', num: 2, nome: 'Superfície do terreno',
      objetivo: 'Superfície TIN "TN" com curvas de 0,5 m e mestras de 2,5 m, limitada por boundary.',
      pronto: 'As curvas fecham em volta do morrote e formam um V no córrego; Statistics mostra cotas de 11,5 a 22 m; sem triângulos longos fora da área.',
      aulas: ['a2'],
      tarefas: [
        'CREATESURFACE › TIN surface › nome TN',
        'Definition › Point Groups › Add › TN e CORREGO',
        'Polyline fechada em volta dos pontos › Boundaries › Outer',
        'Edit Surface Style › Contours: menores 0,5 m e maiores 2,5 m',
        'Surface Properties › Analysis › Elevations (5 faixas) + legenda',
        'Conferir Statistics (722 pontos, cotas mín. e máx.)',
        'Ver em 3D no Object Viewer',
        'Extra: 3D polyline nos pontos CORREGO › Breaklines (Standard); comparar com e sem'
      ],
      drill: 'Num arquivo de teste, criar a superfície do zero 3 vezes com cronômetro (meta: menos de 10 min). Variar o intervalo de curvas; remover e recolocar a boundary.',
      recuperacao: 'Num arquivo vazio, do CSV até a superfície com curvas e boundary, sem consultar.',
      feedback: 'Statistics da superfície; vista 3D; mapa de cores com o morrote alto e o córrego baixo.',
      feynman: 'O que é uma TIN, e por que breakline e boundary mudam o resultado e, depois, os volumes?',
      recall: [
        { q: 'Onde se adicionam pontos a uma superfície?', a: 'Prospector › Surfaces › superfície › Definition › Point Groups › Add.' },
        { q: 'Qual a diferença entre breakline e boundary?', a: 'Breakline força arestas da triangulação; boundary limita a área válida da superfície.' },
        { q: 'Como saber se a superfície usou todos os pontos?', a: 'Surface Properties › Statistics › número de pontos.' }
      ],
      flashcards: [
        { q: 'O que significa TIN?', a: 'Triangulated Irregular Network: pontos ligados em triângulos.' },
        { q: 'Para que serve a boundary Outer?', a: 'Impedir triângulos longos e falsos fora da área levantada.' },
        { q: 'Para que serve uma breakline?', a: 'Forçar arestas onde o terreno muda de inclinação (fundo do córrego, crista).' },
        { q: 'Breakline feita com polyline 2D. O que acontece?', a: 'Entra com cota 0 e "afunda" a superfície.' },
        { q: 'Onde muda o intervalo das curvas de nível?', a: 'Edit Surface Style › aba Contours.' },
        { q: 'Onde vê as cotas mínima e máxima da superfície?', a: 'Surface Properties › Statistics.' },
        { q: 'Curvas próximas indicam o quê?', a: 'Terreno inclinado; curvas afastadas, terreno suave.' }
      ]
    },
    {
      id: 'm3', num: 3, nome: 'Alinhamento',
      objetivo: 'Eixo EIXO_VIA de cerca de 400 m, de oeste para leste, passando pelo morrote e cruzando o córrego.',
      pronto: 'Comprimento de 380 a 420 m; raios ≥ 80 m; sem curvas sobrepostas; estacas de 20 m rotuladas; relatório gerado.',
      aulas: ['a3'],
      tarefas: [
        'CREATEALIGNMENTLAYOUT › nome EIXO_VIA',
        'Curve and Spiral Settings › raio padrão 100 m › Tangent-Tangent (with curves)',
        'Clicar os PIs de oeste para leste (morrote › córrego quase perpendicular)',
        'Ajustar raios e PIs no Alignment Grid View (Panorama)',
        'Rótulos: estacas a cada 20 m e PCs/PTs',
        'Reports Manager › Alignment › Station and Curve Report',
        'Anotar as estacas do topo do morrote e do córrego'
      ],
      drill: 'Lançar 3 eixos de teste digitando as coordenadas dos PIs; depois alterar raio, PI e comprimento só pela Panorama.',
      recuperacao: 'Refazer o eixo com os mesmos critérios, sem consultar, em até 10 min.',
      feedback: 'Relatório de estacas e curvas; comprimento no Prospector; mover um PI e ver os rótulos se atualizarem.',
      feynman: 'Por que o eixo é um objeto "inteligente", e o que acontece com o perfil e o corredor quando você move um PI?',
      recall: [
        { q: 'Qual ferramenta desenha tangentes já com curvas?', a: 'Tangent-Tangent (with curves), nas Alignment Layout Tools.' },
        { q: 'Como converter 245,00 m em estaca?', a: '245 / 20 = 12 estacas + 5,00 m → Est. 12 + 5,00.' },
        { q: 'Onde gerar o relatório do eixo?', a: 'Toolbox › Reports Manager › Alignment › Station and Curve Report.' }
      ],
      flashcards: [
        { q: 'Qual o comando para lançar um eixo?', a: 'CREATEALIGNMENTLAYOUT (Alignment Creation Tools).' },
        { q: 'Quanto vale uma estaca no Brasil?', a: '20 m. Est. 12 + 5,00 = 245,00 m.' },
        { q: 'Onde editar um raio com número exato?', a: 'Alignment Grid View, na Panorama.' },
        { q: 'Raio grande demais para a tangente disponível: o que acontece?', a: 'As curvas se sobrepõem e o Civil 3D marca erro.' },
        { q: 'O que são PI, PC e PT?', a: 'Interseção das tangentes, início da curva e fim da curva.' },
        { q: 'Onde se define o intervalo das estacas rotuladas?', a: 'Edit Alignment Labels › Major Stations.' }
      ]
    },
    {
      id: 'm4', num: 4, nome: 'Perfil',
      objetivo: 'Perfil do terreno, Profile View e greide GREIDE_VIA em torno da cota 15–16 m.',
      pronto: 'O greide corta o morrote e passa sobre o córrego; rampas ≤ 6%; pelo menos uma curva vertical; rampas rotuladas.',
      aulas: ['a4'],
      tarefas: [
        'Create Surface Profile › EIXO_VIA × TN › Draw in profile view',
        'Profile View com exagero vertical 10× e banda de cotas',
        'CREATEPROFILELAYOUT › GREIDE_VIA › Draw tangents with curves',
        'Clicar os PIVs: início, morrote, córrego e fim',
        'Ajustar estacas, cotas e rampas no Profile Grid View (Panorama)',
        'Rótulos de rampa (%) e de PIV',
        'Conferir onde greide − terreno muda de sinal (corte › aterro)'
      ],
      drill: 'Desenhar 3 greides de teste digitando os PIVs na Panorama; trocar o comprimento de uma curva vertical; mudar o exagero vertical.',
      recuperacao: 'A partir do eixo pronto, criar o perfil do terreno, o Profile View e um greide dentro dos critérios, sem consultar.',
      feedback: 'Rampas na Panorama; banda do perfil; mover um PI do eixo e ver o perfil do terreno se atualizar.',
      feynman: 'Qual a diferença entre o perfil do terreno e o greide, e por que um se atualiza sozinho e o outro não?',
      recall: [
        { q: 'Como calcular a rampa entre dois PIVs?', a: 'Diferença de cota ÷ distância horizontal × 100 (%).' },
        { q: 'Onde ajustar o exagero vertical?', a: 'No estilo do Profile View (Profile View Style › Graph › Vertical exaggeration).' },
        { q: 'Onde o greide gera corte?', a: 'Onde fica abaixo da linha do terreno.' }
      ],
      flashcards: [
        { q: 'Qual o comando para desenhar o greide?', a: 'CREATEPROFILELAYOUT (Profile Creation Tools).' },
        { q: 'O que é um PIV?', a: 'Ponto de interseção vertical: onde duas rampas se encontram.' },
        { q: 'Onde editar estaca, cota e rampa dos PIVs?', a: 'Profile Grid View, na Panorama.' },
        { q: 'Por que usar exagero vertical?', a: 'Em terreno suave o relevo só aparece ampliado; 10× é o comum.' },
        { q: 'O perfil do terreno se atualiza se o eixo mudar?', a: 'Sim, é dinâmico. O greide não: ele é desenhado por você.' },
        { q: 'Para que serve a curva vertical?', a: 'Suavizar a mudança de rampa; é uma parábola.' }
      ]
    },
    {
      id: 'm5', num: 5, nome: 'Seção tipo e corredor', drillPrincipal: true,
      objetivo: 'Assembly ST_VIA (pista 3,5 m + acostamento 1,5 m + talude com valeta), corredor COR_VIA e superfícies COR_TOPO e COR_DATUM.',
      pronto: 'O corredor aparece em planta do início ao fim; os taludes encontram o terreno em todas as estacas; COR_TOPO e COR_DATUM têm boundary.',
      aulas: ['a5', 'a6'],
      tarefas: [
        'CREATEASSEMBLY › ST_VIA › Undivided Crowned Road',
        'Tool Palettes (Ctrl+3) › Basic › BasicLane 3,5 m, −2%',
        'BasicShoulder 1,5 m',
        'BasicSideSlopeCutDitch: corte 1:1, aterro 1,5:1',
        'Mirror Subassemblies para o lado esquerdo',
        'Conferir códigos em Assembly Properties › Construction',
        'CREATECORRIDOR › EIXO_VIA, GREIDE_VIA, ST_VIA, alvo TN',
        'Frequency: 10 m nas tangentes e 5 m nas curvas',
        'Corridor Surfaces: COR_TOPO (Top) e COR_DATUM (Datum)',
        'Boundaries › Add Automatically › Daylight',
        'Inspecionar no Section Editor e no Object Viewer'
      ],
      drill: 'Em TESTE_ASSEMBLY.dwg, montar o assembly 3 vezes do zero com cronômetro (meta: menos de 10 min); errar de propósito (peça no lado errado, talude direto na pista) e corrigir; baixar o greide 1 m e ver o talude mudar de aterro para corte.',
      recuperacao: 'A partir de um croqui feito à mão com larguras e taludes, montar o assembly e o corredor sem consultar.',
      feedback: 'Section Editor em 5 estacas (corte no morrote, aterro no córrego); largura total batendo com o croqui; nenhum aviso de target.',
      feynman: 'Como o Civil 3D transforma eixo + greide + assembly num modelo 3D, e para que servem os códigos de ponto, link e shape?',
      recall: [
        { q: 'Qual a ordem das peças do centro para fora?', a: 'BasicLane › BasicShoulder › BasicSideSlopeCutDitch.' },
        { q: 'O talude ficou "pendurado", sem tocar o terreno. Causa provável?', a: 'Target de superfície não definido (ou superfície TN não cobre a área).' },
        { q: 'De que links nasce a superfície Datum?', a: 'Dos links com código Datum (fundo da terraplenagem).' }
      ],
      flashcards: [
        { q: 'Onde ficam os subassemblies?', a: 'Tool Palettes (Ctrl+3) › Civil Metric Subassemblies.' },
        { q: 'O que é o target do talude?', a: 'A superfície que o talude procura até encontrar (aqui, TN).' },
        { q: 'Uma peça foi para o lado errado. Que parâmetro mudar?', a: 'Side (Left/Right).' },
        { q: 'Que frequência usar no corredor?', a: '10 m nas tangentes e 5 m nas curvas (ou menos).' },
        { q: 'Top × Datum: qual a diferença?', a: 'Top é a superfície acabada; Datum é o fundo da terraplenagem, usado nos volumes.' },
        { q: 'O corredor ficou desatualizado. O que fazer?', a: 'Botão direito › Rebuild.' },
        { q: 'Onde ver os códigos do assembly?', a: 'Assembly Properties › Construction.' },
        { q: 'Taludes 1:1 e 1,5:1 estão em que formato?', a: 'Horizontal:vertical.' },
        { q: 'O que é um assembly?', a: 'A seção transversal tipo, montada com subassemblies, que o corredor repete ao longo do eixo.' }
      ]
    },
    {
      id: 'm6', num: 6, nome: 'Seções e volumes',
      objetivo: 'Seções a cada 20 m, tabela de corte e aterro por estaca e conferência por Volume Surface.',
      pronto: 'Tabela com todas as estacas e totais; corte no morrote e aterro no córrego; diferença entre Compute Materials e Volume Surface de até cerca de 5%.',
      aulas: ['a7', 'a8'],
      tarefas: [
        'CREATESAMPLELINES › a cada 20 m, 30 m para cada lado (TN, COR_DATUM, corredor)',
        'Section Views › Create Multiple Views',
        'Compute Materials › Cut and Fill: EG = TN, Datum = COR_DATUM',
        'Total Volume Table no desenho',
        'Generate Volume Report (por estaca)',
        'Volumes Dashboard › Volume Surface TN × COR_DATUM',
        'Comparar os dois totais e anotar a diferença',
        'Conferir duas estacas à mão: V = (A1 + A2) / 2 × 20'
      ],
      drill: 'Calcular à mão o volume entre duas estacas e conferir com a tabela; mudar o greide, recomputar os materiais e ver a tabela mudar.',
      recuperacao: 'Do corredor pronto até a tabela de volumes, sem consultar.',
      feedback: 'Compute Materials × Volume Surface; conta à mão de duas estacas; mostrar a tabela a alguém da topografia ou do planejamento.',
      feynman: 'Por que os dois métodos de volume dão números diferentes, e qual você usaria numa medição de terraplenagem com drone?',
      recall: [
        { q: 'Que superfícies entram no Compute Materials?', a: 'EG = TN (terreno) e Datum = COR_DATUM (fundo da terraplenagem).' },
        { q: 'Por que a largura da sample line importa?', a: 'Se for menor que o alcance do talude, a área da seção sai cortada.' },
        { q: 'Mudei o greide. O que precisa ser refeito?', a: 'Rebuild do corredor e recomputar os materiais.' }
      ],
      flashcards: [
        { q: 'Que método o Compute Materials usa?', a: 'Média das áreas entre seções × distância.' },
        { q: 'Que método a Volume Surface usa?', a: 'Diferença entre duas superfícies TIN, triângulo a triângulo.' },
        { q: 'Calcular volume contra Top ou Datum?', a: 'Datum; contra o Top o pavimento entra como aterro.' },
        { q: 'Mudei o corredor. A tabela de volumes se atualiza sozinha?', a: 'Não; é preciso recomputar os materiais.' },
        { q: 'Onde fica o Volumes Dashboard?', a: 'Analyze › Volumes and Materials.' },
        { q: 'Qual a fórmula da média das áreas?', a: 'V = (A1 + A2) / 2 × d.' },
        { q: 'Qual o comando das sample lines?', a: 'CREATESAMPLELINES.' }
      ]
    },
    {
      id: 'm7', num: 7, nome: 'Consolidação final',
      objetivo: 'Refazer o projeto sem consultar e modelar um segundo traçado para comparar volumes.',
      pronto: 'Projeto refeito a partir do marco 2 em menos tempo que a primeira vez; segundo traçado com tabela de volumes; comparação escrita.',
      aulas: [],
      tarefas: [
        'Apagar tudo depois do marco 2',
        'Refazer eixo e greide sem consultar (com cronômetro)',
        'Refazer assembly, corredor e volumes sem consultar',
        'Comparar tempos e volumes com a primeira versão',
        'Segundo traçado desviando do morrote: eixo e greide',
        'Corredor e volumes do segundo traçado',
        'Comparar os volumes dos dois traçados',
        'Gravar a explicação final (texto ou vídeo curto)'
      ],
      drill: 'Repetir só a etapa que mais demorou na refação.',
      recuperacao: 'O marco inteiro é recuperação: nada de consultar o material.',
      feedback: 'Tempo total da refação × primeira vez; volumes dos dois traçados lado a lado.',
      feynman: 'Explique o fluxo completo, dos pontos aos volumes, para alguém que nunca abriu o Civil 3D. Qual traçado você escolheria e por quê?',
      recall: [
        { q: 'Liste a cadeia de objetos do projeto, em ordem.', a: 'Pontos › Superfície › Alinhamento › Perfil do terreno e greide › Assembly › Corredor › Superfícies do corredor › Sample lines › Seções › Volumes.' },
        { q: 'Quais objetos se atualizam sozinhos quando o eixo muda?', a: 'Perfil do terreno, corredor (após rebuild), sample lines e seções; os materiais precisam ser recomputados.' }
      ],
      flashcards: [
        { q: 'Qual a cadeia de objetos de um projeto de via?', a: 'Pontos › Superfície › Alinhamento › Perfil › Assembly › Corredor › Seções › Volumes.' },
        { q: 'Desviar do morrote tende a mudar os volumes como?', a: 'Menos corte; o saldo depende de quanto aterro o novo eixo exige.' }
      ]
    }
  ],

  /* Cronograma. sem = semana (1…), dia = 0 seg … 6 dom, min = duração planejada.
     tipo: Direto | Drill | Recuperação | Teoria | Folga */
  sessoes: [
    { sem: 1, dia: 1, tipo: 'Teoria',       marco: 'm0', min: 60,  titulo: 'Metaaprendizado: ler o plano e montar o mapa 80/20' },
    { sem: 1, dia: 1, tipo: 'Recuperação',  marco: 'm1', min: 90,  titulo: 'Refazer M0 e M1 com os 722 pontos, sem consultar' },
    { sem: 1, dia: 3, tipo: 'Direto',       marco: 'm2', min: 150, titulo: 'Superfície TN e boundary (Aula 2 só o necessário)' },
    { sem: 1, dia: 5, tipo: 'Direto',       marco: 'm2', min: 180, titulo: 'Estilo de curvas, análise e breakline do córrego' },
    { sem: 1, dia: 6, tipo: 'Drill',        marco: 'm2', min: 120, titulo: 'Superfície do zero 3× + explicação Feynman M2' },

    { sem: 2, dia: 1, tipo: 'Direto',       marco: 'm3', min: 150, titulo: 'Lançar o eixo (Aula 3 só o necessário)' },
    { sem: 2, dia: 3, tipo: 'Direto',       marco: 'm3', min: 150, titulo: 'Panorama, estacas e relatório' },
    { sem: 2, dia: 5, tipo: 'Recuperação',  marco: 'm2', min: 90,  titulo: 'Refazer a superfície sem consultar' },
    { sem: 2, dia: 5, tipo: 'Drill',        marco: 'm3', min: 90,  titulo: '3 eixos de teste pela Panorama' },
    { sem: 2, dia: 6, tipo: 'Recuperação',  marco: 'm3', min: 90,  titulo: 'Feynman M3 + revisar o log de erros' },

    { sem: 3, dia: 1, tipo: 'Direto',       marco: 'm4', min: 150, titulo: 'Perfil do terreno e Profile View (Aula 4)' },
    { sem: 3, dia: 3, tipo: 'Direto',       marco: 'm4', min: 150, titulo: 'Greide com curva vertical' },
    { sem: 3, dia: 5, tipo: 'Drill',        marco: 'm4', min: 90,  titulo: 'Greides de teste pela Panorama' },
    { sem: 3, dia: 5, tipo: 'Recuperação',  marco: 'm3', min: 90,  titulo: 'Refazer o eixo sem consultar' },
    { sem: 3, dia: 6, tipo: 'Recuperação',  marco: 'm4', min: 90,  titulo: 'Feynman M4' },

    { sem: 4, dia: 1, tipo: 'Folga',        marco: 'm4', min: 0,   titulo: 'Folga: pagar atrasos' },
    { sem: 4, dia: 3, tipo: 'Drill',        marco: 'm5', min: 150, titulo: 'Aula 5 (conceito) + assembly, 1ª montagem' },
    { sem: 4, dia: 5, tipo: 'Recuperação',  marco: 'm4', min: 180, titulo: 'Refazer M2 › M4 do zero, com cronômetro' },

    { sem: 5, dia: 1, tipo: 'Drill',        marco: 'm5', min: 150, titulo: 'Assembly, 2ª e 3ª montagem' },
    { sem: 5, dia: 3, tipo: 'Direto',       marco: 'm5', min: 150, titulo: 'Corredor (Aula 6 só o necessário)' },
    { sem: 5, dia: 5, tipo: 'Direto',       marco: 'm5', min: 180, titulo: 'Superfícies do corredor, boundary e Section Editor' },
    { sem: 5, dia: 6, tipo: 'Drill',        marco: 'm5', min: 120, titulo: 'Baixar o greide e ver o talude mudar + Feynman M5' },

    { sem: 6, dia: 1, tipo: 'Recuperação',  marco: 'm5', min: 150, titulo: 'Assembly e corredor a partir do croqui' },
    { sem: 6, dia: 5, tipo: 'Direto',       marco: 'm6', min: 180, titulo: 'Sample lines e section views (Aula 7)' },

    { sem: 7, dia: 1, tipo: 'Direto',       marco: 'm6', min: 150, titulo: 'Compute Materials e tabelas de volume' },
    { sem: 7, dia: 5, tipo: 'Drill',        marco: 'm6', min: 180, titulo: 'Volume Surface × Compute Materials + conta à mão' },
    { sem: 7, dia: 6, tipo: 'Recuperação',  marco: 'm6', min: 90,  titulo: 'Feynman M6' },

    { sem: 8, dia: 1, tipo: 'Folga',        marco: 'm6', min: 0,   titulo: 'Folga: pagar atrasos' },
    { sem: 8, dia: 3, tipo: 'Recuperação',  marco: 'm7', min: 150, titulo: 'Apagar tudo após M2; refazer eixo e greide' },
    { sem: 8, dia: 5, tipo: 'Recuperação',  marco: 'm7', min: 180, titulo: 'Refazer assembly, corredor e volumes' },
    { sem: 8, dia: 6, tipo: 'Recuperação',  marco: 'm7', min: 90,  titulo: 'Comparar tempos e volumes com a 1ª versão' },

    { sem: 9, dia: 1, tipo: 'Direto',       marco: 'm7', min: 150, titulo: '2º traçado: eixo e greide desviando do morrote' },
    { sem: 9, dia: 3, tipo: 'Direto',       marco: 'm7', min: 150, titulo: '2º traçado: corredor e volumes' },
    { sem: 9, dia: 5, tipo: 'Recuperação',  marco: 'm7', min: 180, titulo: 'Comparar os dois traçados + Feynman final' },
    { sem: 9, dia: 6, tipo: 'Teoria',       marco: 'm7', min: 60,  titulo: 'Retrospectiva e preparar o próximo projeto (Revit)' }
  ],

  /* Ficha do projeto: tabelas de consulta rápida */
  ficha: [
    { titulo: 'Terreno (levantamento sintético)', linhas: [
      ['Arquivo', 'levantamento_sintetico_PNEZD.csv'],
      ['Pontos', '722, formato PNEZD, separados por vírgula, sem cabeçalho'],
      ['Sistema', 'SIRGAS 2000 / UTM 22S (EPSG 31982)'],
      ['Este', '≈ 780.200 a 780.700'],
      ['Norte', '≈ 9.838.400 a 9.838.600'],
      ['Área', '500 × 200 m'],
      ['Cotas', '11,5 a 22 m'],
      ['Malha', 'Irregular, cerca de 12,5 m, ruído de ±5 cm'],
      ['Descrições', 'TN (terreno natural) e CORREGO (fundo do córrego)'],
      ['Morrote', 'Cerca de 7 m, a oeste, perto de E 780.340 / N 9.838.520 (corte)'],
      ['Córrego', 'Na diagonal, a leste (aterro)']
    ]},
    { titulo: 'Parâmetros de projeto', linhas: [
      ['Eixo', 'Cerca de 400 m, de oeste para leste'],
      ['Curvas horizontais', '1 ou 2, raio ≥ 80 m'],
      ['Estaqueamento', '20 m'],
      ['Greide', 'Em torno da cota 15 a 16 m'],
      ['Rampas', '≤ 6%'],
      ['Curva vertical', 'Pelo menos uma, de 40 a 60 m'],
      ['Pista', '3,5 m por lado, −2% (BasicLane)'],
      ['Acostamento', '1,5 m (BasicShoulder)'],
      ['Taludes', 'Corte 1:1 e aterro 1,5:1 (H:V), BasicSideSlopeCutDitch'],
      ['Frequência do corredor', '10 m nas tangentes, 5 m nas curvas'],
      ['Sample lines', 'A cada 20 m, 30 m para cada lado'],
      ['Curvas de nível', 'Menores 0,5 m, mestras 2,5 m']
    ]},
    { titulo: 'Nomes dos objetos', linhas: [
      ['Desenho', 'VIA400.dwg'],
      ['Superfície do terreno', 'TN'],
      ['Alinhamento', 'EIXO_VIA'],
      ['Greide', 'GREIDE_VIA'],
      ['Assembly', 'ST_VIA'],
      ['Corredor', 'COR_VIA'],
      ['Superfícies do corredor', 'COR_TOPO e COR_DATUM'],
      ['Arquivo de drill', 'TESTE_ASSEMBLY.dwg']
    ]},
    { titulo: 'Comandos (digite com _ na frente em versões traduzidas)', linhas: [
      ['Sistema de coordenadas', 'MAPCSASSIGN'],
      ['Importar pontos', 'IMPORTPOINTS'],
      ['Superfície', 'CREATESURFACE'],
      ['Alinhamento', 'CREATEALIGNMENTLAYOUT'],
      ['Greide', 'CREATEPROFILELAYOUT'],
      ['Assembly', 'CREATEASSEMBLY'],
      ['Corredor', 'CREATECORRIDOR'],
      ['Sample lines', 'CREATESAMPLELINES'],
      ['Toolspace', 'SHOWTS'],
      ['Tool Palettes', 'Ctrl+3'],
      ['Properties', 'Ctrl+1'],
      ['Zoom Extents', 'ZE']
    ]}
  ]
}
};
