import React from "react";
import { Rating, Button, FormControl, TextField } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import classes from "../pages/aboutPage/About.module.css";

export interface Review {
  comment: string;
  rating: number;
}

interface FormProps {
  onSubmit: (review: Review) => void;
}

function AboutForm({onSubmit}: FormProps) {
  const { handleSubmit, control, reset, formState: {isDirty} } = useForm<Review>({
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const submit: SubmitHandler<Review> = (values) => {
    reset();
    onSubmit(values);
  };
  return (
    <form onSubmit={handleSubmit(submit)}>
      <h2>Give us your thoughts!</h2>
      <FormControl>
        <Controller
          control={control}
          name="comment"
          render={({ field: { onChange, value } }) => (
            <TextField
              multiline
              label="Comment"
              value={value}
              className={classes.textArea}
              rows={2}
              onChange={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="rating"
          render={({ field: { onChange, value } }) => (
            <Rating
              name="simple-controlled"
              value={value}
              className={classes.rating}
              onChange={onChange}
            />
          )}
        />
        <Button
          type="submit"
          fullWidth={false}
          sx={{ width: 50, alignSelf: "end" }}
          disabled={!isDirty}
        >
          Submit
        </Button>
      </FormControl>
    </form>
  );
}

export default AboutForm;
