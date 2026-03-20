import { Newspaper } from 'lucide-react';

const LoadingState = ({ message = "Curating latest stories...", fullPage = true }) => {
    return (
        <div className={`loading-state-container ${fullPage ? 'loader-container' : ''}`} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--spacing-xl)',
            padding: fullPage ? '0' : 'var(--spacing-3xl) 0',
            animation: 'fadeIn 0.5s ease-out'
        }}>
            <div className="loading-ring">
                <div style={{
                    backgroundColor: 'var(--color-white)',
                    color: 'var(--color-black)',
                    width: '50px',
                    height: '50px',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    fontWeight: '900',
                    fontSize: '1.25rem',
                    fontFamily: 'var(--font-serif)'
                }}>
                    <Newspaper size={28} />
                </div>
            </div>

            <div className="flex flex-col items-center gap-xs fade-in-up" style={{ animationDelay: '0.3s' }}>
                <p className="shimmer-text font-serif text-lg font-bold tracking-wide">
                    {message}
                </p>
                <div style={{
                    width: '100px',
                    height: '2px',
                    background: 'var(--color-border)',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 'var(--radius-full)'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '40%',
                        background: 'var(--color-accent)',
                        borderRadius: 'var(--radius-full)',
                        animation: 'shimmer 1.5s infinite linear'
                    }}></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingState;
