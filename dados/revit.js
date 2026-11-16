/* Dados do projeto «Revit — Reforma Bom Futuro»: marcos, sessões, flashcards e ficha.
   Usado por revit.html (o app) e por index.html (a agenda do hub). */
window.ULTRA = window.ULTRA || {};
window.ULTRA['revit'] = {
  id: 'revit',
  chave: 'ultra-revit-v1',
  dados: {
 "projeto": {
  "nome": "Revit 2027 — Reforma Bom Futuro, 343",
  "ferramenta": "Autodesk Revit 2027 (interface em português)",
  "entregavel": "Modelo do estado atual e da reforma da casa na Passagem Bom Futuro, nº 343 (Telégrafo, Belém/PA), separado por fases, com jogo de pranchas, escada Santos Dumont e estudo de insolação.",
  "inicio": "2026-11-17",
  "meta": {
   "Direto": 60,
   "Drill": 20,
   "Recuperação": 20
  }
 },
 "disponibilidade": {
  "0": {
   "ativo": false,
   "hora": "19:30",
   "min": 0
  },
  "1": {
   "ativo": true,
   "hora": "19:30",
   "min": 120
  },
  "2": {
   "ativo": false,
   "hora": "19:30",
   "min": 0
  },
  "3": {
   "ativo": true,
   "hora": "19:30",
   "min": 120
  },
  "4": {
   "ativo": false,
   "hora": "19:30",
   "min": 0
  },
  "5": {
   "ativo": true,
   "hora": "19:00",
   "min": 60
  },
  "6": {
   "ativo": true,
   "hora": "15:00",
   "min": 30
  }
 },
 "aulas": [
  {
   "id": "l1a",
   "nome": "Lição 1A – Localização, norte verdadeiro e Informações do projeto"
  },
  {
   "id": "l1b",
   "nome": "Lição 1B – Levantamento de campo (medidas, fotos e vídeos)",
   "feita": true
  },
  {
   "id": "l2",
   "nome": "Lição 2 – Fases (existente, demolir, construir)"
  },
  {
   "id": "l3",
   "nome": "Lição 3 – Tipos de parede"
  },
  {
   "id": "l4",
   "nome": "Lição 4 – Níveis, laje e telhado"
  },
  {
   "id": "l5",
   "nome": "Lição 5 – Janelas, portas e fachada"
  },
  {
   "id": "l6",
   "nome": "Lição 6 – Insolação e sombras"
  },
  {
   "id": "l7",
   "nome": "Lição 7 – Folhas e impressão"
  },
  {
   "id": "d1",
   "nome": "Dúvida resolvida – onde ficam as Informações do projeto",
   "feita": true
  },
  {
   "id": "d2",
   "nome": "Dúvida resolvida – mobiliário oculto na planta técnica (VV, modelo de vista)",
   "feita": true
  },
  {
   "id": "d3",
   "nome": "Dúvida resolvida – onde baixar famílias (Autodesk, Biblioteca Nacional BIM, Deca, Docol)",
   "feita": true
  },
  {
   "id": "d4",
   "nome": "Dúvida resolvida – dois caminhos para a altura da escada Santos Dumont",
   "feita": true
  },
  {
   "id": "cq",
   "nome": "Croqui da reforma feito à mão (cômodos que a casa terá)"
  }
 ],
 "aulasDepois": [
  "Materiais e render",
  "Famílias paramétricas complexas",
  "Análise energética (Insight) e etiquetagem INI-R",
  "Dynamo",
  "Worksharing",
  "Instalações em MEP e estrutural detalhado",
  "Extensão GRIFO AI"
 ],
 "marcos": [
  {
   "id": "m1",
   "num": 1,
   "nome": "Arquivo, localização e visibilidade",
   "objetivo": "Um único arquivo oficial, com local, norte verdadeiro e carimbo corretos, e você capaz de explicar por que qualquer elemento some de uma vista.",
   "pronto": "A vista 3D com Caminho do sol mostra o sol nascendo do lado da fachada (leste); a folha 01 - Capa exibe nome e endereço; a pasta do levantamento está organizada; você acha a causa de um elemento oculto em até 2 minutos.",
   "aulas": [
    "l1a",
    "l1b",
    "d1",
    "d2"
   ],
   "tarefas": [
    "Organizar a pasta do levantamento: Croquis, Fotos por ambiente, Vídeos, Medidas",
    "Abrir os dois arquivos (CASA - BOM FUTURO e ARQ BASE) e escolher o oficial; trazer padrões do outro com Gerenciar › Transferir normas de projeto (Transfer Project Standards)",
    "Salvar como BOM-FUTURO-343_ARQ_R00.rvt e arquivar o outro",
    "Conferir unidades (UN): metros com 2 casas",
    "Preencher Gerenciar › Informações do projeto (Project Information)",
    "Gerenciar › Localização (Location): colar -1.421025, -48.486454",
    "Orientação da planta em Norte verdadeiro (True North); Gerenciar › Posição › Rotacionar norte verdadeiro (Rotate True North); voltar para Norte do projeto",
    "Ligar Caminho do sol (Sun Path) e sombras na vista 3D e conferir o lado do nascer do sol",
    "Na planta técnica, descobrir o que oculta o mobiliário: lâmpada (Reveal Hidden Elements), VV, Modelo de vista (View Template), filtros"
   ],
   "drill": "Num arquivo de teste, esconder uma cadeira de 6 jeitos (categoria no VV, ocultar na vista, modelo de vista, filtro, faixa da vista, fase) e achar cada causa em menos de 2 minutos.",
   "recuperacao": "Em arquivo novo e sem consultar, definir a localização por coordenadas e girar o norte verdadeiro em 30 graus.",
   "feedback": "Mandar ao tutor um print da 3D com o caminho do sol e um da capa. Comparar a direção das sombras das 8h com a sombra real da fachada numa foto do levantamento.",
   "feynman": "Por que o Revit tem dois nortes, e por que um móvel pode sumir de uma planta sem ninguém tê-lo ocultado?",
   "recall": [
    {
     "q": "Liste 6 motivos para um elemento não aparecer numa vista.",
     "a": "Categoria desligada no VV; ocultação manual; modelo de vista; filtro de vista; fase ou filtro de fases; faixa da vista (também: recorte, nível de detalhe, disciplina)."
    },
    {
     "q": "Descreva os 4 passos para acertar o norte verdadeiro.",
     "a": "1) Definir a Localização. 2) Mudar a Orientação da planta para Norte verdadeiro. 3) Gerenciar › Posição › Rotacionar norte verdadeiro. 4) Voltar a Orientação para Norte do projeto."
    },
    {
     "q": "Que campos do carimbo vêm das Informações do projeto?",
     "a": "Nome do projeto, endereço, cliente, número e status do projeto (os rótulos do carimbo leem esses parâmetros)."
    }
   ],
   "flashcards": [
    {
     "q": "Onde ficam as Informações do projeto?",
     "a": "Gerenciar › painel Configurações › Informações do projeto (Manage › Project Information)."
    },
    {
     "q": "Qual a diferença entre Norte do projeto e Norte verdadeiro?",
     "a": "O do projeto alinha o desenho à tela; o verdadeiro é o norte real, usado pelo sol."
    },
    {
     "q": "Qual atalho abre Visibilidade/Gráficos?",
     "a": "VV (ou VG)."
    },
    {
     "q": "O que significa \"Desocultar elemento\" cinza no modo de revelar ocultos?",
     "a": "O elemento não foi oculto à mão; a causa é categoria, modelo de vista ou filtro."
    },
    {
     "q": "O que é um Modelo de vista (View Template)?",
     "a": "Um conjunto de regras de exibição que trava propriedades da vista."
    },
    {
     "q": "Como copiar tipos e modelos de vista de outro arquivo?",
     "a": "Gerenciar › Transferir normas de projeto, com os dois arquivos abertos."
    },
    {
     "q": "Para onde olha a fachada da casa?",
     "a": "Leste, aproximadamente; os fundos olham para o oeste."
    }
   ]
  },
  {
   "id": "m2",
   "num": 2,
   "nome": "Existente fiel ao levantamento",
   "objetivo": "O térreo como ele é hoje, com níveis, tipos de parede reais e vãos, tudo na fase Existente.",
   "pronto": "10 medidas de controle (incluindo 2 diagonais) batem com o levantamento com erro de até 2 cm; o contorno com o degrau do terreno está modelado; toda parede tem tipo nomeado e Fase criada = Existente.",
   "aulas": [
    "l1b",
    "l3"
   ],
   "tarefas": [
    "Nas plantas de trabalho, definir a propriedade Fase (Phase) da vista como Existente antes de modelar",
    "Numa elevação, ajustar os níveis (LL): Rua, Térreo 0,00 e Pavimento superior 2,90 (confirmar se 2,90 é o topo da laje)",
    "Criar os tipos de parede: Editar tipo › Duplicar › Estrutura › Editar (Edit Type › Duplicate › Structure › Edit), com a espessura medida",
    "Redesenhar o perímetro com as medidas reais, usando as diagonais para achar os ângulos",
    "Ajustar a Linha de localização (Location Line) das paredes de divisa para a face externa",
    "Prender a base no Térreo e o topo no Pavimento superior (Restrição da base e Restrição superior)",
    "Lançar paredes internas, portas e vãos existentes; o vão da garagem como abertura de parede",
    "Cotar (DI) as 10 medidas de controle e preencher a tabela de conferência"
   ],
   "drill": "Em arquivo de teste, 15 minutos cronometrados: 10 paredes com comprimento digitado, alternando a linha de localização, e depois Aparar (TR), Alinhar (AL) e Deslocamento (OF) até fechar os cantos sem olhar a faixa de opções.",
   "recuperacao": "Em arquivo novo e sem consultar, criar um tipo de parede com 3 camadas e modelar um cômodo de 3 × 4 m com porta, em 15 minutos.",
   "feedback": "Tabela com três colunas (medida de campo, medida do modelo, diferença). Mandar o print da planta cotada ao lado do croqui de campo.",
   "feynman": "O que acontece com as outras paredes quando você muda um parâmetro de tipo, e por que duplicar o tipo antes de editar?",
   "recall": [
    {
     "q": "Qual é a sequência para mudar a espessura de todas as paredes de um tipo?",
     "a": "Selecionar uma parede › Editar tipo › Estrutura › Editar › alterar a espessura da camada › OK. Todas as paredes do tipo mudam."
    },
    {
     "q": "Por que definir a fase da vista antes de modelar o existente?",
     "a": "Porque todo elemento novo herda a fase da vista em que é criado; assim o existente já nasce na fase Existente."
    },
    {
     "q": "Quais são as medidas de controle da casa e seus valores?",
     "a": "As 10 medidas que você escolheu no levantamento (incluindo 2 diagonais). Confira na Ficha do projeto e na sua tabela de conferência."
    }
   ],
   "flashcards": [
    {
     "q": "Como criar um tipo de parede novo?",
     "a": "Selecionar a parede › Editar tipo › Duplicar › Estrutura › Editar."
    },
    {
     "q": "O que é a Linha de localização da parede?",
     "a": "A referência que fica sobre a linha desenhada: eixo, face do núcleo ou face de acabamento."
    },
    {
     "q": "Em que tipo de vista se criam níveis?",
     "a": "Em elevação ou corte (atalho LL)."
    },
    {
     "q": "Parâmetro de tipo × de instância?",
     "a": "Tipo muda todos os elementos daquele tipo; instância muda só o selecionado."
    },
    {
     "q": "Como um elemento novo recebe a fase?",
     "a": "Ele herda a Fase da vista em que foi criado."
    },
    {
     "q": "Por que medir diagonais no levantamento?",
     "a": "Para saber se o cômodo está no esquadro e achar os ângulos reais."
    },
    {
     "q": "O que a Restrição superior faz?",
     "a": "Prende o topo da parede a um nível; se o nível muda, a parede acompanha."
    }
   ]
  },
  {
   "id": "m3",
   "num": 3,
   "nome": "Laje, abertura e cobertura",
   "objetivo": "A laje existente, a alvenaria que já existe acima dela, a abertura da escada e uma proposta de cobertura.",
   "pronto": "O corte mostra térreo, laje e pavimento superior nas alturas medidas; a abertura da escada está na posição certa; o telhado tem inclinação e beiral definidos; a planta do pavimento superior e a de cobertura existem.",
   "aulas": [
    "l4"
   ],
   "tarefas": [
    "Criar o tipo de piso \"EXI - Laje concreto\" com a espessura medida: Arquitetura › Piso (Floor), Editar tipo › Duplicar",
    "Desenhar a laje pelo contorno das paredes, na fase Existente, no nível Pavimento superior",
    "Modelar a alvenaria existente acima da laje (tijolo aparente da fachada)",
    "Criar a planta do Pavimento superior, se ainda não existir: Vista › Vistas de planta › Planta de piso",
    "Abrir o vão da escada: editar o limite da laje ou usar Abertura de shaft (Shaft Opening)",
    "Criar o nível Cobertura e o telhado: Arquitetura › Telhado › Telhado por perímetro (Roof by Footprint), marcando as bordas que definem inclinação (Defines Slope) e o beiral (Overhang)",
    "Unir o topo das paredes ao telhado: Anexar topo/base (Attach Top/Base)",
    "Ajustar a Faixa da vista (View Range) e criar a planta de cobertura",
    "Conferir tudo num corte longitudinal e num transversal"
   ],
   "drill": "Em arquivo de teste, desenhar 5 telhados por perímetro: uma água, duas águas, quatro águas, com beiral de 80 cm e com platibanda. Depois, 3 lajes com abertura.",
   "recuperacao": "Sem consultar, numa caixa de 4 × 6 m: criar nível a 2,90, laje com abertura de 0,80 × 2,00 e telhado de duas águas a 30%.",
   "feedback": "Print do corte ao lado da foto da fachada. As alturas da laje e da alvenaria superior precisam bater com a foto e com as medidas.",
   "feynman": "Como o Revit decide o que aparece numa planta, e por que o telhado não aparece na planta do térreo?",
   "recall": [
    {
     "q": "Quais são os 4 planos da faixa da vista e o que cada um controla?",
     "a": "Topo e Base limitam a faixa principal; o Plano de corte define a altura em que a planta é cortada; a Profundidade da vista define até onde se enxerga abaixo da base."
    },
    {
     "q": "Como criar um telhado de uma água com beiral?",
     "a": "Telhado por perímetro › desenhar o contorno com o valor de beiral › deixar \"Define inclinação\" marcado em uma única borda › definir a inclinação › concluir."
    },
    {
     "q": "Em que fase estão a laje e a alvenaria superior, e por quê?",
     "a": "Existente, porque já estão construídas. O telhado novo vai para a fase Reforma no Marco 4."
    }
   ],
   "flashcards": [
    {
     "q": "Qual ferramenta modela laje?",
     "a": "Arquitetura › Piso (Floor) ou Estrutura › Piso estrutural."
    },
    {
     "q": "O que \"Define inclinação\" faz no telhado por perímetro?",
     "a": "Cada borda marcada gera uma água; borda desmarcada vira empena."
    },
    {
     "q": "O que é a Faixa da vista (View Range)?",
     "a": "As alturas de topo, plano de corte, base e profundidade que definem o que a planta mostra."
    },
    {
     "q": "Duas formas de abrir vão na laje?",
     "a": "Editar limite e desenhar um contorno interno, ou Abertura de shaft."
    },
    {
     "q": "Como fazer a parede subir até o telhado?",
     "a": "Selecionar a parede › Anexar topo/base › clicar no telhado."
    },
    {
     "q": "Qual o desnível entre térreo e pavimento superior?",
     "a": "Cerca de 2,90 m."
    }
   ]
  },
  {
   "id": "m4",
   "num": 4,
   "nome": "Fases",
   "drillPrincipal": true,
   "objetivo": "Três plantas do térreo geradas do mesmo modelo: existente, demolir/construir e reforma. É o marco que transforma o levantamento em projeto de reforma.",
   "pronto": "Nenhuma das três plantas usa ocultação manual; demolido aparece em amarelo e novo em vermelho; a laje pode trocar de \"recuperar\" para \"demolir\" mudando só a Fase demolida.",
   "aulas": [
    "l2",
    "cq"
   ],
   "tarefas": [
    "Abrir Gerenciar › Fases (Phases) e ler as três abas: Fases do projeto, Filtros de fase, Sobreposições de gráficos",
    "Renomear \"Construção nova\" para \"Reforma\" (opcional)",
    "Em Sobreposições de gráficos (Graphic Overrides): demolido em amarelo, novo em vermelho",
    "Duplicar a planta do térreo 3 vezes e configurar Fase e Filtro de fases: Existente (Existente + Mostrar completo), Demolir e construir (Reforma + Mostrar tudo), Reforma (Reforma + Mostrar completo)",
    "Demolir com o martelo, em Modificar › Geometria › Demolir (Demolish): chapa metálica, trechos de parede e o que mais sair",
    "Criar os tipos novos (ex.: \"NOV - Bloco cerâmico rebocado 14 cm\") e lançar as paredes da reforma na vista de fase Reforma",
    "Inserir uma porta nova em parede existente e observar como o Revit trata o vão",
    "Mudar a Fase criada do telhado do Marco 3 para Reforma",
    "Testar os dois cenários da laje alterando a Fase demolida e registrar a decisão pendente"
   ],
   "drill": "Em arquivo de teste: 5 paredes existentes, demolir 2, criar 3 novas e uma porta nova em parede existente, e gerar as três vistas. Repetir até fazer em 10 minutos.",
   "recuperacao": "Sem consultar, escrever o que cada um dos 5 filtros de fase mostra e depois recriar as três vistas num arquivo novo.",
   "feedback": "Mandar as três plantas lado a lado para o tutor conferir se algum elemento está na fase errada. Mostrar a planta demolir/construir a um colega e perguntar se ele entende sem explicação.",
   "feynman": "Como a mesma parede aparece normal numa planta, amarela em outra e some numa terceira, sem ser apagada nem oculta?",
   "recall": [
    {
     "q": "Um elemento novo foi criado na vista errada e ficou como Existente. Como corrigir?",
     "a": "Selecionar o elemento e mudar a propriedade Fase criada para Reforma no painel Propriedades."
    },
    {
     "q": "Que combinação de fase e filtro gera a planta demolir/construir?",
     "a": "Fase da vista = Reforma e Filtro de fases = Mostrar tudo (Show All)."
    },
    {
     "q": "Como testar \"laje recuperada\" contra \"laje demolida\" sem duplicar o arquivo?",
     "a": "Alterar a Fase demolida da laje entre Nenhuma e Reforma e comparar as vistas."
    }
   ],
   "flashcards": [
    {
     "q": "Quais duas propriedades de fase todo elemento tem?",
     "a": "Fase criada e Fase demolida (Phase Created, Phase Demolished)."
    },
    {
     "q": "Quais duas propriedades de fase toda vista tem?",
     "a": "Fase e Filtro de fases (Phase, Phase Filter)."
    },
    {
     "q": "O que \"Mostrar tudo\" exibe?",
     "a": "Existente, demolido e novo, cada um com sua sobreposição gráfica."
    },
    {
     "q": "O que \"Mostrar completo\" exibe?",
     "a": "O estado final daquela fase, sem o demolido e sem distinção gráfica."
    },
    {
     "q": "O que \"Mostrar anterior + demolido\" exibe?",
     "a": "O existente e o que será demolido, sem o novo."
    },
    {
     "q": "Onde fica a ferramenta Demolir?",
     "a": "Aba Modificar, painel Geometria, ícone do martelo."
    },
    {
     "q": "Qual a convenção de cores em reforma?",
     "a": "Amarelo a demolir, vermelho a construir."
    }
   ]
  },
  {
   "id": "m5",
   "num": 5,
   "nome": "Famílias e escada Santos Dumont",
   "objetivo": "A escada Santos Dumont vencendo os 2,90 m, e uma família paramétrica feita por você: um brise ou beiral simples, usado nos Marcos 6 e 7.",
   "pronto": "No corte, a escada sai do piso do térreo e chega ao piso superior, cabe na abertura da laje e o corrimão passa do piso superior; a família do brise muda de tamanho pelos parâmetros sem quebrar.",
   "aulas": [
    "d3",
    "d4"
   ],
   "tarefas": [
    "Selecionar a escada e ler Propriedades e Editar tipo; se houver parâmetro de altura, Duplicar o tipo e ajustar para 2,90",
    "Se não houver: Editar família (Edit Family) e salvar com outro nome antes de mexer",
    "Abrir Tipos de família (Family Types) e uma elevação lateral; identificar planos de referência, longarinas, degraus e corrimão",
    "Criar ou mover o plano de referência do topo, cotar e transformar a cota em parâmetro \"Altura total\"",
    "Alinhar e travar (AL e cadeado) as extrusões aos planos; ajustar o número de degraus",
    "Flexionar com 2,50, 2,90 e 3,10 e ver se a geometria acompanha",
    "Carregar no projeto (Load into Project) e conferir no corte a inclinação, a chegada e a abertura da laje",
    "Criar a família do brise: Arquivo › Novo › Família › Modelo genérico métrico (Metric Generic Model), com planos de referência, extrusão e parâmetros Comprimento, Profundidade e Espessura"
   ],
   "drill": "Criar do zero uma caixa paramétrica (largura, profundidade, altura) três vezes, até fazer em menos de 10 minutos e sem a geometria quebrar ao flexionar.",
   "recuperacao": "Uma semana depois, recriar a família do brise sem consultar e carregá-la num projeto vazio.",
   "feedback": "Print do corte com a escada cotada. Comparar espelho, piso e inclinação com o catálogo de um fabricante de escada Santos Dumont. O tutor revisa a estrutura de planos e parâmetros.",
   "feynman": "Por que, numa família, se move o plano de referência e não a geometria, e o que significa \"flexionar\"?",
   "recall": [
    {
     "q": "Quais são os dois caminhos para ajustar a altura de uma família de componente?",
     "a": "1) Parâmetro de tipo ou instância, se a família tiver (Editar tipo › Duplicar). 2) Editar família e alterar planos de referência e geometria."
    },
    {
     "q": "Qual a diferença entre parâmetro de tipo e de instância dentro da família?",
     "a": "O de tipo vale para todas as cópias daquele tipo; o de instância pode ter um valor diferente em cada cópia colocada no projeto."
    },
    {
     "q": "Que três verificações de engenharia fazer depois de alongar a escada?",
     "a": "Inclinação mantida (não ficou mais íngreme); a escada cabe no ambiente e na abertura da laje; o corrimão passa cerca de 1 m do piso superior."
    }
   ],
   "flashcards": [
    {
     "q": "Como entrar no Editor de famílias a partir do projeto?",
     "a": "Selecionar o componente › Editar família (Edit Family)."
    },
    {
     "q": "O que fazer antes de editar uma família baixada?",
     "a": "Salvar como, com outro nome, para preservar a original."
    },
    {
     "q": "Qual a ordem para tornar uma geometria paramétrica?",
     "a": "Plano de referência, cota, rótulo/parâmetro, alinhar e travar a geometria ao plano."
    },
    {
     "q": "O que é flexionar uma família?",
     "a": "Testar valores diferentes nos parâmetros para ver se a geometria acompanha."
    },
    {
     "q": "Por que não basta esticar a escada na altura?",
     "a": "Ela fica mais íngreme; é preciso manter a inclinação e aumentar a projeção no piso."
    },
    {
     "q": "Qual modelo usar para uma família genérica?",
     "a": "Modelo genérico métrico (Metric Generic Model)."
    },
    {
     "q": "Por que a Santos Dumont não sai da ferramenta Escada?",
     "a": "A escada nativa não faz degraus alternados; por isso vem como componente."
    }
   ]
  },
  {
   "id": "m6",
   "num": 6,
   "nome": "Esquadrias, layout e fachada",
   "objetivo": "Aberturas novas pensadas para ventilação cruzada, ambientes nomeados, planta de layout, planta técnica e fachadas da reforma.",
   "pronto": "Todo cômodo tem ambiente com nome e área; cada cômodo de permanência tem entrada e saída de ar; layout e técnica usam modelos de vista criados por você; as fachadas frontal e dos fundos mostram a reforma.",
   "aulas": [
    "l5",
    "d2",
    "d3"
   ],
   "tarefas": [
    "Carregar portas e janelas: Inserir › Carregar família do Autodesk (Load Autodesk Family); louças dos sites da Deca ou Docol",
    "Lançar as janelas (WN) com Altura do peitoril (Sill Height) correta, priorizando leste e oeste, já que as laterais são de divisa",
    "Posicionar o brise do Marco 5 nas aberturas dos fundos (oeste)",
    "Criar os ambientes: Arquitetura › Ambiente (Room), com separador de ambiente onde não houver parede, e etiquetar",
    "Montar o layout: mobiliário básico, louças e bancadas de banheiro e cozinha",
    "Criar dois modelos de vista: \"BF - Layout\" e \"BF - Técnica\" (Vista › Modelos de vista › Criar a partir da vista atual) e aplicar",
    "Substituir a chapa metálica e a lona por fechamento e portão definitivos na fase Reforma",
    "Revisar as elevações frontal e dos fundos"
   ],
   "drill": "Inserir 10 janelas de tipos e peitoris diferentes e etiquetar todas de uma vez com Identificar todos (Tag All). Depois, criar e aplicar um modelo de vista três vezes.",
   "recuperacao": "Sem consultar, criar um modelo de vista que oculte mobiliário e aplicá-lo a duas plantas; depois, criar ambientes num cômodo aberto usando separador.",
   "feedback": "Mandar o layout para o tutor revisar circulação e ventilação. Um colega da pós ou um arquiteto pode criticar a distribuição dos cômodos.",
   "feynman": "Por que layout e técnica são duas vistas do mesmo modelo, e o que você perderia se fossem dois desenhos separados?",
   "recall": [
    {
     "q": "Por que a ventilação cruzada desta casa depende da frente e dos fundos?",
     "a": "Porque as laterais norte e sul são paredes de divisa, sem janela; o ar só entra e sai pelas fachadas leste e oeste."
    },
    {
     "q": "Como etiquetar todas as portas de uma planta de uma vez?",
     "a": "Anotar › Identificar todos (Tag All Not Tagged) › escolher a categoria Portas."
    },
    {
     "q": "O que um modelo de vista controla e o que ele não controla?",
     "a": "Controla propriedades de exibição (escala, VV, nível de detalhe, filtros, faixa da vista, fase). Não controla o modelo nem as anotações colocadas na vista."
    }
   ],
   "flashcards": [
    {
     "q": "Onde está a biblioteca oficial de famílias?",
     "a": "Inserir › Carregar família do Autodesk."
    },
    {
     "q": "Qual parâmetro define a altura da janela em relação ao piso?",
     "a": "Altura do peitoril (Sill Height), parâmetro de instância."
    },
    {
     "q": "Como criar ambiente onde não há parede dividindo?",
     "a": "Com Separador de ambiente (Room Separator)."
    },
    {
     "q": "Como criar um modelo de vista a partir de uma vista pronta?",
     "a": "Vista › Modelos de vista › Criar modelo a partir da vista atual."
    },
    {
     "q": "Quais fachadas da casa podem ter janela?",
     "a": "Leste (frente) e oeste (fundos); norte e sul são de divisa."
    },
    {
     "q": "Qual fachada precisa de mais sombreamento?",
     "a": "A oeste, que recebe o sol baixo da tarde."
    }
   ]
  },
  {
   "id": "m7",
   "num": 7,
   "nome": "Insolação e sombras",
   "objetivo": "Um estudo solar em três datas que justifique, com imagens, as decisões de beiral, brise e telhado. É o marco que liga o Revit ao nicho de casas eficientes.",
   "pronto": "Existem 9 imagens (21/06, 21/12 e 21/03, às 8h, 12h e 16h); há uma tabela comparando ao menos duas soluções de sombreamento para a fachada oeste; a conclusão cabe em 5 linhas.",
   "aulas": [
    "l6"
   ],
   "tarefas": [
    "Na vista 3D, abrir Configurações do sol (Sun Settings) e criar predefinições no modo Estático (Still) para as 9 combinações de data e hora",
    "Ligar Sombras ativadas (Shadows On) e o Caminho do sol (Sun Path); ajustar em Opções de exibição de gráficos",
    "Rodar um estudo de Um dia (Single Day) e assistir à animação",
    "Variar o beiral (60, 80 e 100 cm) e a profundidade do brise pelos parâmetros e anotar até que horas o sol entra pela janela oeste",
    "Criar um corte pela janela dos fundos e desenhar o ângulo do sol das 16h com linha de detalhe",
    "Exportar as imagens: Arquivo › Exportar › Imagens e animações › Estudo solar",
    "Escrever a conclusão e registrar as decisões na ficha do projeto"
   ],
   "drill": "Configurar um estudo solar do zero, com data e hora sorteadas, cinco vezes, até fazer em menos de 3 minutos.",
   "recuperacao": "Antes de ligar as sombras, desenhar no papel para onde cai a sombra da casa às 16h de 21/12 e de 21/06. Depois conferir no modelo.",
   "feedback": "Fotografar a sombra real da fachada num dia e hora anotados e comparar com o modelo na mesma data e hora. Se não bater, o norte verdadeiro está errado.",
   "feynman": "Por que em Belém o beiral protege bem ao meio-dia e pouco nas fachadas leste e oeste, e o que protege essas fachadas?",
   "recall": [
    {
     "q": "Quais são os passos para gerar uma imagem de sombra às 16h de 21/12?",
     "a": "Vista 3D › Configurações do sol › Estático › data 21/12, hora 16:00 › OK › ligar Sombras ativadas › exportar a imagem."
    },
    {
     "q": "Por que as datas de 21/06, 21/12 e 21/03 foram escolhidas?",
     "a": "São os dois solstícios (sol mais ao norte e mais ao sul) e um equinócio (sol quase a pino): cobrem os extremos do ano."
    },
    {
     "q": "Qual foi a solução escolhida para a fachada oeste, e com que evidência?",
     "a": "A que você registrou na conclusão do estudo: compare na tabela até que horas o sol entra com cada opção de beiral e brise."
    }
   ],
   "flashcards": [
    {
     "q": "Quais são os modos de estudo solar?",
     "a": "Estático, Um dia, Vários dias e Iluminação (Still, Single Day, Multi-Day, Lighting)."
    },
    {
     "q": "De que configuração o estudo solar depende para estar certo?",
     "a": "Localização e norte verdadeiro do projeto."
    },
    {
     "q": "Em Belém, de que lado fica o sol do meio-dia em junho?",
     "a": "Ao norte, a cerca de 65° de altura."
    },
    {
     "q": "E em dezembro?",
     "a": "Ao sul, a cerca de 68° de altura."
    },
    {
     "q": "Qual superfície recebe mais sol na casa?",
     "a": "O telhado, porque o sol passa alto o ano todo."
    },
    {
     "q": "O que sombreia melhor uma janela oeste?",
     "a": "Proteção vertical ou brise, vegetação e janela menor; o beiral sozinho não resolve o sol baixo."
    }
   ]
  },
  {
   "id": "m8",
   "num": 8,
   "nome": "Pranchas e tabelas para a obra",
   "objetivo": "O jogo de pranchas em PDF que um pedreiro consegue executar sem você explicar.",
   "pronto": "As 10 folhas estão em PDF, com escala, cotas, etiquetas e carimbo preenchido; as tabelas batem com o modelo; uma pessoa de obra responde a 3 perguntas olhando só o PDF.",
   "aulas": [
    "l7"
   ],
   "tarefas": [
    "Criar ou renomear as 10 folhas (ver Ficha do projeto): Vista › Folha (Sheet), com o carimbo (Title Block) do arquivo",
    "Preparar cada vista antes de levar à folha: escala, Recortar vista (Crop View), nível de detalhe e modelo de vista",
    "Cotar em cadeia (DI): totais, parciais e vãos; cotas de nível nos cortes",
    "Etiquetar portas, janelas e ambientes: Anotar › Identificar por categoria (Tag by Category)",
    "Criar a legenda amarelo/vermelho: Vista › Legendas",
    "Criar as tabelas: Vista › Tabelas › Tabela/Quantidades (Schedule/Quantities), filtrando pela fase Reforma",
    "Arrastar as vistas para as folhas, alinhar e ajustar os títulos",
    "Exportar: Arquivo › Exportar › PDF, combinando tudo num arquivo",
    "Imprimir uma folha em A3 e ler a 1 metro de distância"
   ],
   "drill": "Montar uma folha do zero (duas vistas, escala, títulos alinhados) cinco vezes, até fazer em menos de 5 minutos.",
   "recuperacao": "Sem consultar, criar uma tabela de portas com largura, altura e quantidade, agrupada por tipo e mostrando só as portas novas.",
   "feedback": "O teste do pedreiro: entregar o PDF a um mestre de obras ou colega e perguntar o que demolir primeiro, qual a largura do vão da garagem e onde fica a escada. Mandar o PDF para o tutor revisar.",
   "feynman": "Por que um erro visto na folha se corrige no modelo ou na vista, e nunca na folha?",
   "recall": [
    {
     "q": "Quais são as 10 folhas do jogo e o que cada uma responde para a obra?",
     "a": "01 Capa e situação; 02 Existente; 03 Demolir e construir; 04 Layout da reforma; 05 Planta técnica cotada; 06 Pavimento superior e cobertura; 07 Cortes e detalhe da escada; 08 Fachadas; 09 Insolação; 10 Tabelas."
    },
    {
     "q": "Quais os três ajustes de uma vista antes de levá-la à folha?",
     "a": "Escala, recorte da vista (Crop View) e nível de detalhe/modelo de vista."
    },
    {
     "q": "Como garantir que a tabela de portas não conte as portas demolidas?",
     "a": "Definir a Fase da tabela como Reforma com filtro Mostrar completo (ou Mostrar novo, para listar só as novas)."
    }
   ],
   "flashcards": [
    {
     "q": "Como colocar uma vista numa folha?",
     "a": "Arrastar a vista do Navegador de projeto para a folha aberta."
    },
    {
     "q": "Uma vista pode estar em duas folhas?",
     "a": "Não; é preciso duplicar a vista. Legendas e tabelas podem repetir."
    },
    {
     "q": "De onde o carimbo tira nome e endereço?",
     "a": "Das Informações do projeto."
    },
    {
     "q": "Onde se define a escala do desenho?",
     "a": "Na vista, não na folha."
    },
    {
     "q": "Como etiquetar um elemento?",
     "a": "Anotar › Identificar por categoria (Tag by Category)."
    },
    {
     "q": "Como fazer a tabela listar só o que é novo?",
     "a": "Definir a fase e o filtro de fases da tabela, ou filtrar por Fase criada."
    },
    {
     "q": "Como exportar todas as folhas num PDF?",
     "a": "Arquivo › Exportar › PDF, selecionando as folhas e marcando a opção de combinar."
    }
   ]
  },
  {
   "id": "m9",
   "num": 9,
   "nome": "Consolidação",
   "objetivo": "Provar que o aprendizado ficou: o existente refeito do zero sem consultar, em menos da metade do tempo, e uma variação da reforma comparada com a original.",
   "pronto": "O existente refeito leva no máximo 6 horas (metade das 12 h do Marco 2) e passa nas mesmas 10 medidas de controle; a variação tem planta, corte e estudo solar; existe um arquivo de modelo (.rte) seu para as próximas casas.",
   "aulas": [],
   "tarefas": [
    "Abrir um arquivo em branco, ligar o cronômetro e refazer: localização, norte, níveis, tipos de parede, térreo, laje e fases",
    "Anotar cada ponto em que travou; cada um vira drill e flashcard",
    "Conferir as 10 medidas de controle e comparar o tempo com o do Marco 2",
    "Fazer a variação: laje demolida com telhado único e pé-direito alto, ou laje recuperada com pavimento superior habitável",
    "Rodar o mesmo estudo solar na variação e comparar as duas soluções numa tabela: área, sombreamento, complexidade de obra",
    "Salvar um modelo de projeto (.rte) com seus tipos de parede, fases, cores, modelos de vista, folhas e carimbo",
    "Escrever em uma página \"meu fluxo de reforma no Revit\""
   ],
   "drill": "Os 5 procedimentos que mais apareceram no log \"O que errei\", repetidos em arquivo de teste até saírem sem pausa.",
   "recuperacao": "O marco inteiro é recuperação: nada de tutorial nem de consulta ao plano. Acrescente uma rodada de todas as perguntas de recall dos Marcos 1 a 8.",
   "feedback": "Comparar o modelo refeito com o original medida a medida. Mandar ao tutor os dois tempos, a lista de travamentos e a tabela das duas soluções.",
   "feynman": "Explique a um engenheiro que só usa AutoCAD, em 10 minutos e sem abrir o Revit, como se faz um projeto de reforma no Revit do levantamento à prancha.",
   "recall": [
    {
     "q": "Quais são as 10 medidas de controle da casa?",
     "a": "As mesmas do Marco 2, que você deve saber de cor a esta altura. Confira na sua tabela de conferência."
    },
    {
     "q": "Em que a variação ficou melhor e pior que a solução original?",
     "a": "Compare pela sua tabela: área útil, sombreamento da fachada oeste e complexidade de obra."
    },
    {
     "q": "O que você faria diferente no primeiro dia de um próximo projeto?",
     "a": "Resposta pessoal. Referência: começar pelo seu .rte, definir localização, norte, níveis e a fase da vista antes da primeira parede."
    }
   ],
   "flashcards": [
    {
     "q": "Qual a ordem do seu fluxo de reforma?",
     "a": "Levantamento, arquivo e localização, níveis, existente, fases, reforma, sol, pranchas."
    },
    {
     "q": "O que é um arquivo .rte?",
     "a": "Um modelo de projeto (template) com tipos, vistas, folhas e padrões já prontos."
    },
    {
     "q": "O que configurar antes de modelar a primeira parede?",
     "a": "Unidades, localização, norte, níveis e a fase da vista."
    },
    {
     "q": "Como comparar duas soluções no mesmo arquivo?",
     "a": "Com Opções de desenho (Design Options), ou salvando uma cópia do arquivo."
    },
    {
     "q": "Qual foi o seu erro mais frequente no projeto?",
     "a": "Edite este card com o item mais repetido do seu log \"O que errei\"."
    }
   ]
  }
 ],
 "sessoes": [
  {
   "sem": 1,
   "dia": 1,
   "tipo": "Teoria",
   "marco": "m1",
   "min": 30,
   "titulo": "Metaaprendizado: reler o mapa de conceitos e o 80/20 do plano"
  },
  {
   "sem": 1,
   "dia": 1,
   "tipo": "Direto",
   "marco": "m1",
   "min": 90,
   "titulo": "Escolher o arquivo oficial, transferir padrões e preencher Informações do projeto"
  },
  {
   "sem": 1,
   "dia": 3,
   "tipo": "Drill",
   "marco": "m1",
   "min": 45,
   "titulo": "Esconder um elemento de 6 jeitos e achar a causa em 2 min"
  },
  {
   "sem": 1,
   "dia": 3,
   "tipo": "Direto",
   "marco": "m1",
   "min": 75,
   "titulo": "Localização por coordenadas, norte verdadeiro e caminho do sol"
  },
  {
   "sem": 1,
   "dia": 5,
   "tipo": "Direto",
   "marco": "m1",
   "min": 60,
   "titulo": "Diagnóstico de visibilidade na planta técnica (VV, modelo de vista, filtros)"
  },
  {
   "sem": 1,
   "dia": 6,
   "tipo": "Recuperação",
   "marco": "m1",
   "min": 30,
   "titulo": "Localização e norte verdadeiro em arquivo novo, sem consultar"
  },
  {
   "sem": 2,
   "dia": 1,
   "tipo": "Direto",
   "marco": "m1",
   "min": 120,
   "titulo": "Continuar o checklist do M1 e mandar prints ao tutor"
  },
  {
   "sem": 2,
   "dia": 3,
   "tipo": "Drill",
   "marco": "m2",
   "min": 45,
   "titulo": "Paredes cronometradas: comprimento digitado, Aparar, Alinhar e Deslocamento"
  },
  {
   "sem": 2,
   "dia": 3,
   "tipo": "Direto",
   "marco": "m2",
   "min": 75,
   "titulo": "Fase da vista, níveis e tipos de parede reais"
  },
  {
   "sem": 2,
   "dia": 5,
   "tipo": "Drill",
   "marco": "m2",
   "min": 60,
   "titulo": "Paredes cronometradas: comprimento digitado, Aparar, Alinhar e Deslocamento"
  },
  {
   "sem": 2,
   "dia": 6,
   "tipo": "Recuperação",
   "marco": "m1",
   "min": 30,
   "titulo": "Fechar o M1: critério de pronto, desafio de recuperação e explicação Feynman"
  },
  {
   "sem": 3,
   "dia": 1,
   "tipo": "Direto",
   "marco": "m2",
   "min": 120,
   "titulo": "Redesenhar o perímetro com as medidas e diagonais do levantamento"
  },
  {
   "sem": 3,
   "dia": 3,
   "tipo": "Drill",
   "marco": "m2",
   "min": 45,
   "titulo": "Paredes cronometradas: comprimento digitado, Aparar, Alinhar e Deslocamento"
  },
  {
   "sem": 3,
   "dia": 3,
   "tipo": "Direto",
   "marco": "m2",
   "min": 75,
   "titulo": "Paredes internas, restrições de base e topo"
  },
  {
   "sem": 3,
   "dia": 5,
   "tipo": "Recuperação",
   "marco": "m2",
   "min": 60,
   "titulo": "Tipo de parede com 3 camadas e cômodo 3 × 4 m com porta, sem consultar"
  },
  {
   "sem": 3,
   "dia": 6,
   "tipo": "Recuperação",
   "marco": "m2",
   "min": 30,
   "titulo": "Tipo de parede com 3 camadas e cômodo 3 × 4 m com porta, sem consultar"
  },
  {
   "sem": 4,
   "dia": 1,
   "tipo": "Folga",
   "marco": "m2",
   "min": 0,
   "titulo": "Folga: descansar ou pagar atrasos"
  },
  {
   "sem": 4,
   "dia": 3,
   "tipo": "Drill",
   "marco": "m2",
   "min": 45,
   "titulo": "Paredes cronometradas: comprimento digitado, Aparar, Alinhar e Deslocamento"
  },
  {
   "sem": 4,
   "dia": 3,
   "tipo": "Direto",
   "marco": "m2",
   "min": 75,
   "titulo": "Portas, vãos existentes e abertura da garagem"
  },
  {
   "sem": 4,
   "dia": 5,
   "tipo": "Direto",
   "marco": "m2",
   "min": 60,
   "titulo": "Cotar as 10 medidas de controle e preencher a tabela de conferência"
  },
  {
   "sem": 4,
   "dia": 6,
   "tipo": "Recuperação",
   "marco": "m2",
   "min": 30,
   "titulo": "Tipo de parede com 3 camadas e cômodo 3 × 4 m com porta, sem consultar"
  },
  {
   "sem": 5,
   "dia": 1,
   "tipo": "Direto",
   "marco": "m3",
   "min": 120,
   "titulo": "Tipo de laje e laje existente no pavimento superior"
  },
  {
   "sem": 5,
   "dia": 3,
   "tipo": "Drill",
   "marco": "m3",
   "min": 45,
   "titulo": "Telhados por perímetro (1, 2 e 4 águas) e lajes com abertura"
  },
  {
   "sem": 5,
   "dia": 3,
   "tipo": "Direto",
   "marco": "m3",
   "min": 75,
   "titulo": "Alvenaria acima da laje, planta do pavimento superior e abertura da escada"
  },
  {
   "sem": 5,
   "dia": 5,
   "tipo": "Drill",
   "marco": "m3",
   "min": 60,
   "titulo": "Telhados por perímetro (1, 2 e 4 águas) e lajes com abertura"
  },
  {
   "sem": 5,
   "dia": 6,
   "tipo": "Recuperação",
   "marco": "m2",
   "min": 30,
   "titulo": "Fechar o M2: critério de pronto, desafio de recuperação e explicação Feynman"
  },
  {
   "sem": 6,
   "dia": 1,
   "tipo": "Direto",
   "marco": "m3",
   "min": 120,
   "titulo": "Nível Cobertura, telhado por perímetro e beiral"
  },
  {
   "sem": 6,
   "dia": 3,
   "tipo": "Drill",
   "marco": "m3",
   "min": 45,
   "titulo": "Telhados por perímetro (1, 2 e 4 águas) e lajes com abertura"
  },
  {
   "sem": 6,
   "dia": 3,
   "tipo": "Direto",
   "marco": "m3",
   "min": 75,
   "titulo": "Faixa da vista, planta de cobertura e conferência nos cortes"
  },
  {
   "sem": 6,
   "dia": 5,
   "tipo": "Recuperação",
   "marco": "m3",
   "min": 60,
   "titulo": "Fechar o M3: critério de pronto, desafio de recuperação e explicação Feynman"
  },
  {
   "sem": 6,
   "dia": 6,
   "tipo": "Recuperação",
   "marco": "m4",
   "min": 30,
   "titulo": "Escrever os 5 filtros de fase e recriar as três vistas, sem consultar"
  },
  {
   "sem": 7,
   "dia": 1,
   "tipo": "Direto",
   "marco": "m4",
   "min": 120,
   "titulo": "Ler a janela de Fases, definir cores e criar as três plantas"
  },
  {
   "sem": 7,
   "dia": 3,
   "tipo": "Drill",
   "marco": "m4",
   "min": 45,
   "titulo": "Arquivo de teste: demolir, construir e gerar as três vistas em 10 min"
  },
  {
   "sem": 7,
   "dia": 3,
   "tipo": "Direto",
   "marco": "m4",
   "min": 75,
   "titulo": "Demolir com o martelo e lançar as paredes da reforma"
  },
  {
   "sem": 7,
   "dia": 5,
   "tipo": "Direto",
   "marco": "m4",
   "min": 60,
   "titulo": "Porta nova em parede existente, telhado na fase Reforma e cenários da laje"
  },
  {
   "sem": 7,
   "dia": 6,
   "tipo": "Recuperação",
   "marco": "m4",
   "min": 30,
   "titulo": "Escrever os 5 filtros de fase e recriar as três vistas, sem consultar"
  },
  {
   "sem": 8,
   "dia": 1,
   "tipo": "Folga",
   "marco": "m4",
   "min": 0,
   "titulo": "Folga: descansar ou pagar atrasos"
  },
  {
   "sem": 8,
   "dia": 3,
   "tipo": "Drill",
   "marco": "m4",
   "min": 45,
   "titulo": "Arquivo de teste: demolir, construir e gerar as três vistas em 10 min"
  },
  {
   "sem": 8,
   "dia": 3,
   "tipo": "Direto",
   "marco": "m4",
   "min": 75,
   "titulo": "Continuar o checklist do M4 e mandar prints ao tutor"
  },
  {
   "sem": 8,
   "dia": 5,
   "tipo": "Drill",
   "marco": "m4",
   "min": 60,
   "titulo": "Arquivo de teste: demolir, construir e gerar as três vistas em 10 min"
  },
  {
   "sem": 8,
   "dia": 6,
   "tipo": "Recuperação",
   "marco": "m4",
   "min": 30,
   "titulo": "Fechar o M4: critério de pronto, desafio de recuperação e explicação Feynman"
  },
  {
   "sem": 9,
   "dia": 1,
   "tipo": "Direto",
   "marco": "m5",
   "min": 120,
   "titulo": "Ler a família da escada: tipo, parâmetros, planos de referência"
  },
  {
   "sem": 9,
   "dia": 3,
   "tipo": "Drill",
   "marco": "m5",
   "min": 45,
   "titulo": "Caixa paramétrica do zero em menos de 10 min"
  },
  {
   "sem": 9,
   "dia": 3,
   "tipo": "Direto",
   "marco": "m5",
   "min": 75,
   "titulo": "Parâmetro Altura total, alinhar e travar, flexionar e carregar no projeto"
  },
  {
   "sem": 9,
   "dia": 5,
   "tipo": "Recuperação",
   "marco": "m5",
   "min": 60,
   "titulo": "Recriar a família do brise sem consultar"
  },
  {
   "sem": 9,
   "dia": 6,
   "tipo": "Recuperação",
   "marco": "m5",
   "min": 30,
   "titulo": "Recriar a família do brise sem consultar"
  },
  {
   "sem": 10,
   "dia": 1,
   "tipo": "Direto",
   "marco": "m5",
   "min": 120,
   "titulo": "Criar a família do brise em Modelo genérico métrico"
  },
  {
   "sem": 10,
   "dia": 3,
   "tipo": "Drill",
   "marco": "m5",
   "min": 45,
   "titulo": "Caixa paramétrica do zero em menos de 10 min"
  },
  {
   "sem": 10,
   "dia": 3,
   "tipo": "Direto",
   "marco": "m6",
   "min": 75,
   "titulo": "Carregar famílias e lançar janelas e portas da reforma"
  },
  {
   "sem": 10,
   "dia": 5,
   "tipo": "Direto",
   "marco": "m6",
   "min": 60,
   "titulo": "Ambientes, etiquetas e layout de banheiro e cozinha"
  },
  {
   "sem": 10,
   "dia": 6,
   "tipo": "Recuperação",
   "marco": "m5",
   "min": 30,
   "titulo": "Fechar o M5: critério de pronto, desafio de recuperação e explicação Feynman"
  },
  {
   "sem": 11,
   "dia": 1,
   "tipo": "Direto",
   "marco": "m6",
   "min": 120,
   "titulo": "Modelos de vista BF - Layout e BF - Técnica; fachadas"
  },
  {
   "sem": 11,
   "dia": 3,
   "tipo": "Drill",
   "marco": "m6",
   "min": 45,
   "titulo": "10 janelas com peitoris diferentes, Identificar todos e modelo de vista 3×"
  },
  {
   "sem": 11,
   "dia": 3,
   "tipo": "Direto",
   "marco": "m6",
   "min": 75,
   "titulo": "Continuar o checklist do M6 e mandar prints ao tutor"
  },
  {
   "sem": 11,
   "dia": 5,
   "tipo": "Drill",
   "marco": "m6",
   "min": 60,
   "titulo": "10 janelas com peitoris diferentes, Identificar todos e modelo de vista 3×"
  },
  {
   "sem": 11,
   "dia": 6,
   "tipo": "Recuperação",
   "marco": "m6",
   "min": 30,
   "titulo": "Modelo de vista que oculta mobiliário e ambientes com separador, sem consultar"
  },
  {
   "sem": 12,
   "dia": 1,
   "tipo": "Folga",
   "marco": "m6",
   "min": 0,
   "titulo": "Folga: descansar ou pagar atrasos"
  },
  {
   "sem": 12,
   "dia": 3,
   "tipo": "Drill",
   "marco": "m6",
   "min": 45,
   "titulo": "10 janelas com peitoris diferentes, Identificar todos e modelo de vista 3×"
  },
  {
   "sem": 12,
   "dia": 3,
   "tipo": "Direto",
   "marco": "m7",
   "min": 75,
   "titulo": "Configurações do sol: 9 predefinições, sombras e animação de um dia"
  },
  {
   "sem": 12,
   "dia": 5,
   "tipo": "Recuperação",
   "marco": "m6",
   "min": 60,
   "titulo": "Fechar o M6: critério de pronto, desafio de recuperação e explicação Feynman"
  },
  {
   "sem": 12,
   "dia": 6,
   "tipo": "Recuperação",
   "marco": "m7",
   "min": 30,
   "titulo": "Prever no papel a sombra das 16h em 21/12 e 21/06 e conferir"
  },
  {
   "sem": 13,
   "dia": 1,
   "tipo": "Direto",
   "marco": "m7",
   "min": 120,
   "titulo": "Variar beiral e brise, corte com o ângulo do sol, exportar e concluir"
  },
  {
   "sem": 13,
   "dia": 3,
   "tipo": "Drill",
   "marco": "m7",
   "min": 45,
   "titulo": "Estudo solar do zero com data sorteada em menos de 3 min"
  },
  {
   "sem": 13,
   "dia": 3,
   "tipo": "Direto",
   "marco": "m7",
   "min": 75,
   "titulo": "Continuar o checklist do M7 e mandar prints ao tutor"
  },
  {
   "sem": 13,
   "dia": 5,
   "tipo": "Direto",
   "marco": "m8",
   "min": 60,
   "titulo": "Criar as 10 folhas e preparar as vistas (escala, recorte, modelo de vista)"
  },
  {
   "sem": 13,
   "dia": 6,
   "tipo": "Recuperação",
   "marco": "m7",
   "min": 30,
   "titulo": "Fechar o M7: critério de pronto, desafio de recuperação e explicação Feynman"
  },
  {
   "sem": 14,
   "dia": 1,
   "tipo": "Direto",
   "marco": "m8",
   "min": 120,
   "titulo": "Cotas em cadeia, etiquetas e legenda amarelo/vermelho"
  },
  {
   "sem": 14,
   "dia": 3,
   "tipo": "Drill",
   "marco": "m8",
   "min": 45,
   "titulo": "Montar uma folha do zero em menos de 5 min"
  },
  {
   "sem": 14,
   "dia": 3,
   "tipo": "Direto",
   "marco": "m8",
   "min": 75,
   "titulo": "Tabelas de portas, janelas e ambientes; montar as folhas"
  },
  {
   "sem": 14,
   "dia": 5,
   "tipo": "Drill",
   "marco": "m8",
   "min": 60,
   "titulo": "Montar uma folha do zero em menos de 5 min"
  },
  {
   "sem": 14,
   "dia": 6,
   "tipo": "Recuperação",
   "marco": "m8",
   "min": 30,
   "titulo": "Tabela de portas novas agrupada por tipo, sem consultar"
  },
  {
   "sem": 15,
   "dia": 1,
   "tipo": "Direto",
   "marco": "m8",
   "min": 120,
   "titulo": "Exportar o PDF, imprimir em A3 e fazer o teste do pedreiro"
  },
  {
   "sem": 15,
   "dia": 3,
   "tipo": "Drill",
   "marco": "m8",
   "min": 45,
   "titulo": "Montar uma folha do zero em menos de 5 min"
  },
  {
   "sem": 15,
   "dia": 3,
   "tipo": "Recuperação",
   "marco": "m9",
   "min": 75,
   "titulo": "Refazer do zero: localização, norte, níveis e tipos de parede"
  },
  {
   "sem": 15,
   "dia": 5,
   "tipo": "Recuperação",
   "marco": "m8",
   "min": 60,
   "titulo": "Fechar o M8: critério de pronto, desafio de recuperação e explicação Feynman"
  },
  {
   "sem": 15,
   "dia": 6,
   "tipo": "Recuperação",
   "marco": "m9",
   "min": 30,
   "titulo": "Rodada de recall dos Marcos 1 a 8"
  },
  {
   "sem": 16,
   "dia": 1,
   "tipo": "Folga",
   "marco": "m9",
   "min": 0,
   "titulo": "Folga: descansar ou pagar atrasos"
  },
  {
   "sem": 16,
   "dia": 3,
   "tipo": "Drill",
   "marco": "m9",
   "min": 45,
   "titulo": "Os 5 procedimentos mais repetidos no log de erros"
  },
  {
   "sem": 16,
   "dia": 3,
   "tipo": "Recuperação",
   "marco": "m9",
   "min": 75,
   "titulo": "Refazer do zero: térreo, laje e fases; conferir as medidas de controle"
  },
  {
   "sem": 16,
   "dia": 5,
   "tipo": "Direto",
   "marco": "m9",
   "min": 60,
   "titulo": "Variação da reforma: modelagem"
  },
  {
   "sem": 16,
   "dia": 6,
   "tipo": "Recuperação",
   "marco": "m9",
   "min": 30,
   "titulo": "Rodada de recall dos Marcos 1 a 8"
  },
  {
   "sem": 17,
   "dia": 1,
   "tipo": "Direto",
   "marco": "m9",
   "min": 120,
   "titulo": "Variação: estudo solar e tabela comparativa"
  },
  {
   "sem": 17,
   "dia": 3,
   "tipo": "Drill",
   "marco": "m9",
   "min": 45,
   "titulo": "Os 5 procedimentos mais repetidos no log de erros"
  },
  {
   "sem": 17,
   "dia": 3,
   "tipo": "Direto",
   "marco": "m9",
   "min": 75,
   "titulo": "Salvar o modelo .rte e escrever \"meu fluxo de reforma no Revit\""
  },
  {
   "sem": 17,
   "dia": 5,
   "tipo": "Drill",
   "marco": "m9",
   "min": 60,
   "titulo": "Os 5 procedimentos mais repetidos no log de erros"
  },
  {
   "sem": 18,
   "dia": 1,
   "tipo": "Recuperação",
   "marco": "m9",
   "min": 60,
   "titulo": "Fechar o M9: explicação Feynman final e retrospectiva do projeto"
  }
 ],
 "ficha": [
  {
   "titulo": "Imóvel",
   "linhas": [
    [
     "Endereço",
     "Passagem Bom Futuro, nº 343, Telégrafo, Belém/PA"
    ],
    [
     "Coordenadas",
     "-1.421025, -48.486454"
    ],
    [
     "Rua",
     "Corre aproximadamente no sentido norte-sul; o imóvel fica do lado oeste"
    ],
    [
     "Fachada frontal",
     "Voltada para o leste (sol da manhã)"
    ],
    [
     "Fundos",
     "Voltados para o oeste (sol da tarde, o mais quente)"
    ],
    [
     "Laterais",
     "Norte e sul coladas nos vizinhos, sem janela"
    ],
    [
     "Histórico",
     "Construção iniciada nos anos 2000, nunca concluída nem habitada; usada como depósito"
    ],
    [
     "Térreo",
     "Alvenaria de tijolo cerâmico aparente, sem fissuras ou patologias relevantes"
    ],
    [
     "Laje superior",
     "Concreto armado deteriorado, com armadura exposta"
    ],
    [
     "Instalações",
     "Sem eletrodutos e sem hidrossanitário: tudo novo"
    ],
    [
     "Fachada hoje",
     "Chapa metálica e entrada de garagem fechada com lona"
    ],
    [
     "Desnível térreo › superior",
     "Cerca de 2,90 m"
    ]
   ]
  },
  {
   "titulo": "Decisões pendentes",
   "linhas": [
    [
     "Laje",
     "Recuperar ou demolir (depende de inspeção: perda de seção das barras, carbonatação)"
    ],
    [
     "Número oficial",
     "Você usa 343; o Google mostra 327. Conferir no IPTU ou na escritura"
    ],
    [
     "Arquivo oficial",
     "CASA - BOM FUTURO ou ARQ BASE (decidir no Marco 1)"
    ],
    [
     "Programa da reforma",
     "Croqui à mão dos cômodos, antes do Marco 4"
    ],
    [
     "Sombreamento oeste",
     "Beiral, brise ou os dois (decidir no Marco 7)"
    ]
   ]
  },
  {
   "titulo": "Padrões do modelo",
   "linhas": [
    [
     "Arquivo",
     "BOM-FUTURO-343_ARQ_R00.rvt (R01, R02… a cada sessão)"
    ],
    [
     "Unidades",
     "Metros, 2 casas decimais"
    ],
    [
     "Níveis",
     "Rua · Térreo 0,00 · Pavimento superior 2,90 · Cobertura"
    ],
    [
     "Fases",
     "Existente · Reforma"
    ],
    [
     "Cores de fase",
     "Demolir em amarelo · construir em vermelho"
    ],
    [
     "Tipos existentes",
     "Prefixo EXI (ex.: EXI - Tijolo aparente 9 cm, EXI - Laje concreto)"
    ],
    [
     "Tipos novos",
     "Prefixo NOV (ex.: NOV - Bloco cerâmico rebocado 14 cm)"
    ],
    [
     "Modelos de vista",
     "BF - Layout · BF - Técnica"
    ],
    [
     "Tolerância",
     "±2 cm em 10 medidas de controle (2 diagonais)"
    ],
    [
     "Datas do estudo solar",
     "21/06, 21/12 e 21/03, às 8h, 12h e 16h"
    ]
   ]
  },
  {
   "titulo": "Jogo de pranchas",
   "linhas": [
    [
     "01",
     "Capa, situação e descrição do imóvel"
    ],
    [
     "02",
     "Planta do existente · 1:50"
    ],
    [
     "03",
     "Planta demolir e construir, com legenda · 1:50"
    ],
    [
     "04",
     "Planta da reforma: layout · 1:50"
    ],
    [
     "05",
     "Planta técnica cotada · 1:50"
    ],
    [
     "06",
     "Pavimento superior e cobertura · 1:50"
    ],
    [
     "07",
     "Cortes, com detalhe da escada · 1:50 e 1:25"
    ],
    [
     "08",
     "Fachadas · 1:50"
    ],
    [
     "09",
     "Estudo de insolação"
    ],
    [
     "10",
     "Tabelas de portas, janelas e ambientes"
    ]
   ]
  },
  {
   "titulo": "Comandos: português › inglês",
   "linhas": [
    [
     "Informações do projeto",
     "Manage › Project Information"
    ],
    [
     "Localização",
     "Manage › Location"
    ],
    [
     "Rotacionar norte verdadeiro",
     "Manage › Position › Rotate True North"
    ],
    [
     "Transferir normas de projeto",
     "Manage › Transfer Project Standards"
    ],
    [
     "Fases",
     "Manage › Phases"
    ],
    [
     "Demolir",
     "Modify › Demolish"
    ],
    [
     "Modelo de vista",
     "View Template"
    ],
    [
     "Faixa da vista",
     "View Range"
    ],
    [
     "Editar tipo › Duplicar",
     "Edit Type › Duplicate"
    ],
    [
     "Editar família",
     "Edit Family"
    ],
    [
     "Carregar família do Autodesk",
     "Insert › Load Autodesk Family"
    ],
    [
     "Telhado por perímetro",
     "Roof by Footprint"
    ],
    [
     "Abertura de shaft",
     "Shaft Opening"
    ],
    [
     "Configurações do sol",
     "Sun Settings"
    ],
    [
     "Identificar por categoria",
     "Tag by Category"
    ],
    [
     "Tabela/Quantidades",
     "Schedule/Quantities"
    ]
   ]
  },
  {
   "titulo": "Atalhos (confira em KS)",
   "linhas": [
    [
     "Parede",
     "WA"
    ],
    [
     "Porta",
     "DR"
    ],
    [
     "Janela",
     "WN"
    ],
    [
     "Cota",
     "DI"
    ],
    [
     "Alinhar",
     "AL"
    ],
    [
     "Aparar/estender",
     "TR"
    ],
    [
     "Mover",
     "MV"
    ],
    [
     "Copiar",
     "CO"
    ],
    [
     "Deslocamento",
     "OF"
    ],
    [
     "Plano de referência",
     "RP"
    ],
    [
     "Nível",
     "LL"
    ],
    [
     "Visibilidade/Gráficos",
     "VV"
    ],
    [
     "Criar similar",
     "CS"
    ],
    [
     "Linhas finas",
     "TL"
    ],
    [
     "Zoom total",
     "ZF"
    ],
    [
     "Unidades",
     "UN"
    ]
   ]
  }
 ]
}
};
