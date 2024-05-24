import React from 'react'
// import {  Link } from "react-router-dom";
import { Box, CssBaseline, Container } from "@mui/material";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "./SidebarRight";
import TopBar from "./TopBar";
import Banner from "./Banner";
import MainContent from "./MainContent";
import { useLocation } from "react-router-dom";
// import DetailPage from './DetailPage';

const Front = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
  return (
    <Box
      sx={{ display: "flex", background: isHomePage ? "#172A41" : "inherit" }}
    >
      <CssBaseline />
      <SidebarLeft />
      <SidebarRight />
      <Box sx={{ flexGrow: 1 }}>
        <TopBar />
        
        <Banner />
        <Container sx={{ mt: 2, background: "#172A41" }}>
          <MainContent />
        </Container>
        {/* <Link to="/details/:id" >
          <DetailPage />
        </Link> */}
      </Box>
    </Box>
  );
}

export default Front