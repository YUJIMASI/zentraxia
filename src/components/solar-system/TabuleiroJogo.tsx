'use client'

import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { useRef, Suspense } from 'react'
import * as THREE from 'three'

// 1. Componente do Sol: Gigante e empurrado quase para fora da margem direita
function SolDoJogo() {
  const solRef = useRef<THREE.Mesh>(null)
  const texturaSol = useLoader(THREE.TextureLoader, '/textures/sun.jpg')

  useFrame(() => {
    if (solRef.current) {
      solRef.current.rotation.y += 0.0015 // Rotação bem lenta para dar noção de tamanho massivo
    }
  })

  return (
    // Posição X = 13 (bem para a direita). Raio = 9.0 (gigante).
    // Isto faz com que a borda esquerda do Sol fique na zona visível (X = 4), e o resto escondido.
    <mesh ref={solRef} position={[13, 0, 0]}>
      <sphereGeometry args={[9.0, 64, 64]} />
      <meshStandardMaterial 
        map={texturaSol} 
        emissive={new THREE.Color('#ffaa00')} 
        emissiveIntensity={0.2} 
      />
    </mesh>
  )
}

// 2. Componente das Órbitas: Expandem-se a partir da borda do Sol gigante
function OrbitasDoJogo() {
  const totalOrbitas = 8
  return (
    <>
      {[...Array(totalOrbitas)].map((_, i) => {
        // A primeira órbita começa no raio 13 (bem mais afastada da superfície do sol, que é 9.0)
        // Cada órbita afasta-se 2.6 unidades, distribuindo as 8 órbitas por todo o espaço visível à esquerda do Sol
        const raio = 13 + (i * 2.6) 
        return (
          // O centro das órbitas tem de ser EXATAMENTE o mesmo centro do Sol (X = 13)
          // Sem rotação: o anel fica de frente para a câmara, criando o efeito de "linhas curvas verticais"
          <mesh key={i} position={[13, 0, 0]}>
            <ringGeometry args={[raio, raio + 0.05, 128]} />
            <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.95} />
          </mesh>
        )
      })}
    </>
  )
}

export default function TabuleiroJogo() {
  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '1100px', 
      margin: '0 auto 5rem', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1.5rem', 
      position: 'relative', 
      zIndex: 20 
    }}>
      
      {/* Cabeçalho do Minijogo */}
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ color: '#00e5ff', fontSize: '1.4rem', fontWeight: 800, letterSpacing: '0.15em', margin: '0 0 0.5rem 0' }}>
          SIMULADOR DE ALINHAMENTO ORBITAL
        </h3>
        <p style={{ color: '#a0a0b0', fontSize: '0.9rem', margin: 0 }}>
          Posiciona os corpos celestes correspondentes nas suas respetivas órbitas.
        </p>
      </div>

      {/* 🌌 ÁREA PRINCIPAL DO CANVAS 3D */}
      <div style={{ 
        width: '100%', 
        height: '450px', 
        position: 'relative',
        borderRadius: '12px',
        border: '1px solid rgba(0, 229, 255, 0.2)',
        background: 'radial-gradient(circle at center, #06162c 0%, #020914 70%, #000000 100%)',
        overflow: 'hidden',
        boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8)'
      }}>
        
        {/* Recuei um pouco a câmara (Z = 16) para que os anéis mais distantes fiquem bem visíveis do lado esquerdo */}
        <Canvas camera={{ position: [0, 0, 16], fov: 55 }}>
          <ambientLight intensity={0.7} color="#ffffff" />
          {/* Luz apontada para a borda esquerda do Sol para dar volume */}
          <pointLight position={[6, 0, 8]} intensity={2.5} />

          <Suspense fallback={null}>
            <SolDoJogo />
          </Suspense>

          <OrbitasDoJogo />
          
          <Stars radius={100} depth={30} count={1200} factor={4} saturation={0.5} fade speed={1} />
        </Canvas>

      </div>

      {/* Doca de Seleção dos Planetas */}
      <div style={{
        display: 'flex', 
        justifyContent: 'space-between', 
        padding: '1.5rem',
        background: 'rgba(2, 9, 20, 0.5)', 
        border: '1px solid rgba(0, 229, 255, 0.12)', 
        borderRadius: '8px',
        backdropFilter: 'blur(4px)',
        gap: '1rem',
        overflowX: 'auto'
      }}>
        {[...Array(8)].map((_, i) => (
          <div key={`base-${i}`} style={{
            width: '72px', 
            height: '72px', 
            borderRadius: '50%', 
            flexShrink: 0,
            border: '2px dashed rgba(0, 229, 255, 0.25)', 
            display: 'flex',
            alignItems: 'center', 
            justifyContent: 'center', 
            color: 'rgba(0, 229, 255, 0.4)',
            fontSize: '0.75rem', 
            fontWeight: 600,
            letterSpacing: '0.05em'
          }}>
            VAGO
          </div>
        ))}
      </div>

      {/* Ação de validação */}
      <div style={{ textAlign: 'center' }}>
        <button style={{
          background: 'rgba(0, 229, 255, 0.05)', 
          color: '#00e5ff', 
          padding: '0.75rem 2.5rem',
          fontSize: '0.85rem', 
          fontWeight: 600, 
          border: '1px solid rgba(0, 229, 255, 0.4)', 
          borderRadius: '6px',
          cursor: 'pointer', 
          textTransform: 'uppercase', 
          letterSpacing: '0.15em',
          transition: 'all 0.3s'
        }}>
          Verificar Órbitas
        </button>
      </div>

    </div>
  )
}