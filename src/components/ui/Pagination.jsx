import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/index.scss';

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = '',
}) => {
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
   
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisible - 1);
     
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
      }
     
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
   
    return pages;
  };

  return (
    <div className={`pagination ${className}`}>
      <button
        className={`pagination__item ${currentPage === 1 ? 'pagination__item--disabled' : ''}`}
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
     
      {getPageNumbers().map((page) => (
        <button
          key={page}
          className={`pagination__item ${currentPage === page ? 'pagination__item--active' : ''}`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}
     
      <button
        className={`pagination__item ${currentPage === totalPages ? 'pagination__item--disabled' : ''}`}
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Pagination;