"use client";
import {Button, Card} from 'flowbite-react';
import Link from "next/link";
import ProductReview from "@/components/Product/ProductReview";
import React from "react";

const ProductCard = ({product}) => {
  return (
    <Card
      className="relative overflow-hidden max-w-sm product-card"
      imgAlt={product.title}
      imgSrc={product.thumbnail}
    >
      {
        product.discountPercentage > 0 &&
        <div className="absolute left-0 top-0 h-16 w-16">
          <div
            className="bg-cyan-700 absolute transform -rotate-45 text-center text-white font-semibold py-1 left-[-40px] top-[32px] w-[170px]">
            - {product.discountPercentage} %
          </div>
        </div>
      }
      <Link href={`/products/${product.id}`}>
        <h5
          className="text-xl font-semibold tracking-tight text-gray-900 hover:text-cyan-700 dark:text-white dark:hover:text-gray-300">
          {product.title}
        </h5>
      </Link>
      <div className="mb-5 mt-2.5 flex items-center">
        <ProductReview/>
      </div>
      <div className="flex items-center justify-between">
        <div className="">
          <span
            className="text-xl font-bold text-gray-900 dark:text-white">$ {product.discountedPrice ? product.discountedPrice : product.price}</span>
        </div>
        <a
          href="#"
          className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
          Add to cart
        </a>
      </div>
    </Card>
  );
}

export default ProductCard;
