"use client"
import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

const ProductQuantity = ({label = true, footHelper = true, setQuantityHandler, quantity}) => {
  return (
    <div className="mb-4">
      {
        label &&
        <label htmlFor="quantity-input"
               className="block mb-2 text-gray-900 dark:text-white">
          Quantity:
        </label>
      }
      <div className="relative flex items-center max-w-[8rem]">
        <button
          type="button"
          id="decrement-button"
          data-input-counter-decrement="quantity-input"
          onClick={() => setQuantityHandler(1, 'dec')}
          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
          <FontAwesomeIcon icon={faMinus} className="text-gray-900 dark:text-white"/>
        </button>
        <input
          type="text"
          id="quantity-input"
          data-input-counter=""
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="1"
          required
          readOnly
          value={quantity}/>
        <button
          type="button"
          id="increment-button"
          data-input-counter-increment="quantity-input"
          onClick={() => setQuantityHandler(1, 'inc')}
          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
          <FontAwesomeIcon icon={faPlus} className="text-gray-900 dark:text-white"/>
        </button>
      </div>
      {
        footHelper &&
        <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-300">
          Please select quantity.
        </p>
      }
    </div>
  );
};

export default ProductQuantity;