import React, { useEffect, useState }  from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import SidebarLeft from "../components/SidebarLeft";
import TopBar from "../components/TopBar";
// import {
//   Favorite,
//   FavoriteBorder,
//   WatchLater,
//   WatchLaterOutlined,
// } from "@mui/icons-material";
// import { getMovies } from "../admin/services/movieService";

const categoryCards = [
  {
    id: 1,
    title: "The Hunger Game",
    image:
      "https://m.media-amazon.com/images/M/MV5BMjA4NDg3NzYxMF5BMl5BanBnXkFtZTcwNTgyNzkyNw@@._V1_FMjpg_UX1000_.jpg",
  },
  {
    id: 2,
    title: "Jumanji",
    image:
      "https://m.media-amazon.com/images/M/MV5BOTVjMmFiMDUtOWQ4My00YzhmLWE3MzEtODM1NDFjMWEwZTRkXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg",
  },
  {
    id: 3,
    title: "Godzilla vs King Kong",
    image:
      "https://m.media-amazon.com/images/M/MV5BNjFiMTU5NDEtMGM5Mi00MzNhLTk2MjYtYTJmOTcxZjI2MjdiXkEyXkFqcGdeQWFsZWxvZw@@._V1_.jpg",
  },
  {
    id: 4,
    title: "Jurassic Park",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTnw_C6FAiweYBNNaU1AJqjwmyh6-nI1EJxkszIXg3XA&s",
  },
];

function DetailPage() {
  const { id } = useParams();
  const card = categoryCards.find((m) => m.id === parseInt(id));
  // const { id } = useParams();
  // const [movies, setMovie] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);
  // useEffect(() => {
  //   fetchMoviesByTypeId();
  //   checkStatus();
  // }, [id]);
  
  // const fetchMoviesByTypeId = async () => {
  //   const data = await getMovies();
  //   setMovie(data);
  // };
  // console.log(movies);

  // Check if the movie is in the user's favorite or watch later list
  const checkStatus = async () => {
    const token = localStorage.getItem("token");
    const userId = token ? JSON.parse(atob(token.split(".")[1])).id : null; // Assuming JWT token

    const favoriteResponse = await axios.post(`/api/favorites/check`, {
      userId,
      movieId: id,
    });
    setIsFavorite(favoriteResponse.data.isFavorite);

    const watchLaterResponse = await axios.post(`/api/watchLater/check`, {
      userId,
      movieId: id,
    });
    setIsWatchLater(watchLaterResponse.data.isWatchLater);
  };


  const handleAddToFavorites = async () => {
    const token = localStorage.getItem("token");
    const userId = token ? JSON.parse(atob(token.split(".")[1])).id : null;
    await axios.post("http://localhost:5000/api/users/favorites", {
      userId,
      movieId: id,
    });
    setIsFavorite(true);
  };

  const handleRemoveFromFavorites = async () => {
    const token = localStorage.getItem("token");
    const userId = token ? JSON.parse(atob(token.split(".")[1])).id : null;
    await axios.delete("http://localhost:5000/api/users/favorites/remove", {
      data: { userId, movieId: id },
    });
    setIsFavorite(false);
  };

  const handleAddToWatchLater = async () => {
    const token = localStorage.getItem("token");
    const userId = token ? JSON.parse(atob(token.split(".")[1])).id : null;
    await axios.post("http://localhost:5000/api/users/watch-later", {
      userId,
      movieId: id,
    });
    setIsWatchLater(true);
  };

  const handleRemoveFromWatchLater = async () => {
    const token = localStorage.getItem("token");
    const userId = token ? JSON.parse(atob(token.split(".")[1])).id : null;
    await axios.delete("http://localhost:5000/api/users/watch-later/remove", {
      data: { userId, movieId: id },
    });
    setIsWatchLater(false);
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#172A41" }}>
      <SidebarLeft />
      <Box sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography variant="h6" sx={{ color: "white", fontSize: "8px" }}>
            {card?.title}
          </Typography>
          <TopBar />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 2,
            color: "white",
          }}
        >
          <Typography variant="h4">Programs</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            p: 2,
            color: "white",
          }}
        >
          <Typography variant="h6">Recommended</Typography>
          <Typography variant="h6">Popular</Typography>
          <Typography variant="h6">Featured</Typography>
        </Box>
        <Container sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {categoryCards.map((card) => (
              <Grid item xs={12} sm={6} md={3} key={card.id}>
                <CardActionArea component={Link} to={`/details/${card.id}`}>
                  <Card sx={{ bgcolor: "darkblue" }}>
                    <CardMedia
                      component="img"
                      height="240"
                      color="white"
                      image={card.image}
                      alt={card.title}
                    />
                    <CardContent>
                      <Typography variant="h6" component="div" color="white">
                        {card.title}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: 1,
                        }}
                      >
                        <IconButton color="primary">
                          <PlayArrowIcon sx={{ color: "white" }} />
                        </IconButton>
                        <IconButton color="primary">
                          <FavoriteIcon sx={{ color: "white" }} />
                        </IconButton>
                        <IconButton color="primary">
                          <WatchLaterIcon sx={{ color: "white" }} />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </CardActionArea>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default DetailPage;
