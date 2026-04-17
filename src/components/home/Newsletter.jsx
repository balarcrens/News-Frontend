import React, { useState } from 'react';
import { Mail, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import api from '../../api/axios';
import { toast } from 'react-toastify';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/api/subscriptions', { email });
            if (data.success) {
                setSubscribed(true);
                toast.success('Subscribed Successfully');
                setEmail('');
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Subscription failed.';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="newsletter-section" className="relative py-24 overflow-hidden border-y border-gray-100 bg-white">

            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-red-50 rounded-full blur-[100px] opacity-50" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-slate-50 rounded-full blur-[100px] opacity-50" />

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                    <div className="lg:w-1/2 space-y-6">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-50 text-red-700 rounded-full">
                            <Sparkles size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">The Inner Circle</span>
                        </div>

                        <h2 className="text-5xl md:text-6xl font-black font-serif italic tracking-tighter text-slate-900 leading-[0.9]">
                            Refined Intelligence. <br />
                            <span className="text-gray-400">Delivered Daily.</span>
                        </h2>

                        <p className="text-lg text-gray-500 font-medium italic max-w-lg leading-relaxed">
                            Join our curated briefing list. No noise. Just deep analysis and visual clarity from the world's most influential newsrooms.
                        </p>
                    </div>

                    <div className="lg:w-5/12 w-full">
                        {subscribed ? (
                            <div className="p-10 bg-slate-900 text-white rounded-2xl shadow-2xl shadow-slate-900/20 animate-in zoom-in duration-500">
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-serif italic font-bold tracking-tight">Access Granted.</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        Check your inbox to confirm your place in the Nexora inner circle. Your first briefing arrives at dawn.
                                    </p>
                                    <button
                                        onClick={() => setSubscribed(false)}
                                        className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors"
                                    >
                                        Subscribe another email
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubscribe}
                                className="relative group"
                            >
                                <div className="flex flex-col space-y-4">
                                    <div className="relative">
                                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-700 transition-colors" size={20} />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your professional email"
                                            className="w-full bg-gray-50 border-2 border-gray-50 p-5 pl-16 pr-40 text-sm font-medium focus:bg-white focus:border-red-700/10 outline-none transition-all placeholder:text-gray-400 rounded-xl"
                                        />
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:block">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="bg-slate-900 cursor-pointer hover:bg-black text-white px-8 py-4 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg active:scale-95 disabled:opacity-50"
                                            >
                                                {loading ? <Loader2 className="animate-spin" size={16} /> : 'Join Now'}
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="md:hidden bg-slate-900 cursor-pointer hover:bg-black text-white p-6 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg active:scale-95 disabled:opacity-50"
                                    >
                                        {loading ? <Loader2 className="animate-spin mx-auto" size={16} /> : 'Join Now'}
                                    </button>

                                    <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-medium text-center md:text-left pl-2">
                                        Unsubscribe anytime. Privacy prioritized.
                                    </p>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
