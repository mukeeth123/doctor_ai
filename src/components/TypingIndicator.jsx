export default function TypingIndicator() {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
            marginBottom: 16,
            animation: 'fadeSlideUp 0.3s ease-out both',
        }}>
            {/* Avatar */}
            <div style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2D6CDF, #5B93F5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                color: 'white',
                flexShrink: 0,
            }}>🩺</div>

            {/* Dots */}
            <div style={{
                padding: '14px 24px',
                borderRadius: '18px 18px 18px 4px',
                background: 'white',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                display: 'flex',
                gap: 5,
                alignItems: 'center',
            }}>
                {[0, 1, 2].map(i => (
                    <div key={i} style={{
                        width: 9,
                        height: 9,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #2D6CDF, #5B93F5)',
                        animation: `typingBounce 1.4s ease-in-out ${i * 0.16}s infinite`,
                    }} />
                ))}
            </div>

            <style>{`
        @keyframes typingBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.35; }
          40% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
        </div>
    )
}
