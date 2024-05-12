import PropTypes from 'prop-types';

import ProductItem from './ProductItem';

function ProductList({ products }) {

  const groupedByCategory = Object.groupBy(products, ({ category }) => category);
  console.log(groupedByCategory);
  const categoryTitles = Object.keys(groupedByCategory);
  console.log(categoryTitles);

  return (
    <div className="products">
      {categoryTitles.map(categoryTitle => (
        <div className="products__category category" key={categoryTitle}>
          <h2 className="category__title">{categoryTitle}</h2>
          <ul className="productList">
            {groupedByCategory[categoryTitle].map(product => (
              <ProductItem key={product.name} product={product} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductList;





