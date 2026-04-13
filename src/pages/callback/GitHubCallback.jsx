/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../context/useAuth';
import { ShieldCheck, Loader2 } from 'lucide-react';

const GitHubCallback = () => {
    const navigate = useNavigate();
    const { githubLogin, setError } = useAuth();
    const called = useRef(false);
    const [statusIndex, setStatusIndex] = useState(0);

    const statuses = [
        "Establishing secure connection...",
        "Authenticating with GitHub...",
        "Fetching your profile credentials...",
        "Verifying identity with Nexora...",
        "Finalizing secure session..."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setStatusIndex((prev) => (prev + 1) % statuses.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (called.current) return;
        called.current = true;

        const code = new URLSearchParams(window.location.search).get('code');

        const handleLogin = async () => {
            setError(null);
            const result = await githubLogin(code);

            // Add a small delay for aesthetic transition if it's too fast
            setTimeout(() => {
                if (result.success) {
                    navigate('/');
                } else {
                    navigate('/auth');
                }
            }, 1000);
        };

        if (code) handleLogin();
    }, []);

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-white px-4">
            <div className="max-w-md w-full text-center space-y-12 animate-in fade-in zoom-in duration-700">
                {/* Visual Loader */}
                <div className="relative inline-block">
                    {/* Ring 1 - Deep Red */}
                    <div className="absolute inset-0 border-4 border-red-700/10 rounded-full w-24 h-24 -m-2"></div>
                    {/* Ring 2 - Spinning Brand Red */}
                    <div className="absolute inset-0 border-t-4 border-red-700 rounded-full w-24 h-24 -m-2 animate-spin"></div>

                    {/* GitHub Icon Container */}
                    <div className="relative w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center shadow-2xl shadow-red-700/20 group">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="36"
                            height="36"
                            fill="white"
                            className="animate-pulse"
                        >
                            <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.94c.58.11.79-.25.79-.56v-2.02c-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.3-1.68-1.3-1.68-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.76.4-1.27.72-1.56-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.19-3.07-.12-.29-.52-1.45.11-3.03 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.58.23 2.74.11 3.03.74.8 1.19 1.82 1.19 3.07 0 4.4-2.69 5.36-5.25 5.64.41.35.77 1.04.77 2.1v3.11c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
                        </svg>

                        {/* Security Badge Overlay */}
                        <div className="absolute -bottom-1 -right-1 bg-red-700 text-white rounded-full p-1 border-4 border-white">
                            <ShieldCheck size={14} />
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black font-serif italic tracking-tighter text-slate-900 transition-all duration-500">
                        Authenticating
                    </h1>
                    <div className="flex flex-col items-center space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-700 animate-pulse">
                            Secure Handshake In Progress
                        </p>
                        <div className="flex items-center space-x-2 text-sm font-medium text-gray-500 italic">
                            <Loader2 size={14} className="animate-spin text-gray-300" />
                            <span key={statusIndex} className="animate-in fade-in slide-in-from-bottom-1 duration-500">
                                {statuses[statusIndex]}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Aesthetic Progress Bar */}
                <div className="max-w-[200px] mx-auto h-[1px] bg-gray-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-700 w-1/3 animate-[marquee_2s_linear_infinite]"></div>
                </div>
            </div>

            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(300%); }
                }
            `}</style>
        </div>
    );
};

export default GitHubCallback;