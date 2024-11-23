// components/Pagination.jsx
"use client";
const Pagination = ({ currentPage, setPage, itemLength, itemPerPage }) => {
  const pageCount = Math.ceil(itemLength / itemPerPage);

  const handleClick = (pageNum) => {
      if (pageNum >= 1 && pageNum <= pageCount) {
          setPage(pageNum);
      }
  };

  const pages = [];
  for (let i = 1; i <= pageCount; i++) {
      pages.push(i);
  }

  return (
      <div className="pagination-container">
          <button onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>
              Prev
          </button>
          {pages.map((page) => (
              <button
                  key={page}
                  onClick={() => handleClick(page)}
                  className={currentPage === page ? 'active' : ''}
              >
                  {page}
              </button>
          ))}
          <button onClick={() => handleClick(currentPage + 1)} disabled={currentPage === pageCount}>
              Next
          </button>
      </div>
  );
};

export default Pagination;
