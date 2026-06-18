'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface Pergunta {
  id: number
  pergunta: string
  opcoes: string[]
  respostaCorreta: string
}

const bancoPerguntas: Pergunta[] = [
  { id: 1, pergunta: "Qual planeta retém mais calor no sistema devido ao efeito estufa estelar?", opcoes: ["Mercúrio", "Vênus", "Marte", "Saturno"], respostaCorreta: "Vênus" },
  { id: 2, pergunta: "Em qual destes mundos a pressão gera chuvas de diamantes puros?", opcoes: ["Júpiter", "Urano", "Netuno", "Terra"], respostaCorreta: "Netuno" },
  { id: 3, pergunta: "Onde se localiza o Olympus Mons, o maior vulcão do Sistema Solar?", opcoes: ["Lua", "Marte", "Vênus", "Mercúrio"], respostaCorreta: "Marte" },
  { id: 4, pergunta: "Qual astro gasoso tem densidade molecular menor do que a água?", opcoes: ["Saturno", "Júpiter", "Urano", "Netuno"], respostaCorreta: "Saturno" },
  { id: 5, pergunta: "Qual planeta descreve órbita de rolo com 98° de inclinação axial?", opcoes: ["Netuno", "Saturno", "Urano", "Mercúrio"], respostaCorreta: "Urano" },
  { id: 6, pergunta: "Qual a distância aproximada da Terra em relação ao Sol em Unidades Astronômicas?", opcoes: ["0.5 UA", "1.0 UA", "1.5 UA", "8.0 UA"], respostaCorreta: "1.0 UA" },
  { id: 7, pergunta: "Que tipo de estrela é o nosso Sol na classificação estelar?", opcoes: ["Gigante Vermelha", "Anã Branca", "Anã Amarela G2V", "Estrela de Nêutrons"], respostaCorreta: "Anã Amarela G2V" },
  { id: 8, pergunta: "Qual lua de Júpiter possui um oceano líquido sob sua crosta de gelo?", opcoes: ["Europa", "Titã", "Fobos", "Ganimedes"], respostaCorreta: "Europa" }
]

