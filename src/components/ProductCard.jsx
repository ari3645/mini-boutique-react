
import ProductBadge from './ProductBadge';

function ProductCard({ product, isSelected, isFavorite, onSelectProduct, onToggleFavorite }) {
  return (
    <article className={`product-card ${isSelected ? 'selected' : ''}`}>
      <img src={product.image} alt={product.name} />
      <div className="product-card-content">
        <ProductBadge category={product.category} />
        
        <h3>{product.name}</h3>
        <p className="description">{product.description}</p>
        
        <p className={`status ${product.available ? 'in-stock' : 'out-of-stock'}`}>
          {product.available ? '✅ Disponible' : '❌ Rupture de stock'}
        </p>
        
        <strong>{product.price} €</strong>
        
        <div className="product-actions">
          <button className="details-btn" onClick={() => onSelectProduct(product)}>
            🔎 Voir les détails
          </button>
          
          <button className="fav-btn" onClick={() => onToggleFavorite(product.id)}>
            {isFavorite ? '❤️ En favori' : '🤍 Favori'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;