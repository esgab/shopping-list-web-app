import PropTypes from 'prop-types';

function AddProductForm({ newProduct, setNewProduct, setShowModal }) {

  const handleInputChange = (event) => {
    const value = event.currentTarget.value;
    if (value.trim() !== "") {
      setNewProduct({...newProduct, name: value });
    }
  };

  const handleClick = () => {
    if (newProduct.name) {
      setShowModal(true);
      console.log(newProduct);
    }
  };

  return (
    <div className="addProduct">
      <input
        className="addProduct__input"
        type="text"
        placeholder="What do you want to buy?"
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