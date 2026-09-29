// components/DataList.jsx
import React from "react";

function DataList({
  title,
  count,
  data,
  isLoading,
  error,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  renderItem,
  emptyMessage = "No items found.",
}) {
  return (
    <div className="w-full flex flex-col border border-gray-300 rounded-xl p-4 bg-white shadow-md min-h-[500px]">
      <div className="flex items-center mb-3">
        <p className="font-semibold text-lg text-gray-700">{title}</p>
        <div className="relative">
          <div className="absolute -top-2 left-10 w-7 h-7 flex items-center justify-center bg-blue-500 text-white rounded-full animate-bounce font-semibold text-sm shadow-md">
            {count}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8 text-sm">
          <span className="inline-block w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
          <span className="ml-2 text-blue-500 font-medium">Loading...</span>
        </div>
      ) : error ? (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      ) : data.length === 0 ? (
        <p className="text-gray-500 text-sm">{emptyMessage}</p>
      ) : (
        <ul className="w-full space-y-2 flex-1 overflow-y-auto">
          {data.map((item, index) => renderItem(item, index))}
        </ul>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex gap-2 flex-wrap justify-center text-xs">
          <button
            className="px-3 py-1 bg-gray-200 font-extrabold text-gray-700 text-base rounded-lg hover:bg-gray-300 disabled:opacity-50"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`px-3 py-2 rounded-lg font-medium ${
                p === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          ))}

          <button
            className="px-3 py-1 bg-gray-200 font-extrabold text-gray-700 text-base rounded-lg hover:bg-gray-300 disabled:opacity-50"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
}

export default DataList;
