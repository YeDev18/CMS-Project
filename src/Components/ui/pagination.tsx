import { Icon } from '@iconify/react';
import { useState } from 'react';
const usePagination = (data: any) => {
  const [current, setCurrent] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (current - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const goToNextPage = () => {
    setCurrent(prevPage => prevPage + 1);
  };
  const goToPrevPage = () => {
    setCurrent(prevPage => prevPage - 1);
  };

  const renderPaginationControls = () => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    return (
      <div className="flex justify-end pb-5">
        <button
          onClick={goToPrevPage}
          disabled={current === 1}
          className="rounded border border-shadowColors p-1 text-shadowColors hover:border hover:border-firstBlue hover:bg-firstBlue hover:text-firstColors active:border active:bg-firstBlue"
        >
          <Icon icon="ep:arrow-left-bold" />
        </button>
        <div className="w-24 px-2 text-center">
          <span className="text-borderColor font-medium">{current}</span> /{' '}
          <span className="text-borderColor">{totalPages}</span>
        </div>
        <button
          onClick={goToNextPage}
          disabled={current === totalPages}
          className="rounded border border-shadowColors p-1 text-shadowColors hover:border hover:border-firstBlue hover:bg-firstBlue hover:text-firstColors active:border active:bg-firstBlue"
        >
          <Icon icon="ep:arrow-right-bold" />
        </button>
      </div>
    );
  };

  return { renderPaginationControls, startIndex, endIndex };
};

export default usePagination;
