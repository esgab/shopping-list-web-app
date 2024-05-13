import MenuItem from "./MenuItem";

function MenuSlider({ menuItems }) {
  
  return (
    <div className="menu">
      <span className="menu__close"></span>
      <nav className="menu__nav">
        <ul className="menu__list">
          {menuItems.map( menuItem =>
            <MenuItem key={menuItem} />
          )}
        </ul>
      </nav>
    </div>
  )
}

export default MenuSlider;