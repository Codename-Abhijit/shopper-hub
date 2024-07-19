import React from 'react';
import { Product } from '../types';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row">
        <img src={product.thumbnail} alt={product.title} className="w-full md:w-1/2 h-auto object-cover rounded-lg" />
        <div className="md:ml-4">
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="mt-2 text-gray-500">{product.price} USD</p>
          <p className="mt-4">{product.description}</p>
          <div className="mt-4">
            <h3 className="font-semibold">Reviews</h3>
            {product.reviews.map((review, index) => (
              <div key={index} className="border-t mt-2 pt-2">
                <p className="text-sm">{review.comment}</p>
                <p className="text-xs text-gray-500">- {review.reviewerName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
