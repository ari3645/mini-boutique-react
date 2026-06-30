import ProductBadge from './ProductBadge';

function ProductCard({ name, price, category, image, description, available }) {
  return (
    <article className="product-card">
      <img src={image} alt={name} />
      <div className="product-card-content">
        <ProductBadge category={category} />
        
        <h3>{name}</h3>
        
        <p className="description">{description}</p>
        
        <p className={`status ${available ? 'in-stock' : 'out-of-stock'}`}>
          {available ? 'Disponible' : 'Rupture de stock'}
        </p>
        
        <strong>{price} €</strong>
      </div>
    </article>
  );
}

export default ProductCard;