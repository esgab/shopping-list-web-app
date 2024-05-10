function ProductItem({product}) {

  return (
    <li className="productItem">
      <strong>{product.name}</strong>
    </li>
  );

}

export default ProductItem;