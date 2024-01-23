import React from 'react';
import Link from "next/link";

const Pagination = ({postsPerPage, totalPosts, currentPage}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='py-2 mb-8 text-center'>
      <nav className='inline-flex -space-x-px '>
        <ul className='flex pl-0 rounded list-none flex-wrap'>
          <li>
            {
              pageNumbers.map((number) => {
                  return (
                    <Link
                      key={number}
                      href={`/products/page/${number}`}
                      className={
                        parseInt(currentPage) === number
                          ? "bg-blue border-blue-300 bg-blue-200 text-blue-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                      }
                    >
                      {number}
                    </Link>
                  )
                }
              )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;