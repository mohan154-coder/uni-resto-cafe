import {useState} from 'react'
import {Switch, Route} from 'react-router-dom'
import CartContext from './context/CartContext'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => {
  const [cartList, setCartList] = useState([])

  const addCartItem = dish => {
    const isDishInCart = cartList.some(
      eachItem => eachItem.dish_id === dish.dish_id,
    )

    if (isDishInCart) {
      const updatedCartList = cartList.map(eachItem => {
        if (eachItem.dish_id === dish.dish_id) {
          return {...eachItem, quantity: eachItem.quantity + dish.quantity}
        }
        return eachItem
      })
      setCartList(updatedCartList)
    } else {
      setCartList([...cartList, dish])
    }
  }

  const removeCartItem = dishId => {
    const updatedCartList = cartList.filter(
      eachItem => eachItem.dish_id !== dishId,
    )
    setCartList(updatedCartList)
  }

  const removeAllCartItems = () => {
    setCartList([])
  }

  const incrementCartItemQuantity = dishId => {
    const updatedCartList = cartList.map(eachItem => {
      if (eachItem.dish_id === dishId) {
        return {...eachItem, quantity: eachItem.quantity + 1}
      }
      return eachItem
    })
    setCartList(updatedCartList)
  }

  const decrementCartItemQuantity = dishId => {
    const updatedCartList = cartList
      .map(eachItem => {
        if (eachItem.dish_id === dishId) {
          return {...eachItem, quantity: eachItem.quantity - 1}
        }
        return eachItem
      })
      .filter(eachItem => eachItem.quantity > 0)
    setCartList(updatedCartList)
  }

  const cartContextValue = {
    cartList,
    removeAllCartItems,
    addCartItem,
    removeCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  }

  return (
    <CartContext.Provider value={cartContextValue}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={Cart} />
      </Switch>
    </CartContext.Provider>
  )
}

export default App
