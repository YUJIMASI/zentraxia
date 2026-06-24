'use client'

export default function LoadingPlaneta() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#000005',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      fontFamily: 'sans-serif',
    }}>
      {/* Scanner Holográfico Animado */}
      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <div style={{
          width: '80px',
          height: '80px',
          border: '2px solid rgba(79, 195, 247, 0.2)',
          borderRadius: '50%',
          borderTopColor: '#4fc3f7',
          animation: 'rodar Loading 1s linear infinite',
        }} />
        <i className="bi bi-radar" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#4fc3f7',
          fontSize: '1.5rem',
        }} />
      </div>

      <p style={{
        color: '#4fc3f7',
        fontSize: '0.85rem',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        margin: 0,
        animation: 'pulsarTexto 1.5s ease-in-out infinite',
        textAlign: 'center',
        padding: '0 1rem'
      }}>
        Aproximando da Órbita...
      </p>

      <style>{`
        @keyframes rodarLoading {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulsarTexto {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}