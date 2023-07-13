import React from 'react'
import { Box, Rating, Paper } from "@mui/material";
import { Review } from './AboutForm';
import classes from './ReviewItem.module.css';
import { useAppSelector } from '../hooks';
import { Comment } from '../api/commentsApi';

function ReviewItem({text, rating, author}: Comment) {
  return (
    <Paper elevation={3} component='div' className={classes.container}>
      <Box className={classes.textBox}>
        <h3>{text}</h3>
        <p className={classes.user}>{author}</p>
      </Box>
      <Rating value={rating} readOnly/>
    </Paper>
  )
}

export default ReviewItem
