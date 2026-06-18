export interface Curiosidade {
  id: string
  titulo: string
  descricao: string
  categoria: 'planeta' | 'estrela' | 'lua' | 'buraco-negro' | 'galaxia'
  icone: string
}

export const curiosidades: Curiosidade[] = [
  {
    id: '1',
    titulo: 'Vénus tem dia maior que o ano',
    descricao: 'Vénus demora 243 dias terrestres a dar uma volta completa sobre si mesmo, mas apenas 225 dias a orbitar o Sol. O seu dia é literalmente mais longo que o seu ano.',
    categoria: 'planeta',
    icone: 'bi bi-arrow-repeat',
  },
  {
    id: '2',
    titulo: 'Chove diamantes em Netuno',
    descricao: 'A pressão extrema no interior de Netuno e Urano comprime o carbono em cristais de diamante que caem como chuva em direcção ao núcleo do planeta.',
    categoria: 'planeta',
    icone: 'bi bi-gem',
  },
  {
    id: '3',
    titulo: 'Júpiter cabe 1300 Terras',
    descricao: 'Júpiter é tão gigantesco que caberia 1300 planetas do tamanho da Terra dentro dele. O seu diâmetro é 11 vezes maior que o da Terra.',
    categoria: 'planeta',
    icone: 'bi bi-circle-fill',
  },
  {
    id: '4',
    titulo: 'Buracos negros distorcem o tempo',
    descricao: 'Perto de um buraco negro, a gravidade é tão intensa que o tempo passa mais devagar. Este fenómeno chama-se dilatação temporal e foi previsto por Einstein.',
    categoria: 'buraco-negro',
    icone: 'bi bi-black-circle',
  },
  {
    id: '5',
    titulo: 'A Via Láctea tem 200 mil milhões de estrelas',
    descricao: 'A nossa galáxia, a Via Láctea, contém entre 200 e 400 mil milhões de estrelas. O Sol é apenas uma delas, situada a cerca de 26.000 anos-luz do centro.',
    categoria: 'galaxia',
    icone: 'bi bi-stars',
  },
  {
    id: '6',
    titulo: 'Titã tem chuva de metano',
    descricao: 'Titã, a maior lua de Saturno, tem lagos e rios de metano líquido. Chove metano na sua superfície, tal como chove água na Terra.',
    categoria: 'lua',
    icone: 'bi bi-moon-stars',
  },
  {
    id: '7',
    titulo: 'O Sol tem 4.6 mil milhões de anos',
    descricao: 'O Sol formou-se há aproximadamente 4.6 mil milhões de anos a partir de uma nuvem de gás e poeira. Estima-se que ainda tenha mais 5 mil milhões de anos de vida.',
    categoria: 'estrela',
    icone: 'bi bi-sun',
  },
  {
    id: '8',
    titulo: 'Marte tem o maior vulcão do Sistema Solar',
    descricao: 'O Olympus Mons em Marte tem 22 km de altura e 600 km de diâmetro. É tão largo que, estando no topo, não conseguirias ver as bordas por causa da curvatura do planeta.',
    categoria: 'planeta',
    icone: 'bi bi-triangle',
  },
  {
    id: '9',
    titulo: 'Estrelas de neutrões giram 700 vezes por segundo',
    descricao: 'As estrelas de neutrões são os objectos mais densos do universo. Algumas giram até 700 vezes por segundo e têm uma massa maior que o Sol num espaço do tamanho de uma cidade.',
    categoria: 'estrela',
    icone: 'bi bi-star',
  },
  {
    id: '10',
    titulo: 'Europa pode ter vida',
    descricao: 'Europa, lua de Júpiter, tem um oceano de água líquida sob a sua superfície gelada. Este oceano tem mais água que todos os oceanos da Terra juntos e pode albergar vida.',
    categoria: 'lua',
    icone: 'bi bi-droplet',
  },
  {
    id: '11',
    titulo: 'Saturno flutuaria na água',
    descricao: 'Saturno é o único planeta do Sistema Solar menos denso que a água. Se existisse um oceano suficientemente grande, Saturno flutuaria nele.',
    categoria: 'planeta',
    icone: 'bi bi-water',
  },
  {
    id: '12',
    titulo: 'Andrómeda vai colidir com a Via Láctea',
    descricao: 'A galáxia de Andrómeda está a aproximar-se da Via Láctea a 110 km por segundo. Daqui a 4.5 mil milhões de anos as duas galáxias vão fundir-se numa só.',
    categoria: 'galaxia',
    icone: 'bi bi-tornado',
  },
]