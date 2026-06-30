import ProductCard from './ProductCard';

function ProductList({ products, selectedProductId, favoriteProductIds, onSelectProduct, onToggleFavorite }) {
  return (
    <section className="product-list">
      <h2>Nos produits</h2>
      <div className="products-grid">
        <ProductCard
          product={products[0]}
          isSelected={selectedProductId === products[0].id}
          isFavorite={favoriteProductIds.includes(products[0].id)} 
          onSelectProduct={onSelectProduct}
          onToggleFavorite={onToggleFavorite}
        />
        <ProductCard
          product={products[1]}
          isSelected={selectedProductId === products[1].id}
          isFavorite={favoriteProductIds.includes(products[1].id)}
          onSelectProduct={onSelectProduct}
          onToggleFavorite={onToggleFavorite}
        />
        <ProductCard
          product={products[2]}
          isSelected={selectedProductId === products[2].id}
          isFavorite={favoriteProductIds.includes(products[2].id)}
          onSelectProduct={onSelectProduct}
          onToggleFavorite={onToggleFavorite}
        />
        <ProductCard
          product={products[3]}
          isSelected={selectedProductId === products[3].id}
          isFavorite={favoriteProductIds.includes(products[3].id)}
          onSelectProduct={onSelectProduct}
          onToggleFavorite={onToggleFavorite}
        />
        <ProductCard
          product={products[4]}
          isSelected={selectedProductId === products[4].id}
          isFavorite={favoriteProductIds.includes(products[4].id)}
          onSelectProduct={onSelectProduct}
          onToggleFavorite={onToggleFavorite}
        />
      </div>
    </section>
  );
}

export default ProductList;