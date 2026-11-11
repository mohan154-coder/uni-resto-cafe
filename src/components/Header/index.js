import {useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const {restaurantName, history} = props
  const {cartList} = useContext(CartContext)
  const cartCount = cartList.length

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <header className="header-container">
      <Link to="/" className="restaurant-name-link">
        <h1 className="restaurant-name">{restaurantName}</h1>
      </Link>
      <div className="orders-container">
        <p className="my-orders-text">My Orders</p>
        <Link to="/cart" className="cart-link" data-testid="cart">
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
        </Link>
        <button type="button" className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}

export default withRouter(Header)
