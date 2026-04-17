import React from 'react';
import Skeleton from '../common/Skeleton';

const CategorySkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12">
            {/* Category Header Skeleton */}
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
                <Skeleton width="120px" height="12px" className="mx-auto mb-8" />
                <Skeleton width="80%" height="48px" className="mx-auto mb-10 md:h-16" />
                <Skeleton width="90%" height="20px" className="mx-auto mb-3" />
                <Skeleton width="70%" height="20px" className="mx-auto" />
            </div>

            <div className="flex flex-col lg:flex-row gap-16">
                {/* Sidebar Filter Skeleton */}
                <div className="hidden lg:block w-72 shrink-0">
                    <div className="space-y-12">
                        <div className="p-8 bg-slate-50 border border-slate-100">
                            <Skeleton width="100px" height="12px" className="mb-8" />
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <Skeleton key={i} width="100%" height="10px" />
                                ))}
                            </div>
                        </div>
                        <div className="p-8 border border-slate-100">
                            <Skeleton width="100px" height="12px" className="mb-8" />
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <Skeleton width="60px" height="10px" />
                                    <Skeleton width="100%" height="40px" />
                                </div>
                                <div className="space-y-3">
                                    <Skeleton width="60px" height="10px" />
                                    <Skeleton width="100%" height="40px" />
                                </div>
                                <Skeleton width="100%" height="48px" className="mt-8" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Skeleton */}
                <div className="flex-1">
                    {/* Featured Article Card Skeleton */}
                    <div className="mb-20">
                        <Skeleton width="100%" className="aspect-[10/9] sm:aspect-[21/9] mb-10" />
                        <div className="max-w-4xl space-y-6">
                            <Skeleton width="90%" height="32px" mdHeight="48px" className="md:h-12" />
                            <div className="space-y-3">
                                <Skeleton width="100%" height="16px" />
                                <Skeleton width="80%" height="16px" />
                            </div>
                            <div className="flex items-center space-x-4 pt-4">
                                <Skeleton variant="circle" width="40px" height="40px" />
                                <div className="space-y-2">
                                    <Skeleton width="100px" height="10px" />
                                    <Skeleton width="120px" height="8px" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Article Grid Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="space-y-6">
                                <Skeleton width="100%" className="aspect-[16/10]" />
                                <Skeleton width="90%" height="24px" />
                                <div className="space-y-2">
                                    <Skeleton width="100%" height="14px" />
                                    <Skeleton width="80%" height="14px" />
                                </div>
                                <Skeleton width="100px" height="10px" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategorySkeleton;
