import { Grid, Container } from "@mui/material";
import React from "react";
import StoreItem from "../components/StoreItem";
import storeItems from "../data/storeItems.json";

function Store() {
  return (
    <Container sx={{marginTop: '1rem'}}>
      <Grid container spacing={2}>
        {storeItems.map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item.id}>
            <StoreItem {...item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Store;
