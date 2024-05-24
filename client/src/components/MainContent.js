import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
// import WifiTetheringIcon from "@mui/icons-material/WifiTethering";
import { Link } from "react-router-dom";
import { getTypes } from "../admin/services/typeService";
// import Broadcast_icon from "./Broadcast_icon.png";
// import movies1 from './movies.png'
// import channel from './channel.png'





function MainContent() {
  const [types, setTypes] = useState([]);
const cards = [
  { image: "https://via.placeholder.com/300" },
  { image: "https://via.placeholder.com/300" },
  { image: "https://via.placeholder.com/300" },
  // { image: "https://via.placeholder.com/300" },
];
// console.log(cards[0]);
  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    const data = await getTypes();
    setTypes(data);
  };
  return (
    <Grid container spacing={2}>
      {types.map((type, index) => (
        <Grid item xs={12} sm={6} md={3} key={type.id}>
          <CardActionArea component={Link} to={`/details/${type.id}`}>
            <Card
              sx={{
                bgcolor: "#172A41",
                color: "white",
                border: "solid 2px gray",
                marginBottom: "10px",
                height: "300px",
              }}
            >
              <CardMedia
                component="img"
                height="120"
                margin="10px"
                color='green'
                image={cards[index % cards.length].image}
                alt={type.name}
              />
              <CardContent>
                <Typography variant="h4" component="div">
                  {type.name}
                </Typography>
                <Typography variant="p" component="div">
                  +5000 channels
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </Grid>
      ))}
    </Grid>
  );
}

export default MainContent;
