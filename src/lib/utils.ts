export function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-PT').format(value)
}

export function formatTemperature(value: number): string {
  return `${value > 0 ? '+' : ''}${value}°C`
}

export function formatDistance(value: number): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)} mil milhões de km`
  }
  return `${value} milhões de km`
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

export function getOrbitPosition(
  radius: number,
  angle: number
): { x: number; z: number } {
  return {
    x: radius * Math.cos(angle),
    z: radius * Math.sin(angle),
  }
}

export function slugToName(slug: string): string {
  const names: Record<string, string> = {
    mercurio: 'Mercúrio',
    venus: 'Vénus',
    terra: 'Terra',
    marte: 'Marte',
    jupiter: 'Júpiter',
    saturno: 'Saturno',
    urano: 'Urano',
    netuno: 'Netuno',
  }
  return names[slug] || slug
}