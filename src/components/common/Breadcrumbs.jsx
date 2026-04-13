import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = ({ items }) => {
    if (!items || items.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center flex-wrap gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                <li className="flex items-center">
                    <Link to="/" className="hover:text-red-700 transition-colors flex items-center gap-1">
                        <Home size={12} />
                        <span>Home</span>
                    </Link>
                </li>
                
                {items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <ChevronRight size={10} className="text-gray-300" />
                        {item.link ? (
                            <Link to={item.link} className="hover:text-red-700 transition-colors">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-slate-900">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
