import React from "react";
import { Box, Button, Typography } from "@mui/material";

function Banner() {
  return (
    <Box
      sx={{
        height: 400,
        backgroundImage:
          "url(https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg)",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        position: "relative",
        // background: "#172A41",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h4" component="h1">
          Welcome to Our Site
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Play Video
        </Button>
      </Box>
    </Box>
  );
}

export default Banner;
