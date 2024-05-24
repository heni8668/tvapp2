import React from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import './types.scss'
import { Container } from "@mui/material";
import TypeManager from './TypeManager';

const Types = () => {
  return (
    <div className="types">
      <Sidebar />
      <div className="typesContainer">
        <Navbar />

        <div className="bottom">
          <div className="right">
            <Container>
              <h1>Types</h1>
              <TypeManager />
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Types