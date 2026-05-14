import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000',
    headers: { 'Content-Type': 'application/json' },
    timeout: 60000,
})

export async function sendMessage(patientBasicInfo, conversationHistory, latestUserMessage) {
    try {
        const response = await api.post('/api/doctor', {
            patient_basic_info: patientBasicInfo,
            conversation_history: conversationHistory,
            latest_user_message: latestUserMessage,
        })

        const data = response.data

        // Validate response is an object
        if (!data || typeof data !== 'object') {
            return { error: true, message: 'Received invalid response from server.' }
        }

        // If backend returned an error
        if (data.error) {
            return { error: true, message: data.message || 'An error occurred.' }
        }

        // Validate required 'type' field
        if (!data.type || !['answer', 'question', 'analysis'].includes(data.type)) {
            return { error: true, message: 'Received unexpected response format from AI.' }
        }

        return data

    } catch (err) {
        // Network / timeout errors
        if (err.code === 'ECONNABORTED') {
            return { error: true, message: 'Request timed out. The AI is taking too long to respond. Please try again.' }
        }
        if (err.code === 'ERR_NETWORK' || !err.response) {
            return { error: true, message: 'Cannot connect to the server. Please check if the backend is running on port 8000.' }
        }
        // HTTP errors
        if (err.response) {
            const status = err.response.status
            if (status === 422) {
                return { error: true, message: 'Invalid request format. Please refresh and try again.' }
            }
            if (status >= 500) {
                return { error: true, message: 'Server error. Please try again in a moment.' }
            }
            return { error: true, message: `Request failed (status ${status}).` }
        }
        // Catch-all
        return { error: true, message: 'An unexpected error occurred. Please try again.' }
    }
}

export default api

export async function speakText(text) {
    try {
        const response = await api.post('/api/tts', { text }, {
            responseType: 'blob',
            timeout: 30000,
        })
        const audioBlob = new Blob([response.data], { type: 'audio/mpeg' })
        const audioUrl = URL.createObjectURL(audioBlob)
        const audio = new Audio(audioUrl)
        audio.onended = () => URL.revokeObjectURL(audioUrl)
        await audio.play()
        return audio
    } catch (err) {
        console.error('TTS failed:', err)
        return null
    }
}

