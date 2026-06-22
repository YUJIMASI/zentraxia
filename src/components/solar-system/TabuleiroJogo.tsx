'use client'

import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { useRef, Suspense, useState, useEffect } from 'react'
import * as THREE from 'three'
import { planets } from '@/data/planets'

// --- ÍCONES SVG ---
const IconeCheck = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
const IconeErro = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
const IconeTaxa = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>
const IconeAlerta = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
const IconeTrofeu = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path></svg>
const IconeSetaBaixo = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
const IconeRelogio = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
const IconeRadar = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"></path><path d="M12 12h5"></path></svg>

const mapaTexturas: Record<string, string> = {
  mercurio: 'mercury', venus: 'venus', terra: 'earth', marte: 'mars',
  jupiter: 'jupiter', saturno: 'saturn', urano: 'uranus', neptuno: 'neptune', netuno: 'neptune'
}

const escalaTamanhos: Record<string, number> = {
  mercurio: 0.28, venus: 0.52, terra: 0.55, marte: 0.38,
  jupiter: 1.35, saturno: 1.10, urano: 0.80, neptuno: 0.78, netuno: 0.78
}

const ORDEM_CORRETA_SOLAR = ['mercurio', 'venus', 'terra', 'marte', 'jupiter', 'saturno', 'urano', 'neptuno']

const FRASES_CORONEL_ERRO = [
  "Recruta, estás a tentar implodir o sistema solar?!",
  "Se a gravidade dependesse de ti, estávamos todos a flutuar no vazio!",
  "Marte no lugar da Terra? Queres assar a humanidade, soldado?!",
  "Zero flexões para ti, mas vais ter de ler o manual espacial de novo!",
  "Nem o buraco negro mais denso consegue engolir esse erro tático!",
  "A minha avó alinhava planetas mais rápido e com os olhos vendados!"
]

function CorpoPlaneta3D({ slug }: { slug: string }) {
  const ref = useRef<THREE.Mesh>(null)
  const nomeFicheiro = mapaTexturas[slug] || slug
  const textura = useLoader(THREE.TextureLoader, `/textures/${nomeFicheiro}.jpg`)
  const raioTamanho = escalaTamanhos[slug] || 0.5

  useFrame(() => { if (ref.current) ref.current.rotation.y += 0.012 })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[raioTamanho, 32, 32]} />
      <meshStandardMaterial map={textura} roughness={0.8} metalness={0.1} />
      {(slug === 'saturno' || slug === 'saturn') && (
        <mesh rotation={[Math.PI / 2.3, 0, 0]}>
          <ringGeometry args={[raioTamanho * 1.3, raioTamanho * 2.1, 64]} />
          <meshBasicMaterial color="#cca474" side={THREE.DoubleSide} transparent opacity={0.5} />
        </mesh>
      )}
    </mesh>
  )
}

function SolDoJogo() {
  const solRef = useRef<THREE.Mesh>(null)
  const texturaSol = useLoader(THREE.TextureLoader, '/textures/sun.jpg')
  useFrame(() => { if (solRef.current) solRef.current.rotation.y += 0.001 })

  return (
    <mesh ref={solRef} position={[13, 0, 0]}>
      <sphereGeometry args={[9.0, 64, 64]} />
      <meshStandardMaterial map={texturaSol} emissive={new THREE.Color('#ffaa00')} emissiveIntensity={0.2} />
    </mesh>
  )
}

function PlanetaNaOrbita({ slug, radius }: { slug: string; radius: number }) {
  return (
    <group position={[13 - radius, 0, 0]}>
      <CorpoPlaneta3D slug={slug} />
    </group>
  )
}

function OrbitasDoJogo({ 
  orbitas, 
  setHoveredOrbita, 
  validado,
  indiceDica 
}: { 
  orbitas: any[]; 
  setHoveredOrbita: (index: number | null) => void; 
  validado: boolean;
  indiceDica: number | null
}) {
  return (
    <>
      {[...Array(8)].map((_, i) => {
        const raio = 13 + (i * 2.6) 
        const estaOcupada = orbitas[i] !== null
        
        let corOrbita = estaOcupada ? orbitas[i].color : "#ffffff"
        let opacidadeOrbita = estaOcupada ? 0.95 : 0.35

        if (indiceDica === i && !validado) {
          corOrbita = "#00e5ff"
          opacidadeOrbita = 0.9
        }

        if (validado) {
          const slugPlaneta = orbitas[i]?.slug === 'netuno' ? 'neptuno' : orbitas[i]?.slug
          const estaCorreto = estaOcupada && slugPlaneta === ORDEM_CORRETA_SOLAR[i]
          corOrbita = estaCorreto ? "#00ff66" : "#ff3333"
          opacidadeOrbita = 0.9
          
        }

        return (
          <mesh 
            key={i} position={[13, 0, 0]} 
            onPointerOver={(e) => { e.stopPropagation(); if (!validado) setHoveredOrbita(i) }}
            onPointerOut={() => { if (!validado) setHoveredOrbita(null) }}
          >
            <ringGeometry args={[raio - 0.25, raio + 0.25, 128]} />
            <meshBasicMaterial color={corOrbita} side={THREE.DoubleSide} transparent opacity={opacidadeOrbita} />
          </mesh>
        )
      })}
    </>
  )
}

