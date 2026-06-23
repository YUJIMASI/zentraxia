'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// --- ÍCONES SVG TEMÁTICOS ---
const IconeVoltar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
const IconeTerminal = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
const IconeAutor = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>

export default function Sobre() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at top center, #06162c 0%, #020914 100%)',
      padding: '3rem 2rem 5rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#cbd5e1'
    }}>
      <main style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
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
              Base de Dados Classificada
            </span>
          </div>
          
          <h1 style={{ 
            color: '#ffffff', fontSize: '2.5rem', fontWeight: 900, 
            letterSpacing: '0.05em', margin: '0 0 1rem 0',
            textShadow: '0 0 30px rgba(0, 229, 255, 0.3)'
          }}>
            SOBRE O PROJETO
          </h1>
        </header>

        {/* SECÇÃO: SOBRE O AUTOR (Layout Grid Dividido) */}
        <section className="cartao-holografico" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(250px, 300px) 1fr',
          gap: '3rem',
          alignItems: 'start',
          marginBottom: '4rem'
        }}>
          {/* Lado Esquerdo - Foto e Nome */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{
              width: '100%',
              aspectRatio: '1/1.2',
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '2px solid rgba(0, 229, 255, 0.4)',
              boxShadow: '0 0 25px rgba(0, 229, 255, 0.15)',
              marginBottom: '1.5rem',
              background: '#020914'
            }}>
              <Image 
                src="/img/autor.jpg" 
                alt="Fotografia do Autor Yussandy Silva"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, width: '100%', height: '40%',
                background: 'linear-gradient(to top, rgba(2, 9, 20, 0.9), transparent)'
              }} />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00e5ff', marginBottom: '0.5rem', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', textTransform: 'uppercase' }}>
              <IconeAutor /> O Arquiteto
            </div>
            <h3 style={{ color: '#fff', fontSize: '1.2rem', margin: 0, fontWeight: 800, letterSpacing: '0.05em' }}>
              Yussandy Jehad Martins da Silva
            </h3>
              </div>

          {/* Lado Direito - Biografia */}
          <div style={{ paddingTop: '1rem' }}>
            <h2 style={{ color: '#00e5ff', fontSize: '1.5rem', marginTop: 0, marginBottom: '1.5rem', borderBottom: '1px solid rgba(0, 229, 255, 0.2)', paddingBottom: '0.8rem', letterSpacing: '0.05em' }}>
              Registo Biográfico
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', lineHeight: '1.8', fontSize: '0.95rem' }}>
              <p>
                Nascido aos 12 de maio de 2009 na cidade do Lubango, província da Huíla-Angola, filho de Your Adriano Teles da Silva e Sandra Beatriz Guerreiro Martins da Silva, YUSSANDY SILVA é poeta nas horas vagas, atleta de jiu-jitsu, programador sénior e estudante do Magistério Secundário nº 1251 "Njambelwa Kateine", frequentando o segundo ano do Ensino Médio, na especialidade de Geografia e História.
              </p>
              <p>
                A sua paixão, dedicação e adesão ao mundo da programação tiveram início no ano de 2025, quando o seu pai, Your Adriano Teles da Silva, o inscreveu numa formação profissional de Programação Web, na qual terminou com a média de 18 valores.
              </p>
              <p>
                Mesmo não tendo relação direta com a sua formação académica atual, após a finalização do curso, ele continuou a estudar e a especializar-se cada vez mais na programação. O seu percurso explorou desde a lógica de diferentes linguagens até aos fundamentos básicos de redes de computadores.
              </p>
              <p>
                Deste estudo pessoal e contínuo, aos seus 17 anos — embora muito novo para alguns e velho demais para outros —, criou o seu primeiro grande projeto profissional: a <strong>"Zentráxia"</strong>, que foi para ele uma conquista pessoal.
              </p>
            </div>
          </div>
        </section>

        {/* SECÇÃO: DESCRIÇÃO DA ZENTRÁXIA */}
        <section className="cartao-holografico" style={{ position: 'relative' }}>
          {/* Detalhe visual de terminal */}
          <div style={{ position: 'absolute', top: '-1px', right: '2rem', background: '#00e5ff', color: '#000', padding: '4px 12px', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', borderRadius: '0 0 6px 6px' }}>
            SYS.INFO // ZENTRÁXIA v1.0
          </div>

          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#00e5ff', fontSize: '1.5rem', marginTop: 0, marginBottom: '1.5rem', letterSpacing: '0.05em' }}>
            <IconeTerminal /> Sobre a Zentráxia
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', lineHeight: '1.8', fontSize: '0.95rem' }}>
            <p>
              A <strong>Zentráxia</strong> não é apenas um site; é uma plataforma imersiva e interativa concebida para a exploração educacional do cosmos. Combinando simulação 3D avançada com mecânicas de gamificação tática, foi desenvolvida para transformar qualquer curioso ou estudante num autêntico Comandante Estelar.
            </p>
            <p>
              Aqui, o utilizador assume o controlo ativo da missão através de vários módulos integrados:
            </p>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ color: '#00e5ff', marginTop: '4px' }}>◈</span>
                <div>
                  <strong style={{ color: '#fff' }}>Simulador Orbitário 3D:</strong> Um ambiente renderizado em tempo real onde é possível navegar livremente entre os planetas do nosso Sistema Solar, ajustando perspetivas para estudar cada corpo celeste.
                </div>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ color: '#00e5ff', marginTop: '4px' }}>◈</span>
                <div>
                  <strong style={{ color: '#fff' }}>Missões de Alinhamento Tático:</strong> Um mini-jogo prático onde a física está nas suas mãos. Sob a vigilância exigente do "Coronel", o cadete deve arrastar e ordenar os planetas corretamente sob pressão temporal para subir de patente militar (de Explorador a Grande Almirante).
                </div>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ color: '#00e5ff', marginTop: '4px' }}>◈</span>
                <div>
                  <strong style={{ color: '#fff' }}>Base de Dados e Dicionário:</strong> Acesso a telemetria profunda, factos fascinantes (como as tempestades de vidro em exoplanetas) e um glossário completo de astrofísica.
                </div>
              </li>
            </ul>

            <p style={{ marginTop: '0.5rem', borderLeft: '3px solid #00e5ff', paddingLeft: '1rem', fontStyle: 'italic', color: '#94a3b8' }}>
              Construída com as tecnologias web mais modernas, a Zentráxia é a prova viva de que a aprendizagem sobre o universo pode — e deve — ser tão fascinante quanto as próprias estrelas.
            </p>
          </div>
        </section>

      </main>

      {/* ESTILOS INJETADOS PARA O NEXT.JS (Animações e Cartões) */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Estilos do Botão Voltar */
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
          color: #00e5ff !important;
          text-decoration: none !important;
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

        /* Estilos dos Cartões de Conteúdo */
        .cartao-holografico {
          background: linear-gradient(145deg, rgba(6, 22, 44, 0.6) 0%, rgba(2, 9, 20, 0.8) 100%);
          border: 1px solid rgba(0, 229, 255, 0.15);
          border-radius: 12px;
          padding: 3rem;
          backdrop-filter: blur(10px);
          box-shadow: inset 0 0 30px rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.4);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .cartao-holografico:hover {
          border-color: rgba(0, 229, 255, 0.3);
          box-shadow: inset 0 0 30px rgba(0,0,0,0.5), 0 10px 40px rgba(0, 229, 255, 0.05);
        }

        /* Animação do Ponto de Gravação */
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(0, 229, 255, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(0, 229, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 229, 255, 0); }
        }

        /* Responsividade para Ecrãs Menores */
        @media (max-width: 800px) {
          .cartao-holografico {
            grid-template-columns: 1fr !important;
            padding: 2rem;
          }
          .cartao-holografico > div:first-child {
            max-width: 350px;
            margin: 0 auto;
          }
        }
      `}} />
    </div>
  )
}