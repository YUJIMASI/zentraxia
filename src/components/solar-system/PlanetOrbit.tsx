'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

interface PlanetProps {
  slug: string
  name: string
  textureUrl: string
  size: number
  orbitRadius: number
  orbitSpeed: number
  timeMultiplier?: number
}

export default function PlanetOrbit({ 
  slug, name, textureUrl, size, orbitRadius, orbitSpeed, timeMultiplier = 1 
}: PlanetProps) {
  
  const planetRef = useRef<THREE.Mesh>(null)
  const orbitGroupRef = useRef<THREE.Group>(null)
  
  const texture = useTexture(textureUrl)
  const isSun = slug === 'sol'
  const isSaturn = slug === 'saturno'

  useFrame((state, delta) => {
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y += orbitSpeed * timeMultiplier * delta
    }
    if (planetRef.current) {
      planetRef.current.rotation.y += (orbitSpeed * 2) * timeMultiplier * delta
    }
  })

  return (
    <group ref={orbitGroupRef}>
      <mesh ref={planetRef} position={[orbitRadius, 0, 0]} castShadow={!isSun} receiveShadow={!isSun}>
        <sphereGeometry args={[size, 64, 64]} />
        {isSun ? (
          <meshBasicMaterial map={texture} />
        ) : (
          <meshStandardMaterial map={texture} roughness={0.6} metalness={0.1} />
        )}
      </mesh>

      {isSaturn && (
        <mesh position={[orbitRadius, 0, 0]} rotation={[Math.PI / 2 + 0.3, 0, 0]} receiveShadow castShadow>
          <ringGeometry args={[size * 1.3, size * 2.2, 64]} />
          <meshStandardMaterial color="#c2b280" side={THREE.DoubleSide} transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  )
}