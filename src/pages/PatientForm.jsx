import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import Navbar from '../components/Navbar'

export default function PatientForm() {
    const navigate = useNavigate()
    const { setPatientBasicInfo } = useAppContext()

    const [form, setForm] = useState({
        name: '',
        age: '',
        gender: '',
        city: '',
        known_conditions: '',
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const validate = () => {
        const newErrors = {}
        if (!form.name.trim()) newErrors.name = 'Name is required'
        if (!form.age || form.age < 1 || form.age > 120) newErrors.age = 'Enter a valid age (1-120)'
        if (!form.gender) newErrors.gender = 'Please select gender'
        if (!form.city.trim()) newErrors.city = 'City is required'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validate()) return

        setPatientBasicInfo({
            name: form.name.trim(),
            age: parseInt(form.age),
            gender: form.gender,
            city: form.city.trim(),
            known_conditions: form.known_conditions.trim() || 'None',
        })
        navigate('/chat')
    }

    const inputStyle = (field) => ({
        width: '100%',
        padding: '12px 16px',
        fontSize: 15,
        border: `1.5px solid ${errors[field] ? '#EF4444' : '#E2E8F0'}`,
        borderRadius: 12,
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        background: '#FAFBFF',
        color: '#1a202c',
    })

    const labelStyle = {
        display: 'block',
        fontSize: 13,
        fontWeight: 600,
        color: '#475569',
        marginBottom: 6,
    }

    const errorStyle = {
        fontSize: 12,
        color: '#EF4444',
        marginTop: 4,
    }

    return (
        <div style={{ minHeight: '100vh', background: '#F8FBFF' }}>
            <Navbar />

            <div style={{
                maxWidth: 560,
                margin: '0 auto',
                padding: '60px 20px 80px',
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
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
                        marginBottom: 16,
                    }}>
                        📋 Patient Information
                    </div>
                    <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1a202c', marginBottom: 8 }}>
                        Tell Us About Yourself
                    </h1>
                    <p style={{ fontSize: 15, color: '#64748B', lineHeight: 1.6 }}>
                        Help our AI doctor understand your profile for better guidance.
                    </p>
                </div>

                {/* Form Card */}
                <form onSubmit={handleSubmit} style={{
                    background: 'white',
                    borderRadius: 20,
                    padding: '36px 32px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                }}>
                    {/* Name */}
                    <div style={{ marginBottom: 20 }}>
                        <label style={labelStyle}>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            style={inputStyle('name')}
                            onFocus={e => { e.target.style.borderColor = '#2D6CDF'; e.target.style.boxShadow = '0 0 0 3px rgba(45,108,223,0.1)' }}
                            onBlur={e => { e.target.style.borderColor = errors.name ? '#EF4444' : '#E2E8F0'; e.target.style.boxShadow = 'none' }}
                        />
                        {errors.name && <p style={errorStyle}>{errors.name}</p>}
                    </div>

                    {/* Age & Gender — side by side */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                        <div>
                            <label style={labelStyle}>Age</label>
                            <input
                                type="number"
                                name="age"
                                value={form.age}
                                onChange={handleChange}
                                placeholder="e.g. 28"
                                min="1"
                                max="120"
                                style={inputStyle('age')}
                                onFocus={e => { e.target.style.borderColor = '#2D6CDF'; e.target.style.boxShadow = '0 0 0 3px rgba(45,108,223,0.1)' }}
                                onBlur={e => { e.target.style.borderColor = errors.age ? '#EF4444' : '#E2E8F0'; e.target.style.boxShadow = 'none' }}
                            />
                            {errors.age && <p style={errorStyle}>{errors.age}</p>}
                        </div>
                        <div>
                            <label style={labelStyle}>Gender</label>
                            <select
                                name="gender"
                                value={form.gender}
                                onChange={handleChange}
                                style={{ ...inputStyle('gender'), cursor: 'pointer', appearance: 'auto' }}
                                onFocus={e => { e.target.style.borderColor = '#2D6CDF'; e.target.style.boxShadow = '0 0 0 3px rgba(45,108,223,0.1)' }}
                                onBlur={e => { e.target.style.borderColor = errors.gender ? '#EF4444' : '#E2E8F0'; e.target.style.boxShadow = 'none' }}
                            >
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.gender && <p style={errorStyle}>{errors.gender}</p>}
                        </div>
                    </div>

                    {/* City */}
                    <div style={{ marginBottom: 20 }}>
                        <label style={labelStyle}>City</label>
                        <input
                            type="text"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            placeholder="e.g. Hyderabad"
                            style={inputStyle('city')}
                            onFocus={e => { e.target.style.borderColor = '#2D6CDF'; e.target.style.boxShadow = '0 0 0 3px rgba(45,108,223,0.1)' }}
                            onBlur={e => { e.target.style.borderColor = errors.city ? '#EF4444' : '#E2E8F0'; e.target.style.boxShadow = 'none' }}
                        />
                        {errors.city && <p style={errorStyle}>{errors.city}</p>}
                    </div>

                    {/* Known Conditions */}
                    <div style={{ marginBottom: 28 }}>
                        <label style={labelStyle}>Known Medical Conditions <span style={{ color: '#94A3B8', fontWeight: 400 }}>(optional)</span></label>
                        <textarea
                            name="known_conditions"
                            value={form.known_conditions}
                            onChange={handleChange}
                            placeholder="e.g. Diabetes, Hypertension, Asthma..."
                            rows={3}
                            style={{
                                ...inputStyle('known_conditions'),
                                resize: 'vertical',
                                minHeight: 80,
                            }}
                            onFocus={e => { e.target.style.borderColor = '#2D6CDF'; e.target.style.boxShadow = '0 0 0 3px rgba(45,108,223,0.1)' }}
                            onBlur={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none' }}
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '14px 32px',
                            background: 'linear-gradient(135deg, #2D6CDF 0%, #4F8AEF 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: 14,
                            fontSize: 16,
                            fontWeight: 600,
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(45,108,223,0.3)',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 8,
                        }}
                        onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 6px 20px rgba(45,108,223,0.4)' }}
                        onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 15px rgba(45,108,223,0.3)' }}
                    >
                        Start Consultation →
                    </button>
                </form>

                {/* Privacy note */}
                <p style={{
                    textAlign: 'center',
                    fontSize: 12,
                    color: '#94A3B8',
                    marginTop: 20,
                    lineHeight: 1.6,
                }}>
                    🔒 Your information is not stored and is only used during this session.
                </p>
            </div>
        </div>
    )
}