export default function QuizPage() {
  const [faseJogo, setFaseJogo] = useState<'intro' | 'perguntas' | 'resultado'>('intro')
  const [perguntasSorteadas, setPerguntasSorteadas] = useState<Pergunta[]>([])
  const [perguntaAtual, setPerguntaAtual] = useState(0)
  const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(null)
  const [respondido, setRespondido] = useState(false)
  
  const [acertos, setAcertos] = useState(0)
  const [erros, setErros] = useState(0)
  const [tempo, setTempo] = useState(0)
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const inicializarMissao = () => {
    const embaralhadas = [...bancoPerguntas].sort(() => Math.random() - 0.5)
    setPerguntasSorteadas(embaralhadas.slice(0, 5))
    setPerguntaAtual(0)
    setAcertos(0)
    setErros(0)
    setTempo(0)
    setFaseJogo('perguntas')
  }

  useEffect(() => {
    if (faseJogo === 'perguntas') {
      timerRef.current = setInterval(() => {
        setTempo((t) => t + 1)
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [faseJogo])

  const verificarResposta = (opcao: string) => {
    if (respondido) return
    setRespostaSelecionada(opcao)
    setRespondido(true)

    if (opcao === perguntasSorteadas[perguntaAtual].respostaCorreta) {
      setAcertos((a) => a + 1)
    } else {
      setErros((e) => e + 1)
    }

    setTimeout(() => {
      setRespondido(false)
      setRespostaSelecionada(null)
      if (perguntaAtual + 1 < perguntasSorteadas.length) {
        setPerguntaAtual((p) => p + 1)
      } else {
        setFaseJogo('resultado')
      }
    }, 1500)
  }

  return (
    <main style={{
      background: 'radial-gradient(circle at center, #02020a 0%, #000000 100%)',
      minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem'
    }}>

      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.6rem', fontWeight: 800, letterSpacing: '0.1em', color: '#fff', margin: 0 }}>
          SISTEMA DE AVALIAÇÃO DE TELEMETRIA
        </h1>
        <p style={{ color: '#475569', fontSize: '1rem', marginTop: '0.5rem', letterSpacing: '0.05em' }}>
          ZENTRÁXIA CORE COMPLIANCE
        </p>
      </div>
      
      <div style={{
        width: '100%', maxWidth: '620px', background: 'rgba(2, 2, 8, 0.8)',
        border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: '8px',
        padding: '3.5rem 3rem', backdropFilter: 'blur(12px)'
      }}>

        {faseJogo === 'intro' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#00e5ff', fontSize: '2.5rem', marginBottom: '1.5rem' }}>
              <i className="bi bi-activity" />
            </div>
            <h2 style={{ letterSpacing: '0.15em', color: '#00e5ff', fontSize: '1.4rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
              Sequência Inicial Desbloqueada
            </h2>
            <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1rem', marginBottom: '3rem', fontStyle: 'italic' }}>
              "Não somos apenas observadores passivos num planeta rochoso. Somos a própria inteligência do universo a tentar compreender-se a si mesma. Atravessa o portal, testa os teus limites e prova que tens o mapa estelar gravado no teu ADN."
            </p>
            <button
              onClick={inicializarMissao}
              style={{
                background: 'transparent', color: '#00e5ff', border: '1px solid #00e5ff',
                padding: '1rem 3rem', borderRadius: '4px', fontSize: '0.9rem',
                fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#00e5ff'; e.currentTarget.style.color = '#000' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#00e5ff' }}
            >
              Inicializar Protocolo
            </button>
          </div>
        )}

        {faseJogo === 'perguntas' && perguntasSorteadas.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#4fc3f7', marginBottom: '2rem', letterSpacing: '0.05em' }}>
              <span><i className="bi bi-terminal" style={{ marginRight: '6px' }} /> ANÁLISE ATIVA</span>
              <span>QUESTÃO {perguntaAtual + 1} / {perguntasSorteadas.length}</span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 400, lineHeight: 1.6, marginBottom: '2.5rem', color: '#f1f5f9' }}>
              {perguntasSorteadas[perguntaAtual].pergunta}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {perguntasSorteadas[perguntaAtual].opcoes.map((opcao, i) => {
                const correta = opcao === perguntasSorteadas[perguntaAtual].respostaCorreta
                const selecionada = opcao === respostaSelecionada

                let corBorda = 'rgba(255,255,255,0.1)'
                let corFundo = 'rgba(255,255,255,0.02)'

                if (respondido) {
                  if (correta) { corBorda = '#10b981'; corFundo = 'rgba(16, 185, 129, 0.08)' }
                  else if (selecionada) { corBorda = '#ef4444'; corFundo = 'rgba(239, 68, 68, 0.08)' }
                }

                return (
                  <button
                    key={i}
                    disabled={respondido}
                    onClick={() => verificarResposta(opcao)}
                    style={{
                      width: '100%', padding: '1.2rem', textAlign: 'left',
                      background: corFundo, border: `1px solid ${corBorda}`,
                      borderRadius: '4px', color: '#e2e8f0', fontSize: '0.95rem',
                      cursor: respondido ? 'default' : 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {opcao}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {faseJogo === 'resultado' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#00e5ff', fontSize: '2rem', marginBottom: '0.5rem' }}>
              <i className="bi bi-shield-check" />
            </div>
            <span style={{ color: '#64748b', fontSize: '0.8rem', letterSpacing: '0.2em' }}>RELATÓRIO DE TELEMETRIA COMPILADO</span>
            <h2 style={{ fontSize: '1.8rem', margin: '0.5rem 0 2.5rem', color: '#fff' }}>MÉTRICAS DA MISSÃO</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3.5rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.01)', padding: '1.2rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ color: '#10b981', fontSize: '1.6rem', fontWeight: 700 }}>{acertos}</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', marginTop: '4px' }}>Acertos Concluídos</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.01)', padding: '1.2rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ color: '#ef4444', fontSize: '1.6rem', fontWeight: 700 }}>{erros}</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', marginTop: '4px' }}>Divergências</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.01)', padding: '1.2rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ color: '#4fc3f7', fontSize: '1.6rem', fontWeight: 700 }}>{tempo}s</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', marginTop: '4px' }}>Tempo de Ciclo</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.01)', padding: '1.2rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ color: '#ffaa00', fontSize: '1.6rem', fontWeight: 700 }}>{(acertos * 20)}%</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', marginTop: '4px' }}>Aproveitamento</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                onClick={inicializarMissao} 
                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '0.8rem 1.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                <i className="bi bi-arrow-clockwise" style={{ marginRight: '8px' }} /> Nova Sequência
              </button>
              
              <Link 
                href="/?skipIntro=true" 
                style={{ background: '#00e5ff', color: '#000', padding: '0.8rem 1.8rem', borderRadius: '4px', fontWeight: 700, textDecoration: 'none', fontSize: '0.85rem' }}
              >
                <i className="bi bi-box-arrow-right" style={{ marginRight: '8px' }} /> Desconectar
              </Link>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}