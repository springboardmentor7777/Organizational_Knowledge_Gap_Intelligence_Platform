import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange, siblingCount = 1 }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  if (!showLeftDots && showRightDots) {
    pages.push(...range(1, Math.min(3 + 2 * siblingCount, totalPages - 1)), '...', totalPages);
  } else if (showLeftDots && !showRightDots) {
    pages.push(1, '...', ...range(Math.max(totalPages - (3 + 2 * siblingCount - 1), 2), totalPages));
  } else if (showLeftDots && showRightDots) {
    pages.push(1, '...', ...range(leftSibling, rightSibling), '...', totalPages);
  } else {
    pages.push(...range(1, totalPages));
  }

  return (
    <div className="pagination" role="navigation" aria-label="Pagination">
      <motion.button
        className="pagination-btn pagination-prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
        whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </motion.button>

      {pages.map((page, i) =>
        page === '...' ? (
          <span key={`dots-${i}`} className="pagination-dots">…</span>
        ) : (
          <motion.button
            key={page}
            className={`pagination-btn pagination-page ${page === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
            whileHover={page !== currentPage ? { scale: 1.05 } : {}}
            whileTap={page !== currentPage ? { scale: 0.95 } : {}}
          >
            {page}
          </motion.button>
        )
      )}

      <motion.button
        className="pagination-btn pagination-next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
        whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </motion.button>
    </div>
  );
};

export default Pagination;
