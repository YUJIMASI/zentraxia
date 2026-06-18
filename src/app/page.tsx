'use client'

import Link from 'next/link'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation' // 👈 Importado para ler o parâmetro da URL
import SolarSystemScene from '@/components/solar-system/SolarSystemScene'

interface Estrela {
  width: string
  height: string
  top: string
  left: string
  opacity: number
  duration: string
}

// Criamos um subcomponente interno para usar o useSearchParams em segurança com o Suspense do Next.js
function HomeContent() {
  const searchParams = useSearchParams()
  const skipIntro = searchParams.get('skipIntro') === 'true'

  // Se skipIntro for verdadeiro, saltamos a intro e abrimos diretamente os planetas
  const [fase, setFase] = useState<'intro' | 'hero'>(skipIntro ? 'hero' : 'intro')
  const [progresso, setProgresso] = useState(skipIntro ? 100 : 0)
  const [textoVisivel, setTextoVisivel] = useState(skipIntro)
  const [mostrarBarra, setMostrarBarra] = useState(!skipIntro)
  const [warp, setWarp] = useState(false)
  const [estrelas, setEstrelas] = useState<Estrela[]>([])
  const [estrelasHero, setEstrelasHero] = useState<Estrela[]>([])
  const [mostrarPlanetas, setMostrarPlanetas] = useState(skipIntro)

  // Efeito para fazer scroll automático se a intro for ignorada
  useEffect(() => {
    if (skipIntro && mostrarPlanetas) {
      setTimeout(() => {
        const seccao = document.getElementById('sistema-solar')
        if (seccao) seccao.scrollIntoView({ behavior: 'smooth' })
      }, 300) // Pequeno delay para garantir a montagem do DOM do Canvas
    }
  }, [skipIntro, mostrarPlanetas])

  useEffect(() => {
    // Gerar as estrelas apenas no cliente
    setEstrelas(Array.from({ length: 150 }).map(() => ({
      width: Math.random() * 3 + 1 + 'px',
      height: Math.random() * 3 + 1 + 'px',
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      opacity: Math.random() * 0.8 + 0.2,
      duration: Math.random() * 3 + 2 + 's',
    })))

    setEstrelasHero(Array.from({ length: 250 }).map(() => ({
      width: Math.random() * 2 + 1 + 'px',
      height: Math.random() * 2 + 1 + 'px',
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      opacity: Math.random() * 0.7 + 0.1,
      duration: Math.random() * 3 + 2 + 's',
    })))

    // Se já saltámos a intro, não precisamos de agendar as animações iniciais
    if (skipIntro) return

    const t1 = setTimeout(() => setTextoVisivel(true), 1000)
    const t2 = setTimeout(() => setMostrarBarra(true), 2500)
    const t3 = setTimeout(() => setWarp(true), 5000)
    const t4 = setTimeout(() => setFase('hero'), 7500)

    const intervalo = setInterval(() => {
      setProgresso((p) => {
        if (p >= 100) { clearInterval(intervalo); return 100 }
        return p + 2
      })
    }, 50)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      clearInterval(intervalo)
    }
  }, [skipIntro])

  if (fase === 'intro') {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0 }}>
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

        {warp && (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            {Array.from({ length: 80 }).map((_, i) => (
              <div key={i} style={{
                position: 'absolute',
                width: '2px',
                height: '150px',
                background: 'linear-gradient(to bottom, transparent, #4fc3f7, transparent)',
                top: (i * 1.25) + '%',
                left: (i * 1.25) + '%',
                animation: 'warpLine 0.5s linear infinite',
                opacity: 0.7,
              }} />
            ))}
          </div>
        )}

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 2rem' }}>
          <p style={{
            color: '#4fc3f7',
            fontSize: '0.85rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            opacity: textoVisivel ? 1 : 0,
            transition: 'opacity 1s ease',
          }}>
            ZENTRÁXIA
          </p>

          <h1 style={{
            color: '#fff',
            fontSize: 'clamp(1.2rem, 4vw, 2.2rem)',
            fontWeight: 300,
            letterSpacing: '0.1em',
            marginBottom: '1rem',
            opacity: textoVisivel ? 1 : 0,
            transition: 'opacity 1.5s ease',
          }}>
            BEM-VINDO À SUA JORNADA PELO SISTEMA SOLAR
          </h1>

          {mostrarBarra && (
            <p style={{
              color: '#a0a0b0',
              fontSize: '0.8rem',
              letterSpacing: '0.2em',
              marginBottom: '2rem',
            }}>
              {progresso < 100
                ? 'Preparando sequência de exploração...'
                : 'INICIANDO SALTO ESPACIAL...'}
            </p>
          )}

          {mostrarBarra && (
            <div style={{
              width: '300px',
              height: '2px',
              background: 'rgba(79,195,247,0.2)',
              borderRadius: '2px',
              margin: '0 auto',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: progresso + '%',
                background: 'linear-gradient(to right, #4fc3f7, #9c27b0)',
                borderRadius: '2px',
                transition: 'width 0.1s',
                boxShadow: '0 0 10px #4fc3f7',
              }} />
            </div>
          )}
        </div>

        <style>{`
          @keyframes piscar {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
          }
          @keyframes warpLine {
            0% { transform: translateY(-100px); }
            100% { transform: translateY(110vh); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <main style={{
      background: 'linear-gradient(to bottom, #020914, #000000)', // Gradiente espacial fosco unificado
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflowX: 'hidden',
    }}>
      {/* Camada Unificada de Estrelas no Fundo */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {estrelasHero.map((e, i) => (
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

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        padding: '2rem',
      }}>
        <p style={{
          color: '#4fc3f7',
          fontSize: '0.8rem',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
        }}>
          <i className="bi bi-globe2" style={{ marginRight: '8px' }} />
          Sistema Solar Interactivo
        </p>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 8vw, 6rem)',
          fontWeight: 700,
          color: '#fff',
          lineHeight: 1.1,
          marginBottom: '1.5rem',
          textShadow: '0 0 40px rgba(79,195,247,0.5)',
        }}>
          EXPLORE O<br />
          <span style={{ color: '#4fc3f7' }}>SISTEMA SOLAR</span>
        </h1>

        <p style={{
          color: '#a0a0b0',
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          maxWidth: '600px',
          margin: '0 auto 3rem',
          lineHeight: 1.7,
        }}>
          Viaje pelos planetas, descubra os mistérios do universo e explore o cosmos numa experiência interactiva.
        </p>

        <button
          onClick={() => {
            setMostrarPlanetas(true)
            setTimeout(() => {
              const seccao = document.getElementById('sistema-solar')
              if (seccao) seccao.scrollIntoView({ behavior: 'smooth' })
            }, 100)
          }}
          style={{
            background: 'transparent',
            border: '1px solid #4fc3f7',
            color: '#4fc3f7',
            padding: '1rem 3rem',
            fontSize: '0.9rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            borderRadius: '2px',
            transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#4fc3f7'
            e.currentTarget.style.color = '#000'
            e.currentTarget.style.boxShadow = '0 0 30px rgba(79,195,247,0.5)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#4fc3f7'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <i className="bi bi-rocket-takeoff" style={{ marginRight: '10px' }} />
          COMEÇAR EXPLORAÇÃO
        </button>
      </section>

      {/* Secção do Sistema Solar 3D Interativo */}
      {mostrarPlanetas && (
        <section id="sistema-solar" style={{
          minHeight: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 0',
          position: 'relative',
          zIndex: 10,
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '0 2rem' }}>
            <p style={{
              color: '#4fc3f7',
              fontSize: '0.8rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}>
              <i className="bi bi-sun" style={{ marginRight: '8px' }} />
              Simulador Orbitário
            </p>
            <h2 style={{
              color: '#fff',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              O Sistema Solar 3D
            </h2>
            <p style={{ color: '#6a6a90', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Rode, faça zoom e clique em qualquer corpo celeste para inspecionar a telemetria.
            </p>
          </div>

          <div style={{ 
            width: '100%', 
            height: '75vh', 
            position: 'relative',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            background: 'rgba(2, 2, 8, 0.6)'
          }}>
            <SolarSystemScene />
          </div>
        </section>
      )}

      {/* 🪐 SECÇÃO DE CURIOSIDADES UNIVERSAIS */}
      {mostrarPlanetas && (
        <section id="curiosidades" style={{
          background: 'transparent',
          padding: '6rem 2rem',
          width: '100%',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10,
        }}>
          <div style={{ maxWidth: '1100px', width: '100%' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <p style={{ color: '#00e5ff', letterSpacing: '0.3em', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', margin: 0 }}>
                <i className="bi bi-hdd-network" style={{ marginRight: '8px' }} />
                Base de Dados Estelar
              </p>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem', letterSpacing: '0.05em' }}>
                MISTÉRIOS DO ESPAÇO PROFUNDO
              </h2>
              <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Telemetria e dados recolhidos pelas sondas de exploração interestelar.</p>
            </div>

            {/* Grelha de Cards */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '2rem', 
              marginBottom: '5rem' 
            }}>
              {/* Card 1 */}
              <div style={{ background: 'rgba(5, 5, 20, 0.4)', border: '1px solid rgba(0, 229, 255, 0.15)', padding: '2rem', borderRadius: '12px' }}>
                <div style={{ color: '#00e5ff', fontSize: '1.3rem', marginBottom: '1rem' }}><i className="bi bi-volume-mute" /></div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#f1f5f9' }}>O Silêncio Cósmico</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>O espaço é completamente silencioso. Como não existe atmosfera, as ondas sonoras não têm meio para viajar. As explosões estelares acontecem num vácuo absoluto.</p>
              </div>

              {/* Card 2 */}
              <div style={{ background: 'rgba(5, 5, 20, 0.4)', border: '1px solid rgba(0, 229, 255, 0.15)', padding: '2rem', borderRadius: '12px' }}>
                <div style={{ color: '#4fc3f7', fontSize: '1.3rem', marginBottom: '1rem' }}><i className="bi bi-hourglass-split" /></div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#f1f5f9' }}>Anos Distorcidos</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>Um ano em Vênus é mais curto do que um único dia terrestre. Ele demora mais tempo a rodar sobre o seu próprio eixo do que a completar uma translação à volta do Sol.</p>
              </div>

              {/* Card 3 */}
              <div style={{ background: 'rgba(5, 5, 20, 0.4)', border: '1px solid rgba(0, 229, 255, 0.15)', padding: '2rem', borderRadius: '12px' }}>
                <div style={{ color: '#9c27b0', fontSize: '1.3rem', marginBottom: '1rem' }}><i className="bi bi-footprints" /></div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#f1f5f9' }}>Pegadas Eternas</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>As pegadas deixadas pelos astronautas da Apollo na Lua vão durar pelo menos 100 milhões de anos, pois não existe vento ou água para as apagar.</p>
              </div>

              {/* Card 4 */}
              <div style={{ background: 'rgba(5, 5, 20, 0.4)', border: '1px solid rgba(0, 229, 255, 0.15)', padding: '2rem', borderRadius: '12px' }}>
                <div style={{ color: '#00e5ff', fontSize: '1.3rem', marginBottom: '1rem' }}><i className="bi bi-moisture" /></div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#f1f5f9' }}>Oceano Flutuante</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>Astrónomos descobriram uma nuvem de vapor de água flutuando no espaço profundo que contém 140 biliões de vezes mais água do que todos os oceanos da Terra juntos.</p>
              </div>

              {/* Card 5 */}
              <div style={{ background: 'rgba(5, 5, 20, 0.4)', border: '1px solid rgba(0, 229, 255, 0.15)', padding: '2rem', borderRadius: '12px' }}>
                <div style={{ color: '#4fc3f7', fontSize: '1.3rem', marginBottom: '1rem' }}><i className="bi bi-cone-striped" /></div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#f1f5f9' }}>A Densidade de Neutrões</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>As estrelas de neutrões são tão densas que uma única colher de chá da sua matéria pesaria cerca de 6 mil milhões de toneladas, o equivalente ao peso de uma montanha na Terra.</p>
              </div>

              {/* Card 6 */}
              <div style={{ background: 'rgba(5, 5, 20, 0.4)', border: '1px solid rgba(0, 229, 255, 0.15)', padding: '2rem', borderRadius: '12px' }}>
                <div style={{ color: '#9c27b0', fontSize: '1.3rem', marginBottom: '1rem' }}><i className="bi bi-speedometer2" /></div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#f1f5f9' }}>Ventos de Vidro</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>No exoplaneta HD 189733b, chove vidro fundido de lado. Os ventos violentos neste planeta alcançam uns impressionantes 8.700 km/h, arrastando o vidro horizontalmente.</p>
              </div>

              {/* Card 7 */}
              <div style={{ background: 'rgba(5, 5, 20, 0.4)', border: '1px solid rgba(0, 229, 255, 0.15)', padding: '2rem', borderRadius: '12px' }}>
                <div style={{ color: '#00e5ff', fontSize: '1.3rem', marginBottom: '1rem' }}><i className="bi bi-magnet" /></div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#f1f5f9' }}>Magnetismo Extremo</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>As Magnetares, um tipo raro de estrela morta, possuem os campos magnéticos mais fortes do universo. Elas conseguiriam apagar os dados de todos os cartões de crédito da Terra a mil quilómetros de distância.</p>
              </div>

              {/* Card 8 */}
              <div style={{ background: 'rgba(5, 5, 20, 0.4)', border: '1px solid rgba(0, 229, 255, 0.15)', padding: '2rem', borderRadius: '12px' }}>
                <div style={{ color: '#4fc3f7', fontSize: '1.3rem', marginBottom: '1rem' }}><i className="bi bi-brightness-high" /></div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#f1f5f9' }}>A Fornalha do Sistema</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>O Sol consome aproximadamente 600 milhões de toneladas de hidrogênio a cada segundo através do seu núcleo de fusão nuclear, convertendo-o em hélio e libertando energia pura.</p>
              </div>

              {/* Card 9 */}
              <div style={{ background: 'rgba(5, 5, 20, 0.4)', border: '1px solid rgba(0, 229, 255, 0.15)', padding: '2rem', borderRadius: '12px' }}>
                <div style={{ color: '#9c27b0', fontSize: '1.3rem', marginBottom: '1rem' }}><i className="bi bi-geo" /></div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#f1f5f9' }}>Expansão Contínua</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>O Universo observável tem um diâmetro estimado em 93 mil milhões de anos-luz, e continua a expandir-se a uma velocidade acelerada devido à misteriosa energia escura.</p>
              </div>
            </div>

            {/* Botão de Quiz */}
            <div style={{ textAlign: 'center' }}>
              <Link href="/quiz" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(0, 229, 255, 0.04)',
                border: '1px solid rgba(0, 229, 255, 0.3)',
                color: '#00e5ff',
                padding: '1rem 2.5rem',
                borderRadius: '4px',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#00e5ff'
                e.currentTarget.style.color = '#000'
                e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 229, 255, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 229, 255, 0.04)'
                e.currentTarget.style.color = '#00e5ff'
                e.currentTarget.style.boxShadow = 'none'
              }}
              >
                <i className="bi bi-cpu" />
                Validar Patente Cósmica →
              </Link>
            </div>

          </div>
        </section>
      )}

      {/* 🚀 FOOTER: CENTRO DE COMANDO ZENTRÁXIA (O que adicionámos) */}
      <footer style={{
  background: 'linear-gradient(to bottom, #020617, #000000)',
  borderTop: '1px solid rgba(79, 195, 247, 0.2)',
  padding: '6rem 2rem 3rem',
  color: '#94a3b8',
  textAlign: 'center',
  position: 'relative',
}}>
  {/* Divisor Decorativo */}
  <div style={{
    width: '100px',
    height: '2px',
    background: 'linear-gradient(to right, transparent, #4fc3f7, transparent)',
    margin: '0 auto 3rem',
  }} />

  {/* Nome e Credenciais */}
  <h3 style={{ color: '#fff', letterSpacing: '0.3em', marginBottom: '1.5rem', fontWeight: 300 }}>ZENTRÁXIA</h3>
  
  <div style={{ 
    display: 'flex', 
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    gap: '2rem', 
    marginBottom: '3rem',
    fontSize: '0.9rem' 
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <i className="bi bi-person-badge" style={{ color: '#4fc3f7', fontSize: '1.2rem' }} />
      <span>Yussandy Silva</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <i className="bi bi-envelope-paper" style={{ color: '#4fc3f7', fontSize: '1.2rem' }} />
      <span>yussandysilva2@gmail.com</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <i className="bi bi-phone" style={{ color: '#4fc3f7', fontSize: '1.2rem' }} />
      <span>+244 958 565 659</span>
    </div>
  </div>

  {/* Ícones Sociais (Estilo limpo) */}
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    gap: '2rem', 
    marginBottom: '4rem',
    opacity: 0.8
  }}>
    <i className="bi bi-youtube" style={{ fontSize: '1.5rem', color: '#fff' }} />
    <i className="bi bi-instagram" style={{ fontSize: '1.5rem', color: '#fff' }} />
    <i className="bi bi-tiktok" style={{ fontSize: '1.5rem', color: '#fff' }} />
    <i className="bi bi-github" style={{ fontSize: '1.5rem', color: '#fff' }} />
  </div>

  {/* Copyright */}
  <div style={{ fontSize: '0.75rem', letterSpacing: '0.1em', opacity: 0.5 }}>
    © {new Date().getFullYear()} ZENTRÁXIA • MISSÃO DE EXPLORAÇÃO ESPACIAL
  </div>
</footer>

      <style>{`
        @keyframes piscar {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </main>
  )
}

// Encapsulamento principal com Suspense (Requisito obrigatório do Next.js ao usar useSearchParams)
export default function Home() {  
  
  useEffect(() => {
    // Verifica se a URL contém a hash do sistema solar
    if (window.location.hash === '#sistema-solar') {
      // Aguarda um pequeno momento para a página renderizar e faz o scroll manual
      setTimeout(() => {
        const elemento = document.getElementById('sistema-solar')
        if (elemento) {
          elemento.scrollIntoView({ behavior: 'smooth' })
        }
        
        // Remove a hash da URL sem recarregar a página para que o F5 não quebre
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
      }, 500) // Podes ajustar o tempo se necessário
    }
  }, [])
  return (
    <Suspense fallback={<div style={{ background: '#000', minHeight: '100vh' }} />}>
      <HomeContent />
    </Suspense>
  )
}
