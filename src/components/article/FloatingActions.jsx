/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { Share2, Heart, MessageSquare, Twitter, Facebook, Linkedin, AlertCircle } from 'lucide-react';
import { articleService } from '../../api/articleService';
import useAuth from '../../context/useAuth';

const FloatingActions = ({
    articleId,
    commentCount = 0,
    articleTitle = '',
    initialLikes = 0,
    initialIsLiked = false
}) => {
    const { user } = useAuth();
    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [showLoginAlert, setShowLoginAlert] = useState(false);
    const shareUrl = window.location.href;

    useEffect(() => {
        setLikes(initialLikes);
        setIsLiked(initialIsLiked);
    }, [initialLikes, initialIsLiked]);

    const handleLike = async () => {
        if (!user) {
            setShowLoginAlert(true);
            setTimeout(() => setShowLoginAlert(false), 3000);
            return;
        }

        try {
            const data = await articleService.likeArticle(articleId);
            setLikes(data.likes);
            setIsLiked(data.isLiked);
        } catch (error) {
            console.error("Error liking article:", error);
        }
    };

    const shareActions = {
        twitter: () => {
            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(articleTitle)}`, '_blank');
        },
        facebook: () => {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        },
        linkedin: () => {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
        },
        copyLink: () => {
            navigator.clipboard.writeText(shareUrl);
            alert('Link copied to clipboard');
        }
    };

    return (
        <div className="flex flex-row lg:flex-col items-center lg:justify-start justify-evenly lg:sticky top-40 h-fit lg:py-6 py-2 pr-2 lg:pr-8 border-r border-gray-100 italic font-serif">
            {showLoginAlert && (
                <div className="absolute left-full ml-4 top-0 w-48 bg-slate-900 text-white p-4 shadow-2xl animate-in fade-in slide-in-from-left-4 duration-300 z-10">
                    <div className="flex items-start space-x-3">
                        <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest mb-1">Authenticity Required</p>
                            <p className="text-[9px] text-gray-400 leading-relaxed uppercase tracking-tighter italic">Join The Pulse to express your appreciation.</p>
                        </div>
                    </div>
                </div>
            )}

            <div className='hidden lg:flex mb-0'>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 lg:vertical-text ">
                    Share Stories
                </p>
            </div>

            <div className="flex mb-0 lg:flex-col items-center lg:space-y-6 space-x-3 lg:space-x-0">
                <button
                    onClick={shareActions.twitter}
                    className="p-3 text-gray-400 hover:text-red-700 hover:bg-red-50 transition-all rounded-full group relative"
                >
                    <Twitter size={18} />
                    <span className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-[8px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                        Twitter / X
                    </span>
                </button>
                <button
                    onClick={shareActions.facebook}
                    className="p-3 text-gray-400 hover:text-red-700 hover:bg-red-50 transition-all rounded-full group relative"
                >
                    <Facebook size={18} />
                    <span className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-[8px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                        Facebook
                    </span>
                </button>
                <button
                    onClick={shareActions.linkedin}
                    className="p-3 text-gray-400 hover:text-red-700 hover:bg-red-50 transition-all rounded-full group relative"
                >
                    <Linkedin size={18} />
                    <span className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-[8px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                        LinkedIn
                    </span>
                </button>
            </div>

            <div className="lg:w-8 lg:h-px bg-gray-100"></div>

            <div className="flex mb-0 lg:flex-col items-center lg:space-y-6 space-x-3 lg:space-x-0">
                <button className="flex flex-col items-center space-y-group group">
                    <div className="p-3 text-gray-400 hover:text-red-700 hover:bg-red-50 transition-all rounded-full">
                        <MessageSquare size={18} />
                    </div>
                    <span className="text-[9px] font-bold text-gray-400 group-hover:text-red-700 transition-colors uppercase tracking-widest">
                        {commentCount}
                    </span>
                </button>

                <button
                    onClick={handleLike}
                    className={`flex flex-col items-center lg:space-y-2 group transition-all duration-500`}
                >
                    <div className={`p-3 rounded-full transition-all duration-500 ${(isLiked && user) ? 'text-red-700 bg-red-50 shadow-inner' : 'text-gray-400 hover:text-red-700 hover:bg-red-50'}`}>
                        <Heart size={18} className={isLiked ? 'fill-current' : ''} />
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-widest transition-colors ${(isLiked && user) ? 'text-red-700' : 'text-gray-400 group-hover:text-red-700'}`}>
                        {likes}
                    </span>
                </button>

                <button
                    onClick={shareActions.copyLink}
                    className="p-3 text-gray-400 hover:text-red-700 hover:bg-red-50 transition-all rounded-full group relative"
                >
                    <Share2 size={18} />
                    <span className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-[8px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                        Copy Link
                    </span>
                </button>
            </div>

            <style>{`
                .vertical-text {
                    writing-mode: vertical-rl;
                    transform: rotate(180deg);
                }
            `}</style>
        </div>
    );
};

export default FloatingActions;
