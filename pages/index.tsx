import { GetServerSideProps, NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import debounce from 'lodash.debounce';
import { fetchProducts } from '@/store/slices/productSlice';

const Home: NextPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, status, error } = useSelector((state: RootState) => state.products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = debounce((searchTerm: string) => {
    if (searchTerm === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    setCurrentPage(1);
  }, 300);

  const handleFilter = (filterType: string, value: string | number) => {
    let filtered = [...products];
    if (filterType === 'price') {
      if (value === 'asc') {
        filtered = filtered.sort((a, b) => a.price - b.price);
      } else if (value === 'desc') {
        filtered = filtered.sort((a, b) => b.price - a.price);
      }
    } else if (filterType === 'rating') {
      if (value === 'asc') {
        filtered = filtered.sort((a, b) => a.rating - b.rating);
      } else if (value === 'desc') {
        filtered = filtered.sort((a, b) => b.rating - a.rating);
      }
    } else if (filterType === 'availability') {
      if (value === 'inStock') {
        filtered = filtered.filter((product) => product.stock > 0);
      } else if (value === 'outOfStock') {
        filtered = filtered.filter((product) => product.stock === 0);
      }
    }
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div>
      <Filters onSearch={handleSearch} onFilter={handleFilter} />
      <ProductList products={currentProducts} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};

export default Home;
