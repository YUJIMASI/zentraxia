'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Torus } from '@react-three/drei'
import PlanetOrbit from './PlanetOrbit' // Certifica-te de que o caminho corresponde ao novo ficheiro
import { Suspense, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import * as THREE from 'three'
import { planets } from '@/data/planets'
import Planet3D from './planet' // Certifica-te que o caminho está correto

// --- COMPONENTE DE CÂMARA CINEMÁTICA ---
// Substitua a sua função CameraRig atual por esta:
function CameraRig({ isLoaded, skipIntro }: { isLoaded: boolean; skipIntro: boolean }) {
  useFrame((state) => {
    if (isLoaded) {
      const target = skipIntro ? new THREE.Vector3(0, 25, 45) : new THREE.Vector3(0, 20, 35)
      state.camera.position.lerp(target, 0.03)
    }
  })
  return null
}

export default function SolarSystemScene() {
  const searchParams = useSearchParams()
  const skipIntro = searchParams.get('skipIntro') === 'true'
  const controlsRef = useRef<any>(null)

  // ESTADOS DA INTERFACE E FÍSICA
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadingText, setLoadingText] = useState("A processar...")
  const [menuOpen, setMenuOpen] = useState(false)
  const [speedMultiplier, setSpeedMultiplier] = useState(1)
  
  // ESTADOS DO RELÓGIO
  const [simTime, setSimTime] = useState(new Date())
  const lastUpdateRef = useRef(Date.now())

  // Efeito de Carregamento (Intro "Chegando à Via Láctea")
  useEffect(() => {
    if (skipIntro) {
      setIsLoaded(true)
      return
    }
    setTimeout(() => setLoadingText("Chegando à Via Láctea em 3..."), 1000)
    setTimeout(() => setLoadingText("Chegando à Via Láctea em 2..."), 2000)
    setTimeout(() => setLoadingText("Chegando à Via Láctea em 1..."), 3000)
    setTimeout(() => setIsLoaded(true), 4000)
  }, [skipIntro])

  // Lógica do Relógio com Dilatação Temporal
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      const delta = now - lastUpdateRef.current
      lastUpdateRef.current = now

      // Adiciona o tempo multiplicado pela velocidade (pode andar para trás se negativo!)
      setSimTime(prev => new Date(prev.getTime() + delta * speedMultiplier))
    }, 50) // Atualiza rapidamente para o relógio ser fluído na UI
    return () => clearInterval(interval)
  }, [speedMultiplier])

  const formatTime = (date: Date) => {
    return date.toLocaleString('pt-PT', { 
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    })
  }

  const rolarParaCuriosidades = () => {
    const seccao = document.getElementById('curiosidades')
    if (seccao) {
      seccao.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div style={{ width: '100vw', height: '85vh', position: 'relative', overflow: 'hidden', background: 'radial-gradient(circle at center, #06162c 0%, #010409 70%, #000000 100%)' }}>
      
      {/* 🚀 ECRÃ DE CARREGAMENTO */}
      {!isLoaded && (
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: '#000000', zIndex: 100, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', color: '#00e5ff', fontFamily: 'monospace'
        }}>
          <div style={{ width: '50px', height: '50px', border: '3px solid transparent', borderTopColor: '#00e5ff', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '20px' }}></div>
          <h2 style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}>{loadingText}</h2>
          <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* 🛸 UI: MENU SUPERIOR DIREITO */}
      <div style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 90, display: 'flex', alignItems: 'center', gap: '15px' }}>
        {/* Relógio Externo (esconde quando menu abre) */}
        {!menuOpen && (
          <div style={{ background: 'rgba(0, 0, 0, 0.5)', border: '1px solid #00e5ff', padding: '8px 15px', borderRadius: '4px', color: '#00e5ff', fontFamily: 'monospace', fontWeight: 'bold' }}>
            {formatTime(simTime)}
          </div>
        )}

        {/* Botão Hambúrguer */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'rgba(0, 229, 255, 0.1)', border: '1px solid #00e5ff', color: '#00e5ff', width: '45px', height: '45px', borderRadius: '4px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
        >
          <span style={{ width: '20px', height: '2px', background: '#00e5ff' }}></span>
          <span style={{ width: '20px', height: '2px', background: '#00e5ff' }}></span>
          <span style={{ width: '20px', height: '2px', background: '#00e5ff' }}></span>
        </button>
      </div>

      {/* 🎛️ SIDEBAR (ABRE AO CLICAR NO HAMBÚRGUER) */}
      <div style={{
        position: 'absolute', top: 0, right: menuOpen ? 0 : '-350px', width: '320px', height: '100%',
        background: 'rgba(2, 9, 20, 0.85)', backdropFilter: 'blur(10px)', borderLeft: '1px solid rgba(0, 229, 255, 0.3)',
        transition: 'right 0.4s cubic-bezier(0.4, 0, 0.2, 1)', zIndex: 95, padding: '2rem', display: 'flex', flexDirection: 'column'
      }}>
        <h3 style={{ color: '#fff', marginTop: '4rem', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>PAINEL DE CONTROLO</h3>
        
        {/* Relógio Interno */}
        <div style={{ background: 'rgba(0, 229, 255, 0.05)', border: '1px dashed #00e5ff', padding: '10px', textAlign: 'center', color: '#00e5ff', fontFamily: 'monospace', marginBottom: '2rem' }}>
          {formatTime(simTime)}
        </div>

        {/* Controlo de Velocidade */}
        <label style={{ color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '1rem' }}>
          MOTOR TEMPORAL: <span style={{ color: speedMultiplier !== 1 ? '#ff3366' : '#00e5ff' }}>{speedMultiplier}x</span>
        </label>
        
        <input 
          type="range" min="-1" max="2.5" step="0.1" 
          value={speedMultiplier} onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))}
          style={{ width: '100%', marginBottom: '1rem', accentColor: '#00e5ff' }}
        />

        {/* Botão de Normalização (Só aparece se a velocidade foi alterada) */}
        {speedMultiplier !== 1 && (
          <button 
            onClick={() => setSpeedMultiplier(1)}
            style={{ background: 'transparent', border: '1px solid #ff3366', color: '#ff3366', padding: '8px', borderRadius: '4px', cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 'bold' }}
          >
            Restaurar Velocidade Normal
          </button>
        )}
      </div>

      {/* 🌌 CENA 3D */}
      <Canvas shadows camera={{ position: [0, 150, 250], fov: 55 }}> 
        {/* Posição inicial da câmara está muito longe. O CameraRig vai puxá-la para perto após o loading */}
        <CameraRig isLoaded={isLoaded} skipIntro={skipIntro} />

        {/* Luz Ambiente fraca só para os planetas não ficarem 100% pretos no lado escuro */}
        <ambientLight intensity={0.02} />
        
        {/* A ÚNICA FONTE DE LUZ: O próprio SOL no centro da tela */}
        <pointLight position={[0, 0, 0]} intensity={12} distance={300} decay={1.5} castShadow />

        <Suspense fallback={null}>
          {planets.map((astro, index) => {
            const isSun = astro.slug === 'sol'
            const orbitRadius = isSun ? 0 : 7.5 + (index - 1) * 4.0
            const orbitSpeed = isSun ? 0 : 1 / ((index - 1) + 1.5)
            
            // Inclinação orbital para dar realismo (uns mais altos, outros mais baixos)
            const randomInclination = isSun ? 0 : (index % 2 === 0 ? 0.08 : -0.05) * index

            return (
              <group key={astro.slug} rotation={[randomInclination, 0, 0]}>
                {/* Renderiza a Linha de Órbita */}
                {!isSun && (
                  <Torus args={[orbitRadius, 0.01, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshBasicMaterial color="#00e5ff" transparent opacity={0.1} />
                  </Torus>
                )}

                <PlanetOrbit
                  slug={astro.slug}
                  name={astro.name}
                  textureUrl={astro.textureUrl}
                  size={astro.size}
                  orbitRadius={orbitRadius} 
                  orbitSpeed={orbitSpeed}
                  timeMultiplier={speedMultiplier} // Passa a velocidade do tempo!
                />
              </group>
            )
          })}
        </Suspense>

        <Stars radius={150} depth={50} count={4000} factor={4} saturation={0.8} fade speed={1.5 * speedMultiplier} />
        
        <OrbitControls 
          ref={controlsRef}
          enableZoom={true} 
          maxDistance={120} 
          minDistance={8} 
          enableDamping 
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 1.5} 
        />
      </Canvas>

      {/* 🚀 BOTÃO INFERIOR */}
      <button
        onClick={rolarParaCuriosidades}
        style={{
          position: 'absolute', bottom: '2.5rem', right: '2.5rem', zIndex: 80,
          background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.1) 0%, rgba(2, 9, 20, 0.8) 100%)',
          border: '1px solid rgba(0, 229, 255, 0.3)', borderLeft: '3px solid #00e5ff',
          color: '#00e5ff', padding: '1rem 2rem', borderRadius: '4px', cursor: 'pointer',
          fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', backdropFilter: 'blur(8px)'
        }}
      >
        Continuar Exploração ↓
      </button>

    </div>
  )
}