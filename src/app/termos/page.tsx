'use client'; // Necessário se quisermos garantir que animações/interações funcionam perfeitamente no App Router

import React from 'react'
import Link from 'next/link'

// --- ÍCONES SVG TEMÁTICOS ---
const IconeVoltar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
const IconeDocumento = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
const IconeGlobo = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
const IconeEscudo = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
const IconeRadar = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 22v-4"></path><path d="M12 6V2"></path><path d="M22 12h-4"></path><path d="M6 12H2"></path><path d="M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path></svg>
const IconeRefresh = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path></svg>

const diretrizes = [
  {
    id: "01",
    titulo: "Aceitação do Protocolo",
    icone: <IconeDocumento />,
    texto: "Ao aceder e estabelecer ligação aos servidores da Zentráxia, o Cadete concorda formalmente em cumprir os parâmetros operacionais descritos neste manifesto. Se a sua biometria ou consciência rejeitar estes termos, aborte a missão e encerre o terminal imediatamente."
  },
  {
    id: "02",
    titulo: "Natureza da Simulação",
    icone: <IconeGlobo />,
    texto: "O ambiente Zentráxia é um holograma de treino tático e educativo. Embora a cartografia espacial e a astrofísica sejam rigorosas, tratam-se de representações lúdicas. O Alto Comando (Coronel) é uma Inteligência Artificial concebida para testar a sua resistência e conhecimento."
  },
  {
    id: "03",
    titulo: "Defesa de Propriedade Intelectual",
    icone: <IconeEscudo />,
    texto: "Todo o código-fonte, malhas 3D, patentes de frota e interfaces visuais estão protegidos sob jurisdição estelar. É expressamente proibida a engenharia reversa, contrabando de dados ou replicação não autorizada dos nossos sistemas interativos."
  },
  {
    id: "04",
    titulo: "Privacidade e Telemetria",
    icone: <IconeRadar />,
    texto: "A sua rota é anónima. A Zentráxia regista apenas o seu progresso localmente (no terminal da sua nave/browser) para manter o registo de medalhas intacto. Nenhuma sonda recolhe dados biográficos sensíveis ou comunica a sua localização a federações terceiras."
  },
  {
    id: "05",
    titulo: "Atualização de Matrizes",
    icone: <IconeRefresh />,
    texto: "O Alto Comando reserva-se o direito de reconfigurar estas diretrizes caso o contínuo espaço-tempo exija novos protocolos. A continuidade na exploração após uma atualização de sistema constitui a aceitação automática das novas leis orbitais."
  }
]

export default function TermosDeUso() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at top center, #06162c 0%, #020914 100%)',
      padding: '3rem 2rem 5rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <main style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* BOTÃO DE VOLTAR */}
        <div style={{ marginBottom: '3rem' }}>
          <Link href="/" className="btn-retornar">
            <IconeVoltar />
            <span>Retornar à Base</span>
          </Link>
        </div>

        {/* CABEÇALHO */}
        <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '10px', 
            background: 'rgba(0, 229, 255, 0.1)', padding: '6px 16px', 
            borderRadius: '30px', border: '1px solid rgba(0, 229, 255, 0.3)',
            marginBottom: '1.5rem'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00e5ff', boxShadow: '0 0 10px #00e5ff', animation: 'pulse 2s infinite' }}></span>
            <span style={{ color: '#00e5ff', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Transmissão Oficial
            </span>
          </div>
          
          <h1 style={{ 
            color: '#ffffff', fontSize: '2.5rem', fontWeight: 900, 
            letterSpacing: '0.05em', margin: '0 0 1rem 0',
            textShadow: '0 0 30px rgba(0, 229, 255, 0.3)'
          }}>
            DIRETRIZES DA ZENTRÁXIA
          </h1>
          <p style={{ color: '#8a99ad', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Termos operacionais e regulamentos de navegação para todos os cadetes e comandantes registados no simulador.
          </p>
        </header>

        {/* LISTA DE DIRETRIZES (CARTÕES) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {diretrizes.map((item) => (
            <section key={item.id} className="cartao-diretriz" style={{
              background: 'linear-gradient(145deg, rgba(6, 22, 44, 0.6) 0%, rgba(2, 9, 20, 0.8) 100%)',
              border: '1px solid rgba(0, 229, 255, 0.15)',
              borderRadius: '12px',
              padding: '2rem',
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'flex-start',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Brilho de fundo decorativo */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'linear-gradient(to bottom, #00e5ff, transparent)' }} />
              
              <div style={{ 
                flexShrink: 0, width: '50px', height: '50px', 
                background: 'rgba(0, 229, 255, 0.08)', borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#00e5ff', border: '1px solid rgba(0, 229, 255, 0.2)'
              }}>
                {item.icone}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '0.8rem' }}>
                  <span style={{ color: '#00e5ff', fontWeight: 800, fontSize: '0.9rem', opacity: 0.7 }}>{item.id}.</span>
                  <h2 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 700, margin: 0, letterSpacing: '0.05em' }}>
                    {item.titulo}
                  </h2>
                </div>
                <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '0.95rem', margin: 0 }}>
                  {item.texto}
                </p>
              </div>
            </section>
          ))}
        </div>

        {/* RODAPÉ DA PÁGINA */}
        <footer style={{ 
          marginTop: '4rem', paddingTop: '2rem', 
          borderTop: '1px solid rgba(255, 255, 255, 0.05)', 
          textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem'
        }}>
          <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
            Última Sincronização Estelar: 22 de Junho de 2026
          </p>
          <p style={{ color: '#00e5ff', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', margin: 0 }}>
            "PELA CIÊNCIA E PELA EXPLORAÇÃO ESPACIAL."
          </p>
        </footer>

      </main>

      {/* ESTILOS DA PÁGINA (Injetados para garantir funcionamento no Next.js) */}
      <style dangerouslySetInnerHTML={{ __html: `
        .btn-retornar {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 12px 28px;
          background: linear-gradient(135deg, rgba(0, 229, 255, 0.05) 0%, rgba(2, 9, 20, 0.8) 100%);
          border: 1px solid rgba(0, 229, 255, 0.2);
          border-left: 3px solid #00e5ff;
          border-radius: 4px;
          color: #00e5ff !important; /* Força a cor para não ficar roxo */
          text-decoration: none !important; /* Remove o sublinhado padrão */
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          overflow: hidden;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
        }

        .btn-retornar::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.4), transparent);
          transform: skewX(-25deg);
          transition: left 0.5s ease;
        }

        .btn-retornar:hover {
          background: rgba(0, 229, 255, 0.15);
          border-color: rgba(0, 229, 255, 0.6);
          color: #ffffff !important;
          box-shadow: 0 0 25px rgba(0, 229, 255, 0.3);
          transform: translateX(-5px);
          text-shadow: 0 0 8px rgba(0, 229, 255, 0.8);
        }

        .btn-retornar:hover::before {
          left: 150%;
        }

        .btn-retornar svg {
          transition: transform 0.3s ease;
        }

        .btn-retornar:hover svg {
          transform: translateX(-4px);
        }
      `}} />
    </div>
  )
}