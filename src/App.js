import {useState, useEffect} from 'react'
import Header from './components/Header'
import CategoryTabs from './components/CategoryTabs'
import DishList from './components/DishList'
import Cart from './components/Cart'
import './App.css'

const apiUrl =
  'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

const App = () => {
  const [restaurantName, setRestaurantName] = useState('')
  const [categoriesList, setCategoriesList] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState('')
  const [quantities, setQuantities] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    const getMenuData = async () => {
      try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        const restaurantData = Array.isArray(data) ? data[0] : data
        const apiRestaurantName = restaurantData.restaurant_name
        const menuList = restaurantData.table_menu_list
        const firstCategoryId = menuList[0].menu_category_id

        setRestaurantName(apiRestaurantName)
        setCategoriesList(menuList)
        setActiveCategoryId(firstCategoryId)
        setIsLoading(false)
      } catch (error) {
        setHasError(true)
        setIsLoading(false)
      }
    }

    getMenuData()
  }, [])

  const getCurrentQuantity = dishId => {
    const savedQuantity = quantities[dishId]
    if (savedQuantity === undefined) {
      return 0
    }
    return savedQuantity
  }

  const getCartCount = () => {
    const quantityValues = Object.values(quantities)
    let totalCount = 0
    quantityValues.forEach(value => {
      totalCount += value
    })
    return totalCount
  }

  const getCartItems = () => {
    const cartItems = []
    categoriesList.forEach(category => {
      const dishesList = category.category_dishes
      dishesList.forEach(dish => {
        const quantity = getCurrentQuantity(dish.dish_id)
        if (quantity > 0) {
          cartItems.push({dish, quantity})
        }
      })
    })
    return cartItems
  }

  const handleIncrease = dishId => {
    const currentQuantity = getCurrentQuantity(dishId)
    const updatedQuantities = {...quantities, [dishId]: currentQuantity + 1}
    setQuantities(updatedQuantities)
  }

  const handleDecrease = dishId => {
    const currentQuantity = getCurrentQuantity(dishId)
    if (currentQuantity > 0) {
      const updatedQuantities = {...quantities, [dishId]: currentQuantity - 1}
      setQuantities(updatedQuantities)
    }
  }

  const handleChangeCategory = categoryId => {
    setActiveCategoryId(categoryId)
  }

  const handleCartClick = () => {
    setIsCartOpen(true)
  }

  const handleBackToMenu = () => {
    setIsCartOpen(false)
  }

  const getActiveDishes = () => {
    const activeCategory = categoriesList.find(
      category => category.menu_category_id === activeCategoryId,
    )
    if (activeCategory === undefined) {
      return []
    }
    return activeCategory.category_dishes
  }

  const renderLoading = () => <p className="status-message">Loading...</p>

  const renderError = () => (
    <p className="status-message">Something went wrong. Please try again.</p>
  )

  const renderCart = () => (
    <Cart
      cartItems={getCartItems()}
      onIncrease={handleIncrease}
      onDecrease={handleDecrease}
      onBackToMenu={handleBackToMenu}
    />
  )

  const renderMenu = () => (
    <>
      <CategoryTabs
        categoriesList={categoriesList}
        activeCategoryId={activeCategoryId}
        onChangeCategory={handleChangeCategory}
      />
      <DishList
        dishesList={getActiveDishes()}
        quantities={quantities}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
      />
    </>
  )

  const renderContent = () => {
    if (hasError) {
      return renderError()
    }
    if (isCartOpen) {
      return renderCart()
    }
    return renderMenu()
  }

  if (isLoading) {
    return <div className="app-container">{renderLoading()}</div>
  }

  return (
    <div className="app-container">
      <Header
        restaurantName={restaurantName}
        cartCount={getCartCount()}
        onCartClick={handleCartClick}
      />
      {renderContent()}
    </div>
  )
}

export default App
