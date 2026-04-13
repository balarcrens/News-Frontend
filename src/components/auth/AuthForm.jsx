/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { ArrowRight, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import useAuth from '../../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
    </svg>
);

const AuthForm = () => {
    const [mode, setMode] = useState('signin'); // 'signin' or 'create'
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const { login, register, loading, error, setError, googleLogin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setError(null);
    }, [mode, setError]);

    // Initialize Google (NO renderButton)
    useEffect(() => {
        if (!window.google) return;

        window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleGoogleSuccess,
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let result;

        if (mode === 'signin') {
            result = await login(formData.email, formData.password);
        } else {
            result = await register(formData.name, formData.email, formData.password);
        }

        if (result.success) {
            toast.success(mode === 'signin' ? 'Welcome back to Nexora.' : 'Account created successfully.');
            navigate('/');
        } else if (result.error) {
            toast.error(result.error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGoogleSuccess = async (res) => {
        const result = await googleLogin(res.credential);
        if (result.success) {
            toast.success('Successfully authenticated with Google.');
            navigate('/');
        } else if (result.error) {
            toast.error(result.error);
        }
    };

    const handleGitHubLogin = () => {
        const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
        const redirectUri = `${window.location.origin}/auth/github/callback`;

        window.location.href =
            `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
    };

    return (
        <div className="space-y-10">
            <div>
                <h2 className="text-4xl font-black font-serif italic tracking-tighter text-slate-900 mb-4">
                    {mode === 'signin' ? 'Welcome Back' : 'Join Nexora'}
                </h2>
                <p className="text-sm font-medium text-gray-500 italic tracking-tight">
                    {mode === 'signin'
                        ? 'Sign in to access your curated briefing.'
                        : 'Become part of our prestige editorial community.'}
                </p>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border-l-4 border-red-700 text-red-700 flex items-start space-x-3 transition-all animate-in fade-in slide-in-from-left-2">
                    <AlertCircle size={20} className="shrink-0 pt-0.5" />
                    <p className="text-xs font-bold uppercase tracking-widest leading-relaxed">
                        {error}
                    </p>
                </div>
            )}

            <div className="flex space-x-8 border-b border-gray-100">
                <button
                    onClick={() => setMode('signin')}
                    className={`pb-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative ${mode === 'signin' ? 'text-red-700' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    Sign In
                    {mode === 'signin' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-700 shadow-[0_-2px_8px_rgba(185,28,28,0.3)]"></div>}
                </button>
                <button
                    onClick={() => setMode('create')}
                    className={`pb-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative ${mode === 'create' ? 'text-red-700' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    Create Account
                    {mode === 'create' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-700 shadow-[0_-2px_8px_rgba(185,28,28,0.3)]"></div>}
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => window.google.accounts.id.prompt()}
                    className="flex items-center justify-center space-x-3 cursor-pointer py-4 border border-gray-100 bg-white hover:bg-gray-50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 group/g"
                >
                    <div className="group-hover/g:scale-110 transition-transform duration-300">
                        <GoogleIcon />
                    </div>
                    <span className="text-xs font-bold text-gray-700">Google</span>
                </button>

                <button
                    onClick={handleGitHubLogin}
                    className="flex items-center justify-center space-x-3 cursor-pointer py-4 bg-slate-900 border border-slate-900 hover:bg-black text-white shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-black/10 group/gh"
                >
                    <div className="group-hover/gh:scale-110 transition-transform duration-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            fill="currentColor"
                        >
                            <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.94c.58.11.79-.25.79-.56v-2.02c-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.3-1.68-1.3-1.68-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.76.4-1.27.72-1.56-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.19-3.07-.12-.29-.52-1.45.11-3.03 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.58.23 2.74.11 3.03.74.8 1.19 1.82 1.19 3.07 0 4.4-2.69 5.36-5.25 5.64.41.35.77 1.04.77 2.1v3.11c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
                        </svg>
                    </div>

                    <span className="text-xs font-bold">GitHub</span>
                </button>
            </div>

            <div className="relative flex items-center justify-center py-4">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <span className="relative z-10 bg-white px-6 text-[8px] font-bold uppercase tracking-[0.3em] text-gray-400">
                    Or continue with email
                </span>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
                {mode === 'create' && (
                    <div className="transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                        <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-3 block">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            required
                            className="w-full bg-gray-50/50 border-none p-5 text-sm font-medium focus:ring-1 focus:ring-red-700/20 outline-none transition-all placeholder:text-gray-300"
                        />
                    </div>
                )}

                <div>
                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-3 block">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        required
                        className="w-full bg-gray-50/50 border-none p-5 text-sm font-medium focus:ring-1 focus:ring-red-700/20 outline-none transition-all placeholder:text-gray-300"
                    />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-3">
                        <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500">Password</label>
                        {mode === 'signin' && (
                            <button type="button" className="text-[9px] font-bold uppercase tracking-[0.2em] text-red-700 hover:opacity-70 transition-opacity">
                                Forgot?
                            </button>
                        )}
                    </div>
                    <div className="relative group/pass">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder={mode === 'signin' ? "••••••••" : "Minimum 6 characters"}
                            required
                            minLength={6}
                            className="w-full bg-gray-50/50 border-none p-5 pr-14 text-sm font-medium focus:ring-1 focus:ring-red-700/20 outline-none transition-all placeholder:text-gray-400/50"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-700 transition-colors p-1"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-700 hover:bg-red-800 text-white py-5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-xl shadow-red-700/10 active:scale-[0.98] group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    <span className="flex items-center justify-center">
                        {loading ? (
                            <Loader2 className="animate-spin mr-2" size={16} />
                        ) : (
                            mode === 'signin' ? 'Access The Pulse' : 'Register Now'
                        )}
                        {!loading && <ArrowRight size={14} className="ml-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />}
                    </span>
                </button>
            </form>

            <p className="text-[9px] text-center text-gray-400 leading-relaxed px-10">
                By continuing, you agree to Nexora News's <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
            </p>
        </div>
    );
};

export default AuthForm;