import ProductItem from './ProductItem';

function ProductList({products}) {

  return (
    <ul className="productList">
      {products.map((product, index) => (
        <ProductItem key={index} product={product} />
      ))}
    </ul>
  );
}

export default ProductList;

