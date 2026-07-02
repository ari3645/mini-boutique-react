import ProductCard from './ProductCard';

function ProductList({ products, selectedProductId, favoriteProductIds, onSelectProduct, onToggleFavorite }) {
  return (
    <section className="product-list">
      <h2>Nos produits</h2>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isSelected={selectedProductId === product.id}
            isFavorite={favoriteProductIds.includes(product.id)}
            onSelectProduct={onSelectProduct}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;