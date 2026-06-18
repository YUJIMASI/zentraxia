'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture, Html } from '@react-three/drei'
import * as THREE from 'three'
import { useRouter } from 'next/navigation'

interface PlanetProps {
  slug: string
  name: string
  textureUrl: string
  size: number
  orbitRadius: number
  orbitSpeed: number
  color: string
}

export default function Planet3D({ slug, name, textureUrl, size, orbitRadius, orbitSpeed, color }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const texture = useTexture(textureUrl)
  const router = useRouter()
  
  const [hovered, setHovered] = useState(false)

  const raioPlaneta = size * 0.4

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * orbitSpeed * 0.15
    }
  })

  // 🪐 CORREÇÃO ROBUSTA: Deteta se é Saturno ou Urano/Netuno com base no teu data/planets.ts
  const esSaturno = slug === 'saturno'
  const temAneisDiscretos = slug === 'urano' || slug === 'netuno'

  return (
    <group ref={groupRef}>
      {/* Grupo do Planeta na Órbita */}
      <group position={[orbitRadius, 0, 0]}>
        
        <directionalLight position={[1, 1, 1]} intensity={0.6} />

        <mesh 
          ref={meshRef} 
          castShadow 
          receiveShadow
          onClick={() => router.push(`/planetas/${slug}`)}
          onPointerOver={(e) => {
            e.stopPropagation()
            document.body.style.cursor = 'pointer'
            setHovered(true)
            
            if (meshRef.current && meshRef.current.material) {
              const material = Array.isArray(meshRef.current.material) ? meshRef.current.material[0] : meshRef.current.material
              if ('emissive' in material) {
                const stdMaterial = material as THREE.MeshStandardMaterial
                stdMaterial.emissive.set(color)
                stdMaterial.emissiveIntensity = 0.2
              }
            }
          }}
          onPointerOut={(e) => {
            document.body.style.cursor = 'default'
            setHovered(false)
            
            if (meshRef.current && meshRef.current.material) {
              const material = Array.isArray(meshRef.current.material) ? meshRef.current.material[0] : meshRef.current.material
              if ('emissive' in material) {
                const stdMaterial = material as THREE.MeshStandardMaterial
                stdMaterial.emissiveIntensity = 0
              }
            }
          }}
        >
          <sphereGeometry args={[raioPlaneta, 32, 32]} />
          <meshStandardMaterial 
            map={texture} 
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>

        {/* 🪐 ANÉIS SUNTUOSOS DE SATURNO */}
        {esSaturno && (
          <mesh rotation={[Math.PI / 2.8, Math.PI / 8, 0]}> 
            <ringGeometry args={[raioPlaneta * 1.3, raioPlaneta * 2.4, 64]} />
            <meshBasicMaterial 
              color="#c2a96e" // Usando o tom exato do teu ringColor do data
              side={THREE.DoubleSide} 
              transparent={true}
              opacity={0.85}
            />
          </mesh>
        )}

        {/* ☄️ ANÉIS SUBTIS PARA URANO E NETUNO (Como diz na tua especificação, são muito menos visíveis) */}
        {temAneisDiscretos && (
          <mesh rotation={[Math.PI / 2.2, 0, 0]}> 
            <ringGeometry args={[raioPlaneta * 1.4, raioPlaneta * 1.6, 64]} />
            <meshBasicMaterial 
              color={color} 
              side={THREE.DoubleSide} 
              transparent={true}
              opacity={0.25} // Bem clarinho e fino, super realista
            />
          </mesh>
        )}

        {/* Tag do Nome no Hover */}
        <Html
          position={[0, -raioPlaneta - 0.6, 0]} 
          center
          style={{
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            transition: 'all 0.3s ease',
            opacity: hovered ? 1 : 0,
            transform: `scale(${hovered ? 1 : 0.8})`,
          }}
        >
          <div style={{
            background: 'rgba(5, 5, 15, 0.85)',
            border: `1px solid ${color}`,
            color: '#fff',
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '11px',
            fontFamily: 'sans-serif',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            boxShadow: `0 0 15px ${color}44`,
          }}>
            {name}
          </div>
        </Html>
      </group>

      {/* Linha da Órbita de Fundo */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[orbitRadius - 0.03, orbitRadius + 0.03, 64]} />
        <meshBasicMaterial color="rgba(255, 255, 255, 0.05)" side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}