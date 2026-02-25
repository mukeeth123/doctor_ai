import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
    const [patientBasicInfo, setPatientBasicInfo] = useState(null)
    const [conversationHistory, setConversationHistory] = useState([])

    const clearSession = () => {
        setPatientBasicInfo(null)
        setConversationHistory([])
    }

    return (
        <AppContext.Provider value={{
            patientBasicInfo,
            setPatientBasicInfo,
            conversationHistory,
            setConversationHistory,
            clearSession,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider')
    }
    return context
}
