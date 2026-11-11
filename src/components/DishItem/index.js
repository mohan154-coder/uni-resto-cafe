import './index.css'

const DishItem = props => {
  const {dish, quantity, onIncrease, onDecrease} = props

  const {
    dish_id: dishId,
    dish_name: dishName,
    dish_price: dishPrice,
    dish_image: dishImage,
    dish_currency: dishCurrency,
    dish_calories: dishCalories,
    dish_description: dishDescription,
    dish_Availability: isDishAvailable,
    dish_Type: dishType,
    addonCat: addonCategories,
  } = dish

  const isVeg = dishType === 2
  const symbolClassName = isVeg
    ? 'symbol-box veg-box'
    : 'symbol-box non-veg-box'
  const dotClassName = isVeg ? 'symbol-dot veg-dot' : 'symbol-dot non-veg-dot'

  const hasAddons = addonCategories && addonCategories.length > 0

  const handleIncrease = () => {
    onIncrease(dishId)
  }

  const handleDecrease = () => {
    onDecrease(dishId)
  }

  const renderQuantityButtons = () => (
    <div className="quantity-container">
      <button
        type="button"
        className="quantity-button"
        onClick={handleDecrease}
      >
        -
      </button>
      <p className="quantity-value">{quantity}</p>
      <button
        type="button"
        className="quantity-button"
        onClick={handleIncrease}
      >
        +
      </button>
    </div>
  )

  const renderNotAvailable = () => (
    <p className="not-available-text">Not available</p>
  )

  const renderCustomizations = () => (
    <p className="customizations-text">Customizations available</p>
  )

  return (
    <li className="dish-item">
      <div className={symbolClassName}>
        <div className={dotClassName} />
      </div>

      <div className="dish-details">
        <h1 className="dish-name">{dishName}</h1>
        <p className="dish-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="dish-description">{dishDescription}</p>
        {isDishAvailable ? renderQuantityButtons() : renderNotAvailable()}
        {isDishAvailable && hasAddons ? renderCustomizations() : null}
      </div>

      <p className="dish-calories">{dishCalories} calories</p>

      <img className="dish-image" src={dishImage} alt={dishName} />
    </li>
  )
}

export default DishItem
