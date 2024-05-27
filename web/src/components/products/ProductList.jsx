import PropTypes from "prop-types";

import ProductItem from "./ProductItem";

function ProductList({ products }) {
  
  /*
  const groupedByCategory = Object.groupBy(
    productList,
    ({ category }) => category
  );
  const categoryTitles = Object.keys(groupedByCategory);
*/
  return (
    <div className="products">
      {
        products.map((productCategory) => (
          <div className="products__category category" key={productCategory}>
            <h2 className="category__title">{productCategory.category}</h2>
            <ul className="productList">
              {productCategory.products.map((product, index) => (
                <ProductItem key={index} product={product} />
              ))}
            </ul>
          </div>
        ))
      }
    </div>
  );
}

ProductList.propTypes = {
  productList: PropTypes.array.isRequired,
};

export default ProductList;
