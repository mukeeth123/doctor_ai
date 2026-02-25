import { useState } from 'react'
import { speakText } from '../services/api'

export default function ChatBubble({ role, content }) {
    const isUser = role === 'user'
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentAudio, setCurrentAudio] = useState(null)

    const handleSpeak = async () => {
        if (isPlaying && currentAudio) {
            currentAudio.pause()
            currentAudio.currentTime = 0
            setIsPlaying(false)
            setCurrentAudio(null)
            return
        }

        setIsPlaying(true)
        const audio = await speakText(content)
        if (audio) {
            setCurrentAudio(audio)
            audio.onended = () => {
                setIsPlaying(false)
                setCurrentAudio(null)
            }
        } else {
            setIsPlaying(false)
        }
    }

    return (
        <div
            className="chat-bubble-wrapper"
            style={{
                display: 'flex',
                justifyContent: isUser ? 'flex-end' : 'flex-start',
                marginBottom: 16,
                paddingLeft: isUser ? 48 : 0,
                paddingRight: isUser ? 0 : 48,
                animation: 'fadeSlideUp 0.35s ease-out both',
            }}
        >
            <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                flexDirection: isUser ? 'row-reverse' : 'row',
                maxWidth: '80%',
            }}>
                {/* Avatar */}
                <div
                    className="chat-avatar"
                    style={{
                        width: 34,
                        height: 34,
                        borderRadius: '50%',
                        background: isUser
                            ? 'linear-gradient(135deg, #64748B, #475569)'
                            : 'linear-gradient(135deg, #2D6CDF, #5B93F5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 14,
                        color: 'white',
                        flexShrink: 0,
                        transition: 'transform 0.2s ease',
                    }}
                >
                    {isUser ? '👤' : '🩺'}
                </div>

                {/* Bubble + Speaker */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div
                        className="chat-bubble"
                        style={{
                            padding: '12px 18px',
                            borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                            background: isUser
                                ? 'linear-gradient(135deg, #2D6CDF, #4F8AEF)'
                                : 'white',
                            color: isUser ? 'white' : '#1a202c',
                            fontSize: 14,
                            lineHeight: 1.65,
                            boxShadow: isUser
                                ? '0 2px 12px rgba(45,108,223,0.2)'
                                : '0 2px 12px rgba(0,0,0,0.05)',
                            border: isUser ? 'none' : '1px solid #E2E8F0',
                            wordBreak: 'break-word',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        }}
                    >
                        {content}
                    </div>

                    {/* Speaker button — AI messages only */}
                    {!isUser && (
                        <button
                            onClick={handleSpeak}
                            title={isPlaying ? 'Stop' : 'Listen'}
                            style={{
                                alignSelf: 'flex-start',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4,
                                padding: '4px 10px',
                                border: 'none',
                                borderRadius: 12,
                                background: isPlaying ? 'rgba(45,108,223,0.12)' : 'transparent',
                                color: '#2D6CDF',
                                fontSize: 12,
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => e.target.style.background = 'rgba(45,108,223,0.08)'}
                            onMouseLeave={e => e.target.style.background = isPlaying ? 'rgba(45,108,223,0.12)' : 'transparent'}
                        >
                            {isPlaying ? '⏹️ Stop' : '🔊 Listen'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
