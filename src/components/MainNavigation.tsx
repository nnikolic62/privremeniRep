import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import React, { useEffect } from "react";
import StoreIcon from "@mui/icons-material/Store";
import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { toggle } from "../store/dialogSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

function MainNavigation() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.store.items);

  return (
    <>
      <AppBar component="nav" position="sticky">
        <Toolbar className={classes.nav}>
          <Box className={classes.logoBox}>
            <StoreIcon fontSize="large" className={classes.logo} />
            <Typography variant="h5">Store App</Typography>
          </Box>
          <Box className={classes.logoBox}>
            <ul className={classes.list}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="store"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Store
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="about"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  About
                </NavLink>
              </li>
            </ul>
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
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default MainNavigation;
