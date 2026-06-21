'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Estrela {
  width: string
  height: string
  top: string
  left: string
  opacity: number
  duration: string
}

export default function Dicionario() {
  const [busca, setBusca] = useState('')
  const [estrelas, setEstrelas] = useState<Estrela[]>([])

  // Lista com mais de 130 palavras astronómicas
  const termosEspaciais = [
    'Ablação', 'Acreção', 'Afélio', 'Albedo', 'Alfa Centauri', 'Anã Branca', 'Anã Castanha', 'Anã Vermelha', 'Anel Planetário', 'Ano-Luz', 'Antimatéria', 'Apogeu', 'Asteroide', 'Astrobiologia', 'Astrometria', 'Astronauta', 'Astronomia', 'Astrofísica', 'Atmosfera', 'Aurora Boreal',
    'Bólide', 'Buraco Branco', 'Buraco Negro', 'Buraco de Minhoca', 'Big Bang', 'Big Crunch', 'Bosão',
    'Cinturão de Asteroides', 'Cinturão de Kuiper', 'Cometa', 'Conjunção', 'Constelação', 'Coroa Solar', 'Cosmologia', 'Cosmos', 'Cratera', 'Cromosfera', 'Corpo Celeste', 'Campo Magnético', 'Colapso Gravitacional',
    'Declinação', 'Densidade', 'Desvio para o Vermelho', 'Disco de Acreção', 'Matéria Escura', 'Energia Escura',
    'Eclipse', 'Eclíptica', 'Efeito Doppler', 'Eixo de Rotação', 'Elongação', 'Equinócio', 'Espectroscopia', 'Espaço-Tempo', 'Estação Espacial', 'Estrela', 'Estrela Binária', 'Estrela de Nêutrons', 'Exoplaneta', 'Esfera de Dyson', 'Evento de Horizonte',
    'Fases da Lua', 'Flare Solar', 'Fotoquímica Espacial', 'Fotosfera', 'Força Gravitacional', 'Fusão Nuclear', 'Fóton',
    'Galáxia', 'Galáxia Espiral', 'Galáxia Elíptica', 'Galáxia Irregular', 'Gigante Gasoso', 'Gigante Vermelha', 'Gravidade', 'Gravidade Zero', 'Grupo Local',
    'Halo Galáctico', 'Heliopausa', 'Heliosfera', 'Hidrogênio', 'Hipernova', 'Horizonte de Eventos', 'Hubble',
    'Inclinação Orbital', 'Inflação Cósmica', 'Infravermelho', 'Interestelar', 'Intergaláctico', 'Ionosfera', 'Isótopo',
    'Jato Relativístico', 'Júpiter Quente', 'Janela de Lançamento',
    'Kelvin', 'Kuiper',
    'Lente Gravitacional', 'Libração', 'Limite de Chandrasekhar', 'Limite de Roche', 'Luminosidade', 'Lua',
    'Maciça', 'Magnetar', 'Magnetosfera', 'Matéria Degenerada', 'Meridiano', 'Meteorito', 'Meteoro', 'Meteoróide', 'Microgravidade', 'Multiverso',
    'Nadir', 'Nanotubos', 'Nebulosa', 'Nebulosa Planetária', 'Neutrino', 'Nova', 'Novem de Oort',
    'Observatório', 'Ocultação', 'Órbita', 'Órbita Geossíncrona', 'Órbita Heliocêntrica', 'Onda Gravitacional',
    'Paralaxe', 'Parsec', 'Periélio', 'Perigeu', 'Planeta', 'Planeta Anão', 'Planetesimal', 'Plasma', 'Precessão', 'Pulsar', 'Poeira Cósmica',
    'Quasar', 'Quark', 'Quadrante',
    'Radiação Cósmica de Fundo', 'Radiação Eletromagnética', 'Rotação', 'Raio Cósmico', 'Retrógrado', 'Rover',
    'Satélite', 'Satélite Artificial', 'Singularidade', 'Sistema Binário', 'Sistema Solar', 'Solstício', 'Sonda Espacial', 'Superaglomerado', 'Supergigante', 'Supernova',
    'Telescópio', 'Telescópio Espacial', 'Termosfera', 'Trajetória', 'Trânsito', 'Translação', 'Terraformação', 'Teoria da Relatividade',
    'Universo', 'Universo Observável', 'Ultravioleta',
    'Vácuo', 'Vento Solar', 'Via Láctea', 'Velocidade de Escape',
    'Wolf-Rayet',
    'Raios-X',
    'Zênite', 'Zodíaco', 'Zona Habitável'
  ]

  // Efeito para gerar estrelas no cliente
  useEffect(() => {
    setEstrelas(Array.from({ length: 200 }).map(() => ({
      width: Math.random() * 2 + 1 + 'px',
      height: Math.random() * 2 + 1 + 'px',
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      opacity: Math.random() * 0.7 + 0.1,
      duration: Math.random() * 3 + 2 + 's',
    })))
  }, [])

  // Filtrar e organizar termos por ordem alfabética
  const termosFiltrados = termosEspaciais
    .filter(t => t.toLowerCase().includes(busca.toLowerCase()))
    .sort((a, b) => a.localeCompare(b))

  // Agrupar termos por letra inicial
  const termosAgrupados = termosFiltrados.reduce((acc, termo) => {
    const letra = termo.charAt(0).toUpperCase()
    if (!acc[letra]) acc[letra] = []
    acc[letra].push(termo)
    return acc
  }, {} as Record<string, string[]>)

  return (
    <main style={{
      background: 'linear-gradient(to bottom, #020914, #000000)',
      minHeight: '100vh',
      position: 'relative',
      overflowX: 'hidden',
      color: '#fff',
      paddingBottom: '5rem'
    }}>
      {/* Camada de Estrelas Livres */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {estrelas.map((e, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: e.width,
            height: e.height,
            background: '#fff',
            borderRadius: '50%',
            top: e.top,
            left: e.left,
            opacity: e.opacity,
            animation: `piscar ${e.duration} infinite`,
          }} />
        ))}
      </div>

      {/* Botão de Retorno Canto Superior Esquerdo */}
      <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 20 }}>
        <Link href="/?skipIntro=true" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: '#4fc3f7',
          textDecoration: 'none',
          fontSize: '0.9rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '0.5rem 1rem',
          border: '1px solid rgba(79, 195, 247, 0.3)',
          borderRadius: '4px',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(79, 195, 247, 0.1)'
          e.currentTarget.style.borderColor = '#4fc3f7'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.borderColor = 'rgba(79, 195, 247, 0.3)'
        }}
        >
          <i className="bi bi-arrow-left" /> Nave Principal
        </Link>
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem 2rem' }}>
        
        {/* Cabeçalho do Dicionário */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ color: '#4fc3f7', fontSize: '0.9rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            <i className="bi bi-journal-code" style={{ marginRight: '8px' }} />
            Arquivos da Zentráxia
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '0.05em', marginBottom: '1.5rem', textShadow: '0 0 30px rgba(79,195,247,0.3)' }}>
            DICIONÁRIO ESPACIAL
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.8 }}>
            "A vastidão do cosmos é governada por leis ocultas e conceitos complexos. Decifre o vernáculo das estrelas para navegar pelo desconhecido com a precisão de um comandante interestelar."
          </p>
        </div>

        {/* Barra de Pesquisa */}
        <div style={{ maxWidth: '600px', margin: '0 auto 5rem', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            left: '1.2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#4fc3f7',
            fontSize: '1.2rem'
          }}>
            <i className="bi bi-search" />
          </div>
          <input 
            type="text" 
            placeholder="Pesquisar termo astronómico..." 
            onChange={(e) => setBusca(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '1.2rem 1.2rem 1.2rem 3.5rem', 
              background: 'rgba(2, 6, 23, 0.7)', 
              border: '1px solid rgba(79, 195, 247, 0.3)', 
              borderRadius: '8px', 
              color: '#fff',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.3s',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
            }}
            onFocus={(e) => e.target.style.borderColor = '#4fc3f7'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(79, 195, 247, 0.3)'}
          />
        </div>

        {/* Renderização Agrupada por Letras */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {Object.keys(termosAgrupados).sort().map((letra) => (
            <div key={letra}>
              {/* Letra em Destaque */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                marginBottom: '2rem',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                paddingBottom: '1rem'
              }}>
                <h2 style={{ 
                  color: '#4fc3f7', 
                  fontSize: '2.5rem', 
                  fontWeight: 800, 
                  margin: 0,
                  textShadow: '0 0 20px rgba(79,195,247,0.4)'
                }}>
                  {letra}
                </h2>
              </div>

              {/* Grelha de Palavras */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
                gap: '1.5rem' 
              }}>
                {termosAgrupados[letra].map((termo) => {
                  // O URL para onde vai apontar, substituindo espaços por hifens e tudo minúsculo
                  const linkTermo = termo.toLowerCase().replace(/\s+/g, '-');
                  
                  return (
                    <Link key={termo} href={`/dicionario/${linkTermo}`} style={{
                      background: 'rgba(5, 5, 20, 0.4)', 
                      border: '1px solid rgba(79, 195, 247, 0.15)', 
                      padding: '1.2rem 1.5rem', 
                      borderRadius: '6px', 
                      textDecoration: 'none', 
                      color: '#e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(79, 195, 247, 0.05)'
                      e.currentTarget.style.borderColor = '#4fc3f7'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      const icon = e.currentTarget.querySelector('.icon-arrow') as HTMLElement
                      if (icon) icon.style.transform = 'translateX(5px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(5, 5, 20, 0.4)'
                      e.currentTarget.style.borderColor = 'rgba(79, 195, 247, 0.15)'
                      e.currentTarget.style.transform = 'translateY(0)'
                      const icon = e.currentTarget.querySelector('.icon-arrow') as HTMLElement
                      if (icon) icon.style.transform = 'translateX(0)'
                    }}
                    >
                      <span style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '0.05em' }}>{termo}</span>
                      <i className="bi bi-chevron-right icon-arrow" style={{ 
                        color: '#4fc3f7', 
                        fontSize: '0.9rem',
                        transition: 'transform 0.3s ease'
                      }} />
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
          
          {Object.keys(termosAgrupados).length === 0 && (
            <div style={{ textAlign: 'center', color: '#64748b', padding: '3rem', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '8px' }}>
              <i className="bi bi-radar" style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem', color: '#4fc3f7' }} />
              Nenhum termo encontrado nos nossos registos para "{busca}".
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        @keyframes piscar {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </main>
  )
}