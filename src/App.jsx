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
  const [customerName, setCustomerName] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('mini_boutique_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('mini_boutique_cart', JSON.stringify(cartItems));
    console.log('Panier mis à jour', cartItems);
  }, [cartItems]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || product.category === selectedCategory;
    const matchesFavorites = !showFavoritesOnly || favoriteProductIds.includes(product.id);
    return matchesSearch && matchesCategory && matchesFavorites;
  });

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
    setOrderConfirmed(false);
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }

  function handleUpdateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems(cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  }

  function handleRemoveFromCart(productId) {
    setCartItems(cartItems.filter(item => item.id !== productId));
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
      alert('Votre commande contient un article indisponible.');
      return;
    }

    setCartItems([]);
    setCustomerName('');
    setOrderConfirmed(true);
  }

  return (
    <>
      <Header />
      <main>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '30px', display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', justifyContent: 'space-between' }}>
          <input
            type="text"
            placeholder="🔍 Rechercher un produit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', minWidth: '250px' }}
          />

          <div style={{ display: 'flex', gap: '10px' }}>
            {['Tous', 'Informatique', 'Accessoires', 'Audio'].map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  backgroundColor: selectedCategory === category ? '#2b6cb0' : 'white',
                  color: selectedCategory === category ? 'white' : '#2d3748',
                  borderColor: selectedCategory === category ? '#2b6cb0' : '#cbd5e0'
                }}
              >
                {category}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            style={{
              backgroundColor: showFavoritesOnly ? '#e53e3e' : 'white',
              color: showFavoritesOnly ? 'white' : '#2d3748',
              borderColor: showFavoritesOnly ? '#e53e3e' : '#cbd5e0'
            }}
          >
            {showFavoritesOnly ? '❤️ Filtré par Favoris' : '🤍 Voir les Favoris'}
          </button>
        </div>

        {filteredProducts.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '18px', margin: '40px 0', color: '#718096' }}>Aucun produit ne correspond à vos critères.</p>
        ) : (
          <ProductList 
            products={filteredProducts} 
            selectedProductId={selectedProduct.id}
            favoriteProductIds={favoriteProductIds}
            onSelectProduct={selectAndScroll}
            onToggleFavorite={toggleFavorite}
          />
        )}

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
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveFromCart={handleRemoveFromCart}
          onClearCart={clearCart}
          orderConfirmed={orderConfirmed}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;