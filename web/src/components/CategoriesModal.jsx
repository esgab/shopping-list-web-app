import PropTypes from 'prop-types';

function CategoriesModal({ newProduct, setNewProduct, setShowModal, categories, handleFetchCreate}) {
  
  const handleCategorySelect = (category) => {
    const updatedProduct = {...newProduct, category: category};
    console.log("producto",updatedProduct)
    setNewProduct(updatedProduct);
    handleFetchCreate(updatedProduct);
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
  handleFetchCreate: PropTypes.func.isRequired,
  newProduct: PropTypes.object.isRequired,
  setNewProduct: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CategoriesModal;
