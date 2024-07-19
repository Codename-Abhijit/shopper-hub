import { GetServerSideProps, NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import debounce from 'lodash.debounce';
import { fetchProducts, filterByCategory } from '../store/slices/productSlice';
import { Product } from '@/types';

const Home: NextPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, categories } = useSelector((state: RootState) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtered, setFiltered] = useState<Product[]>(products); // Define filtered state
  const productsPerPage = 10;

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset page when products change
    setFiltered(products); // Reset filtered products when products change
  }, [products]);

  const handleSearch = debounce((searchTerm: string) => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    dispatch(filterByCategory('All')); // Apply category filter to ensure it resets
    setFiltered(filtered);
    setCurrentPage(1);
  }, 300);

  const handleFilter = (filterType: string, value: string | number) => {
    let filtered = [...products];
    if (filterType === 'category') {
      dispatch(filterByCategory(value as string));
      filtered = filtered.filter((product) =>
        (value === 'All' ? true : product.category === value)
      );
    } else if (filterType === 'price') {
      filtered = filtered.sort((a, b) => value === 'asc' ? a.price - b.price : b.price - a.price);
    } else if (filterType === 'rating') {
      filtered = filtered.sort((a, b) => value === 'asc' ? a.rating - b.rating : b.rating - a.rating);
    } else if (filterType === 'availability') {
      filtered = filtered.filter((product) => value === 'inStock' ? product.stock > 0 : product.stock === 0);
    }
    setFiltered(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filtered.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filtered.length / productsPerPage);

  return (
    <div>
      <Filters categories={categories} onSearch={handleSearch} onFilter={handleFilter} />
      <ProductList products={currentProducts} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};

export default Home;
