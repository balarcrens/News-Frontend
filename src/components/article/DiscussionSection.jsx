import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Send, Reply, Heart, User, Trash } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import useAuth from '../../context/useAuth';
import { commentService } from '../../api/commentService';
import { confirmDestructive } from '../../utils/swal';
import { toast } from 'react-toastify';

const Comment = ({ comment, onReply, onDelete, onLike, isReply = false }) => {
    const { user } = useAuth();
    const isLiked = user && comment.likes?.some(id => id === user._id || id._id === user._id);
    const likeCount = comment.likes?.length || 0;

    return (
        <div className={`group animate-in fade-in slide-in-from-bottom-4 duration-700 ${isReply ? 'mt-6' : ''}`}>
            <div className="flex space-x-5">
                <div className="shrink-0 pt-1">
                    <div className="relative">
                        {comment?.profilePicture ? (
                            <img
                                src={comment?.profilePicture}
                                alt="User"
                                className="w-13 h-13 rounded-full object-cover pointer-events-none"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                    e.target.src = "https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png";
                                }}
                            />
                        ) : (
                            <div className="w-10 h-10 bg-gradient-to-br from-slate-50 to-slate-100 rounded-full flex items-center justify-center text-slate-400 border border-slate-200">
                                <User size={18} />
                            </div>
                        )}
                        {isReply && (
                            <div className="absolute -left-7 top-1/2 w-5 h-[2px] bg-slate-100"></div>
                        )}
                    </div>
                </div>
                <div className="flex-1">
                    <div className="bg-white rounded-2xl py-3 px-5 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                                <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">
                                    {comment.userName || 'Anonymous Participant'}
                                </h4>
                                <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                </span>
                            </div>

                            <div className="flex items-center space-x-2">
                                {(user?.email === comment?.email || user?.role === 'admin') && (
                                    <button
                                        onClick={() => onDelete(comment?._id)}
                                        className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
                                        title="Delete Comment" aria-label="Delete Comment"
                                    >
                                        <Trash size={14} />
                                    </button>
                                )}
                            </div>
                        </div>

                        <p className="text-[15px] font-serif text-slate-700 leading-relaxed">
                            {comment.comment}
                        </p>
                    </div>

                    <div className="flex items-center space-x-6 mt-3 px-2">
                        <button
                            onClick={() => onLike(comment._id)}
                            className={`flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-200 ${isLiked ? 'text-red-600' : 'text-slate-400 hover:text-red-600'
                                }`} aria-label="Like Comment" title="Like Comment"
                        >
                            <Heart size={14} className={`${isLiked ? 'fill-current' : ''} transition-transform active:scale-125`} />
                            <span>{likeCount > 0 ? `${likeCount} ${likeCount === 1 ? 'Like' : 'Likes'}` : 'Like'}</span>
                        </button>

                        <button
                            onClick={() => onReply(comment)}
                            className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-red-700 transition-colors"
                            aria-label="Reply Comment" title='Reply Comment'
                        >
                            <Reply size={14} />
                            <span>Reply</span>
                        </button>
                    </div>

                    {comment.replies && comment.replies.length > 0 && (
                        <div className="ml-4 mt-4 space-y-4 border-l-2 border-slate-50 pl-6">
                            {comment.replies.map(reply => (
                                <Comment
                                    key={reply._id}
                                    comment={reply}
                                    onReply={onReply}
                                    onDelete={onDelete}
                                    onLike={onLike}
                                    isReply={true}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};

const DiscussionSection = ({ articleId, comments = [], onCommentAdded }) => {
    const { user } = useAuth();
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [replyTo, setReplyTo] = useState(null);

    const organizedComments = React.useMemo(() => {
        const rootComments = comments.filter(c => !c.parentComment);
        const replies = comments.filter(c => c.parentComment);

        return rootComments.map(rc => ({
            ...rc,
            replies: replies.filter(r =>
                (typeof r.parentComment === 'string' ? r.parentComment : r.parentComment?._id) === rc._id
            ).reverse()
        }));
    }, [comments]);

    const totalComments = comments.length;

    const handleSubmit = async () => {
        if (!newComment.trim()) return;
        if (!articleId) return;

        setIsSubmitting(true);
        try {
            await commentService.add({
                articleId,
                comment: newComment,
                userName: user?.name || 'Anonymous Participant',
                email: user?.email || 'guest@example.com',
                profilePicture: user?.profilePicture,
                parentComment: replyTo?._id || null
            });
            setNewComment('');
            setReplyTo(null);
            if (onCommentAdded) onCommentAdded();
            toast.success('Comment published to the briefing.');
        } catch (error) {
            console.error("Failed to post comment:", error);
            toast.error('Failed to transmit comment.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLike = async (commentId) => {
        if (!user) {
            toast.info('Please authorize your identity to engage.');
            return;
        }
        try {
            await commentService.like(commentId);
            if (onCommentAdded) onCommentAdded();
        } catch (error) {
            console.error("Failed to like comment:", error);
        }
    };

    const handleDelete = async (commentId) => {
        const result = await confirmDestructive(
            'Remove Statement',
            'Are you sure you want to retract this comment? This action is permanent.'
        );
        if (result.isConfirmed) {
            try {
                await commentService.delete(commentId);
                toast.success('Comment retracted successfully.');
                if (onCommentAdded) onCommentAdded();
            } catch (error) {
                console.error("Failed to delete comment:", error);
                toast.error('Retraction failed.');
            }
        }
    };

    return (
        <section className="max-w-4xl mx-auto pt-20 border-t border-slate-100 mt-20">
            <div className="flex items-center justify-between mb-16">
                <div>
                    <h3 className="text-3xl md:text-4xl font-black font-serif italic tracking-tighter text-slate-900 mb-2">
                        Discussion <span className="text-red-700">.</span>
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                        {totalComments} ANALYTICAL PERSPECTIVES SHARED
                    </p>
                </div>
                <div className="hidden sm:flex items-center space-x-3 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">Active Intelligence</span>
                </div>
            </div>

            {user ? (
                <div className="mb-24 relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-700/5 to-slate-900/5 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-white border border-slate-100 rounded-xl overflow-hidden">
                        <div className="p-1 text-slate-100 border-b border-slate-50 flex items-center space-x-2 bg-slate-50/50">
                            <div className="flex px-4 py-2 space-x-2">
                                <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse transition-all ease-in-out duration-400"></div>
                                <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse transition-all ease-in-out duration-350"></div>
                                <div className="w-2 h-2 rounded-full bg-slate-300 animate-pulse transition-all ease-in-out duration-300"></div>
                            </div>
                            {replyTo && (
                                <div className="flex items-center flex-wrap px-4 py-2 justify-between flex-1 text-black animate-in slide-in-from-top duration-300">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest">
                                            Replying to {replyTo.userName}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setReplyTo(null)}
                                        className="text-[9px] font-black uppercase cursor-pointer tracking-widest hover:text-red-500 transition-colors"
                                        aria-label="Cancel Reply" title='Cancel Reply'
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-50">
                            <div className="md:w-20 flex pt-2 justify-center bg-slate-50/30">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    {user?.profilePicture ? (
                                        <img src={user.profilePicture} alt={user?.name} className="w-full h-full object-cover pointer-events-none"
                                            onError={(e) => {
                                                e.target.src = 'https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png';
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white">
                                            <User size={20} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex-1 bg-white">
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder={replyTo ? "TYPE YOUR RESPONSE..." : "JOIN THE HIGH-LEVEL DISCOURSE..."}
                                    className="w-full p-4 text-[16px] font-serif text-slate-800 bg-transparent min-h-[160px] focus:outline-none placeholder:text-slate-300 resize-none leading-relaxed"
                                />
                            </div>
                        </div>

                        <div className="p-3 bg-slate-50/50 border-t border-slate-50 flex justify-end">
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting || !newComment.trim()}
                                className="group relative bg-slate-900 hover:bg-red-700 text-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.3em] transition-all duration-500 overflow-hidden cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Post Comment" title='Post Comment'
                            >
                                <div className="relative z-10 flex items-center space-x-3">
                                    {isSubmitting ? (
                                        <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <Send size={14} />
                                    )}
                                    <span>{isSubmitting ? 'TRANSMITTING...' : 'POST COMMENT'}</span>
                                </div>
                                <div className="absolute inset-0 bg-red-700 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mb-24 bg-slate-900 rounded-2xl p-12 text-center text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-700/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
                    <div className="relative z-10 max-w-md mx-auto">
                        <h4 className="text-3xl font-black font-serif italic mb-4 tracking-tight">Voices of Authority</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em] leading-relaxed mb-10">
                            NEXORA NEWS REQUIRES A VERIFIED PROFILE TO PARTICIPATE IN HIGH-LEVEL GLOBAL DISCOURSE.
                        </p>
                        <Link
                            to="/auth"
                            className="inline-block bg-white text-slate-900 px-12 py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-red-700 hover:text-white transition-all shadow-2xl active:scale-95"
                        >
                            Authorize Identity
                        </Link>
                    </div>
                </div>
            )}

            <div className="space-y-12">
                {organizedComments.length > 0 ? (
                    <>
                        {organizedComments.map(c => (
                            <Comment
                                key={c._id}
                                comment={c}
                                onReply={(comment) => {
                                    setReplyTo(comment);
                                    window.scrollTo({
                                        top: document.querySelector('textarea')?.getBoundingClientRect().top + window.scrollY - 300,
                                        behavior: 'smooth'
                                    });
                                }}
                                onDelete={(id) => handleDelete(id)}
                                onLike={(id) => handleLike(id)}
                            />
                        ))}
                    </>
                ) : (
                    <div className="py-24 text-center border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/30">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-50">
                            <MessageSquare size={32} className="text-red-700" />
                        </div>
                        <h4 className="text-2xl font-serif italic text-slate-900 mb-3 tracking-tight">Silence is the canvas...</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                            BE THE FIRST TO DEPLOY A PERSPECTIVE.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default DiscussionSection;

