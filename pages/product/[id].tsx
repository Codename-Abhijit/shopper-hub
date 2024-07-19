import { GetServerSideProps, NextPage } from 'next';
import axios from 'axios';
import ProductDetails from '../../components/ProductDetails';
import { Product } from '../../types';

interface ProductPageProps {
  product: Product;
}

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  return (
      <ProductDetails product={product} />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const response = await axios.get(`https://dummyjson.com/products/${id}`);
  const product = response.data;

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
