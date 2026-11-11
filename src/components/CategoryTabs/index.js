import './index.css'

const CategoryTabs = props => {
  const {categoriesList, activeCategoryId, onChangeCategory} = props

  const renderCategoryItem = category => {
    const categoryId = category.menu_category_id
    const categoryName = category.menu_category

    const isActive = categoryId === activeCategoryId
    const tabClassName = isActive ? 'tab-button active-tab' : 'tab-button'

    const handleTabClick = () => {
      onChangeCategory(categoryId)
    }

    return (
      <li className="tab-item" key={categoryId}>
        <button type="button" className={tabClassName} onClick={handleTabClick}>
          {categoryName}
        </button>
      </li>
    )
  }

  return (
    <nav className="category-tabs-container">
      <ul className="tabs-list">{categoriesList.map(renderCategoryItem)}</ul>
    </nav>
  )
}

export default CategoryTabs
