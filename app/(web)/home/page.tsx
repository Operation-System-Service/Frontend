"use client"

import themeOptions from "@/@core/theme/themeOptions";
import { AppBar, CardHeader, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ThemeProvider, Toolbar, Typography, createTheme } from "@mui/material"
import { useSettings } from "@/@core/hooks/useSettings";
import { useRouter } from "next/navigation";
import { makeStyles } from "@mui/styles";
import paper from "@/@core/theme/overrides/paper";
import PeopleIcon from '@mui/icons-material/People';
import BadgeIcon from '@mui/icons-material/Badge';

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: 1200,
  },
  drawer: {
    width: 120,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
    background:
      "linear-gradient(0deg, rgba(3,8,20,1) 60%, rgba(8,18,50,255) 100%)",
  },
  toolbar: {
    minHeight: 64,
  },
  content: {
    flexGrow: 1,
    backgroundColor: "#eaecef",
    // padding: 8,
  },
  texticon: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "24px"
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
});

const Home = ({ children }: any) => {
  const classes = useStyles();
  const router = useRouter();
  const { settings, saveSettings } = useSettings()
  let darkTheme = createTheme(themeOptions(settings, "dark"))
  return (
    <AppBar>
      
    </AppBar>
  );

}
export default Home;