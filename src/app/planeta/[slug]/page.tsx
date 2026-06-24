'use client'

import { useParams, useRouter } from 'next/navigation'
import { getPlanetBySlug } from '@/data/planets'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, useTexture } from '@react-three/drei'
import { useRef, useState, useEffect, Suspense } from 'react'
import * as THREE from 'three'
import Link from 'next/link'
// IMPORTA O SUPABASE AQUI (ajusta o caminho para a pasta onde criaste o ficheiro)
import { supabase } from '@/lib/supabase'

function PlanetaFocused({ textureUrl, color, slug }: { textureUrl: string, color: string, slug: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const texture = useTexture(textureUrl)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15
    }
  })

  const esSaturno = slug === 'saturno'
  const isSun = slug === 'sol' // Nova verificação de segurança para o Sol

  return (
    <group>
      {/* Iluminação Cinemática de Alto Contraste */}
      <ambientLight intensity={isSun ? 2 : 0.05} /> 
      
      {!isSun && (
        // Luz direcional forte apenas para os planetas, criando um efeito dramático "metade claro, metade escuro"
        <directionalLight 
          position={[5, 2, 4]} 
          intensity={2.5} 
          castShadow 
        />
      )}
      
      <mesh ref={meshRef} castShadow={!isSun} receiveShadow={!isSun}>
        <sphereGeometry args={[2.8, 64, 64]} />
        {isSun ? (
          // O Sol usa o material que ignora sombras
          <meshBasicMaterial map={texture} />
        ) : (
          // Os planetas reagem à luz com um toque mais metálico e profundo
          <meshStandardMaterial map={texture} roughness={0.5} metalness={0.15} />
        )}
      </mesh>

      {esSaturno && (
        <mesh rotation={[Math.PI / 2.2, Math.PI / 10, 0]} receiveShadow castShadow>
          <ringGeometry args={[3.4, 6.0, 64]} />
          <meshStandardMaterial 
            color="#c2a96e" 
            side={THREE.DoubleSide} 
            transparent 
            opacity={0.8} 
            roughness={0.6}
          />
        </mesh>
      )}
    </group>
  )
}

// Interface para os dados de feedback que vêm do Supabase
interface FeedbackPlaneta {
  id: string
  planeta_slug: string
  nome: string
  estrelas: number
  comentario: string
  created_at: string
}