function ItemPlanetaDoca({ planeta, aoIniciarArrasto }: { planeta: any; aoIniciarArrasto: (e: React.PointerEvent) => void }) {
  return (
    <div
      onPointerDown={aoIniciarArrasto}
      style={{
        width: '75px', height: '95px', display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'space-between', background: 'linear-gradient(145deg, rgba(6, 22, 44, 0.6) 0%, rgba(2, 9, 20, 0.7) 100%)',
        border: '1px solid rgba(0, 229, 255, 0.15)', borderRadius: '8px', padding: '4px 2px',
        cursor: 'grab', transition: 'border-color 0.2s', boxShadow: '0 4px 10px rgba(0,0,0,0.4)', userSelect: 'none' 
      }}
    >
      <div style={{ width: '100%', height: '55px', pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 3.2], fov: 45 }}>
          <ambientLight intensity={0.9} />
          <pointLight position={[5, 3, 5]} intensity={1.5} />
          <Suspense fallback={null}><CorpoPlaneta3D slug={planeta.slug} /></Suspense>
        </Canvas>
      </div>
      <span style={{ color: '#ffffff', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', opacity: 0.8 }}>
        {planeta.name}
      </span>
    </div>
  )
}

export default function TabuleiroJogo() {
  const planetasJogaveis = planets.filter(p => p.slug !== 'sol')

  const [doca, setDoca] = useState<any[]>([])
  const [orbitas, setOrbitas] = useState<any[]>(Array(8).fill(null))
  const [planetaArrastado, setPlanetaArrastado] = useState<any | null>(null)
  const [posicaoRato, setPosicaoRato] = useState({ x: 0, y: 0 })
  const hoveredOrbitaRef = useRef<number | null>(null)
  
  const resultadosRef = useRef<HTMLDivElement>(null)

  const [jogoValidado, setJogoValidated] = useState(false)
  const [estatisticas, setEstatisticas] = useState({ acertos: 0, erros: 0, taxa: 0, vazios: 8 })
  const [fraseAtualCoronel, setFraseAtualCoronel] = useState("")
  
  const [cronometro, setCronometro] = useState(0)
  const [cronometroAtivo, setCronometroAtivo] = useState(false)
  const [scrollBloqueado, setScrollBloqueado] = useState(false)
  
  const [dicaOrbitaIndice, setDicaOrbitaIndice] = useState<number | null>(null)
  const [usouDica, setUsouDica] = useState(false)
  const [patenteCosmica, setPatenteCosmica] = useState("")

  // Monitor de bloqueio do scroll global da página
  useEffect(() => {
    if (scrollBloqueado) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [scrollBloqueado])

  const setHoveredOrbita = (i: number | null) => {
    hoveredOrbitaRef.current = i
    if (i !== null) document.body.style.cursor = 'copy'
    else document.body.style.cursor = 'auto'
  }

  useEffect(() => {
    let intervalo: any = null
    if (cronometroAtivo) {
      intervalo = setInterval(() => {
        setCronometro((prev) => prev + 1)
      }, 1000)
    } else {
      clearInterval(intervalo)
    }
    return () => clearInterval(intervalo)
  }, [cronometroAtivo])

  const formatarTempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60)
    const segs = segundos % 60
    return `${mins.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`
  }

  const inicializarJogo = () => {
    setDoca([...planetasJogaveis].sort(() => Math.random() - 0.5))
    setOrbitas(Array(8).fill(null))
    setJogoValidated(false)
    setEstatisticas({ acertos: 0, erros: 0, taxa: 0, vazios: 8 })
    setCronometro(0)
    setCronometroAtivo(false)
    setScrollBloqueado(false)
    setDicaOrbitaIndice(null)
    setUsouDica(false)
    setPatenteCosmica("")
  }

  useEffect(() => { inicializarJogo() }, [])

  const iniciarArrasto = (e: React.PointerEvent, planeta: any) => {
    if (!jogoValidado || estatisticas.erros > 0) {
      setPlanetaArrastado(planeta)
      setPosicaoRato({ x: e.clientX, y: e.clientY })
      
      // BLOQUEIA SCROLL imediatamente ao interagir
      setScrollBloqueado(true) 
      
      if (!cronometroAtivo && !jogoValidado) {
        setCronometroAtivo(true)
      }
    }
  }

  useEffect(() => {
    const lidarComMove = (e: MouseEvent) => { if (planetaArrastado) setPosicaoRato({ x: e.clientX, y: e.clientY }) }
    const lidarComDrop = () => {
      if (planetaArrastado) {
        const alvo = hoveredOrbitaRef.current
        if (alvo !== null && orbitas[alvo] === null) {
          const novasOrbitas = [...orbitas]
          novasOrbitas[alvo] = planetaArrastado
          setOrbitas(novasOrbitas)
          setDoca(prev => prev.filter(p => p.slug !== planetaArrastado.slug))
          setJogoValidated(false)
          setDicaOrbitaIndice(null)
        }
        setPlanetaArrastado(null)
        setHoveredOrbita(null)
        // Nota: O scroll continua bloqueado até validar ou reiniciar conforme pedido!
      }
    }
    
    if (planetaArrastado) {
      window.addEventListener('mousemove', lidarComMove)
      window.addEventListener('mouseup', lidarComDrop)
    }
    return () => {
      window.removeEventListener('mousemove', lidarComMove)
      window.removeEventListener('mouseup', lidarComDrop)
    }
  }, [planetaArrastado, orbitas])

  const acionarDicaQG = () => {
    if (doca.length === 0 || jogoValidado) return
    const primeiroPlanetaDoca = doca[0]
    const slugAlvo = primeiroPlanetaDoca.slug === 'netuno' ? 'neptuno' : primeiroPlanetaDoca.slug
    const indiceCorreto = ORDEM_CORRETA_SOLAR.indexOf(slugAlvo)
    
    if (indiceCorreto !== -1) {
      setDicaOrbitaIndice(indiceCorreto)
      setUsouDica(true)
      setTimeout(() => setDicaOrbitaIndice(null), 4000)
    }
  }

  const verificarAlinhamento = () => {
    let acc = 0, err = 0, vz = 0

    ORDEM_CORRETA_SOLAR.forEach((slugCorreto, index) => {
      const planetaColocado = orbitas[index]
      if (!planetaColocado) { vz++ } 
      else {
        const slugFormatado = planetaColocado.slug === 'netuno' ? 'neptuno' : planetaColocado.slug
        if (slugFormatado === slugCorreto) acc++
        else err++
      }
    })

    const taxaCalculada = Math.round((acc / 8) * 100)
    setEstatisticas({ acertos: acc, erros: err, taxa: taxaCalculada, vazios: vz })
    
    if (err > 0 || vz > 0) {
      setFraseAtualCoronel(FRASES_CORONEL_ERRO[Math.floor(Math.random() * FRASES_CORONEL_ERRO.length)])
    } else {
      if (cronometro <= 45 && !usouDica) setPatenteCosmica("Marechal das Galáxias (Perfeito & Veloz)")
      else if (cronometro <= 90) setPatenteCosmica("Comandante Estelar")
      else if (usouDica) setPatenteCosmica("Piloto de Reconhecimento (Auxiliado pelo QG)")
      else setPatenteCosmica("Sargento Orbital")
    }

    setCronometroAtivo(false)
    setScrollBloqueado(false) // DESBLOQUEIA SCROLL ao validar
    setJogoValidated(true)

    // Executa scroll suave automático para baixo para revelar os dados
    setTimeout(() => {
      resultadosRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <>
      {planetaArrastado && (
        <div style={{
          position: 'fixed', top: posicaoRato.y, left: posicaoRato.x, transform: 'translate(-50%, -50%)',
          pointerEvents: 'none', zIndex: 9999, background: planetaArrastado.color, color: '#000',
          padding: '6px 12px', borderRadius: '30px', fontWeight: 800, fontSize: '0.7rem',
          letterSpacing: '0.1em', textTransform: 'uppercase', boxShadow: `0 0 20px ${planetaArrastado.color}`
        }}>
          A posicionar {planetaArrastado.name}...
        </div>
      )}

      <div style={{ width: '100%', maxWidth: '820px', margin: '0 auto 3rem', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 20 }}>
        
        {/* SECÇÃO COMPACTA DO CABEÇALHO COM ORDEM DO CORONEL */}
        <div style={{ background: 'rgba(2, 9, 20, 0.7)', border: '1px solid rgba(0, 229, 255, 0.15)', borderRadius: '8px', padding: '0.8rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0, 229, 255, 0.1)', paddingBottom: '0.4rem', marginBottom: '0.4rem' }}>
            <h3 style={{ color: '#00e5ff', fontSize: '1rem', fontWeight: 800, letterSpacing: '0.12em', margin: 0 }}>
              SIMULADOR ORBITAL
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#00e5ff', fontFamily: 'monospace', fontSize: '0.85rem', fontWeight: 700 }}>
              <IconeRelogio /> {formatarTempo(cronometro)}
            </div>
          </div>
          
          <p style={{ color: '#e0e0f0', fontSize: '0.78rem', margin: '0 0 4px 0', lineHeight: '1.3' }}>
            <strong style={{ color: '#ff3333', letterSpacing: '0.05em' }}>ORDEM DO CORONEL:</strong> "Recruta, o Alinhamento de Huíla detetou anomalias gravitacionais! Reordene os 8 planetas a contar do Sol imediatamente para evitar o colapso."
          </p>
          <p style={{ color: '#8a99ad', fontSize: '0.72rem', margin: 0 }}>
            <strong style={{ color: '#00e5ff' }}>Instrução Tática:</strong> Arraste cada planeta para a órbita correta. O ecrã tranca o scroll no primeiro clique para foco operacional total e liberta ao carregar em <strong>Validar</strong>.
          </p>
        </div>

        {/* ECRÃ 3D (Mais compacto) */}
        <div style={{ 
            width: '100%', height: '330px', position: 'relative', borderRadius: '8px', border: '1px solid rgba(0, 229, 255, 0.15)',
            background: 'radial-gradient(circle at center, #06162c 0%, #020914 75%, #000000 100%)', overflow: 'hidden'
          }}>
          <Canvas camera={{ position: [0, 0, 17], fov: 48 }}>
            <ambientLight intensity={0.7} color="#ffffff" />
            <pointLight position={[6, 3, 8]} intensity={2.2} />
            <Suspense fallback={null}>
              <SolDoJogo />
              {orbitas.map((planeta, i) => planeta ? <PlanetaNaOrbita key={planeta.slug} slug={planeta.slug} radius={13 + (i * 2.6)} /> : null)}
            </Suspense>
            <OrbitasDoJogo orbitas={orbitas} setHoveredOrbita={setHoveredOrbita} validado={jogoValidado} indiceDica={dicaOrbitaIndice} />
            <Stars radius={100} depth={30} count={1000} factor={4} saturation={0.5} fade speed={1} />
          </Canvas>
        </div>

        {/* DOCA DE PLANETAS CORES E COMPACTA */}
        <div style={{ 
          display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0.6rem', 
          background: 'rgba(2, 9, 20, 0.5)', border: '1px solid rgba(0, 229, 255, 0.1)', 
          borderRadius: '8px', backdropFilter: 'blur(4px)', gap: '0.6rem', overflowX: 'auto', minHeight: '105px'
        }}>
          {doca.map((planeta) => (
            <ItemPlanetaDoca 
              key={planeta.slug} planeta={planeta}
              aoIniciarArrasto={(e) => iniciarArrasto(e, planeta)}
            />
          ))}

          {doca.length === 0 && !jogoValidado && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#00e5ff', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em' }}>
              <IconeAlerta /> TODOS OS PLANETAS POSICIONADOS. SOLICITAR VALIDAÇÃO!
            </div>
          )}
        </div>

        {/* CONTROLOS DO SIMULADOR */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.8rem', marginTop: '0.2rem' }}>
          <button onClick={verificarAlinhamento} style={{
              background: 'rgba(0, 229, 255, 0.08)', color: '#00e5ff', padding: '0.5rem 1.8rem',
              fontSize: '0.75rem', fontWeight: 700, border: '1px solid rgba(0, 229, 255, 0.4)', 
              borderRadius: '5px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'all 0.2s'
            }}>
            Validar Alinhamento
          </button>

          {doca.length > 0 && !jogoValidado && (
            <button onClick={acionarDicaQG} style={{
                background: 'rgba(241, 196, 15, 0.04)', color: '#f1c40f', padding: '0.5rem 1.2rem',
                fontSize: '0.75rem', fontWeight: 700, border: '1px solid rgba(241, 196, 15, 0.3)', 
                borderRadius: '5px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '6px'
              }}>
              <IconeRadar /> Info Radar
            </button>
          )}

          <button onClick={inicializarJogo} style={{
              background: 'rgba(255, 255, 255, 0.02)', color: '#ffffff', padding: '0.5rem 1.5rem',
              fontSize: '0.75rem', fontWeight: 700, border: '1px solid rgba(255, 255, 255, 0.15)', 
              borderRadius: '5px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em'
            }}>
            Reiniciar
          </button>
        </div>

        {/* QUADRO TÁTICO DE RESULTADOS (SCROLL DESTINO AUTOMÁTICO) */}
        <div ref={resultadosRef} style={{ scrollMarginTop: '1rem' }}>
          {jogoValidado && (
            <div style={{ 
              background: 'rgba(2, 9, 20, 0.85)', border: '1px solid rgba(0, 229, 255, 0.2)', 
              borderRadius: '8px', padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.4rem'
            }}>
              
              {/* Grelha de Métricas Estendida com o Tempo de Montagem */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.8rem' }}>
                <div style={{ background: 'rgba(0, 255, 102, 0.06)', border: '1px solid rgba(0, 255, 102, 0.25)', borderRadius: '6px', padding: '0.6rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
                  <div style={{ color: '#00ff66', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase' }}><IconeCheck /> Acertos</div>
                  <span style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 800 }}>{estatisticas.acertos}</span>
                </div>

                <div style={{ background: 'rgba(255, 51, 51, 0.06)', border: '1px solid rgba(255, 51, 51, 0.25)', borderRadius: '6px', padding: '0.6rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
                  <div style={{ color: '#ff3333', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase' }}><IconeErro /> Erros</div>
                  <span style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 800 }}>{estatisticas.erros}</span>
                </div>

                <div style={{ background: 'rgba(0, 229, 255, 0.06)', border: '1px solid rgba(0, 229, 255, 0.25)', borderRadius: '6px', padding: '0.6rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
                  <div style={{ color: '#00e5ff', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase' }}><IconeTaxa /> Aprendizado</div>
                  <span style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 800 }}>{estatisticas.taxa}%</span>
                </div>

                {/* ADICIONADO: Tempo Total Utilizado na Montagem */}
                <div style={{ background: 'rgba(241, 196, 15, 0.06)', border: '1px solid rgba(241, 196, 15, 0.25)', borderRadius: '6px', padding: '0.6rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
                  <div style={{ color: '#f1c40f', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase' }}><IconeRelogio /> Tempo de Missão</div>
                  <span style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 800 }}>{formatarTempo(cronometro)}</span>
                </div>
              </div>

              {/* Canal de Despacho do Coronel */}
              <div style={{ textAlign: 'center', paddingTop: '0.2rem' }}>
                {estatisticas.vazios > 0 ? (
                  <p style={{ color: '#a0a0b0', margin: 0, fontSize: '0.85rem' }}>Ainda tens {estatisticas.vazios} planetas por colocar na órbita de simulação.</p>
                ) : !jogoValidado ? null : estatisticas.erros > 0 ? (
                  <div style={{ background: '#1a0d0d', borderLeft: '4px solid #ff3333', padding: '0.8rem', borderRadius: '4px' }}>
                    <p style={{ color: '#ff4d4d', fontWeight: 700, fontStyle: 'italic', margin: 0, fontSize: '0.9rem' }}>
                      "{fraseAtualCoronel}"
                    </p>
                  </div>
                ) : (
                  <div style={{ background: '#0a1a12', borderLeft: '4px solid #00ff66', padding: '1rem', borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '1rem', textTransform: 'uppercase', color: '#00ff66' }}>
                      <IconeTrofeu /> MISSÃO BEM-SUCEDIDA! <IconeTrofeu />
                    </div>
                    
                    <div style={{ color: '#fff', fontSize: '0.85rem' }}>
                      Patente Galáctica Outorgada: <strong style={{ color: '#f1c40f', textTransform: 'uppercase' }}>{patenteCosmica}</strong>
                    </div>

                    <p style={{ color: '#00ff66', fontWeight: 700, fontStyle: 'italic', margin: '0.2rem 0 0 0', fontSize: '0.9rem' }}>
                      "Alinhamento perfeito, soldado. Mostraste precisão digna de um oficial!"
                    </p>
                    
                    <div style={{ color: '#00ff66', animation: 'bounce 2s infinite', marginTop: '0.2rem' }}>
                      <IconeSetaBaixo />
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

      </div>
    </>
  )
}