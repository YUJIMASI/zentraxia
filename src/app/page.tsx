'use client'

import Link from 'next/link'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import SolarSystemScene from '@/components/solar-system/SolarSystemScene'

interface Estrela {
  width: string
  height: string
  top: string
  left: string
  opacity: number
  duration: string
}

function HomeContent() {
  const searchParams = useSearchParams()
  const skipIntro = searchParams.get('skipIntro') === 'true'

  const [fase, setFase] = useState<'intro' | 'hero'>(skipIntro ? 'hero' : 'intro')
  const [progresso, setProgresso] = useState(skipIntro ? 100 : 0)
  const [textoVisivel, setTextoVisivel] = useState(skipIntro)
  const [mostrarBarra, setMostrarBarra] = useState(!skipIntro)
  const [warp, setWarp] = useState(false)
  const [estrelas, setEstrelas] = useState<Estrela[]>([])
  const [estrelasHero, setEstrelasHero] = useState<Estrela[]>([])
  const [mostrarPlanetas, setMostrarPlanetas] = useState(skipIntro)

  // --- SISTEMA DE CONQUISTAS LOCAIS ---
  const [conquistas, setConquistas] = useState<{ [key: string]: boolean }>({});
  const [notificacao, setNotificacao] = useState<string | null>(null);
  const [cliquesPlanetas, setCliquesPlanetas] = useState(0);

  // Carregar conquistas do LocalStorage ao iniciar o site
  useEffect(() => {
    const salvas = localStorage.getItem('zentraxia_conquistas');
    if (salvas) {
      setConquistas(JSON.parse(salvas));
    }
  }, []);

  // 🟢 VERIFICAÇÃO AUTOMÁTICA: Dispara quando as 3 estiverem completas
  useEffect(() => {
    const temExplorador = conquistas['Explorador Iniciante'];
    const temLeitor = conquistas['Rato de Biblioteca'];
    const temComandante = conquistas['Comandante Estelar'];
    const jaEAlmirante = conquistas['Grande Almirante da Zentráxia'];

    if (temExplorador && temLeitor && temComandante && !jaEAlmirante) {
      // Pequeno delay de 4.5s para não sobrepor a animação da última conquista ganha
      const timer = setTimeout(() => {
        desbloquearConquista('Grande Almirante da Zentráxia');
      }, 4500);
      
      return () => clearTimeout(timer);
    }
  }, [conquistas]);

  // Função central para desbloquear medalhas e mostrar notificação
  const desbloquearConquista = (nome: string) => {
    setConquistas(prev => {
      if (prev[nome]) return prev;
      
      const novas = { ...prev, [nome]: true };
      localStorage.setItem('zentraxia_conquistas', JSON.stringify(novas));
      
      // 🟢 Personalização da mensagem se for o prémio final das 3 conquistas
      if (nome === 'Grande Almirante da Zentráxia') {
        setNotificacao(`🏆 DOUTRINA CÓSMICA COMPLETA: Tornou-se o Grande Almirante da Zentráxia!`);
      } else {
        setNotificacao(`Nova Conquista Desbloqueada: ${nome}!`);
      }
      
      setTimeout(() => setNotificacao(null), 5000); // Fica 5 segundos no ecrã
      
      return novas;
    });
  };
  // ------------------------------------

  useEffect(() => {
    if (skipIntro && mostrarPlanetas) {
      setTimeout(() => {
        const seccao = document.getElementById('sistema-solar')
        if (seccao) seccao.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    }
  }, [skipIntro, mostrarPlanetas])

  useEffect(() => {
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
      background: 'linear-gradient(to bottom, #020914, #000000)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflowX: 'hidden',
    }}>
      
      {/* 🟢 NOTIFICAÇÃO FLUTUANTE DE CONQUISTA */}
      {notificacao && (
        <div style={{
          position: 'fixed', bottom: '30px', right: '30px', 
          background: notificacao.includes('🏆') ? 'linear-gradient(45deg, #ffd700, #ff8c00)' : '#4fc3f7',
          color: '#000', padding: '1rem 2rem', borderRadius: '50px', zIndex: 1000,
          boxShadow: notificacao.includes('🏆') ? '0 0 30px rgba(255, 215, 0, 0.6)' : '0 0 20px rgba(79, 195, 247, 0.6)', 
          fontWeight: 'bold',
          animation: 'slideInRight 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
        }}>
          {!notificacao.includes('🏆') && <i className="bi bi-star-fill" style={{ marginRight: '10px' }} />}
          {notificacao}
        </div>
      )}

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

          <div 
            onClick={() => {
              setCliquesPlanetas(prev => {
                const total = prev + 1;
                if (total === 3) desbloquearConquista('Explorador Iniciante');
                return total;
              });
            }}
            style={{ 
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

      {mostrarPlanetas && (
        <section id="curiosidades" style={{
          background: 'transparent',
          padding: '6rem 2rem 2rem',
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

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '2rem', 
              marginBottom: '5rem' 
            }}>
              {/* Cards de curiosidades originais mantidos aqui em total conformidade */}
              <div style={{ background: 'rgba(5, 5, 20, 0.4)', border: '1px solid rgba(0, 229, 255, 0.15)', padding: '2rem', borderRadius: '12px' }}>
                <div style={{ color: '#00e5ff', fontSize: '1.3rem', marginBottom: '1rem' }}><i className="bi bi-volume-mute" /></div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#f1f5f9' }}>O Silêncio Cósmico</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>O espaço é completamente silencioso. Como não existe atmosfera, as ondas sonoras não têm meio para viajar.</p>
              </div>
              <div style={{ background: 'rgba(5, 5, 20, 0.4)', border: '1px solid rgba(0, 229, 255, 0.15)', padding: '2rem', borderRadius: '12px' }}>
                <div style={{ color: '#4fc3f7', fontSize: '1.3rem', marginBottom: '1rem' }}><i className="bi bi-hourglass-split" /></div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#f1f5f9' }}>Anos Distorcidos</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>Um ano em Vênus é mais curto do que um único dia terrestre. Ele demora mais tempo a rodar sobre o seu próprio eixo.</p>
              </div>
              <div style={{ background: 'rgba(5, 5, 20, 0.4)', border: '1px solid rgba(0, 229, 255, 0.15)', padding: '2rem', borderRadius: '12px' }}>
                <div style={{ color: '#9c27b0', fontSize: '1.3rem', marginBottom: '1rem' }}><i className="bi bi-footprints" /></div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#f1f5f9' }}>Pegadas Eternas</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>As pegadas deixadas pelos astronautas da Apollo na Lua vão durar pelo menos 100 milhões de anos.</p>
              </div>
              <div style={{ background: 'rgba(5, 5, 20, 0.4)', border: '1px solid rgba(0, 229, 255, 0.15)', padding: '2rem', borderRadius: '12px' }}>
                <div style={{ color: '#00e5ff', fontSize: '1.3rem', marginBottom: '1rem' }}><i className="bi bi-moisture" /></div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#f1f5f9' }}>Oceano Flutuante</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>Contém 140 biliões de vezes mais água do que todos os oceanos da Terra juntos.</p>
              </div>
              <div style={{ background: 'rgba(5, 5, 20, 0.4)', border: '1px solid rgba(0, 229, 255, 0.15)', padding: '2rem', borderRadius: '12px' }}>
                <div style={{ color: '#4fc3f7', fontSize: '1.3rem', marginBottom: '1rem' }}><i className="bi bi-cone-striped" /></div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#f1f5f9' }}>A Densidade de Neutrões</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>Uma única colher de chá da sua matéria pesaria cerca de 6 mil milhões de toneladas.</p>
              </div>
              <div style={{ background: 'rgba(5, 5, 20, 0.4)', border: '1px solid rgba(0, 229, 255, 0.15)', padding: '2rem', borderRadius: '12px' }}>
                <div style={{ color: '#9c27b0', fontSize: '1.3rem', marginBottom: '1rem' }}><i className="bi bi-speedometer2" /></div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#f1f5f9' }}>Ventos de Vidro</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>No exoplaneta HD 189733b, chove vidro fundido de lado com ventos violentos.</p>
              </div>
              <div style={{ background: 'rgba(5, 5, 20, 0.4)', border: '1px solid rgba(0, 229, 255, 0.15)', padding: '2rem', borderRadius: '12px' }}>
                <div style={{ color: '#00e5ff', fontSize: '1.3rem', marginBottom: '1rem' }}><i className="bi bi-magnet" /></div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#f1f5f9' }}>Magnetismo Extremo</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>As Magnetares possuem os campos magnéticos mais fortes do universo.</p>
              </div>
              <div style={{ background: 'rgba(5, 5, 20, 0.4)', border: '1px solid rgba(0, 229, 255, 0.15)', padding: '2rem', borderRadius: '12px' }}>
                <div style={{ color: '#4fc3f7', fontSize: '1.3rem', marginBottom: '1rem' }}><i className="bi bi-brightness-high" /></div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#f1f5f9' }}>A Fornalha do Sistema</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>O Sol consome aproximadamente 600 milhões de toneladas de hidrogênio a cada segundo.</p>
              </div>
              <div style={{ background: 'rgba(5, 5, 20, 0.4)', border: '1px solid rgba(0, 229, 255, 0.15)', padding: '2rem', borderRadius: '12px' }}>
                <div style={{ color: '#9c27b0', fontSize: '1.3rem', marginBottom: '1rem' }}><i className="bi bi-geo" /></div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#f1f5f9' }}>Expansão Contínua</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>O Universo observável continua a expandir-se a uma velocidade acelerada.</p>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
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

            <div style={{ textAlign: 'center', padding: '4rem 0 2rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <p style={{ color: '#64748b', fontSize: '1.1rem', fontStyle: 'italic', maxWidth: '700px', margin: '0 auto 2rem', lineHeight: 1.8, letterSpacing: '0.05em' }}>
                "A vastidão do cosmos é governada por leis ocultas e conceitos complexos..."
              </p>
              
              <Link href="/dicionario" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                background: 'transparent',
                border: '1px solid #4fc3f7',
                color: '#4fc3f7',
                padding: '1.2rem 3rem',
                borderRadius: '4px',
                fontSize: '0.95rem',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#4fc3f7'
                e.currentTarget.style.color = '#000'
                e.currentTarget.style.boxShadow = '0 0 35px rgba(79, 195, 247, 0.6)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#4fc3f7'
                e.currentTarget.style.boxShadow = 'none'
              }}
              >
                <i className="bi bi-terminal" style={{ fontSize: '1.1rem' }} />
                Aceder ao Dicionário Espacial
              </Link>
            </div>

          </div>
        </section>
      )}

      {/* 🏆 SECÇÃO VISUAL DE CONQUISTAS COORDENADA COM O NOVO SISTEMA */}
      {mostrarPlanetas && (
        <section style={{
          width: '100%',
          padding: '4rem 2rem',
          background: 'linear-gradient(to bottom, transparent, rgba(5, 5, 20, 0.8))',
          textAlign: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          position: 'relative',
          zIndex: 10
        }}>
          <p style={{ color: '#00e5ff', letterSpacing: '0.3em', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem' }}>
            <i className="bi bi-award" style={{ marginRight: '8px' }} />
            Condecorações de Cadete
          </p>
          <h2 style={{ color: '#fff', fontSize: '2rem', fontWeight: 800, marginBottom: '3rem' }}>
            {conquistas['Grande Almirante da Zentráxia'] ? '🎖️ COLECÇÃO COMPLETA DE PATENTES' : 'O SEU REGISTO ESPACIAL'}
          </h2>
          
          <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap' }}>
            
            <div style={{ 
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px',
              opacity: conquistas['Explorador Iniciante'] ? 1 : 0.3,
              filter: conquistas['Explorador Iniciante'] ? 'none' : 'grayscale(100%)',
              transition: 'all 0.5s ease'
            }}>
              <div style={{ 
                width: '90px', height: '90px', borderRadius: '50%', 
                background: 'rgba(79, 195, 247, 0.1)', border: '2px solid #4fc3f7',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: '#4fc3f7',
                boxShadow: conquistas['Explorador Iniciante'] ? '0 0 20px rgba(79, 195, 247, 0.4)' : 'none'
              }}>
                <i className="bi bi-globe-americas" />
              </div>
              <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>Explorador Iniciante</span>
            </div>

            <div style={{ 
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px',
              opacity: conquistas['Rato de Biblioteca'] ? 1 : 0.3,
              filter: conquistas['Rato de Biblioteca'] ? 'none' : 'grayscale(100%)',
              transition: 'all 0.5s ease'
            }}>
              <div style={{ 
                width: '90px', height: '90px', borderRadius: '50%', 
                background: 'rgba(156, 39, 176, 0.1)', border: '2px solid #9c27b0',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: '#9c27b0',
                boxShadow: conquistas['Rato de Biblioteca'] ? '0 0 20px rgba(156, 39, 176, 0.4)' : 'none'
              }}>
                <i className="bi bi-book" />
              </div>
              <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>Rato de Biblioteca</span>
            </div>

            <div style={{ 
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px',
              opacity: conquistas['Comandante Estelar'] ? 1 : 0.3,
              filter: conquistas['Comandante Estelar'] ? 'none' : 'grayscale(100%)',
              transition: 'all 0.5s ease'
            }}>
              <div style={{ 
                width: '90px', height: '90px', borderRadius: '50%', 
                background: 'rgba(0, 229, 255, 0.1)', border: '2px solid #00e5ff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: '#00e5ff',
                boxShadow: conquistas['Comandante Estelar'] ? '0 0 20px rgba(0, 229, 255, 0.4)' : 'none'
              }}>
                <i className="bi bi-stars" />
              </div>
              <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>Comandante Estelar</span>
            </div>

          </div>

          {/* 🌟 EMBLEMA EXTRA QUE SURGE QUANDO COMPLETA TUDO */}
          {conquistas['Grande Almirante da Zentráxia'] && (
            <div style={{ 
              marginTop: '4rem', display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
              animation: 'slideInRight 0.8s ease out'
            }}>
              <div style={{
                padding: '1.5rem 3rem', background: 'linear-gradient(45deg, rgba(255,215,0,0.1), rgba(255,140,0,0.1))',
                border: '1px solid #ffd700', borderRadius: '8px', boxShadow: '0 0 30px rgba(255, 215, 0, 0.2)'
              }}>
                <h4 style={{ margin: 0, color: '#ffd700', letterSpacing: '0.2em', fontSize: '1.2rem' }}>
                  🏅 PATENTE MÁXIMA DESBLOQUEADA
                </h4>
                <p style={{ margin: '0.5rem 0 0 0', color: '#cbd5e1', fontSize: '0.9rem' }}>
                  Parabéns! Completou todas as etapas da simulação interativa.
                </p>
              </div>
            </div>
          )}
        </section>
      )}

      {/* 🚀 FOOTER */}
      <footer style={{
        width: '100%',
        background: 'linear-gradient(to bottom, transparent, #000000)',
        borderTop: '1px solid rgba(79, 195, 247, 0.1)',
        padding: '6rem 2rem 3rem',
        color: '#94a3b8',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
      }}>
        <div style={{ width: '100px', height: '2px', background: 'linear-gradient(to right, transparent, #4fc3f7, transparent)', margin: '0 auto 3rem' }} />
        <h3 style={{ color: '#fff', letterSpacing: '0.3em', marginBottom: '1.5rem', fontWeight: 300 }}>ZENTRÁXIA</h3>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', marginBottom: '3rem', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><i className="bi bi-person-badge" style={{ color: '#4fc3f7', fontSize: '1.2rem' }} /><span>Yussandy Silva</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><i className="bi bi-envelope-paper" style={{ color: '#4fc3f7', fontSize: '1.2rem' }} /><span>yussandysilva2@gmail.com</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><i className="bi bi-phone" style={{ color: '#4fc3f7', fontSize: '1.2rem' }} /><span>+244 958 565 659</span></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '4rem', opacity: 0.8 }}>
          <i className="bi bi-youtube" style={{ fontSize: '1.5rem', color: '#fff' }} />
          <i className="bi bi-instagram" style={{ fontSize: '1.5rem', color: '#fff' }} />
          <i className="bi bi-tiktok" style={{ fontSize: '1.5rem', color: '#fff' }} />
          <i className="bi bi-github" style={{ fontSize: '1.5rem', color: '#fff' }} />
        </div>

        <div style={{ fontSize: '0.75rem', letterSpacing: '0.1em', opacity: 0.5 }}>
          © {new Date().getFullYear()} ZENTRÁXIA • MISSÃO DE EXPLORAÇÃO ESPACIAL
        </div>
      </footer>

      <style>{`
        @keyframes piscar {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.9; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </main>
  )
}

export default function Home() {  
  useEffect(() => {
    if (window.location.hash === '#sistema-solar') {
      setTimeout(() => {
        const elemento = document.getElementById('sistema-solar')
        if (elemento) elemento.scrollIntoView({ behavior: 'smooth' })
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
      }, 500)
    }
  }, [])

  return (
    <Suspense fallback={<div style={{ background: '#000', minHeight: '100vh' }} />}>
      <HomeContent />
    </Suspense>
  )
}