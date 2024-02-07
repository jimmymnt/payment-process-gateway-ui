"use client"
import React from 'react';
import {Rating} from "flowbite-react";

const ProductReview = () => {
  return (
    <div className="flex items-center">
      <Rating>
        <Rating.Star/>
        <Rating.Star/>
        <Rating.Star/>
        <Rating.Star/>
        <Rating.Star filled={false}/>
      </Rating>
      <span className="text-gray-600 ml-3 dark:text-gray-200">4 Reviews</span>
    </div>
  );
};

export default ProductReview;