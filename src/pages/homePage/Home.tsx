import React, { useState, useReducer, useEffect } from "react";
import storeItems from "../../data/storeItems.json";
import { Credentials } from "../loginPage/Login";
import classes from "./HomePage.module.css";
import { useAppSelector } from "../../hooks";
import { User } from "../../store/loginSlice";
import { Container } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import slike from "../../data/slike.json";

enum ActionKinds {
  increase = "INCREASE",
  decrease = "DECREASE",
}

interface ActionType {
  type: ActionKinds;
  payload: number;
}

interface CounterType {
  value: number;
}

function reducer(state: CounterType, action: ActionType) {
  switch (action.type) {
    case "INCREASE":
      return {
        ...state,
        value: state.value + action.payload,
      };
    case "DECREASE":
      return {
        ...state,
        value: state.value - action.payload,
      };
    default:
      return state;
  }
}

function Home() {
  // const [loggedUser, setLoggedUser] = useState<Credentials>({} as Credentials);
  const loggedUser = useAppSelector((state) => state.login.username);
  const [state, dispatch] = useReducer(reducer, { value: 0 });

  return (
    <Container sx={{ textAlign: "center" }}>
      <Carousel
        animation="slide"
        interval={4000}
        stopAutoPlayOnHover={true}
        sx={{ marginTop: "2rem" }}
      >
        {slike.map((slika) => (
          <img
            id={slika.id}
            src={slika.src}
            alt={slika.alt}
            style={{
              margin: "auto",
              width: "90%",
              height: "350px",
              objectFit: "cover",
            }}
          />
        ))}
      </Carousel>
      <h1>Welcome {loggedUser} to the main brach!!!</h1>
      <div className={classes.logoImg}>
        <img src="images/storeImg.webp" alt="err" />
      </div>
      {/* <img src={storeItems[0].imgUrl} /> */}
      <div>
        <p>Current value is ${state.value}</p>
        <button
          onClick={() => dispatch({ type: ActionKinds.decrease, payload: 1 })}
        >
          -
        </button>
        <button
          onClick={() => dispatch({ type: ActionKinds.increase, payload: 1 })}
        >
          +
        </button>
      </div>
    </Container>
  );
}

export default Home;
