import React from 'react';

import { Table } from '@tanstack/react-table';

interface PaginationProps<T> {
  table: Table<T>;
  maxVisiblePages?: number;
}

export function Pagination<T>({
  table,
  maxVisiblePages = 3,
}: PaginationProps<T>) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];

    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage <= maxVisiblePages) {
        for (let i = 2; i <= maxVisiblePages + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - maxVisiblePages + 1) {
        pages.push('ellipsis');
        for (let i = totalPages - maxVisiblePages; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePageClick = (page: number) => {
    table.setPageIndex(page - 1);
  };

  const handlePrevious = () => {
    if (table.getCanPreviousPage()) {
      table.previousPage();
    }
  };

  const handleNext = () => {
    if (table.getCanNextPage()) {
      table.nextPage();
    }
  };

  return (
    <div className="inline-flex h-12 items-center gap-1 rounded-[6.25rem] bg-white p-1">
      <button
        onClick={handlePrevious}
        disabled={!table.getCanPreviousPage()}
        className={`leading-medium mr-4 h-10 w-15 rounded-[6.25rem] text-xl font-medium tracking-normal text-black transition-colors ${
          table.getCanPreviousPage() ? '' : 'cursor-not-allowed'
        } `}
        aria-label="Previous page"
      >
        Prev
      </button>

      <div className="flex items-center gap-0.5">
        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="leading-medium flex h-10 w-10 cursor-default items-center justify-center text-xl font-medium tracking-normal text-black"
              >
                ...
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`leading-medium h-10 w-10 rounded-[6.25rem] text-xl font-medium tracking-normal text-black transition-all ${
                isActive ? 'bg-gray' : ''
              } `}
              aria-label={`Go to page ${page}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleNext}
        disabled={!table.getCanNextPage()}
        className={`leading-medium ml-4 h-10 w-15 rounded-[6.25rem] text-xl font-medium tracking-normal text-black transition-colors ${
          table.getCanNextPage() ? '' : 'cursor-not-allowed'
        } `}
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
}
