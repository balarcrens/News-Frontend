import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lock, Loader2, CheckCircle2, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { toast } from 'react-toastify';
import useAuth from '../context/useAuth';
import SEO from '../components/common/SEO';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const { resetPassword, loading } = useAuth();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return;
        }

        const result = await resetPassword(token, password);

        if (result.success) {
            setIsSuccess(true);
            toast.success('Password updated successfully.');
            setTimeout(() => navigate('/auth'), 4000);
        } else {
            toast.error(result.message);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4">
                <div className="text-center space-y-6 animate-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-100">
                        <ShieldCheck className="text-green-600" size={40} />
                    </div>
                    <h1 className="text-4xl font-black font-serif italic tracking-tighter text-slate-900">
                        Access Restored.
                    </h1>
                    <p className="text-sm font-medium text-gray-500 italic max-w-xs mx-auto">
                        Your credentials have been updated. You are being redirected to the secure sign-in portal.
                    </p>
                    <div className="pt-4 flex justify-center">
                        <Loader2 className="animate-spin text-gray-200" size={24} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-white">
            <SEO
                title="Define New Credentials | Nexora News"
                description="Securely reset your password and restore access to your Nexora News account."
            />

            <div className="max-w-md w-full">
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="space-y-4">
                        <h1 className="text-5xl font-black font-serif italic tracking-tighter text-slate-900 leading-[0.9]">
                            New <br />
                            <span className="text-red-700">Credentials.</span>
                        </h1>
                        <p className="text-sm font-medium text-gray-500 italic max-w-xs leading-relaxed">
                            Establish a robust new password to secure your editorial profile and briefings.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                        <div className="space-y-6">
                            <div className="relative group">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 block group-focus-within:text-red-700 transition-colors">
                                    New Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-red-700 transition-colors" size={18} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-gray-50/50 border-none p-5 pl-14 pr-14 text-sm font-medium focus:ring-1 focus:ring-red-700/20 outline-none transition-all placeholder:text-gray-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-red-700 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="relative group">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 block group-focus-within:text-red-700 transition-colors">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <CheckCircle2 className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-red-700 transition-colors" size={18} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-gray-50/50 border-none p-5 pl-14 text-sm font-medium focus:ring-1 focus:ring-red-700/20 outline-none transition-all placeholder:text-gray-400"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-700 cursor-pointer hover:bg-red-800 text-white py-5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-xl shadow-red-700/10 active:scale-[0.98] group disabled:opacity-50"
                        >
                            <span className="flex items-center justify-center">
                                {loading ? (
                                    <Loader2 className="animate-spin mr-2" size={16} />
                                ) : (
                                    'Update Credentials'
                                )}
                            </span>
                        </button>
                    </form>

                    <div className="pt-8 border-t border-gray-100">
                        <div className="flex items-start space-x-3">
                            <div className="w-1.5 h-1.5 bg-red-700 rounded-full mt-1 shrink-0" />
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">
                                Avoid using passwords from other platforms. Recommended: Use a passphrase or a mix of symbols and numbers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
