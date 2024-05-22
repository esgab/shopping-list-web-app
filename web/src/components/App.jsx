import { useState, useEffect } from 'react';

import '../scss/App.scss'

import Header from './Header';
import MenuSlider from './menu/MenuSlider';
import AddProductForm from './AddProductForm';
import ProductList from './products/ProductList';
import CategoriesModal from './CategoriesModal';
import Footer from './Footer';

function App() {

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const handleFetchProductList = async () => {
      const response = await fetch("//localhost:4000/api/products");
      const data = await response.json();

      setProducts(data);
    };

    handleFetchProductList();
  }, []);

  useEffect(() => {
    const handleFetchCategoryList = async () => {
      const response = await fetch("//localhost:4000/api/categories");
      const data = await response.json();

      setCategories(data);
    };

    handleFetchCategoryList();
  }, []);

  function toggle() {
    setOpen(prevOpen => !prevOpen);
  }

  const addProduct = (product) => {
    setProducts([...products, product]);
  };
  
  return (
    <div className="container">
      <div className="app">
        {open && <MenuSlider menuItems={menuItems} />}
        <Header toggle={toggle} />
        <main className="app__main main">
          <AddProductForm 
            addProduct={addProduct} 
            newProduct={newProduct} 
            setNewProduct={setNewProduct} 
            showModal={showModal}
            setShowModal={setShowModal}
          />
          {showModal ? 
          <CategoriesModal 
            products={products}
            addProduct={addProduct}
            newProduct={newProduct} 
            setNewProduct={setNewProduct} 
            categories={categories}
            setShowModal={setShowModal} 
          /> 
          : 
          <ProductList 
            products={products} 
            categories={categories} 
          />} 
          <button>Show by category</button>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App;


