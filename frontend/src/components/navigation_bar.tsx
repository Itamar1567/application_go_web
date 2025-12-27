import "./navigation_bar.css";
import HamburgerMenu from "./hamburger_menu";
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <div>
      <nav className="nav-bar">
        <p className="app-title">Application Go</p>
        <HamburgerMenu></HamburgerMenu>
      </nav>
    </div>
  );
}

export default NavigationBar;
