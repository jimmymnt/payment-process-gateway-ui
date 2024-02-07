import React from 'react';

const ProductPrice = ({product}) => {
  return (
    <div className="my-8">
      <div className="flex">
        <p className="text-3xl font-bold dark:text-gray-200">
          $ {product.discountedPrice ? product.discountedPrice : product.price}
        </p>
        {
          product.discountPercentage > 0 &&
          <del className="ml-2 align-super text-base font-bold dark:text-cyan-50"> $ {product.price}</del>
        }
      </div>

      <div className="mt-3 flex items-center text-sm font-medium text-gray-600">

        {
          product.discountPercentage > 0 &&
          <>
            <svg className="mr-2 block h-4 w-4 align-middle text-gray-500 dark:text-cyan-50"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd"
                    d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd" className=""></path>
            </svg>
            <p className="dark:text-gray-200">Save {product.discountPercentage}% right now</p>
          </>
        }
      </div>
    </div>
  )
    ;
};

export default ProductPrice;