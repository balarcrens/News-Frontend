import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Loader2, Send } from 'lucide-react';
import { toast } from 'react-toastify';
import useAuth from '../context/useAuth';
import SEO from '../components/common/SEO';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const { forgotPassword, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await forgotPassword(email);
        
        if (result.success) {
            toast.success('Reset link sent to your email.');
            // We could stay on page or redirect. Let's redirect to auth after a delay.
            setTimeout(() => navigate('/auth'), 3000);
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-white">
            <SEO 
                title="Recover Your Access | Nexora News" 
                description="Reset your Nexora News account password safely and securely."
            />
            
            <div className="max-w-md w-full">
                {/* Back Button */}
                <Link 
                    to="/auth" 
                    className="group inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-red-700 transition-colors mb-12"
                >
                    <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Sign In
                </Link>

                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="space-y-4">
                        <h1 className="text-5xl font-black font-serif italic tracking-tighter text-slate-900 leading-[0.9]">
                            Account <br />
                            <span className="text-red-700">Recovery.</span>
                        </h1>
                        <p className="text-sm font-medium text-gray-500 italic max-w-xs leading-relaxed">
                            Enter your verified email address and we'll send a high-priority reset link to your inbox.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                        <div className="relative group">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 block group-focus-within:text-red-700 transition-colors">
                                Professional Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-red-700 transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full bg-gray-50/50 border-none p-5 pl-14 text-sm font-medium focus:ring-1 focus:ring-red-700/20 outline-none transition-all placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !email}
                            className="w-full bg-slate-900 cursor-pointer hover:bg-black text-white py-5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-xl shadow-black/10 active:scale-[0.98] group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="flex items-center justify-center">
                                {loading ? (
                                    <Loader2 className="animate-spin mr-2" size={16} />
                                ) : (
                                    <>
                                        Send Reset Link
                                        <Send size={14} className="ml-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                                    </>
                                )}
                            </span>
                        </button>
                    </form>

                    <div className="pt-8 border-t border-gray-100">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">
                            Security Note: Links expire after <span className="text-slate-900 font-bold">10 minutes</span>. 
                            If you don't receive an email, check your spam folder or contact editorial support.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
