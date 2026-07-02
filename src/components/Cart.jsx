function Cart({
  cartItems,
  customerName,
  onCustomerNameChange,
  onOrderSubmit,
  onRemoveFromCart,
  onClearCart
}) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const hasUnavailableItem = cartItems.some(item => !item.available);

  return (
    <section className="cart">
      <h2>Panier</h2>
      
      {cartItems.length === 0 && (
        <p>Votre panier est vide.</p>
      )}

      {cartItems.length > 0 && (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={`${item.id}-${index}`}>
                {item.name} - {item.price} €
                {!item.available && (
                  <span style={{ color: '#c53030', marginLeft: '10px', fontWeight: 'bold' }}>
                    (Indisponible)
                  </span>
                )}
                <button onClick={() => onRemoveFromCart(index)}>
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
          
          <p>Total : {total} €</p>
          
          <button onClick={onClearCart}>
            Vider le panier
          </button>
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

        <button type="submit">
          Valider la commande
        </button>
      </form>
    </section>
  );
}

export default Cart;