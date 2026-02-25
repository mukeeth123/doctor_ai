import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { sendMessage, speakText } from '../services/api'
import ChatBubble from '../components/ChatBubble'
import MedicalCard from '../components/MedicalCard'
import TypingIndicator from '../components/TypingIndicator'
import AIAvatar from '../components/AIAvatar'

export default function DoctorChat() {
    const navigate = useNavigate()
    const { patientBasicInfo, conversationHistory, setConversationHistory } = useAppContext()

    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const currentAudioRef = useRef(null)
    const chatEndRef = useRef(null)

    // Stop speaking function
    const stopSpeaking = () => {
        if (currentAudioRef.current) {
            currentAudioRef.current.pause()
            currentAudioRef.current.currentTime = 0
            currentAudioRef.current = null
        }
        setIsSpeaking(false)
    }

    // Handle voice playback with state sync
    const playVoice = async (text) => {
        stopSpeaking()
        const audio = await speakText(text)
        if (audio) {
            currentAudioRef.current = audio
            setIsSpeaking(true)
            audio.onended = () => {
                setIsSpeaking(false)
                currentAudioRef.current = null
            }
        }
    }

    // Redirect if no patient info
    useEffect(() => {
        if (!patientBasicInfo) {
            navigate('/form')
        }
    }, [patientBasicInfo, navigate])

    // Auto-scroll to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isTyping])

    // Add welcome message on mount
    useEffect(() => {
        if (patientBasicInfo && messages.length === 0) {
            const welcomeText = `Hello ${patientBasicInfo.name}! 👋 I'm Amrutha.AI, your AI medical assistant. How can I help you today? Please describe your symptoms or ask any health-related question.`
            setMessages([{
                role: 'assistant',
                type: 'answer',
                content: welcomeText,
            }])

            // Auto-play welcome message after a short delay
            setTimeout(() => {
                playVoice(welcomeText)
            }, 500)
        }
        return () => stopSpeaking()
    }, [patientBasicInfo])

    const handleSend = async () => {
        const text = input.trim()
        if (!text || isTyping) return

        // Stop any current speaking when sending a new message
        stopSpeaking()

        // Add user message
        const userMsg = { role: 'user', content: text }
        const updatedMessages = [...messages, userMsg]
        setMessages(updatedMessages)
        setInput('')
        setIsTyping(true)

        // Build conversation history for backend
        const history = updatedMessages
            .filter(m => m.role === 'user' || m.role === 'assistant')
            .map(m => ({ role: m.role, content: String(m.content || '') }))

        try {
            // sendMessage never throws — always returns data or {error, message}
            const data = await sendMessage(patientBasicInfo, history, text)

            let aiMsg

            if (data.error) {
                aiMsg = {
                    role: 'assistant',
                    type: 'answer',
                    content: `⚠️ ${data.message || 'Something went wrong. Please try again.'}`,
                }
            } else if (data.type === 'answer') {
                aiMsg = {
                    role: 'assistant',
                    type: 'answer',
                    content: data.response || 'I received your message but have no response text.',
                }
            } else if (data.type === 'question') {
                aiMsg = {
                    role: 'assistant',
                    type: 'question',
                    content: data.question || 'Could you provide more details?',
                }
            } else if (data.type === 'analysis') {
                // Safe defaults for analysis fields
                const safeData = {
                    ...data,
                    likely_condition: data.likely_condition || 'Not determined',
                    explanation: data.explanation || 'No explanation provided.',
                    recommended_tests: Array.isArray(data.recommended_tests) ? data.recommended_tests : [],
                    basic_medications: Array.isArray(data.basic_medications) ? data.basic_medications : [],
                    home_care_steps: Array.isArray(data.home_care_steps) ? data.home_care_steps : [],
                    recovery_estimate: data.recovery_estimate || 'Consult a doctor for timeline.',
                    disclaimer: data.disclaimer || 'This is AI-based preliminary guidance and not a substitute for clinical examination.',
                }
                aiMsg = {
                    role: 'assistant',
                    type: 'analysis',
                    content: `📋 Medical Analysis: ${safeData.likely_condition}`,
                    analysisData: safeData,
                }
            } else {
                // Unknown type fallback
                aiMsg = {
                    role: 'assistant',
                    type: 'answer',
                    content: '⚠️ Received an unexpected response format. Please try again.',
                }
            }

            setMessages(prev => [...prev, aiMsg])

            // Automatically play AI voice
            if (aiMsg.content && !data.error) {
                playVoice(aiMsg.content)
            }

            setConversationHistory(prev => [
                ...prev,
                { role: 'user', content: text },
                { role: 'assistant', content: String(aiMsg.content || '') },
            ])

        } catch (err) {
            // Safety net — should rarely trigger since sendMessage handles errors
            setMessages(prev => [...prev, {
                role: 'assistant',
                type: 'answer',
                content: '⚠️ An unexpected error occurred. Please refresh the page and try again.',
            }])
        } finally {
            setIsTyping(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const handleInputChange = (e) => {
        setInput(e.target.value)
        // If user is speaking, stop it when the user starts typing
        if (isSpeaking) {
            stopSpeaking()
        }
    }

    if (!patientBasicInfo) return null

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: '#F8FBFF',
            position: 'relative',
        }}>
            {/* AI Avatar */}
            <AIAvatar isPlaying={isSpeaking} />
            {/* Header */}
            <header style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 24px',
                background: 'white',
                borderBottom: '1px solid #E2E8F0',
                flexShrink: 0,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: 'linear-gradient(135deg, #2D6CDF 0%, #5B93F5 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: 18,
                    }}>🩺</div>
                    <div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: '#1a202c' }}>
                            Amrutha<span style={{ color: '#2D6CDF' }}>.AI</span>
                            <span style={{ fontWeight: 400, color: '#64748B', fontSize: 14 }}> | AI Doctor</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                            <div style={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                background: '#22C55E',
                                boxShadow: '0 0 0 2px rgba(34,197,94,0.2)',
                            }} />
                            <span style={{ fontSize: 12, color: '#22C55E', fontWeight: 500 }}>Online</span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                        fontSize: 12,
                        color: '#64748B',
                        background: '#F1F5F9',
                        padding: '6px 12px',
                        borderRadius: 20,
                    }}>
                        👤 {patientBasicInfo.name}
                    </span>
                </div>
            </header>

            {/* Chat Area */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <div style={{ maxWidth: 800, width: '100%', margin: '0 auto', flex: 1 }}>
                    {messages.map((msg, i) => (
                        msg.type === 'analysis' && msg.analysisData
                            ? <MedicalCard key={i} data={msg.analysisData} />
                            : <ChatBubble key={i} role={msg.role} content={msg.content} />
                    ))}
                    {isTyping && <TypingIndicator />}
                    <div ref={chatEndRef} />
                </div>
            </div>

            {/* Input Bar */}
            <div style={{
                padding: '16px 20px',
                background: 'white',
                borderTop: '1px solid #E2E8F0',
                flexShrink: 0,
            }}>
                <div style={{
                    maxWidth: 800,
                    margin: '0 auto',
                    display: 'flex',
                    gap: 12,
                    alignItems: 'flex-end',
                }}>
                    <div className="chat-input-wrapper" style={{
                        flex: 1,
                        background: '#F8FBFF',
                        borderRadius: 16,
                        border: '1.5px solid #E2E8F0',
                        overflow: 'hidden',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                    }}>
                        <textarea
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Describe your symptoms or ask a question..."
                            rows={1}
                            style={{
                                width: '100%',
                                padding: '14px 18px',
                                border: 'none',
                                outline: 'none',
                                fontSize: 14,
                                lineHeight: 1.5,
                                resize: 'none',
                                background: 'transparent',
                                color: '#1a202c',
                                fontFamily: 'inherit',
                            }}
                        />
                    </div>
                    <button
                        className="send-btn"
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: 14,
                            border: 'none',
                            background: input.trim() && !isTyping
                                ? 'linear-gradient(135deg, #2D6CDF, #4F8AEF)'
                                : '#E2E8F0',
                            color: input.trim() && !isTyping ? 'white' : '#94A3B8',
                            fontSize: 20,
                            cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'all 0.2s',
                            boxShadow: input.trim() && !isTyping ? '0 2px 8px rgba(45,108,223,0.3)' : 'none',
                        }}
                    >
                        ➤
                    </button>
                </div>
            </div>
        </div>
    )
}
