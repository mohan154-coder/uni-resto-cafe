import {useState, useEffect, useContext} from 'react'
import Header from '../Header'
import CartContext from '../../context/CartContext'
import './index.css'

const apiUrl =
  'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

const emptyCartImageUrl =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png'

const Cart = () => {
  const [restaurantName, setRestaurantName] = useState('')
  const {
    cartList,
    removeAllCartItems,
    removeCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useContext(CartContext)

  useEffect(() => {
    const getRestaurantName = async () => {
      try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        const restaurantData = Array.isArray(data) ? data[0] : data
        const apiRestaurantName = restaurantData.restaurant_name
        setRestaurantName(apiRestaurantName)
      } catch (error) {
        setRestaurantName('')
      }
    }

    getRestaurantName()
  }, [])

  const totalAmount = cartList.reduce((total, item) => {
    const dishPrice = Number(item.dish_price)
    return total + dishPrice * item.quantity
  }, 0)

  const handleRemoveAll = () => {
    removeAllCartItems()
  }

  const renderCartItem = item => {
    const {
      dish_id: dishId,
      dish_name: dishName,
      dish_price: dishPrice,
      dish_image: dishImage,
      dish_currency: dishCurrency,
      quantity,
    } = item

    const handleIncrease = () => {
      incrementCartItemQuantity(dishId)
    }

    const handleDecrease = () => {
      decrementCartItemQuantity(dishId)
    }

    const handleRemove = () => {
      removeCartItem(dishId)
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

        <button
          type="button"
          className="cart-remove-button"
          aria-label="Remove"
          onClick={handleRemove}
        >
          ✕
        </button>
      </li>
    )
  }

  const renderCartItems = () => {
    const currency = cartList[0].dish_currency

    return (
      <>
        <ul className="cart-items-list">{cartList.map(renderCartItem)}</ul>

        <div className="cart-total">
          <h2>Total Amount</h2>
          <p>
            {currency} {totalAmount.toFixed(2)}
          </p>
        </div>
      </>
    )
  }

  const renderEmptyCart = () => (
    <div className="empty-cart-container">
      <img
        src={emptyCartImageUrl}
        alt="empty cart"
        className="empty-cart-image"
      />
      <p className="empty-cart-text">Your cart is empty</p>
    </div>
  )

  return (
    <div className="cart-container">
      <Header restaurantName={restaurantName} />
      <div className="cart-page">
        <div className="cart-header">
          <h1>My Orders</h1>
          {cartList.length > 0 && (
            <button
              type="button"
              className="remove-all-button"
              onClick={handleRemoveAll}
            >
              Remove All
            </button>
          )}
        </div>

        {cartList.length > 0 ? renderCartItems() : renderEmptyCart()}
      </div>
    </div>
  )
}

export default Cart
