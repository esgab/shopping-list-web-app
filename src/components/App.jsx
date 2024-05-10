import { useState } from 'react';

import '../scss/App.scss'

import Header from './Header';
import AddProductForm from './AddProductForm';
import ProductList from './Products/ProductList';
import CategoriesModal from './CategoriesModal';
import Footer from './Footer';

function App() {

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState(["Frutas", "Verduras", "Carnes", "Pescados", "Congelados", "Limpieza", "Bebidas"]);

  const addProduct = (category) => {
  
    const productToAdd = {
      name: newProduct.name,
      category: category
    };
  
    setProducts([...products, productToAdd]);
    setNewProduct({ name: "", category: "" });
  }

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
            categories={categories}
            setShowModal={setShowModal} 
          /> 
          : 
          <ProductList 
            products={products} 
          />} 
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App;


