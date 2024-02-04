import React from 'react';

const ProductCategory = ({product}) => {
  return (
    <>
      {
        product.category &&
        <span
          className="text-xs font-semibold inline-block py-1 px-2 rounded text-orange-600 bg-orange-200 uppercase last:mr-0 mr-1">
                  {product.category}
                </span>
      }
    </>
  );
};

export default ProductCategory;