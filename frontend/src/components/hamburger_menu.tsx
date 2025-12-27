import { useState } from "react";
import "./hamburger_menu.css";
import close from "../assets/close.png"
import burgerImg from "../assets/burger-bar.png";
import { Link } from "react-router-dom";



function HamburgerMenu() {
 
  const [isActive, setIsActive] = useState(false);


  

  let currBurgerImg = isActive ? close : burgerImg;
  return (
    <div className="ham-menu-total">
      <img id="burgerImg" src={currBurgerImg} onClick={() => setIsActive(!isActive)}></img>
      <div className={`ham-menu ${isActive ? "open" : ""}`}  >
        <ul className="ham-ul">
          <li>
            <button className="link-btn"><Link to={'/'}>Home</Link></button>
          </li>
          <li>
            <button className="link-btn"><Link to={'/addapplication'}>Add Application</Link></button>
          </li>
          <li>
            <button className="link-btn">Products</button>
          </li>
        </ul>
      </div>
      
    </div>
  );
}

export default HamburgerMenu;
