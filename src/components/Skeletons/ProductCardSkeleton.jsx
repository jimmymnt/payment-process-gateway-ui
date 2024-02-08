import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div role="status"
         className="py-4 mx-auto space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex">
      <div className="flex items-center justify-center w-full md:w-1/2 h-96 bg-gray-300 rounded dark:bg-gray-700">
        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true"
             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
          <path
            d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
        </svg>
      </div>
      <div className="md:w-1/2 w-full">
        {/*Brand*/}
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4"></div>
        {/*Title*/}
        <div className="h-7 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
        {/*Category*/}
        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-2.5"></div>
        {/*Reviews & stars */}
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
        {/*Description*/}
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        {/*Stock*/}
        <div className="py-6 my-6 border-t border-b border-gray-200 dark:border-gray-700">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
        </div>

        {/*Quantity*/}
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
        <div className="h-14 bg-gray-200 rounded-[9px] dark:bg-gray-700 w-32 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-2.5"></div>
        {/*Buttons*/}
        <div className="flex flex-wrap items-center">
          <div
            className="h-10 bg-gray-200 md:w-32 sm:w-full xs:w-full rounded-[9px] dark:bg-gray-700 w-32 mt-5 md:mr-3"></div>
          <div className="h-10 bg-gray-200 md:w-32 sm:w-full xs:w-full rounded-[9px] dark:bg-gray-700 w-32 mt-5"></div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default ProductCardSkeleton;