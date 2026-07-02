function Cart({
  cartItems,
  customerName,
  onCustomerNameChange,
  onOrderSubmit,
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart,
  orderConfirmed
}) {
  const totalArticles = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const hasUnavailableItem = cartItems.some(item => !item.available);
  const isCartEmpty = cartItems.length === 0;

  return (
    <section className="cart">
      <h2>Panier ({totalArticles} {totalArticles > 1 ? 'articles' : 'article'})</h2>
      
      {orderConfirmed && (
        <div style={{ backgroundColor: '#c6f6d5', color: '#22543d', padding: '15px', borderRadius: '4px', marginBottom: '20px', fontWeight: 'bold' }}>
          🎉 Votre commande a été validée avec succès !
        </div>
      )}

      {isCartEmpty ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cartItems.map((item) => (
              <li key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'between', marginBottom: '15px', padding: '10px', borderBottom: '1px solid #eee' }}>
                <div style={{ flex: 1 }}>
                  <strong>{item.name}</strong> - {item.price} € / unité
                  {!item.available && (
                    <span style={{ color: '#c53030', marginLeft: '10px', fontWeight: 'bold' }}>
                      (Indisponible)
                  </span>
                  )}
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '15px' }}>
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span style={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>

                <div style={{ fontWeight: 'bold', marginRight: '15px', minWidth: '70px', textAlign: 'right' }}>
                  {item.price * item.quantity} €
                </div>

                <button onClick={() => onRemoveFromCart(item.id)} style={{ color: '#c53030', borderColor: '#feb2b2' }}>
                  🗑️
                </button>
              </li>
            ))}
          </ul>
          
          <h3 style={{ textAlign: 'right', margin: '20px 0' }}>Total Général : {totalPrice} €</h3>
          
          <div style={{ textAlign: 'right', marginBottom: '25px' }}>
            <button onClick={onClearCart} style={{ backgroundColor: '#edf2f7', color: '#4a5568' }}>
              Vider le panier
            </button>
          </div>
        </>
      )}

      <form onSubmit={onOrderSubmit} className="order-form">
        <label>
          Votre nom :
          <input
            type="text"
            value={customerName}
            onChange={(event) => onCustomerNameChange(event.target.value)}
            placeholder="Ex: Jean"
          />
        </label>
        
        {hasUnavailableItem && (
          <p style={{ color: '#c53030', fontWeight: 'bold', margin: '10px 0' }}>
            ⚠️ Impossible de valider : certains articles de votre panier sont en rupture de stock.
          </p>
        )}

        <button type="submit" disabled={isCartEmpty || hasUnavailableItem}>
          Valider la commande
        </button>
      </form>
    </section>
  );
}

export default Cart;