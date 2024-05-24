// RoutesWrapper.js
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./admin/pages/home/Home";
import Category from "./admin/pages/category/Category";
import Channel from "./admin/pages/channel/Channel";
import Types from "./admin/pages/types/Types";
import Movies from "./admin/pages/programs/Movies";
import Front from "./components/Front";

function RoutesWrapper() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div style={{ backgroundColor: isHomePage ? "green" : "inherit" }}>
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/admin" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/channels" element={<Channel />} />
        <Route path="/types" element={<Types />} />
        <Route path="/programs" element={<Movies />} />
      </Routes>
    </div>
  );
}

export default RoutesWrapper;
