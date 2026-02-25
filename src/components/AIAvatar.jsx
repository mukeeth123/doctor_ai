import { useRef, useEffect } from 'react'
import avatarVideo from '../doctor_aiii.mp4'

export default function AIAvatar({ isPlaying }) {
    const videoRef = useRef(null)

    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.play().catch(err => console.log('Video play failed:', err))
            } else {
                videoRef.current.pause()
            }
        }
    }, [isPlaying])

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            // Cut the last two seconds
            if (videoRef.current.currentTime >= videoRef.current.duration - 2) {
                videoRef.current.currentTime = 0
                if (!isPlaying) {
                    videoRef.current.pause()
                }
            }
        }
    }

    return (
        <div
            style={{
                position: 'fixed',
                right: '40px',
                top: '90px',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid white',
                boxShadow: '0 8px 32px rgba(45,108,223,0.3)',
                background: '#000',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                scale: isPlaying ? '1.05' : '1',
            }}
            className="ai-avatar-container"
        >
            <video
                ref={videoRef}
                src={avatarVideo}
                onTimeUpdate={handleTimeUpdate}
                loop
                muted
                playsInline
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            />

            {/* Pulse effect when speaking */}
            {isPlaying && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: '50%',
                    boxShadow: '0 0 0 0 rgba(45,108,223,0.4)',
                    animation: 'avatarPulse 2s infinite',
                    pointerEvents: 'none',
                }} />
            )}

            <style>{`
        @keyframes avatarPulse {
          0% { box-shadow: 0 0 0 0 rgba(45,108,223,0.4); }
          70% { box-shadow: 0 0 0 15px rgba(45,108,223,0); }
          100% { box-shadow: 0 0 0 0 rgba(45,108,223,0); }
        }

        @media (max-width: 1200px) {
          .ai-avatar-container {
            width: 140px;
            height: 140px;
            right: 20px;
          }
        }

        @media (max-width: 900px) {
          .ai-avatar-container {
            width: 100px;
            height: 100px;
            position: absolute;
            top: 70px;
            right: 20px;
            transform: none;
          }
        }
      `}</style>
        </div>
    )
}
