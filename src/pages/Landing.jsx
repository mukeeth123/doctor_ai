import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Landing() {
    const navigate = useNavigate()

    const features = [
        { icon: '🩺', title: 'Symptom Analysis', desc: 'Deep analysis of your reported symptoms using vast medical databases for accurate pre-diagnosis.' },
        { icon: '🧪', title: 'Test Suggestions', desc: 'Receive clinically relevant test recommendations to discuss with your healthcare provider.' },
        { icon: '💊', title: 'Medication Guidance', desc: 'Get informed guidance on over-the-counter options and dosage safety protocols.' },
    ]

    const checkItems = [
        'Smart Symptom Analysis',
        'Suggested Tests',
        'Basic Medication Guidance',
        'Fast AI Response',
    ]

    return (
        <div style={{ minHeight: '100vh', background: '#F8FBFF' }}>
            <Navbar />

            {/* Hero Section */}
            <section style={{
                maxWidth: 1200,
                margin: '0 auto',
                padding: '80px 40px 60px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                alignItems: 'center',
                gap: 60,
            }}>
                {/* Left */}
                <div>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '8px 18px',
                        borderRadius: 24,
                        background: 'rgba(45,108,223,0.08)',
                        color: '#2D6CDF',
                        fontSize: 12,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: 1.2,
                        marginBottom: 28,
                    }}>
                        ⚡ AI Doctor Consultation
                    </div>

                    <h1 style={{
                        fontSize: 48,
                        fontWeight: 800,
                        lineHeight: 1.15,
                        color: '#1a202c',
                        marginBottom: 20,
                    }}>
                        AI-Powered Medical{' '}
                        <span style={{ color: '#2D6CDF' }}>Guidance</span>{' '}
                        in Minutes
                    </h1>

                    <p style={{
                        fontSize: 17,
                        color: '#64748B',
                        lineHeight: 1.7,
                        marginBottom: 32,
                        maxWidth: 460,
                    }}>
                        Describe your symptoms and receive instant clinical guidance with
                        suggested tests and medications. Professional health insights,
                        powered by advanced intelligence.
                    </p>

                    {/* Check Items */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px 32px',
                        marginBottom: 36,
                    }}>
                        {checkItems.map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{
                                    width: 22,
                                    height: 22,
                                    borderRadius: '50%',
                                    background: 'rgba(45,108,223,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 12,
                                    color: '#2D6CDF',
                                    flexShrink: 0,
                                }}>✓</div>
                                <span style={{ fontSize: 14, color: '#475569', fontWeight: 500 }}>{item}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                        <button
                            onClick={() => navigate('/form')}
                            style={{
                                padding: '14px 32px',
                                background: 'linear-gradient(135deg, #2D6CDF 0%, #4F8AEF 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 28,
                                fontSize: 15,
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                boxShadow: '0 4px 15px rgba(45,108,223,0.35)',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 6px 20px rgba(45,108,223,0.45)' }}
                            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 15px rgba(45,108,223,0.35)' }}
                        >
                            Start Consultation →
                        </button>
                        <button
                            style={{
                                padding: '14px 32px',
                                background: 'white',
                                color: '#1a202c',
                                border: '1.5px solid #E2E8F0',
                                borderRadius: 28,
                                fontSize: 15,
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={e => { e.target.style.borderColor = '#2D6CDF'; e.target.style.color = '#2D6CDF' }}
                            onMouseLeave={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.color = '#1a202c' }}
                        >
                            View Sample Report
                        </button>
                    </div>
                </div>

                {/* Right — Hero Visual */}
                <div style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {/* Gradient background blob */}
                    <div style={{
                        width: 400,
                        height: 400,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(45,108,223,0.12) 0%, rgba(79,138,239,0.08) 50%, rgba(45,108,223,0.04) 100%)',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {/* Inner circle */}
                        <div style={{
                            width: 280,
                            height: 280,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, rgba(45,108,223,0.15) 0%, rgba(79,138,239,0.1) 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <div style={{
                                fontSize: 80,
                                filter: 'drop-shadow(0 4px 12px rgba(45,108,223,0.2))',
                            }}>
                                🩺
                            </div>
                        </div>

                        {/* Floating badge */}
                        <div style={{
                            position: 'absolute',
                            bottom: 40,
                            right: 20,
                            background: 'white',
                            borderRadius: 16,
                            padding: '14px 20px',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            animation: 'float 3s ease-in-out infinite',
                        }}>
                            <div style={{
                                width: 36,
                                height: 36,
                                borderRadius: 10,
                                background: 'linear-gradient(135deg, #2D6CDF, #5B93F5)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: 16,
                            }}>📊</div>
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#1a202c' }}>Analysis Complete</div>
                                <div style={{ fontSize: 11, color: '#94A3B8' }}>98% Accuracy for reported symptoms</div>
                            </div>
                        </div>

                        {/* Floating pulse dot */}
                        <div style={{
                            position: 'absolute',
                            top: 60,
                            right: 50,
                            width: 14,
                            height: 14,
                            borderRadius: '50%',
                            background: '#22C55E',
                            boxShadow: '0 0 0 4px rgba(34,197,94,0.2)',
                            animation: 'pulse 2s ease-in-out infinite',
                        }} />
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" style={{
                maxWidth: 1200,
                margin: '0 auto',
                padding: '80px 40px',
                textAlign: 'center',
            }}>
                <h2 style={{ fontSize: 34, fontWeight: 800, color: '#1a202c', marginBottom: 12 }}>
                    Comprehensive AI Medical Services
                </h2>
                <p style={{ fontSize: 16, color: '#64748B', marginBottom: 48, maxWidth: 520, margin: '0 auto 48px' }}>
                    Advanced clinical intelligence designed to support your health journey.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 28,
                }}>
                    {features.map((f, i) => (
                        <div
                            key={i}
                            style={{
                                background: 'white',
                                borderRadius: 20,
                                padding: '36px 28px',
                                textAlign: 'left',
                                border: '1px solid #E2E8F0',
                                transition: 'all 0.3s ease',
                                cursor: 'default',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-6px)'
                                e.currentTarget.style.boxShadow = '0 12px 40px rgba(45,108,223,0.1)'
                                e.currentTarget.style.borderColor = 'rgba(45,108,223,0.2)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = 'none'
                                e.currentTarget.style.borderColor = '#E2E8F0'
                            }}
                        >
                            <div style={{
                                width: 52,
                                height: 52,
                                borderRadius: 14,
                                background: 'rgba(45,108,223,0.08)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 24,
                                marginBottom: 20,
                            }}>{f.icon}</div>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1a202c', marginBottom: 10 }}>{f.title}</h3>
                            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" style={{
                maxWidth: 1200,
                margin: '0 auto',
                padding: '60px 40px 80px',
                textAlign: 'center',
            }}>
                <h2 style={{ fontSize: 34, fontWeight: 800, color: '#1a202c', marginBottom: 12 }}>
                    How It Works
                </h2>
                <p style={{ fontSize: 16, color: '#64748B', marginBottom: 48, maxWidth: 500, margin: '0 auto 48px' }}>
                    Three simple steps to get your AI-powered medical guidance.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 28,
                    position: 'relative',
                }}>
                    {[
                        { step: '01', title: 'Enter Your Details', desc: 'Provide basic info like name, age, gender, and known conditions.', icon: '📝' },
                        { step: '02', title: 'Describe Symptoms', desc: 'Chat with our AI and describe what you\'re experiencing.', icon: '💬' },
                        { step: '03', title: 'Get Guidance', desc: 'Receive a detailed analysis with tests, medications, and care steps.', icon: '📋' },
                    ].map((s, i) => (
                        <div key={i} style={{
                            background: 'white',
                            borderRadius: 20,
                            padding: '36px 28px',
                            border: '1px solid #E2E8F0',
                            position: 'relative',
                            transition: 'all 0.3s ease',
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-4px)'
                                e.currentTarget.style.boxShadow = '0 12px 40px rgba(45,108,223,0.08)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = 'none'
                            }}
                        >
                            <div style={{
                                position: 'absolute',
                                top: -14,
                                left: 28,
                                background: 'linear-gradient(135deg, #2D6CDF, #4F8AEF)',
                                color: 'white',
                                fontSize: 12,
                                fontWeight: 700,
                                padding: '6px 14px',
                                borderRadius: 20,
                            }}>Step {s.step}</div>
                            <div style={{ fontSize: 32, marginBottom: 16, marginTop: 8 }}>{s.icon}</div>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1a202c', marginBottom: 8 }}>{s.title}</h3>
                            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6 }}>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                borderTop: '1px solid #E2E8F0',
                padding: '24px 40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 16,
                maxWidth: 1200,
                margin: '0 auto',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: 'linear-gradient(135deg, #2D6CDF, #5B93F5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: 13,
                        fontWeight: 700,
                    }}>✦</div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#1a202c' }}>Amrutha.AI</span>
                </div>
                <p style={{ fontSize: 12, color: '#94A3B8', textAlign: 'center', flex: 1 }}>
                    © 2026 Amrutha.AI. For informational purposes only. Consult a doctor for medical emergencies.
                </p>
                <div style={{ display: 'flex', gap: 24, fontSize: 13, color: '#64748B' }}>
                    <a href="#privacy" style={{ textDecoration: 'none', color: 'inherit' }}>Privacy</a>
                    <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Terms</a>
                    <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Contact</a>
                </div>
            </footer>

            {/* Animations */}
            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.3); }
        }
        @media (max-width: 768px) {
          section > div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </div>
    )
}
