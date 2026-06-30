// src/components/ProductDetails.jsx
function ProductDetails({ product, isFavorite, onAddToCart }) {
  return (
    <section className="product-details" id="zone-details">
      <h2>Détails du produit sélectionné</h2>
      <div className="details-card">
        {isFavorite && <p className="fav-badge">⭐ Ce produit est dans vos favoris !</p>}
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>Catégorie : <strong>{product.category}</strong></p>
        <p>Prix : <strong>{product.price} €</strong></p>
        
        <p className={`status ${product.available ? 'in-stock' : 'out-of-stock'}`}>
          {product.available ? '✅ Disponible en magasin' : '❌ Momentanément indisponible'}
        </p>
        
        <button className="cart-btn" onClick={() => onAddToCart(product)}>
          🛒 Ajouter au panier
        </button>
      </div>
    </section>
  );
}

export default ProductDetails;