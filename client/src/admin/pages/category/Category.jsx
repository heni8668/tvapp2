import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { Container } from "@mui/material";

import './category.scss'
import CategoryManager from './CategoryManager';




const Category = () => {
  return (
    <div className="category">
      <Sidebar />
      <div className="categoryContainer">
        <Navbar />
        
        <div className="bottom">
          <div className="right">
            
            <Container>
              <h1>Category</h1>
              <CategoryManager />
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category