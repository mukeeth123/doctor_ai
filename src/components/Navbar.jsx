import { useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()
    const isLanding = location.pathname === '/'

    return (
        <nav style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 40px',
            background: 'rgba(248, 251, 255, 0.85)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid #E2E8F0',
            position: 'sticky',
            top: 0,
            zIndex: 50,
        }}>
            {/* Logo */}
            <div
                style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                onClick={() => navigate('/')}
            >
                <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: 'linear-gradient(135deg, #2D6CDF 0%, #5B93F5 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 18,
                    fontWeight: 700,
                }}>
                    ✦
                </div>
                <span style={{ fontSize: 20, fontWeight: 700, color: '#1a202c' }}>
                    Amrutha<span style={{ color: '#2D6CDF' }}>.AI</span>
                </span>
            </div>

            {/* Nav Links */}
            {isLanding && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '32px',
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#4A5568',
                }}>
                    <a href="#how-it-works" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}>How it works</a>
                    <a href="#services" style={{ textDecoration: 'none', color: 'inherit' }}>Services</a>
                    <a href="#privacy" style={{ textDecoration: 'none', color: 'inherit' }}>Privacy</a>
                    <button
                        onClick={() => navigate('/form')}
                        style={{
                            padding: '10px 24px',
                            background: '#2D6CDF',
                            color: 'white',
                            border: 'none',
                            borderRadius: 24,
                            fontSize: 14,
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: '0 2px 8px rgba(45,108,223,0.3)',
                        }}
                        onMouseEnter={e => { e.target.style.background = '#1d5bc4'; e.target.style.transform = 'translateY(-1px)' }}
                        onMouseLeave={e => { e.target.style.background = '#2D6CDF'; e.target.style.transform = 'translateY(0)' }}
                    >
                        Start Consultation
                    </button>
                </div>
            )}
        </nav>
    )
}
