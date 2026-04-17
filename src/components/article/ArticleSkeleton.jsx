import React from 'react';
import Skeleton from '../common/Skeleton';

const ArticleSkeleton = () => {
    return (
        <div className="bg-white">
            {/* Header / Breadcrumbs Skeleton */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 md:pt-12">
                <div className="flex space-x-4 mb-8">
                    <Skeleton width="60px" height="12px" />
                    <Skeleton width="100px" height="12px" />
                </div>

                {/* ArticleHero Skeleton */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <div className="flex flex-col items-center mb-10">
                        <Skeleton width="180px" height="24px" className="mb-8" />
                        <Skeleton width="90%" height="48px" className="mb-4 md:h-16" />
                        <Skeleton width="70%" height="48px" className="mb-10 md:h-16" />
                        
                        <Skeleton width="80%" height="16px" className="mb-3" />
                        <Skeleton width="60%" height="16px" />
                    </div>

                    <div className="flex items-center justify-center space-x-12 pt-10 border-t border-gray-100">
                        <div className="flex items-center space-x-4">
                            <Skeleton variant="circle" width="48px" height="48px" />
                            <div className="space-y-2">
                                <Skeleton width="100px" height="10px" />
                                <Skeleton width="140px" height="8px" />
                            </div>
                        </div>
                        <div className="hidden sm:block space-y-2">
                            <Skeleton width="80px" height="10px" />
                            <Skeleton width="100px" height="8px" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Image Skeleton */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:mb-16">
                <Skeleton width="100%" className="aspect-[15/10] sm:aspect-[21/9]" />
                <div className="mt-4 flex justify-center">
                    <Skeleton width="300px" height="10px" />
                </div>
            </div>

            {/* Main Content & Sidebar Skeleton */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col lg:flex-row lg:gap-16 pb-20">
                {/* Content */}
                <div className="flex-1 max-w-2xl mx-auto lg:mx-0">
                    <div className="space-y-10">
                        {/* Drop cap paragraph */}
                        <div className="space-y-4">
                            <Skeleton width="100%" height="20px" />
                            <Skeleton width="100%" height="20px" />
                            <Skeleton width="90%" height="20px" />
                            <Skeleton width="95%" height="20px" />
                        </div>
                        
                        {/* Heading */}
                        <Skeleton width="60%" height="32px" className="mt-16 mb-8" />
                        
                        {/* Paragraph */}
                        <div className="space-y-4">
                            <Skeleton width="100%" height="20px" />
                            <Skeleton width="100%" height="20px" />
                            <Skeleton width="95%" height="20px" />
                        </div>

                        {/* Image Block */}
                        <div className="my-16 space-y-4">
                            <Skeleton width="100%" className="aspect-video" />
                            <div className="flex justify-center">
                                <Skeleton width="200px" height="10px" />
                            </div>
                        </div>

                        {/* Quote Block */}
                        <div className="my-16 border-l-4 border-slate-100 pl-8">
                            <Skeleton width="100%" height="32px" />
                            <Skeleton width="80%" height="32px" className="mt-4" />
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:w-80 shrink-0 space-y-12">
                    <div className="bg-slate-50 p-8 border border-slate-100">
                        <Skeleton width="120px" height="12px" className="mb-8" />
                        <div className="space-y-3 mb-6">
                            <Skeleton width="100%" height="12px" />
                            <Skeleton width="100%" height="12px" />
                            <Skeleton width="80%" height="12px" />
                        </div>
                        <div className="pt-6 border-t border-slate-100">
                            <Skeleton width="100px" height="10px" />
                        </div>
                    </div>

                    <div className="border border-slate-100 p-8 bg-white">
                        <div className="flex justify-center mb-6">
                            <Skeleton variant="circle" width="24px" height="24px" />
                        </div>
                        <div className="flex flex-col items-center space-y-3">
                            <Skeleton width="140px" height="14px" />
                            <Skeleton width="100%" height="10px" />
                            <Skeleton width="100%" height="48px" className="mt-6" />
                            <Skeleton width="100%" height="48px" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleSkeleton;
