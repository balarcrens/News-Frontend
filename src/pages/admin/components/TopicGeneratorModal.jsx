/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { X, Sparkles, Loader2, Search, ArrowRight, TrendingUp } from 'lucide-react';
import { aiService } from '../../../api/aiService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TopicGeneratorModal = ({ isOpen, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [topics, setTopics] = useState([]);
    const navigate = useNavigate();

    const generateTopics = async () => {
        setLoading(true);
        try {
            const data = await aiService.generateTopics();
            setTopics(data);
        } catch (err) {
            console.error(err);
            toast.error('Failed to generate intelligence topics: ' + (err.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen && topics.length === 0) {
            generateTopics();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSelectTopic = (topic) => {
        const queryParams = new URLSearchParams({
            topic: topic.title,
            category: topic.category,
            summary: topic.summary
        }).toString();

        onClose();
        navigate(`/admin/articles/new?${queryParams}`);
    };

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-300"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="bg-white w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-red-700 flex items-center justify-center text-white">
                            <Sparkles size={18} />
                        </div>
                        <div>
                            <h2 id="modal-title" className="text-xl font-black font-serif text-slate-900 uppercase tracking-tight">AI Intelligence Discovery</h2>
                            <p className="text-xs font-black text-slate-600 uppercase tracking-widest mt-1">Scanning national vectors for high-priority news trends</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={generateTopics}
                            disabled={loading}
                            className="text-[10px] font-black cursor-pointer text-slate-600 hover:text-red-700 uppercase tracking-widest flex items-center transition-colors disabled:opacity-30 focus:outline-none focus:ring-2 focus:ring-red-700 rounded-sm"
                            aria-label="Refresh trends"
                        >
                            <TrendingUp size={14} className="mr-2" /> Refresh Scan
                        </button>
                        <button 
                            onClick={onClose} 
                            className="p-2 text-slate-500 hover:text-slate-900 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-red-700 rounded-lg"
                            aria-label="Close modal"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-0 hidden-scrollbar">
                    {loading ? (
                        <div className="h-96 flex flex-col items-center justify-center space-y-6">
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-slate-100 border-t-red-700 rounded-full animate-spin"></div>
                                <Sparkles size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-700 animate-pulse" />
                            </div>
                            <p className="text-[11px] font-black text-slate-600 uppercase tracking-[0.3em] animate-pulse">Initializing neural scan protocol...</p>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead className="sticky top-0 bg-white z-10">
                                <tr className="border-b border-slate-100">
                                    <th className="py-5 px-8 text-xs font-black text-slate-600 uppercase tracking-widest">Trend Priority</th>
                                    <th className="py-5 px-8 text-xs font-black text-slate-600 uppercase tracking-widest w-1/2">Intelligence Subject</th>
                                    <th className="py-5 px-8 text-xs font-black text-slate-600 uppercase tracking-widest">Sector</th>
                                    <th className="py-5 px-8 text-xs font-black text-slate-600 uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {topics.map((topic, index) => (
                                    <tr key={index} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="py-6 px-8">
                                            <div className="flex items-center space-x-3">
                                                <div className="text-lg font-serif font-black text-slate-500 group-hover:text-red-700/20 transition-colors">#{index + 1}</div>
                                                <div className="flex items-center bg-slate-50 px-3 py-1 border border-slate-100 group-hover:border-red-100 transition-colors">
                                                    <TrendingUp size={10} className="text-red-700 mr-2" />
                                                    <span className="text-[10px] font-black text-slate-900 tracking-tighter">{topic.trend_score}/10</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8">
                                            <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-tight group-hover:text-red-700 transition-colors mb-2 line-clamp-1">{topic.title}</h4>
                                            <p className="text-[11px] font-medium text-slate-500 line-clamp-2 leading-relaxed font-serif">{topic.summary}</p>
                                        </td>
                                        <td className="py-6 px-8">
                                            <span className="text-xs font-black text-red-700 bg-red-50 border border-red-100/50 px-3 py-1 uppercase tracking-widest">
                                                {topic.category}
                                            </span>
                                        </td>
                                        <td className="py-6 px-8 text-right">
                                            <button
                                                onClick={() => handleSelectTopic(topic)}
                                                className="inline-flex items-center justify-center bg-white border border-red-700 text-red-700 px-5 py-3 text-xs font-black uppercase tracking-widest hover:bg-red-700 hover:text-white transition-all shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
                                                aria-label={`Select topic: ${topic.title}`}
                                            >
                                                Select <ArrowRight size={12} className="ml-2" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center text-xs font-bold text-slate-600 uppercase tracking-widest invisible">
                        <Sparkles size={12} className="mr-2 text-red-700" />
                        AI-Drive Content Engine v1.0
                    </div>
                    <button
                        onClick={onClose}
                        className="text-[10px] cursor-pointer font-black text-slate-600 hover:text-slate-900 uppercase tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-red-700 rounded-sm"
                        aria-label="Close terminal and back to editor"
                    >
                        Close Terminal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TopicGeneratorModal;

