"use client"
import { useSettings } from "@/@core/hooks/useSettings";
import themeOptions from "@/@core/theme/themeOptions";

import { Box, Typography, createTheme } from "@mui/material";
import Paper from '@mui/material/Paper'
import { Button, CssBaseline, Grid } from "@mui/material";
import React, { useState } from "react";
import { useAuthens } from "@/contexts/useAuthen";
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import aboutUs from "../public/images/aboutUs.jpg"



const LoginPage = () => {
  const { doSignInWithMicrosoft } = useAuthens();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit();
  };

  const submit = async () => {
    await doSignInWithMicrosoft();

  };


  return (
    <form onSubmit={handleSubmit}>

      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            height: '100vh', // Set height
            backgroundImage: `url('/images/aboutUs.jpg')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'left',
              padding: '1rem',
              height: '100%',
              '& .MuiTextField-root': { m: 1, width: 'ch' },
            }}
          >
            <Typography align="center" sx={{ my: 4, fontSize: "60px", fontWeight: 700, color: "#003867" }}>
              Welcome To CAT System
            </Typography>
            <Typography variant="body2" align="center" color={'#6C757D'} sx={{ fontSize: "20px", fontWeight: 700 }}>
              Sign in to your account
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              <MicrosoftIcon
                className="me-3"
                style={{ color: '#F25022', margin: '0 8px' }} // Set your desired color and styles
              />
              Login With Microsoft
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginPage;
