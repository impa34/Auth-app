import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from './pages/Register'
import {Route, Routes, useLocation} from 'react-router-dom'
import { AnimatePresence } from "framer-motion";
import {useEffect} from 'react'

function App() {
  const location = useLocation();
  useEffect(() => {
  const img = new Image();
  img.src = "bg.jpg";
}, []);

  return (
    <AnimatePresence mode="wait">
    <Routes location={location} key={location.pathname}>
      <Route path={"/login"} element={<Login />}></Route>
      <Route path={"/register"} element={<Register />}></Route>
       <Route path={"/home"} element={<Home  />}></Route>
    </Routes>
    </AnimatePresence>


  );
}

export default App;
