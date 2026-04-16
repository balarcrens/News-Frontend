import React from 'react';
import Breadcrumbs from '../common/Breadcrumbs';

const CategoryHeader = ({ title, description }) => {
    return (
        <div className="mb-12 border-b border-gray-100 sm:pb-12">
            <Breadcrumbs items={[{ label: title || 'category' }]} />

            <h1 className="text-5xl md:text-6xl font-black font-serif italic tracking-tighter text-slate-900 mb-8 leading-[1.05]">
                {title || 'Section Archive'}
            </h1>

            <p className="text-md md:text-xl font-serif text-gray-500 max-w-2xl leading-relaxed italic">
                {description || "A curated archive of reporting and analysis covering the intersection of modern society and the stories that define our era."}
            </p>
        </div>
    );
};

export default CategoryHeader;

