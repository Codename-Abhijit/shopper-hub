import React from 'react';
import { Product } from '../types';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${product.id}`);
  };

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
        stars.push(<span key={i} className="text-gray-300">★</span>); // Empty star
      }
    }

    return stars;
  };

  return (
    <div className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
      <button
        onClick={handleClick}
        className="w-full h-48 relative bg-[#DEF9C4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#468585] overflow-hidden"
      >
        <div className="relative w-full h-full transition-transform duration-300 transform hover:scale-110">
          <Image
            src={product.thumbnail}
            alt={product.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
          />
        </div>
      </button>
      <h3 className="mt-2 text-lg font-semibold text-[#468585]">{product.title}</h3>
      <p className="mt-1 text-[#50B498]">{product.price} USD</p>
      <div className="mt-2 flex items-center">
        <div className="text-lg flex">{renderStars(product.rating)}</div>
        <span className="ml-2 text-sm text-gray-500">({product.rating.toFixed(1)})</span>
      </div>
    </div>
  );
};

export default ProductItem;
