/* eslint-disable react-hooks/purity */
import React, { useState } from 'react';
import { MessageSquare, Send, Reply, Heart, MoreHorizontal, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const Comment = ({ comment, onReply }) => (
    <div className="group">
        <div className="flex space-x-5">
            <div className="shrink-0 pt-1">
                {comment.user?.avatar ? (
                    <img src={comment.user.avatar} className="w-10 h-10 rounded-full" />
                ) : (
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 border border-gray-100">
                        <User size={18} />
                    </div>
                )}
            </div>
            <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">
                        {comment.userName || 'Anonymous Participant'}
                    </h4>
                    <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                    <span className="text-[9px] font-medium text-gray-400 uppercase tracking-tighter">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                </div>
                <p className="text-sm font-serif text-slate-600 leading-relaxed italic mb-4">
                    "{comment.comment}"
                </p>
                <div className="flex items-center space-x-6 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-red-700 transition-colors">
                        <Heart size={12} />
                        <span>{comment.likes || 0} Likes</span>
                    </button>
                    <button 
                        onClick={() => onReply(comment)}
                        className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-red-700 transition-colors"
                    >
                        <Reply size={12} />
                        <span>Reply</span>
                    </button>
                    <button className="text-gray-400 hover:text-slate-900">
                        <MoreHorizontal size={14} />
                    </button>
                </div>
            </div>
        </div>
        
        {/* Mock Nested Response */}
        {comment.userName === 'Julian Pierce' && (
            <div className="ml-14 mt-8 pt-8 border-l border-gray-50 pl-8">
                <div className="flex space-x-4">
                    <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center text-red-700">
                        <User size={14} />
                    </div>
                    <div>
                        <div className="flex items-center space-x-3 mb-1">
                            <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Sarah Jenkins</h4>
                            <span className="text-[8px] font-medium text-gray-400 uppercase tracking-tighter">12m ago</span>
                        </div>
                        <p className="text-[13px] font-serif text-slate-500 leading-relaxed italic">
                            Agreed - though I'd wonder if this 'quiet diplomacy' isn't just a merit, but an essential evolution.
                        </p>
                    </div>
                </div>
            </div>
        )}
    </div>
);

const DiscussionSection = ({ comments = [], totalComments = 12 }) => {
    const [newComment, setNewComment] = useState('');

    return (
        <section className="max-w-4xl mx-auto pt-20 border-t border-gray-100 mt-20">
            <div className="flex items-center justify-between mb-12">
                <h3 className="text-2xl md:text-3xl font-black font-serif italic tracking-tighter text-slate-900">
                    Discussion <span className="text-gray-300 font-normal">({totalComments})</span>
                </h3>
                <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span>42 Reading Now</span>
                </div>
            </div>

            {/* Post Comment */}
            <div className="mb-20">
                <div className="flex space-x-5 mb-6">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center border-2 border-gray-100 text-gray-300">
                        <User size={24} />
                    </div>
                    <textarea 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="JOIN THE CONVERSATION..."
                        className="flex-1 bg-gray-50/50 border-none p-6 text-sm font-serif italic text-slate-900 min-h-[140px] focus:ring-1 focus:ring-red-700/20 outline-none transition-all placeholder:text-gray-300"
                    />
                </div>
                <div className="flex justify-end">
                    <button className="bg-red-700 hover:bg-red-800 text-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.3em] transition-all shadow-xl shadow-red-700/10 flex items-center space-x-3">
                        <Send size={14} />
                        <span>Post Comment</span>
                    </button>
                </div>
            </div>

            {/* Comments List */}
            <div className="space-y-16">
                {comments.length > 0 ? (
                    comments.map(c => (
                        <Comment key={c._id} comment={c} onReply={() => {}} />
                    ))
                ) : (
                    // Initial Mock Comments matching the prestige image
                    <div className="space-y-16">
                        <Comment 
                            comment={{
                                _id: '1',
                                userName: 'Julian Pierce',
                                comment: 'Incredible dive. The tension between democratic transparency and diplomatic efficacy is perhaps our greatest challenge for modern governance. This capture represents it perfectly.',
                                createdAt: new Date(Date.now() - 3600000),
                                likes: 42
                            }} 
                            onReply={() => {}}
                        />
                        <button className="w-full py-6 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 border border-dashed border-gray-100 hover:border-gray-300 hover:text-slate-900 transition-all">
                            Load More Comments
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default DiscussionSection;
