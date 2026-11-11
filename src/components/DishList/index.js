import DishItem from '../DishItem'
import './index.css'

const DishList = props => {
  const {dishesList, quantities, onIncrease, onDecrease} = props

  const renderDishItem = dish => {
    const dishId = dish.dish_id
    const savedQuantity = quantities[dishId]
    const quantity = savedQuantity === undefined ? 0 : savedQuantity

    return (
      <DishItem
        key={dishId}
        dish={dish}
        quantity={quantity}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />
    )
  }

  return <ul className="dish-list">{dishesList.map(renderDishItem)}</ul>
}

export default DishList
