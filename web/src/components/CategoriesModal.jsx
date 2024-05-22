import PropTypes from 'prop-types';

function CategoriesModal({ addProduct, newProduct, setNewProduct, setShowModal, categories }) {
  
  const handleCategorySelect = (category) => {
    const updatedProduct = {...newProduct, category: category};
    setNewProduct(updatedProduct);
    addProduct(updatedProduct);
    setShowModal(false);
    setNewProduct({name: "", category: ""});
  };
  
  return (
    <div className="modal">
      <ul className="modal__categoryList">
        {categories.map((category) => (
          <li key={category._id} onClick={() => handleCategorySelect(category.name)}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
}

CategoriesModal.propTypes = {
  addProduct: PropTypes.func.isRequired,
  newProduct: PropTypes.object.isRequired,
  setNewProduct: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CategoriesModal;
