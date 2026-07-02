import { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Footer from './components/Footer';
import { products } from './data/products';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [showDetails, setShowDetails] = useState(true);
  const [favoriteProductIds, setFavoriteProductIds] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    console.log('Panier mis à jour', cartItems);
  }, [cartItems]);

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
    setCartItems([...cartItems, product]);
  }

  function removeFromCart(indexToRemove) {
    setCartItems(cartItems.filter((_, index) => index !== indexToRemove));
  }

  function clearCart() {
    setCartItems([]);
  }

  function handleOrderSubmit(event) {
    event.preventDefault();
    if (customerName.trim() === '') {
      alert('Veuillez saisir votre nom.');
      return;
    }
    if (cartItems.length === 0) {
      alert('Votre panier est vide.');
      return;
    }
    
    const hasUnavailableItem = cartItems.some(item => !item.available);
    if (hasUnavailableItem) {
      alert('Votre commande contient un article indisponible. Veuillez le retirer du panier.');
      return;
    }

    alert(`Merci ${customerName}, votre commande est prête !`);
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

        <Cart 
          cartItems={cartItems}
          customerName={customerName}
          onCustomerNameChange={setCustomerName}
          onOrderSubmit={handleOrderSubmit}
          onRemoveFromCart={removeFromCart}
          onClearCart={clearCart}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;