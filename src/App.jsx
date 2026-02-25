import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Landing from './pages/Landing'
import PatientForm from './pages/PatientForm'
import DoctorChat from './pages/DoctorChat'
import './index.css'

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/form" element={<PatientForm />} />
          <Route path="/chat" element={<DoctorChat />} />
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
