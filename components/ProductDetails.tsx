import React from 'react';
import { Product } from '../types';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const router = useRouter();

  const renderStars = (rating: number) => {
    const stars = [];
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < filledStars) {
        stars.push(<span key={i} className="text-yellow-400">★</span>); // Full star
      } else if (i === filledStars && hasHalfStar) {
        stars.push(<span key={i} className="text-yellow-400">☆</span>); // Half star
      } else {
        stars.push(<span key={i} className="text-gray-300 dark:text-gray-600">★</span>); // Empty star
      }
    }

    return stars;
  };

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <button
        onClick={() => router.back()}
        className="bg-[#50B498] text-white py-2 px-4 rounded-lg mb-4 hover:bg-[#468585] transition duration-300 dark:bg-[#468585] dark:hover:bg-[#50B498]"
      >
        Back
      </button>
      <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
        <div className="w-full md:w-1/2 relative h-96 mb-4 md:mb-0">
          <Image
            src={product.images[0]} // Assuming the first image is the main one
            alt={product.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
          />
        </div>
        <div className="w-full md:w-1/2 md:pl-8 p-4">
          <h1 className="text-3xl font-bold text-[#468585] dark:text-[#DEF9C4]">{product.title}</h1>
          <p className="mt-2 text-2xl text-[#50B498] font-semibold dark:text-[#9CDBA6]">{product.price} USD</p>
          <div className="mt-2 flex items-center">
            <div className="text-lg flex">{renderStars(product.rating)}</div>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">({product.rating.toFixed(1)})</span>
          </div>
          <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">{product.description}</p>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-[#468585] dark:text-[#DEF9C4]">Reviews</h2>
            <div className="mt-4">
              {product.reviews.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No reviews yet.</p>
              ) : (
                product.reviews.map((review, index) => (
                  <div key={index} className="border-t border-gray-300 dark:border-gray-600 pt-2 mt-2">
                    <div className="flex items-center">
                      <div className="text-lg flex">{renderStars(review.rating)}</div>
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">({review.rating})</span>
                    </div>
                    <p className="mt-1 text-gray-700 dark:text-gray-300">{review.comment}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">- {review.reviewerName}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
