export interface PlanetData {
  slug: string
  name: string
  diameter: number
  mass: string
  gravity: number
  temperatureMin: number
  temperatureMax: number
  atmosphere: string
  distanceFromSun: number
  dayDuration: string
  yearDuration: string
  moons: number
  color: string
  ringColor?: string
  hasRings: boolean
  description: string
  curiosities: string[]
  orbitRadius: number
  orbitSpeed: number
  size: number
  textureUrl: string
}

export interface SunData {
  name: string
  diameter: number
  mass: string
  surfaceTemperature: number
  coreTemperature: number
  age: string
  composition: string
  description: string
  curiosities: string[]
}

export type QuizLevel = 'iniciante' | 'explorador' | 'astronomo' | 'cientista'

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  level: QuizLevel
  explanation: string
}

export interface IntroPhase {
  phase: 'stars' | 'loading' | 'warp' | 'planets' | 'hero'
}