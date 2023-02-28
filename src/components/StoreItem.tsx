import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Box,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import Button from "@mui/material/Button";
import classes from "./StoreItem.module.css";
import { formatNubmer } from "../util/currencyFormater";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addItem, removeItem } from "../store/storeSlice";

interface StoreItemProps {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}

function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const items = useAppSelector((state) => state.store.items);
  const dispatch = useAppDispatch();

  useEffect(() => {
      console.log(items);
  }, [items]);

  // const handleAdd = () => {
  //   // console.log(id)
  //   dispatch(addItem({ id: id, quantity: 1, price: price }))
  // }

  return (
    <Card>
      <CardMedia
        component="img"
        image={imgUrl}
        alt="no img"
        className={classes.img}
      />
      <CardContent>
        <Box className={classes.title}>
          <Typography gutterBottom variant="h4" component="span">
            {name}
          </Typography>
          <Typography gutterBottom variant="h5" component="span" color="gray">
            {formatNubmer(price)}
          </Typography>
        </Box>
        <Box>
          {items[id] !== undefined ? (
            <div className={classes.buttons1}>
              <div className={classes.gornji}>
                <Button
                  color="primary"
                  sx={{ fontSize: "25px" }}
                  onClick={() => dispatch(removeItem(id))}
                >
                  -
                </Button>
                <p>
                  <span>
                    {items[id] !== undefined ? items[id].quantity : 0}
                  </span>{" "}
                  in cart
                </p>
                <Button
                  color="primary"
                  sx={{ fontSize: "25px", padding: 0 }}
                  onClick={() =>
                    dispatch(addItem({ id: id, quantity: 1, price: price }))
                  }
                >
                  +
                </Button>
              </div>
              <Button color="warning" variant="contained">
                Remove
              </Button>
            </div>
          ) : (
            <div>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                onClick={() =>
                  dispatch(addItem({ id: id, quantity: 1, price: price }))
                }
              >
                + Add To Cart
              </Button>
            </div>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default StoreItem;
