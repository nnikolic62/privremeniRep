import { Box, Button, Tooltip } from "@mui/material";
import React from "react";
import { CartItem } from "../store/storeSlice";
import classes from "./DialogItem.module.css";
import { formatNumber } from "../util/currencyFormater";
import { useDispatch } from "react-redux";
import {  removeItem } from "../store/storeSlice";

interface DialogItemProps {
  id: number;
  quantity: number;
  name: string;
  price: number;
  img: string;
}

function DialogItem(props: DialogItemProps) {
  const dispatch = useDispatch();
  return (
    <Box className={classes.container}>
      <div className={classes.section}>
        <img src={props.img} alt="no img" />
        <div className={classes.item}>
          <h3>
            {props.name}{" "}
            <span className={classes.quantity}>x{props.quantity}</span>
          </h3>
          <p>{formatNumber(props.price)}</p>
        </div>
      </div>
      <div className={classes.section}>
        <h4>{formatNumber(props.price * props.quantity)}</h4>
        <Tooltip title="Remove item">
          <Button color="error" onClick={() => dispatch(removeItem(props.id))}>X</Button>
        </Tooltip>
      </div>
    </Box>
  );
}

export default DialogItem;
