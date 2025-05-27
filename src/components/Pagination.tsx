import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // Create an array of page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if we have fewer than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate start and end of visible page range around current
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust range to show max visible pages
      if (end - start + 1 < maxVisiblePages - 2) {
        if (start === 2) {
          end = Math.min(totalPages - 1, end + (maxVisiblePages - 2 - (end - start + 1)));
        } else if (end === totalPages - 1) {
          start = Math.max(2, start - (maxVisiblePages - 2 - (end - start + 1)));
        }
      }
      
      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center mt-8 mb-16">
      <div className="flex items-center space-x-2">
        {/* Previous button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`flex items-center justify-center w-10 h-10 rounded-lg ${
            currentPage === 1 
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
        >
          <ChevronLeft size={20} />
        </motion.button>
        
        {/* Page numbers */}
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="text-gray-400 px-2">
                ...
              </span>
            );
          }
          
          return (
            <motion.button
              key={`page-${page}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange(page as number)}
              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                currentPage === page
                  ? 'bg-blue-600 text-white font-medium'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {page}
            </motion.button>
          );
        })}
        
        {/* Next button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`flex items-center justify-center w-10 h-10 rounded-lg ${
            currentPage === totalPages
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default Pagination;