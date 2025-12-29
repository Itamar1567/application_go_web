import "./App.css";
import Home from "./components/home";
import AddApplication from "./components/add_application";
import NavigationBar from "./components/navigation_bar";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { SignedIn, RedirectToSignIn, SignedOut } from "@clerk/clerk-react";

function App() {
  return (
    <Router>
      <SignedOut>
        <RedirectToSignIn></RedirectToSignIn>
      </SignedOut>
      <SignedIn>
        <NavigationBar></NavigationBar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/addapplication"
            element={<AddApplication></AddApplication>}
          ></Route>
        </Routes>
      </SignedIn>
    </Router>
  );
}

export default App;
