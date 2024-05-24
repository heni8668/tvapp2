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
import { AccountCircle, Email, Lock } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://tvapp2-2.onrender.com/api/users/register",
        {
          username,
          email,
          password,
        }
      );

      navigate("/login");
    } catch (err) {
      setError("Registration failed");
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
          Your Logo
        </Typography>
        <Typography variant="h5" component="div" sx={{ color: "white" }}>
          Join Your Site
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
          onSubmit={handleRegister}
        >
          <Typography variant="h4" component="div" sx={{ mb: 3 }}>
            Register
          </Typography>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            label="Email"
            type="email"
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
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
            Register
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <MuiLink
              component={Link}
              to="/login"
              sx={{ textDecoration: "none" }}
            >
              Login
            </MuiLink>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default RegisterPage;
