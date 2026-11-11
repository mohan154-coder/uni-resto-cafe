import './index.css'

const Cart = props => {
  const {cartItems, onIncrease, onDecrease, onBackToMenu} = props

  const totalAmount = cartItems.reduce((total, item) => {
    const dishPrice = Number(item.dish.dish_price)
    return total + dishPrice * item.quantity
  }, 0)

  const renderCartItem = item => {
    const {dish, quantity} = item

    const {
      dish_id: dishId,
      dish_name: dishName,
      dish_price: dishPrice,
      dish_image: dishImage,
      dish_currency: dishCurrency,
    } = dish

    const itemTotal = Number(dishPrice) * quantity

    const handleIncrease = () => {
      onIncrease(dishId)
    }

    const handleDecrease = () => {
      onDecrease(dishId)
    }

    return (
      <li className="cart-item" key={dishId}>
        <img src={dishImage} alt={dishName} className="cart-item-image" />

        <div className="cart-item-details">
          <h2 className="cart-item-name">{dishName}</h2>
          <p className="cart-item-price">
            {dishCurrency} {dishPrice}
          </p>

          <div className="cart-quantity">
            <button type="button" onClick={handleDecrease}>
              -
            </button>
            <span>{quantity}</span>
            <button type="button" onClick={handleIncrease}>
              +
            </button>
          </div>
        </div>

        <p className="cart-item-total">
          {dishCurrency} {itemTotal.toFixed(2)}
        </p>
      </li>
    )
  }

  const renderCartItems = () => {
    const currency = cartItems[0].dish.dish_currency

    return (
      <>
        <ul className="cart-items-list">{cartItems.map(renderCartItem)}</ul>

        <div className="cart-total">
          <h2>Total Amount</h2>
          <p>
            {currency} {totalAmount.toFixed(2)}
          </p>
        </div>
      </>
    )
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>My Orders</h1>
        <button type="button" onClick={onBackToMenu}>
          ✕
        </button>
      </div>

      {cartItems.length > 0 ? (
        renderCartItems()
      ) : (
        <p className="empty-cart">Your cart is empty</p>
      )}
    </div>
  )
}

export default Cart
