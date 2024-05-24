// import { BrowserRouter, Routes, Route,  } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./admin/pages/home/Home";
import Category from "./admin/pages/category/Category";
import Channel from "./admin/pages/channel/Channel";
import Types from "./admin/pages/types/Types";
import Movies from "./admin/pages/programs/Movies";
import './app.css'
import Front from "./pages/Front";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState } from "react";


function App() {
 
 const [isAuthenticated, setIsAuthenticated] = useState(
   !!localStorage.getItem("token")
 );

 useEffect(() => {
   const handleStorageChange = () => {
     setIsAuthenticated(!!localStorage.getItem("token"));
   };

   window.addEventListener("storage", handleStorageChange);

   return () => {
     window.removeEventListener("storage", handleStorageChange);
   };
 }, []);

  
  return (
    <div>
      
      <Router>
       
        <Routes>
         
          <Route path="/login" element={<LoginPage />}  />
          <Route path="/register" element={<RegisterPage />}  />
          <Route path="/logout" element={<Navigate to="/login" />} />
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<Front />} index/>
            <Route path="/details/:id" element={<DetailPage />} />
            <Route path="/admin" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/channels" element={<Channel />} />
            <Route path="/types" element={<Types />} />
            <Route path="/programs" element={<Movies />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
