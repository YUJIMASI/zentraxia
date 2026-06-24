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
  // ADICIONADO: Propriedade para receber a função de clique vinda da cena principal
  onSelect?: (slug: string, position: THREE.Vector3) => void 
}

export default function PlanetOrbit({ 
  slug, name, textureUrl, size, orbitRadius, orbitSpeed, timeMultiplier = 1, onSelect 
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

  // ADICIONADO: Função que é executada quando clicas no planeta
  const handleClick = (e: any) => {
    e.stopPropagation() // Muito importante: impede que o clique atravesse o planeta e clique no vazio/estrelas
    
    if (planetRef.current && onSelect) {
      // Cria um vetor vazio
      const position = new THREE.Vector3()
      // Preenche o vetor com a posição exata do planeta no mundo 3D
      planetRef.current.getWorldPosition(position)
      // Envia o slug e a posição de volta para o SolarSystemScene
      onSelect(slug, position)
    }
  }

  return (
    <group ref={orbitGroupRef}>
      <mesh 
  ref={planetRef} 
  position={[orbitRadius, 0, 0]} 
  castShadow={!isSun} 
  receiveShadow={!isSun}
  onClick={handleClick}
  onPointerOver={() => (document.body.style.cursor = 'pointer')}
  onPointerOut={() => (document.body.style.cursor = 'default')}
>
        <sphereGeometry args={[size, 64, 64]} />
        {isSun ? (
          <>
            {/* Núcleo do Sol */}
            <meshBasicMaterial map={texture} />
            
            {/* Efeito de Fogo / Corona Solar 1 */}
            <mesh scale={1.08}>
              <sphereGeometry args={[size, 64, 64]} />
              <meshBasicMaterial color="#ff6600" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
            </mesh>
            
            {/* Efeito de Fogo / Corona Solar 2 */}
            <mesh scale={1.15}>
              <sphereGeometry args={[size, 64, 64]} />
              <meshBasicMaterial color="#ffaa00" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
            </mesh>
          </>
        ) : (
          // Planetas normais
          <meshStandardMaterial map={texture} roughness={0.4} metalness={0.2} />
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