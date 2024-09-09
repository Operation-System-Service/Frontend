"use client"

import themeOptions from "@/@core/theme/themeOptions";
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ThemeProvider, Toolbar, Typography, createTheme } from "@mui/material";
import { useSettings } from "@/@core/hooks/useSettings";
import { useRouter } from "next/navigation";
import { makeStyles } from '@mui/styles';
import PeopleIcon from '@mui/icons-material/People';
import BadgeIcon from '@mui/icons-material/Badge';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthens } from "@/contexts/useAuthen";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  // appBar: {
  //   zIndex: 1200,
  // },
  drawer: {
    width: 120,
    flexShrink: 0,
    background: "linear-gradient(0deg, rgba(3,8,20,1) 60%, rgba(8,18,50,255) 100%)",
  },
  drawerPaper: {
    width: 240,
    background: "linear-gradient(0deg, rgba(3,8,20,1) 60%, rgba(8,18,50,255) 100%)",
  },
  toolbar: {
    minHeight: 64,
  },
  content: {
    flexGrow: 1,
    backgroundColor: "#f8f9fa",
  },
  texticon: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "24px",
  },
  footer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "17%",
  },
}));

const Layout = ({ children }: any) => {
  const classes = useStyles();
  const router = useRouter();
  const { settings, saveSettings } = useSettings();
  const darkTheme = createTheme(themeOptions(settings, "dark"));
  const { logout } = useAuthens();
  function handleLogout() {
    // Implement your logout logic here
    console.log("User logged out");
    logout();
    // For example, redirect to login page or clear auth tokens
    router.push('/');
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
          anchor="left"
          style={{background:"linear-gradient(0deg, rgba(3,8,20,1) 60%, rgba(8,18,50,255) 100%)", width: 120,
            flexShrink: 0,}}
        >
          <Toolbar style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" className={classes.texticon}>
            Cat System
          </Typography>
          
          {/* Notification Icon */}
          <IconButton style={{ color: "#EF5A6F" }}>
            <NotificationsActiveIcon />
          </IconButton>
        </Toolbar>
          <List sx={{ pl: 1 }} className={classes.texticon}>
            <ListItemButton onClick={() => router.push("/employee")}>
              <ListItemIcon style={{ color: "#CBD1D7" }}>
                <BadgeIcon />
              </ListItemIcon>
              <Typography style={{ color: "#CBD1D7", fontSize: "16px", fontWeight: 700 }}>HR Management</Typography>
            </ListItemButton>

            <ListItemButton onClick={() => router.push("/customer")}>
              <ListItemIcon style={{ color: "#CBD1D7" }}>
                <PeopleIcon />
              </ListItemIcon>
              <Typography style={{ color: "#CBD1D7", fontSize: "16px", fontWeight: 700 }}>Customer Contract</Typography>
            </ListItemButton>

            <ListItemButton onClick={() => router.push("/customer/contract")}>
              <ListItemIcon style={{ color: "#CBD1D7" }}>
                <PeopleIcon />
              </ListItemIcon>
              <Typography style={{ color: "#CBD1D7", fontSize: "16px", fontWeight: 700 }}>Operation </Typography>
            </ListItemButton>
            <ListItemButton onClick={() => router.push("/customer/contract/ticket")}>
              <ListItemIcon style={{ color: "#CBD1D7" }}>
                <PeopleIcon />
              </ListItemIcon>
              <Typography style={{ color: "#CBD1D7", fontSize: "16px", fontWeight: 700 }}>Ticket</Typography>
            </ListItemButton>
          </List>
          {/* Logout Button */}
        <List style={{ marginTop: 'auto' }} sx={{ pl: 1 }}>
          <ListItemButton onClick={handleLogout} style={{ color: "#CBD1D7" }}>
            <ListItemIcon style={{ color: "#CBD1D7" }}>
              <LogoutIcon />
            </ListItemIcon>
            <Typography style={{ color: "#CBD1D7", fontSize: "16px", fontWeight: 700 }}>
              Logout
            </Typography>
          </ListItemButton>
        </List>
        </Drawer>
        <main style={{background:"#f8f9fa"}} className={classes.content}>{children}</main>
      </div>
    </ThemeProvider>
  );
}

export default Layout;
