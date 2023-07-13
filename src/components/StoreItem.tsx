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
import { formatNumber } from "../util/currencyFormater";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addItem, removeItem, removeSingleItem } from "../store/storeSlice";

interface StoreItemProps {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}


function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const items = useAppSelector((state) => state.store.items);
  const dispatch = useAppDispatch();

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
            {formatNumber(price)}
          </Typography>
        </Box>
        <Box>
          {items.find((item) => item.id === id) !== undefined ? (
            <div className={classes.buttons1}>
              <div className={classes.gornji}>
                <Button
                  color="primary"
                  sx={{ fontSize: "25px", padding: 0, margin: 0}}
                  size='small'
                  onClick={() => dispatch(removeSingleItem(id))}
                >
                  -
                </Button>
                <p>
                  <span>
                    {items.find((item) => item.id === id) !== undefined
                      ? items.find((item) => item.id === id)!.quantity
                      : 0}
                  </span>{" "}
                  in cart
                </p>
                <Button
                  color="primary"
                  sx={{ fontSize: "25px", padding: 0 }}
                  onClick={() =>
                    dispatch(
                      addItem({
                        id: id,
                        quantity: 1,
                        price: price,
                        img: imgUrl,
                        name: name,
                      })
                    )
                  }
                >
                  +
                </Button>
              </div>
              <Button
                color="warning"
                variant="contained"
                onClick={() => dispatch(removeItem(id))}
              >
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
                  dispatch(
                    addItem({
                      id: id,
                      quantity: 1,
                      price: price,
                      img: imgUrl,
                      name: name,
                    })
                  )
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
