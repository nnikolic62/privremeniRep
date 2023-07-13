import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { FormEvent, FormEventHandler, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserInterface, useRegisterMutation } from "../../api/mockApi";
import { Session } from "../../util/Session";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { schema } from "../../util/validationSchema";

interface OpenDialog {
  open: boolean;
  onClose: () => void;
  onRegister: () => void;
}

interface NewUserInterface extends UserInterface {
  repeatPassword: string;
}

function NewUserDialog({ open, onClose, onRegister }: OpenDialog) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted, isLoading },
    reset,
  } = useForm<NewUserInterface>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    resolver: yupResolver(schema)
  });

  const [register, registerInfo] = useRegisterMutation();

  if (registerInfo.isSuccess) {
    const session = new Session();
    const userId = registerInfo.data["id"];
    session.userId = userId;
    session.startSession();
    onRegister();
  }

  const submitForm: SubmitHandler<UserInterface> = (values) => {
    register({
      username: values.username,
      password: values.password,
      email: values.email
    })
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm" sx={{ padding: "20px" }}>
      <DialogTitle>
        <IconButton
          sx={{ position: "absolute", top: "10px", right: "3px" }}
          size="medium"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" component="span" fontWeight="bold">
          Registracija korisnika
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit(submitForm)}>
        <DialogContent>
          <Stack direction="column" spacing={2}>
            <Controller
              name="username"
              control={control}
              render={({ field: { onChange, value, ref }, fieldState: {error} }) => (
                <TextField
                  onChange={onChange}
                  inputRef={ref}
                  size="small"
                  placeholder="Korisnicko ime"
                  fullWidth
                  error={error ? true: false}
                  helperText={error?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value, ref }, fieldState: {error} }) => (
                <TextField
                  onChange={onChange}
                  size="small"
                  placeholder="Email adresa"
                  fullWidth
                  inputRef={ref}
                  error={error ? true : false}
                  helperText={error?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value, ref }, fieldState: {error} }) => (
                <TextField
                  size="small"
                  type="password"
                  placeholder="Lozinka"
                  fullWidth
                  onChange={onChange}
                  inputRef={ref}
                  error={error ? true : false}
                  helperText={error?.message}
                />
              )}
            />
            <Controller
              name="repeatPassword"
              control={control}
              render={({ field: { onChange, value,ref }, fieldState: {error} }) => (
                <TextField
                  size="small"
                  type="password"
                  placeholder="Ponovi lozinku"
                  fullWidth
                  onChange={onChange}
                  inputRef={ref}
                  error={error ? true : false}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button type="submit">Regitruj se</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default NewUserDialog;
