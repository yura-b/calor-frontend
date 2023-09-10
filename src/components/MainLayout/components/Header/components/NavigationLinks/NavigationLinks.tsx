import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { paths } from '@routes/paths';
import styles from '@/styles/Styles.module.scss';
import { useQuery } from 'react-query';
import { getProducts, getProductById } from '@/api/products';
import { useParams } from 'react-router';

interface Props {
  color?: string;
  className?: string;
}

const formatSegment = (text) => {
  return text
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const NavigationLinks: React.FC<Props> = ({ color, className }): React.ReactElement => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const [productNames, setProductNames] = useState({});
  const { data: products, isLoading, isError } = useQuery('products', getProducts);
  const { id } = useParams();

  const { data: product } = useQuery(['productById', id], () => getProductById(id), {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      const productNameMap = {};
      products &&
        products?.data.shoes.map((product) => {
          productNameMap[product._id] = product.title;
        });
      if (product && product.data._id) {
        productNameMap[product.data._id] = product.data.title;
      }
      setProductNames(productNameMap);
    }
  }, [products, product, isLoading, isError]);

  const formatBreadcrumb = (text) => {
    const productName = productNames[text] || text;
    return productName.charAt(0).toUpperCase() + productName.slice(1);
  };

  return (
    <div
      className={`${styles.body1} ${styles.container} ${className} pb-2 pt-0 flex text-${color} justify-center  sm:text-sm`}
    >
      <Link to={paths.home}>Home/</Link>
      {pathnames.map((path, index) => {
        const isLast = index === pathnames.length - 1;
        const displayName = formatBreadcrumb(path);
        const formattedSegment = formatSegment(path);
        return (
          <div className="truncate">
            {formattedSegment && !displayName && <Link to="">{formattedSegment}/</Link>}
            {displayName && (
              <Link to="">
                {' '}
                {formatSegment(displayName)}
                {!isLast && '/'}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NavigationLinks;
