import { Box, Button, Container, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import AboutForm, { Review } from "../../components/AboutForm";
import ReviewItem from "../../components/ReviewItem";
import classes from "./About.module.css";
import {
  Comment,
  useAddCommentMutation,
  useGetCommentsQuery,
} from "../../api/commentsApi";
import { useAppSelector } from "../../hooks";

const sortReviews = (reviewList: Comment[], ascending: boolean) => {
  const sortedArr = reviewList.slice();
  return sortedArr.sort((reviewA, reviewB) => {
    if (ascending) {
      return reviewA.rating >= reviewB.rating ? 1 : -1;
    } else {
      return reviewA.rating < reviewB.rating ? 1 : -1;
    }
  });
};


function About() {
  const [toggle, setToggle] = useState(false);
  const [reviewList, setReviewList] = useState<Comment[]>([]);
  const username = useAppSelector((state) => state.login.username);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [sendComment] = useAddCommentMutation();
  const { data } = useGetCommentsQuery(undefined, {refetchOnMountOrArgChange: true});

  useEffect(() => {
    setReviewList(data || []);
  }, [data])

  const isAsc = searchParams.get("sort") === "asc";

  const sortedReviews = sortReviews(reviewList, isAsc);

  const handleToggle = () => {
    setToggle(() => !toggle);
  };

  const handleSort = () => {
    navigate({
      pathname: location.pathname,
      search: `?sort=${isAsc ? "desc" : "asc"}`,
    });
  };

  const onSubmit = (review: Review) => {
    let newComment: Comment = {
      text: review.comment,
      rating: review.rating,
      author: username as string,
    }
    sendComment(newComment);
    setReviewList((prevArr) => [...prevArr, newComment]);
  };
  return (
    <Container sx={{ marginTop: "1rem" }}>
      <Box className={classes.container}>
        <Box sx={{ margin: "auto" }}>
          <Button onClick={handleToggle}>Toggle</Button>
          <Button onClick={handleSort}>
            {isAsc ? "Sort Desc" : "Sort Asc"}
          </Button>
        </Box>
        {toggle && (
          <Box>
            <AboutForm onSubmit={onSubmit} />
          </Box>
        )}
        {sortedReviews.map((item) => (
          <ReviewItem key={item.id} {...item} />
        ))}
      </Box>
    </Container>
  );
}

export default About;
