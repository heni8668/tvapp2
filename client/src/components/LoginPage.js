import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Link as MuiLink,
} from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TreeOutlinedIcon from "@mui/icons-material/TreeOutlined";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://tvapp2-2.onrender.com/api/users/login",
        { email, password }
      );
      // console.log(response.data);
      //  the backend returns a token
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          bgcolor: "#172A41",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" component="div" sx={{ color: "white", mb: 2 }}>
          <TreeOutlinedIcon />
        </Typography>
        <Typography variant="h5" component="div" sx={{ color: "white" }}>
          Welcome to my Site
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          sx={{ width: "80%", maxWidth: 400 }}
          onSubmit={handleLogin}
        >
          <Typography variant="h4" component="div" sx={{ mb: 3 }}>
            Login
          </Typography>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />
          {error && <Typography color="error">{error}</Typography>}

          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            type="submit"
          >
            Login
          </Button>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <MuiLink
              component={Link}
              to="/register"
              sx={{ textDecoration: "none" }}
            >
              Register
            </MuiLink>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
