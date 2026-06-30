// src/components/ProductList.jsx
import ProductCard from './ProductCard';

function ProductList() {
  return (
    <section className="product-list">
      <h2>Nos produits</h2>
      <div className="products-grid">
        <ProductCard
          name="Ordinateur portable"
          price={899}
          category="Informatique"
          image="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80"
          description="Un PC performant pour le développement et le travail quotidien."
          available={true}
        />
        <ProductCard
          name="Souris sans fil"
          price={29}
          category="Accessoires"
          image="https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80"
          description="Ergonomique et ultra-précise avec une grande autonomie."
          available={true}
        />
        <ProductCard
          name="Clavier mécanique"
          price={79}
          category="Accessoires"
          image="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80"
          description="Touches rétroéclairées pour un confort de frappe idéal."
          available={false}
        />
        {/* Amélioration : Produit supplémentaire 1 */}
        <ProductCard
          name="Casque Audio ANC"
          price={149}
          category="Audio"
          image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
          description="Réduction de bruit active pour une immersion totale."
          available={true}
        />
        {/* Amélioration : Produit supplémentaire 2 */}
        <ProductCard
          name="Écran 4K 27\"
          price={349}
          category="Informatique"
          image="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80"
          description="Une clarté d'image exceptionnelle pour vos projets."
          available={true}
        />
      </div>
    </section>
  );
}

export default ProductList;