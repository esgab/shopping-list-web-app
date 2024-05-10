import PropTypes from 'prop-types';

function CategoriesModal({categories, addProduct, newProduct, setShowModal}) {

  const handleCategorySelect = (category) => {
    const updatedProduct = { ...newProduct, category: category };
    addProduct(updatedProduct);
    setShowModal(false);
    console.log(updatedProduct); // Check the updated product with category
  };

  return (
    <div className="modal">
      <ul className="modal__categoryList">
        {categories.map((category, index) => (
          <li key={index} onClick={() => handleCategorySelect(category)}>{category}</li>
        ))}
      </ul>
    </div>
  );
}

CategoriesModal.propTypes = {
  categories: PropTypes.array.isRequired,
  newProduct: PropTypes.object.isRequired,
  setNewProduct: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired
};

export default CategoriesModal;