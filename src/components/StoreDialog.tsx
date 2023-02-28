import { Box, Dialog, IconButton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../hooks";
import { DialogState, toggle } from "../store/dialogSlice";

function StoreDialog() {
  const isOpen = useAppSelector((state) => state.dialog.visible);
  const items = useAppSelector((state) => state.store.items);
  const dispatch = useAppDispatch();

  return (
    <Dialog open={isOpen}>
      <IconButton sx={{ position: "absolute", top: "5px", right: "5px" }} onClick={() => dispatch(toggle())}>
        X
      </IconButton>
      <Box>
      {items.map(item => (
        <p>{JSON.stringify(item)}</p>
      ))}
      </Box>
    </Dialog>
  );
}

export default StoreDialog;
