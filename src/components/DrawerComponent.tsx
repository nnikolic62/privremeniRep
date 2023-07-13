import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import menuItems from "../data/menuItems.json";
import { Session } from "../util/Session";
import { useNavigate } from "react-router-dom";

type Anchor = "left";
type MenuItems = {
  id: number;
  to: string;
  name: string;
};

function DrawerComponent() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    let session = new Session();
    session.destroySession();
    localStorage.clear();
    navigate("/login");
  }

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (e: React.MouseEvent | React.KeyboardEvent) => {
      if (
        e.type === "keydown" &&
        ((e as React.KeyboardEvent).key === "Tab" ||
          (e as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };

  const listItems = (menuItems: MenuItems[]) => {
    return menuItems.map((item) => (
      <ListItem key={item.id}>
        <ListItemButton component="a" href={item.to}>
          <ListItemText>{item.name}</ListItemText>
        </ListItemButton>
      </ListItem>
    ));
  };
  return (
    <>
      <IconButton onClick={toggleDrawer("left", true)} color="inherit">
        <MenuIcon />
      </IconButton>
      <Drawer open={open} anchor={"left"} onClose={toggleDrawer("left", false)} >
        <List sx={{display: 'flex', flexDirection: 'column'}}>
          {listItems(menuItems)}
          <Button variant="outlined" color="inherit" onClick={handleLogout} sx={{alignSelf: 'center'}}>
            Logout
          </Button>
        </List>
      </Drawer>
    </>
  );
}

export default DrawerComponent;