export default function PlanetPage() {
  const params = useParams()
  const slug = params.slug as string
  const planeta = getPlanetBySlug(slug)

  const [cardAberto, setCardAberto] = useState<number | null>(null)
  
  const [nome, setNome] = useState('')
  const [comentario, setComentario] = useState('')
  const [estrelas, setEstrelas] = useState(5)

  // Estados para gerir a Base de Dados de Feedbacks
  const [feedbacks, setFeedbacks] = useState<FeedbackPlaneta[]>([])
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true)
  const [aEnviar, setAEnviar] = useState(false)
  const [erroEnvio, setErroEnvio] = useState('')

  // Ir buscar os feedbacks deste planeta ao Supabase
  useEffect(() => {
    async function buscarFeedbacks() {
      if (!slug) return

      setLoadingFeedbacks(true)

      const { data, error } = await supabase
        .from('feedbacks_planetas')
        .select('*')
        .eq('planeta_slug', slug)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao carregar feedbacks:', error)
        setFeedbacks([])
      } else {
        setFeedbacks(data || [])
      }

      setLoadingFeedbacks(false)
    }

    buscarFeedbacks()
  }, [slug])

  if (!planeta) {
    return (
      <div style={{ color: '#fff', background: '#000', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Planeta não encontrado no sistema Zentráxia.</h2>
      </div>
    )
  }

  const proporcaoTamanho = planeta.diameter / 12756
  const proporcaoGravidade = planeta.gravity / 9.8
  const tempMedia = (planeta.temperatureMin + planeta.temperatureMax) / 2
  const proporcaoTemp = Math.min(Math.max(((tempMedia + 200) / 700) * 100, 5), 100)

  // Enviar o feedback para o Supabase
  const enviarFeedback = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nome.trim() || !comentario.trim()) return

    setAEnviar(true)
    setErroEnvio('')

    const { data, error } = await supabase
      .from('feedbacks_planetas')
      .insert([
        {
          planeta_slug: slug,
          nome,
          estrelas,
          comentario,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Erro ao enviar feedback:', error)
      setErroEnvio('Não foi possível enviar a transmissão. Tenta novamente.')
    } else if (data) {
      // Adiciona o novo feedback no topo da lista, sem precisar de recarregar a página
      setFeedbacks([data, ...feedbacks])
      setNome('')
      setComentario('')
      setEstrelas(5)
    }

    setAEnviar(false)
  }

  return (
    <main style={{
      background: 'radial-gradient(circle at 30% 30%, #08081e 0%, #000000 80%)',
      minHeight: '100vh',
      color: '#fff',
      fontFamily: 'sans-serif',
      position: 'relative',
    }}>
      
      <Link href="/?skipIntro=true" style={{
        position: 'fixed',
        top: '2rem',
        left: '2rem',
        zIndex: 100,
        color: '#4fc3f7',
        textDecoration: 'none',
        fontSize: '0.9rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        border: '1px solid rgba(79,195,247,0.3)',
        padding: '0.6rem 1.2rem',
        borderRadius: '4px',
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        transition: 'all 0.3s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#4fc3f7'
        e.currentTarget.style.color = '#000'
        e.currentTarget.style.boxShadow = '0 0 15px #4fc3f7'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(0,0,0,0.6)'
        e.currentTarget.style.color = '#4fc3f7'
        e.currentTarget.style.boxShadow = 'none'
      }}
      >
        <i className="bi bi-arrow-left" /> SAIR DA ÓRBITA
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', minHeight: '100vh' }}>
        
        <div style={{ width: '100%', height: '100vh', minHeight: '50vh', position: 'sticky', top: 0 }}>
          <Canvas camera={{ position: [0, 0, 7.5], fov: 50 }}>
            <Suspense fallback={null}>
              <PlanetaFocused textureUrl={planeta.textureUrl} color={planeta.color} slug={planeta.slug} />
            </Suspense>
            <Stars radius={100} depth={30} count={1000} factor={4} saturation={0.5} speed={0.5} />
            <OrbitControls enableZoom={true} maxDistance={12} minDistance={4.5} enableDamping dampingFactor={0.05} />
          </Canvas>
          <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', color: '#6a6a90', fontSize: '0.8rem', letterSpacing: '0.1em', pointerEvents: 'none', textAlign: 'center' }}>
            <i className="bi bi-arrows-move" style={{ marginRight: '6px' }} /> ARRASTA PARA RODAR O PLANETA
          </div>
        </div>

        <div style={{
          padding: '4rem 3rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(to right, rgba(0,0,0,0.5), rgba(5,5,20,0.2))',
          borderLeft: '1px solid rgba(255,255,255,0.05)',
        }}>
          
          <span style={{ color: planeta.color, letterSpacing: '0.4em', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600 }}>
            Destino Exploração
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', margin: '0.5rem 0 1.5rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', textShadow: `0 0 30px ${planeta.color}44` }}>
            {planeta.name}
          </h1>
          <p style={{ color: '#a0a0b0', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2.5rem' }}>
            {planeta.description}
          </p>

          <h3 style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4fc3f7', marginBottom: '1rem', borderBottom: '1px solid rgba(79,195,247,0.2)', paddingBottom: '0.5rem' }}>
            Especificações Planetárias
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '2.5rem' }}>
            <div>
              <div style={{ color: '#555570', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Diâmetro</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 500, marginTop: '2px' }}>{planeta.diameter.toLocaleString()} km</div>
            </div>
            <div>
              <div style={{ color: '#555570', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Massa</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 500, marginTop: '2px' }}>{planeta.mass}</div>
            </div>
            <div>
              <div style={{ color: '#555570', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Gravidade</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 500, marginTop: '2px' }}>{planeta.gravity} m/s²</div>
            </div>
            <div>
              <div style={{ color: '#555570', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Satélites (Luas)</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 500, marginTop: '2px' }}>{planeta.moons}</div>
            </div>
            <div>
              <div style={{ color: '#555570', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Duração do Dia</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 500, marginTop: '2px' }}>{planeta.dayDuration}</div>
            </div>
            <div>
              <div style={{ color: '#555570', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Duração do Ano</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 500, marginTop: '2px' }}>{planeta.yearDuration}</div>
            </div>
          </div>

          <h3 style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4fc3f7', marginBottom: '1.5rem', borderBottom: '1px solid rgba(79,195,247,0.2)', paddingBottom: '0.5rem' }}>
            Análise Comparativa (vs Terra)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.5rem', background: 'rgba(255,255,255,0.01)', padding: '1.5rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.03)' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span style={{ color: '#a0a0b0' }}>Escala de Tamanho</span>
                <span style={{ color: planeta.color, fontWeight: 'bold' }}>
                  {proporcaoTamanho === 1 ? 'Mesmo tamanho' : `${proporcaoTamanho.toFixed(2)}x o da Terra`}
                </span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden', position: 'relative' }}>
                <div style={{ width: `${Math.min(proporcaoTamanho * 50, 100)}%`, height: '100%', background: planeta.color, borderRadius: '3px', boxShadow: `0 0 10px ${planeta.color}` }} />
                <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: '#4fa3e0', opacity: 0.6 }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span style={{ color: '#a0a0b0' }}>Força Gravítica</span>
                <span style={{ color: planeta.color, fontWeight: 'bold' }}>
                  {proporcaoGravidade === 1 ? 'Idêntica' : `${proporcaoGravidade.toFixed(2)}x a da Terra`}
                </span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden', position: 'relative' }}>
                <div style={{ width: `${Math.min(proporcaoGravidade * 50, 100)}%`, height: '100%', background: planeta.color, borderRadius: '3px', boxShadow: `0 0 10px ${planeta.color}` }} />
                <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: '#4fa3e0', opacity: 0.6 }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span style={{ color: '#a0a0b0' }}>Zona Térmica Activa</span>
                <span style={{ color: planeta.color, fontWeight: 'bold' }}>{tempMedia.toFixed(0)}°C (Média)</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${proporcaoTemp}%`, height: '100%', background: `linear-gradient(to right, #4fc3f7, ${planeta.color})`, borderRadius: '3px' }} />
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4fc3f7', marginBottom: '1rem', borderBottom: '1px solid rgba(79,195,247,0.2)', paddingBottom: '0.5rem' }}>
            Ficheiros de Curiosidades
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
            {planeta.curiosities.map((curiosidade, index) => {
              const estaAberto = cardAberto === index
              return (
                <div 
                  key={index}
                  onClick={() => setCardAberto(estaAberto ? null : index)}
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: `1px solid ${estaAberto ? planeta.color : 'rgba(255,255,255,0.05)'}`,
                    borderRadius: '6px',
                    padding: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: estaAberto ? `0 0 15px ${planeta.color}15` : 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.05em' }}>
                      <i className="bi bi-file-earmark-text" style={{ marginRight: '8px', color: planeta.color }} />
                      MISTÉRIO #0{index + 1}
                    </span>
                    <span style={{ color: planeta.color, transform: `rotate(${estaAberto ? '180deg' : '0deg'})`, transition: 'transform 0.3s' }}>
                      ▼
                    </span>
                  </div>
                  <div style={{
                    maxHeight: estaAberto ? '120px' : '0px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    color: '#a0a0b0',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    marginTop: estaAberto ? '0.8rem' : '0rem'
                  }}>
                    {curiosidade}
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>

      <section style={{
        background: 'rgba(2, 2, 8, 0.95)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '5rem 2rem',
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
      }}>
        <div style={{ width: '100%', maxWidth: '900px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem' }}>
          
          <div>
            <span style={{ color: '#4fc3f7', letterSpacing: '0.2em', fontSize: '0.8rem', textTransform: 'uppercase' }}>Canal de Comunicação</span>
            <h2 style={{ fontSize: '2rem', margin: '0.5rem 0 1.5rem', fontWeight: 600 }}>Deixe o seu Relatório</h2>
            
            <form onSubmit={enviarFeedback} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#6a6a90', marginBottom: '6px', textTransform: 'uppercase' }}>Identificação do Explorador</label>
                <input 
                  type="text" 
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Cadete Adriano" 
                  required
                  style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '4px', color: '#fff', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#6a6a90', marginBottom: '6px', textTransform: 'uppercase' }}>Avaliação Estelar</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <span 
                      key={num} 
                      onClick={() => setEstrelas(num)}
                      style={{ cursor: 'pointer', fontSize: '1.5rem', color: num <= estrelas ? '#ffaa00' : 'rgba(255,255,255,0.15)', transition: 'color 0.2s' }}
                    >
                      <i className={num <= estrelas ? "bi bi-star-fill" : "bi bi-star"} />
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#6a6a90', marginBottom: '6px', textTransform: 'uppercase' }}>Transmissão (Comentário)</label>
                <textarea 
                  rows={4}
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder="Escreva as suas notas sobre a simulação orbital..." 
                  required
                  style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '4px', color: '#fff', outline: 'none', resize: 'none' }}
                />
              </div>

              {erroEnvio && (
                <p style={{ color: '#ff6b6b', fontSize: '0.85rem', margin: 0 }}>{erroEnvio}</p>
              )}

              <button 
                type="submit"
                disabled={aEnviar}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: planeta.color, color: '#000', border: 'none', padding: '1rem', borderRadius: '4px', fontWeight: 700, cursor: aEnviar ? 'not-allowed' : 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'opacity 0.2s', opacity: aEnviar ? 0.6 : 1 }}
                onMouseEnter={(e) => { if (!aEnviar) e.currentTarget.style.opacity = '0.9' }}
                onMouseLeave={(e) => { if (!aEnviar) e.currentTarget.style.opacity = '1' }}
              >
                <i className={aEnviar ? "bi bi-arrow-repeat" : "bi bi-rocket-takeoff-fill"} style={{ fontSize: '1.2rem', animation: aEnviar ? 'spin 1s linear infinite' : 'none' }} />
                {aEnviar ? 'A Transmitir...' : 'Enviar Transmissão'}
              </button>
            </form>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#6a6a90', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Registos Recentes</h3>

            {loadingFeedbacks ? (
              <p style={{ color: '#4fc3f7', fontSize: '1rem', textAlign: 'center', padding: '2rem 0' }}>
                <i className="bi bi-arrow-repeat" style={{ display: 'inline-block', animation: 'spin 2s linear infinite', marginRight: '10px' }} />
                A sincronizar registos...
              </p>
            ) : feedbacks.length === 0 ? (
              <p style={{ color: '#6a6a90', fontSize: '0.95rem' }}>
                Ainda não existem registos para este planeta. Sê o primeiro explorador a deixar a tua transmissão.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxHeight: '420px', overflowY: 'auto', paddingRight: '10px' }}>
                {feedbacks.map((item) => (
                  <div key={item.id} style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '0.95rem', color: '#e2e8f0' }}>{item.nome}</strong>
                      <span style={{ color: '#ffaa00', fontSize: '0.95rem', display: 'flex', gap: '2px' }}>
                        {Array.from({ length: 5 }).map((_, index) => (
                          <i key={index} className={index < item.estrelas ? "bi bi-star-fill" : "bi bi-star"} />
                        ))}
                      </span>
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>{item.comentario}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      <style>{`
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>

    </main>
  )
}