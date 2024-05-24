import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Link as MuiLink,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";


function TopBar() {
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <AppBar position="static" sx={{ bgcolor: "#172A41" }}>
      <Toolbar sx={{ bgcolor: "#172A41" }}>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton>
          <SearchIcon sx={{ color: "white" }} />
        </IconButton>
        <MuiLink component={Link} to="/login" sx={{ textDecoration: "none" }}>
          <IconButton>
            <AccountCircle sx={{ color: "white" }} />
          </IconButton>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </MuiLink>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
