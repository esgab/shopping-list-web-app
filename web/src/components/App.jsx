import { useState, useEffect } from 'react';

import '../scss/App.scss'

import Header from './Header';
import AddProductForm from './AddProductForm';
import ProductList from './products/ProductList';
import CategoriesModal from './CategoriesModal';
import Footer from './Footer';

function App() {

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleFetchProductList = async () => {
      const response = await fetch("//localhost:4000/products");
      const data = await response.json();

      setProducts(data);
    };

    handleFetchProductList();
  }, []);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };
  
  return (
    <div className="container">
      <div className="app">
        <Header />
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
            setShowModal={setShowModal} 
          /> 
          : 
          <ProductList 
            products={products} 
          />} 
          <button>Show by category</button>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App;

