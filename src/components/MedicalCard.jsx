export default function MedicalCard({ data }) {
    if (!data) return null

    const sections = [
        {
            icon: '🔍',
            title: 'Likely Condition',
            content: data.likely_condition,
            type: 'text',
        },
        {
            icon: '📖',
            title: 'Explanation',
            content: data.explanation,
            type: 'text',
        },
        {
            icon: '🧪',
            title: 'Recommended Tests',
            content: data.recommended_tests,
            type: 'list',
        },
        {
            icon: '💊',
            title: 'Basic Medications',
            content: data.basic_medications,
            type: 'list',
        },
        {
            icon: '🏠',
            title: 'Home Care Steps',
            content: data.home_care_steps,
            type: 'list',
        },
        {
            icon: '⏱️',
            title: 'Recovery Estimate',
            content: data.recovery_estimate,
            type: 'text',
        },
    ]

    return (
        <div className="medical-card" style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginBottom: 16,
            paddingRight: 48,
            animation: 'fadeSlideUp 0.4s ease-out both',
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                maxWidth: '90%',
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

                {/* Card */}
                <div style={{
                    background: 'white',
                    borderRadius: 20,
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                    overflow: 'hidden',
                    width: '100%',
                }}>
                    {/* Card Header */}
                    <div style={{
                        background: 'linear-gradient(135deg, #2D6CDF 0%, #4F8AEF 100%)',
                        padding: '16px 24px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                    }}>
                        <span style={{ fontSize: 20 }}>📋</span>
                        <div>
                            <div style={{ color: 'white', fontSize: 16, fontWeight: 700 }}>
                                Medical Analysis Report
                            </div>
                            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, marginTop: 2 }}>
                                AI-generated preliminary guidance
                            </div>
                        </div>
                    </div>

                    {/* Sections */}
                    <div style={{ padding: '8px 0' }}>
                        {sections.map((section, i) => {
                            if (!section.content || (Array.isArray(section.content) && section.content.length === 0)) {
                                return null
                            }
                            return (
                                <div key={i} style={{
                                    padding: '16px 24px',
                                    borderBottom: i < sections.length - 1 ? '1px solid #F1F5F9' : 'none',
                                }}>
                                    {/* Section Header */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        marginBottom: 8,
                                    }}>
                                        <span style={{ fontSize: 16 }}>{section.icon}</span>
                                        <h4 style={{
                                            fontSize: 13,
                                            fontWeight: 700,
                                            color: '#2D6CDF',
                                            textTransform: 'uppercase',
                                            letterSpacing: 0.6,
                                            margin: 0,
                                        }}>
                                            {section.title}
                                        </h4>
                                    </div>

                                    {/* Section Content */}
                                    {section.type === 'text' ? (
                                        <p style={{
                                            fontSize: 14,
                                            color: '#334155',
                                            lineHeight: 1.65,
                                            margin: 0,
                                            paddingLeft: 24,
                                        }}>
                                            {section.content}
                                        </p>
                                    ) : (
                                        <ul style={{
                                            margin: 0,
                                            paddingLeft: 24,
                                            listStyle: 'none',
                                        }}>
                                            {section.content.map((item, j) => (
                                                <li key={j} style={{
                                                    fontSize: 14,
                                                    color: '#334155',
                                                    lineHeight: 1.65,
                                                    padding: '3px 0',
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: 8,
                                                }}>
                                                    <span style={{
                                                        width: 6,
                                                        height: 6,
                                                        borderRadius: '50%',
                                                        background: '#2D6CDF',
                                                        flexShrink: 0,
                                                        marginTop: 8,
                                                    }} />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    {/* Disclaimer */}
                    {data.disclaimer && (
                        <div style={{
                            background: '#FFFBEB',
                            padding: '12px 24px',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 8,
                            borderTop: '1px solid #FEF3C7',
                        }}>
                            <span style={{ fontSize: 14, flexShrink: 0 }}>⚠️</span>
                            <p style={{
                                fontSize: 12,
                                color: '#92400E',
                                lineHeight: 1.5,
                                margin: 0,
                            }}>
                                {data.disclaimer}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
