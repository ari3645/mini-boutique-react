import { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Footer from './components/Footer';
import { products } from './data/products';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [showDetails, setShowDetails] = useState(true);
  
  const [favoriteProductIds, setFavoriteProductIds] = useState([]);

  function selectAndScroll(product) {
    setSelectedProduct(product);
    setTimeout(() => {
      const element = document.getElementById('zone-details');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  }

  function toggleFavorite(productId) {
    if (favoriteProductIds.includes(productId)) {
      setFavoriteProductIds(favoriteProductIds.filter(id => id !== productId));
    } else {
      setFavoriteProductIds([...favoriteProductIds, productId]);
    }
  }

  function handleAddToCart(product) {
    console.log('Produit à ajouter au panier :', product.name);
  }

  return (
    <>
      <Header />
      <main>
        <ProductList 
          products={products} 
          selectedProductId={selectedProduct.id}
          favoriteProductIds={favoriteProductIds}
          onSelectProduct={selectAndScroll}
          onToggleFavorite={toggleFavorite}
        />

        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <button className="toggle-btn" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? '⬇️ Masquer les détails' : '⬆️ Afficher les détails'}
          </button>
        </div>

        {showDetails && (
          <ProductDetails 
            product={selectedProduct} 
            isFavorite={favoriteProductIds.includes(selectedProduct.id)}
            onAddToCart={handleAddToCart}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;