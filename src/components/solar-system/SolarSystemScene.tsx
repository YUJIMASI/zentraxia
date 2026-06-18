'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Suspense, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { planets } from '@/data/planets'
import Planet3D from './planet'

export default function SolarSystemScene() {
  const searchParams = useSearchParams()
  const skipIntro = searchParams.get('skipIntro') === 'true'
  const controlsRef = useRef<any>(null)

  useEffect(() => {
    // Se o utilizador clicou em "Sair de Órbita", força os controlos para o centro imediatamente
    if (skipIntro && controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0)
      controlsRef.current.update()
    }
  }, [skipIntro])

  const rolarParaCuriosidades = () => {
    const seccao = document.getElementById('curiosidades')
    if (seccao) {
      seccao.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div style={{ 
      width: '100vw', 
      height: '85vh', 
      position: 'relative', 
      overflow: 'hidden',
      // 🌌 Gradiente radial que gera o fundo azul fosco/névoa cósmica
      background: 'radial-gradient(circle at center, #06162c 0%, #020914 70%, #000000 100%)'
    }}>
      
      {/* Ajusta a posição inicial da câmara baseado no skipIntro */}
      <Canvas camera={{ position: skipIntro ? [0, 22, 38] : [0, 20, 35], fov: 60 }} shadows>
        {/* Luz ambiente azulada para preservar o contraste fosco do espaço */}
        <ambientLight intensity={0.45} color="#102542" />
        <pointLight position={[0, 0, 0]} intensity={5} distance={150} decay={1.2} castShadow />

        <Suspense fallback={null}>
          {planets.map((astro, index) => (
            <Planet3D
              key={astro.slug}
              slug={astro.slug}
              name={astro.name}
              textureUrl={astro.textureUrl}
              size={astro.size}
              // O Sol (index 0) fica fixo no raio 0, os planetas calculam a distância dinamicamente
              orbitRadius={astro.slug === 'sol' ? 0 : 7.5 + (index - 1) * 4.0} 
              orbitSpeed={astro.slug === 'sol' ? 0 : 1 / ((index - 1) + 1.5)}
              color={astro.color}
            />
          ))}
        </Suspense>

        <Stars radius={120} depth={40} count={2500} factor={4} saturation={0.6} fade speed={1.2} />
        
        <OrbitControls 
          ref={controlsRef}
          enableZoom={true} 
          maxDistance={80} 
          minDistance={6} 
          enableDamping 
          dampingFactor={0.05} 
        />
      </Canvas>

      {/* 🚀 BOTÃO FLUTUANTE: CONTINUAR EXPLORAÇÃO */}
      <button
        onClick={rolarParaCuriosidades}
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2rem',
          zIndex: 99,
          background: 'rgba(0, 229, 255, 0.08)',
          border: '1px solid rgba(0, 229, 255, 0.4)',
          color: '#00e5ff',
          padding: '0.8rem 1.8rem',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: '0.85rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          backdropFilter: 'blur(4px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 0 15px rgba(0, 229, 255, 0.1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#00e5ff'
          e.currentTarget.style.color = '#000'
          e.currentTarget.style.boxShadow = '0 0 25px #00e5ff'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(0, 229, 255, 0.08)'
          e.currentTarget.style.color = '#00e5ff'
          e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 229, 255, 0.1)'
          e.currentTarget.style.transform = 'translateY(0px)'
        }}
      >
        Continuar Exploração ↓
      </button>

    </div>
  )
}