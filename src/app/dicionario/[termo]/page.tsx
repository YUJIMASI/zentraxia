'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Estrela {
  width: string
  height: string
  top: string
  left: string
  opacity: number
  duration: string
}

export default function DetalheTermo() {
  const params = useParams()
  const [estrelas, setEstrelas] = useState<Estrela[]>([])
  
  // Capturar o termo de forma segura
  const termoRaw = params?.termo as string || ''

  // Extrair e formatar o termo do URL (ex: "buraco-negro" -> "Buraco Negro")
  const termoFormatado = termoRaw
    ? decodeURIComponent(termoRaw)
        .split('-')
        .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
        .join(' ')
    : 'A processar...'

  // URL para a Wikipédia (substituindo espaços por underscores, padrão da Wiki)
  const linkWikipedia = `https://pt.wikipedia.org/wiki/${termoFormatado.replace(/\s+/g, '_')}`

  // Textos temporários para simular uma base de dados
  const significadoMock = `No contexto da astrofísica e da exploração espacial, ${termoFormatado.toLowerCase()} é um conceito fundamental que descreve fenómenos e propriedades específicas do cosmos. Esta é uma definição provisória enquanto os sistemas da Zentráxia sincronizam com a base de dados principal.`
  
  const exemplosMock = [
    `"A observação detalhada da ${termoFormatado.toLowerCase()} permitiu aos investigadores mapear novos setores da galáxia."`,
    `"Durante a aproximação final, os sensores da nave detetaram níveis anómalos relacionados com a ${termoFormatado.toLowerCase()}."`
  ]

  const sinonimosMock = ['(A aguardar dados)', '(Variante cósmica)']

  // Gerar o fundo estrelado
  useEffect(() => {
    setEstrelas(Array.from({ length: 150 }).map(() => ({
      width: Math.random() * 2 + 1 + 'px',
      height: Math.random() * 2 + 1 + 'px',
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      opacity: Math.random() * 0.7 + 0.1,
      duration: Math.random() * 3 + 2 + 's',
    })))
  }, [])

  return (
    <main style={{
      background: 'linear-gradient(to bottom, #020914, #000000)',
      minHeight: '100vh',
      position: 'relative',
      overflowX: 'hidden',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column'
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

      {/* Navegação Superior */}
      <div style={{ position: 'relative', zIndex: 20, padding: '2rem' }}>
        <Link href="/dicionario" style={{
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
          <i className="bi bi-arrow-left" /> Voltar ao Dicionário
        </Link>
      </div>

      {/* Conteúdo Principal */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        maxWidth: '900px', // Aumentado de 800px para 900px
        margin: '0 auto', 
        padding: '2rem 2rem 6rem',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        
        <div style={{
          background: 'rgba(5, 5, 20, 0.6)',
          borderLeft: '4px solid #4fc3f7',
          padding: '3rem 4rem', // Aumentado o padding interno
          backdropFilter: 'blur(10px)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
        }}>
          {/* Cabeçalho */}
          <p style={{ color: '#4fc3f7', fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            <i className="bi bi-journal-text" style={{ marginRight: '8px' }} />
            Registo de Entrada
          </p>
          
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 800, 
            letterSpacing: '0.05em', 
            marginBottom: '1.5rem', 
            textShadow: '0 0 20px rgba(79,195,247,0.3)',
            color: '#e2e8f0'
          }}>
            {termoFormatado}
          </h1>
          
          <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(79,195,247,0.5) 0%, transparent 100%)', marginBottom: '3rem' }} />

          {/* Significado */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ color: '#e2e8f0', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="bi bi-info-circle" style={{ color: '#4fc3f7' }}/> Significado
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.8 }}>
              {significadoMock}
            </p>
          </div>

          {/* Exemplos */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ color: '#e2e8f0', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="bi bi-chat-quote" style={{ color: '#4fc3f7' }}/> Exemplos de Utilização
            </h3>
            <ul style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.8, paddingLeft: '1.5rem', margin: 0, listStyleType: 'disc' }}>
              <li style={{ marginBottom: '0.8rem', fontStyle: 'italic' }}>{exemplosMock[0]}</li>
              <li style={{ fontStyle: 'italic' }}>{exemplosMock[1]}</li>
            </ul>
          </div>

          {/* Sinónimos */}
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ color: '#e2e8f0', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="bi bi-link-45deg" style={{ color: '#4fc3f7' }}/> Sinónimos Simples
            </h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {sinonimosMock.map((sinonimo, index) => (
                <span key={index} style={{
                  background: 'rgba(79, 195, 247, 0.1)',
                  color: '#4fc3f7',
                  padding: '0.4rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  border: '1px solid rgba(79, 195, 247, 0.2)'
                }}>
                  {sinonimo}
                </span>
              ))}
            </div>
          </div>

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '2rem' }} />

          {/* Rodapé: Categoria e Botão Wiki */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
            {/* Categoria */}
            <div>
              <span style={{ display: 'block', color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                Categoria
              </span>
              <span style={{ color: '#e2e8f0', fontSize: '1.1rem', fontWeight: 500 }}>
                Astrofísica
              </span>
            </div>

            {/* Botão Wikipédia */}
            <a 
              href={linkWikipedia} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#4fc3f7',
                color: '#020914',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                padding: '0.8rem 1.5rem',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 15px rgba(79,195,247,0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fff'
                e.currentTarget.style.boxShadow = '0 0 25px rgba(255,255,255,0.6)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#4fc3f7'
                e.currentTarget.style.boxShadow = '0 0 15px rgba(79,195,247,0.4)'
              }}
            >
              <i className="bi bi-globe" />
              Pesquisar na Wikipédia
            </a>
          </div>
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