import PropTypes from 'prop-types';

function ProductItem({ product }) {
  return (
    <li className="productList__item">
      <strong>{product.name}</strong>
    </li>
  );
}

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductItem;