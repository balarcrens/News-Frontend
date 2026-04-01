import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-lg">
      <ol className="flex items-center flex-wrap gap-xs text-sm text-muted">
        <li className="flex items-center">
          <Link to="/" className="hover:text-accent flex items-center gap-xs transition-colors">
            <Home size={14} />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-xs">
            <ChevronRight size={14} className="opacity-40" />
            {item.link ? (
              <Link 
                to={item.link} 
                className="hover:text-accent transition-colors font-medium max-w-[150px] truncate md:max-w-none"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-primary font-bold truncate max-w-[150px] md:max-w-[300px]" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
