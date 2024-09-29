"use client";

import { useRouter } from "next/navigation";
import { Toolbar, Typography, IconButton, List, ListItemButton, ListItemIcon, styled, Theme, Button } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import BadgeIcon from "@mui/icons-material/Badge";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthens } from "@/contexts/useAuthen";
import MuiDrawer from "@mui/material/Drawer";
import { usePathname } from "next/navigation";
import { makeStyles } from '@mui/styles';

const DrawerCustom = styled(MuiDrawer)(({ theme }) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: 240,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        background: "linear-gradient(0deg, rgba(3,8,20,1) 60%, rgba(8,18,50,255) 100%)",
    },
}));

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
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
}));


const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const classes = useStyles();
    const { logout } = useAuthens();
    const currentPath = usePathname();
    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <div style={{ display: "flex" }}>
            {currentPath !== "/" && ( // Conditionally render the drawer
                <DrawerCustom variant="permanent">
                    <Toolbar style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <IconButton style={{ color: "#EF5A6F" }}>
                            <NotificationsActiveIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.texticon} sx={{ marginRight: 1 }}>
                            Cat System 
                        </Typography>

                    </Toolbar>
                    <List sx={{ pl: 0 }} className={classes.texticon}>
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
                </DrawerCustom>
            )}
            <main style={{ flexGrow: 1, backgroundColor: "#f8f9fa" }}>{children}</main>
        </div>
    );
};

export default ClientLayout;
