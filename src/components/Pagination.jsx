import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const showMax = 5;

        if (totalPages <= showMax) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            // Logic for "1 2 3 ... 10" or "1 ... 5 6 7 ... 10"
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    return (
        <nav className="flex items-center justify-center gap-sm mt-3xl mb-xl">
            <button
                className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeft size={18} /> <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex items-center gap-xs">
                {getPageNumbers().map((page, idx) => (
                    page === '...' ? (
                        <span key={`ellipsis-${idx}`} className="px-md text-muted">...</span>
                    ) : (
                        <button
                            key={`page-${page}`}
                            className={`pagination-num ${currentPage === page ? 'active' : ''}`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    )
                ))}
            </div>

            <button
                className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <span className="hidden sm:inline">Next</span> <ChevronRight size={18} />
            </button>

            <style>{`
                .pagination-btn {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    padding: 8px 16px;
                    border: 1px solid var(--color-border);
                    background: var(--color-white);
                    border-radius: var(--radius-md);
                    font-weight: 600;
                    font-size: 0.875rem;
                    transition: all 0.2s;
                }
                .pagination-btn:hover:not(.disabled) {
                    border-color: var(--color-primary);
                    background: var(--color-hover-bg);
                }
                .pagination-btn.disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                .pagination-num {
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: var(--radius-md);
                    font-weight: 600;
                    font-size: 0.875rem;
                    transition: all 0.2s;
                    border: 1px solid transparent;
                }
                .pagination-num:hover:not(.active) {
                    background: var(--color-hover-bg);
                }
                .pagination-num.active {
                    background: var(--color-primary);
                    color: white;
                    border: 1px solid var(--color-primary);
                }
            `}</style>
        </nav>
    );
};

export default Pagination;
