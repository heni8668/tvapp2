import React from "react";
import { Box, List, ListItem, ListItemIcon, Divider } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { GiBurningTree } from "react-icons/gi";

function SidebarLeft() {
  return (
    <Box
      sx={{
        width: 60,
        bgcolor: "#172A41",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ mt: 2, mb: 16, color: "white" }}><GiBurningTree size='40' /></Box>
      <List>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon  sx={{ ml: 1, mb: 4, color: "white",}} />
          </ListItemIcon>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <InfoIcon sx={{ ml: 1, mb: 4, color: "white" }} />
          </ListItemIcon>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ContactMailIcon sx={{ ml: 1, mb: 4, color: "white" }} />
          </ListItemIcon>
        </ListItem>
      </List>
    </Box>
  );
}

export default SidebarLeft;
