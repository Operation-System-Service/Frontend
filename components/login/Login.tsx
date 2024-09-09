

import React, { useContext, useState } from "react";
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Button, Checkbox, CssBaseline, FormControlLabel, Grid, TextField, ThemeProvider, createTheme } from "@mui/material";
import themeOptions from "@/@core/theme/themeOptions";
import { useSettings } from "@/@core/hooks/useSettings";


export interface LoginModalProps {
    handleLogin: (email: string, password: string) => Promise<void>;
}
export const Login = (props: LoginModalProps) => {
    const { handleLogin } = props;
    
    const { settings, saveSettings } = useSettings()
    let darkTheme = createTheme(themeOptions(settings, "dark"))

    // const [signin, setSignin] = useState<Partial<SignInUserCredential>>({ email: "", password: "" });
    const [email, setEmail]= useState<string>("");
    const [password, setPassword] =useState<string>("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    console.log()
    const handleInputChangeEmail = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const { value } = event.target;
        setEmail(value);
    };

    const handleInputChangePassword = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const { value } = event.target;
        setPassword(value);
    };

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
    };

    // const submit = async () => {
    //     console.log(signin.email)
    //     console.log(signin.password)
    //     if (signin.email != null && signin.password != null) {
    //         console.log("logging in")
    //         userContext?.handleLogin(signin.email, signin.password)

    //     }
    // };
    return (

        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={6}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
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
                    <Box
                        sx={{
                            display: 'flex',
                            marginTop: '1rem',
                            flexDirection: 'row',
                            justifyContent: 'space-around',

                        }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email || ""}
                            onChange={handleInputChangeEmail}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password || ""}
                            onChange={handleInputChangePassword}
                        />
                    </Box>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => {
                            handleLogin(email, password);
                          }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

