function AddProductForm() {
  
  return (
  <form className="addProduct">
    <input
      className="addProduct__input"
      type="text"
      placeholder="Product name"
    />
    <button className="addProduct__button">+</button>
  </form>
  );
}

export default AddProductForm;

