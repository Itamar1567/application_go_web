import "./navigation_bar.css";
import HamburgerMenu from "./hamburger_menu";

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
