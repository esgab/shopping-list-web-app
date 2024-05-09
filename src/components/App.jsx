import '../scss/App.scss'

import Header from './Header';
import AddProductForm from './Products/AddProductForm';
import ProductList from './Products/ProductList';
import Footer from './Footer';

function App() {
  return (
    <div className="container">
      <div className="app">
        <Header />
        <main className="app__main main">
          <AddProductForm />
          <ProductList />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
