import './App.css'
import Home from './components/home'
import AddApplication from './components/add_application'
import NavigationBar from './components/navigation_bar'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'

function App() {


   

  return (

    <Router>
      <NavigationBar></NavigationBar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/addapplication' element={<AddApplication></AddApplication>}></Route>
      </Routes>
    </Router>
    
    
    
  )
}

export default App
