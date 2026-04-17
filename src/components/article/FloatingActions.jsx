/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { Share2, Heart, MessageSquare, Twitter, Facebook, Linkedin, AlertCircle } from 'lucide-react';
import { articleService } from '../../api/articleService';
import useAuth from '../../context/useAuth';
import { toast } from 'react-toastify';

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
        copyLink: async () => {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: articleTitle,
                        text: 'Check out this article on Nexora News',
                        url: shareUrl,
                    });
                } catch (err) {
                    console.log("Share cancelled or failed:", err);
                }
            } else {
                try {
                    await navigator.clipboard.writeText(shareUrl);
                    toast.success("Link copied to clipboard!");
                } catch (err) {
                    console.log("Copy failed:", err);
                }
            }
        }
    };

    return (
        <div className="flex flex-row lg:flex-col flex-wrap md:gap-2 items-center lg:justify-start justify-evenly lg:sticky top-40 h-fit lg:py-6 py-2 pr-2 lg:pr-8 border-r border-gray-100 italic font-serif">
            {showLoginAlert && (
                <div className="absolute left-full ml-4 top-0 w-48 bg-slate-900 text-white p-4 shadow-2xl animate-in fade-in slide-in-from-left-4 duration-300 z-10">
                    <div className="flex items-start space-x-3">
                        <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest mb-1">Authenticity Required</p>
                            <p className="text-xs text-gray-600 leading-relaxed uppercase tracking-tighter italic">Join The Pulse to express your appreciation.</p>
                        </div>
                    </div>
                </div>
            )}

            <div className='hidden lg:flex mb-3'>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 md:horizontal-text vertical-text ">
                    Share Stories
                </p>
            </div>

            <div className="flex mb-0 lg:flex-col items-center lg:space-y-3 space-x-3 lg:space-x-0">
                <button
                    onClick={shareActions.twitter}
                    className="p-4 text-gray-700 cursor-pointer hover:text-red-700 hover:bg-red-50 transition-all rounded-full group relative focus:outline-none focus:ring-2 focus:ring-red-700"
                    aria-label="Share on Twitter"
                >
                    <Twitter size={18} />
                    <span className="absolute left-full md:ml-4 px-2 py-1 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                        Twitter / X
                    </span>
                </button>
                <button
                    onClick={shareActions.facebook}
                    className="p-4 text-gray-700 cursor-pointer hover:text-red-700 hover:bg-red-50 transition-all rounded-full group relative focus:outline-none focus:ring-2 focus:ring-red-700"
                    aria-label="Share on Facebook"
                >
                    <Facebook size={18} />
                    <span className="absolute left-full md:ml-4 px-2 py-1 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                        Facebook
                    </span>
                </button>
                <button
                    onClick={shareActions.linkedin}
                    className="p-4 text-gray-700 cursor-pointer hover:text-red-700 hover:bg-red-50 transition-all rounded-full group relative focus:outline-none focus:ring-2 focus:ring-red-700"
                    aria-label="Share on LinkedIn"
                >
                    <Linkedin size={18} />
                    <span className="absolute left-full md:ml-4 px-2 py-1 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                        LinkedIn
                    </span>
                </button>
            </div>

            <div className="md:w-8 md:h-px bg-gray-100"></div>

            <div className="flex mb-0 lg:flex-col items-center lg:space-y-3 space-x-3 lg:space-x-0">
                <button 
                    className="flex flex-col items-center space-y-group group focus:outline-none focus:ring-2 focus:ring-red-700 rounded-lg p-1.5"
                    aria-label={`View ${commentCount} comments`}
                    onClick={() => document.getElementById('discussion-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    <div className="p-3 text-gray-700 hover:text-red-700 hover:bg-red-50 transition-all rounded-full">
                        <MessageSquare size={18} />
                    </div>
                    <span className="text-xs font-bold text-gray-700 group-hover:text-red-700 transition-colors uppercase tracking-widest">
                        {commentCount}
                    </span>
                </button>

                <button
                    onClick={handleLike}
                    className={`flex flex-col items-center cursor-pointer group transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-red-700 rounded-lg p-1.5`}
                    aria-label={isLiked ? "Unlike article" : "Like article"}
                >
                    <div className={`p-3 rounded-full transition-all duration-500 ${(isLiked && user) ? 'text-red-700 bg-red-50 shadow-inner' : 'text-gray-700 hover:text-red-700 hover:bg-red-50'}`}>
                        <Heart size={18} className={isLiked ? 'fill-current' : ''} />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${(isLiked && user) ? 'text-red-700' : 'text-gray-700 group-hover:text-red-700'}`}>
                        {likes}
                    </span>
                </button>

                <button
                    onClick={shareActions.copyLink}
                    className="p-4 text-gray-700 hover:text-red-700 cursor-pointer hover:bg-red-50 transition-all rounded-full group relative focus:outline-none focus:ring-2 focus:ring-red-700"
                    aria-label="Copy article link"
                >
                    <Share2 size={18} />
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

