import React from 'react';
import {Badge} from "flowbite-react";

const ProductCategory = ({product}) => {
  return (
    <>
      {
        product.category &&
        <div className="flex flex-wrap gap-2">
          <Badge color="info">{product.category}</Badge>
        </div>
      }
    </>
  );
};

export default ProductCategory;