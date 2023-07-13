import {
  Box,
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../hooks";
import { DialogState, toggle } from "../store/dialogSlice";
import CloseIcon from "@mui/icons-material/Close";
import DialogItem from "./DialogItem";
import { formatNumber } from "../util/currencyFormater";
import { CartItem } from "../store/storeSlice";

function StoreDialog() {
  const isOpen = useAppSelector((state) => state.dialog.visible);
  const items = useAppSelector((state) => state.store.items);
  const totalAmount = useAppSelector((state) => state.store.totalAmount);
  const dispatch = useAppDispatch();


  return (
    <Dialog
      open={isOpen}
      sx={{ textAlign: "center", padding: "15px" }}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle>Your Cart</DialogTitle>
      <IconButton
        sx={{ position: "absolute", top: "5px", right: "5px" }}
        onClick={() => dispatch(toggle())}
      >
        <CloseIcon />
      </IconButton>
      {items.length !== 0 ? (
        <Box>
          {items.map((item) => (
            <DialogItem key={item.id} {...item} />
          ))}
          <h2 style={{textAlign: 'right', marginRight: '15px'}}>Total {formatNumber(totalAmount)}</h2>
        </Box>
      ) : (
        <p style={{textAlign: 'center'}}>Your cart is empty!</p>
      )}
    </Dialog>
  );
}

export default StoreDialog;
