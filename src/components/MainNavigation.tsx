import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import StoreIcon from "@mui/icons-material/Store";
import classes from "./MainNavigation.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { toggle } from "../store/dialogSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import IconButton from "@mui/material/IconButton";
import { Session } from "../util/Session";
import menuItems from "../data/menuItems.json";
import theme from "../theme/theme";
import DrawerComponent from "./DrawerComponent";

// const

function MainNavigation() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.store.items);
  const navigate = useNavigate();
  const size = useMediaQuery(theme.breakpoints.down("md"));

  function handleLogout() {
    let session = new Session();
    session.destroySession();
    localStorage.clear();
    navigate("/login");
  }

  return (
    <AppBar component="nav" position="sticky">
      <Toolbar className={classes.nav}>
        <Box className={classes.logoBox}>
          <IconButton
            sx={{
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent",
              },
              alignContent: "center",
            }}
            color="inherit"
            onClick={() => navigate("/home")}
          >
            <StoreIcon fontSize="large" className={classes.logo} />
          </IconButton>
          <Typography variant="h1">Store App</Typography>
        </Box>
        <Box className={classes.logoBox}>
          <Button
            color="inherit"
            variant="outlined"
            className={classes.btn}
            onClick={() => dispatch(toggle())}
          >
            <ShoppingCartIcon />
            <div className={classes.badge}>
              {items.reduce(
                (currQuantity, item) => currQuantity + item.quantity,
                0
              )}
            </div>
          </Button>
          {size === false ? (
            <React.Fragment>
              <ul className={classes.list}>
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        isActive ? classes.active : undefined
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <Button variant="outlined" color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </React.Fragment>
          ) : (
            <DrawerComponent />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default MainNavigation;
