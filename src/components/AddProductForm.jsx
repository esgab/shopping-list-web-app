import PropTypes from 'prop-types';

function AddProductForm({ newProduct, setNewProduct, setShowModal }) {

  const handleInputChange = (event) => {
    setNewProduct({ ...newProduct, name: event.currentTarget.value });
  };

  const handleClick = () => {
    if (newProduct.name.trim() !== "") {
      setShowModal(true);
      console.log(newProduct);
    }
  };

  return (
    <div className="addProduct">
      <input
        className="addProduct__input"
        type="text"
        placeholder="Product name"
        value={newProduct.name}
        onChange={handleInputChange}
      />
      <button
        type="button"
        className="addProduct__button"
        onClick={handleClick}
      >
        +
      </button>
    </div>
  );
}

AddProductForm.propTypes = {
  newProduct: PropTypes.object.isRequired,
  setNewProduct: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired
};

export default AddProductForm;