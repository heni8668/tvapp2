import React from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Container } from "@mui/material";

import "./movies.scss";
import MovieManager from './MovieManager';

const Movies = () => {
  return (
    <div className="category">
      <Sidebar />
      <div className="categoryContainer">
        <Navbar />

        <div className="bottom">
          <div className="right">
            <Container>
              <h1>Programs</h1>
              <MovieManager />
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movies