const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex items-center justify-center gap-1">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border border-gray-300 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
                〈
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 rounded border text-sm transition
            ${currentPage === page
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border border-gray-300 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
                〉
            </button>
        </div>
    );
};

export default Pagination;