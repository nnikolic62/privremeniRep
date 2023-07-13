import { TextField, Paper, Box } from "@mui/material";
import Button from "@mui/material/Button";
import styled from "@mui/material/styles/styled";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import withProgressAndMessages, {
  ProgressAndMessagesProps,
} from "../../components/hoc/withProgressAndMessages";
import classes from "./LoginPage.module.css";
import NewUserDialog from "./NewUserDialog";
import { UserDatabase, useLazyGetUsersQuery } from "../../api/mockApi";
import { Session } from "../../util/Session";
import { useAppDispatch } from "../../hooks";
import { setUser } from "../../store/loginSlice";
import { useTranslation } from "react-i18next";

export interface Credentials {
  username: string;
  password: string;
}

const StyledInput = styled(TextField)(({ theme }) => ({
  width: "350px",
}));

function Login(props: ProgressAndMessagesProps) {
  const {t} = useTranslation();
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [getUsers, getUsersInfo] = useLazyGetUsersQuery();
  const [userError, setUserError] = useState(false);
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    if (username.current?.value === "" || password.current?.value === "") {
      props.setMessage &&
        props.setMessage({
          severity: "error",
          messageContent: "Nisu uneti potrebni kredencijali!",
        });
    } else {
      const response = await getUsers();
      if(response.isSuccess){
        const loggedUser = response.data.find((user) => {
          if(user.username === username.current?.value && user.password === password.current?.value){
            return user;
          }
        });
        if(!loggedUser){
          props.setMessage && props.setMessage({
            messageContent: 'Nije pronadjen korisnik sa unetim kredencijalima',
            severity: 'error'
          })
        }else{
          let session = new Session();
          session.userId = loggedUser.id;
          session.startSession();
          dispatch(setUser({
            user: {
              username: loggedUser.username,
              password: loggedUser.password
            }
          }))
          navigate('/home')
        }
      }
    }
  };

  const handleRegister = () => {
    props.setMessage && props.setMessage({
      messageContent: 'Uspesna registracija!',
      severity: 'success'
    })
    setOpenModal(false);
  }


  return (
    <Box className={classes.container}>
      <img src="images/login.png" />
      <Paper className={classes.loginBox}>
        <h2>Login</h2>
        <StyledInput label="Username" color="secondary" inputRef={username} />
        <StyledInput
          label="Password"
          color="secondary"
          inputRef={password}
          type="password"
        />
        <Button variant="contained" onClick={handleLogin}>
          {t('login')}
        </Button>
        {userError && <p className="center">No user found!</p>}
        <p>
          <a className={classes.link} onClick={() => setOpenModal(true)}>
            No account? Sign in!
          </a>
        </p>
        {openModal && (
          <NewUserDialog open={openModal} onClose={() => setOpenModal(false)} onRegister={handleRegister}/>
        )}
      </Paper>
    </Box>
  );
}

export default withProgressAndMessages(Login);
