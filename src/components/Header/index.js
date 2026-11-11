import './index.css'

const Header = props => {
  const {restaurantName, cartCount, onCartClick} = props

  const handleCartClick = () => {
    onCartClick()
  }

  return (
    <header className="header-container">
      <h1 className="restaurant-name">{restaurantName}</h1>
      <div className="orders-container">
        <p className="my-orders-text">My Orders</p>
        <button type="button" className="cart-button" onClick={handleCartClick}>
          <svg
            className="cart-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
          </svg>
          <span className="cart-count">{cartCount}</span>
        </button>
      </div>
    </header>
  )
}

export default Header
