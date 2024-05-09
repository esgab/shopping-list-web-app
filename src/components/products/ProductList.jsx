import ProductItem from './ProductItem';

function ProductList() {

  return (
    <ul className="productList">
      <ProductItem />
      <ProductItem />
      <ProductItem />
    </ul>
  );
}

export default ProductList;