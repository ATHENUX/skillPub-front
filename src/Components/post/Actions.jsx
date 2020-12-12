//material-UI
import { CardActions, IconButton, Typography } from "@material-ui/core";
import { usePostStyles } from "Assets/Styles/postsStyles";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import TextsmsOutlinedIcon from "@material-ui/icons/TextsmsOutlined";
import OpenInNewRoundedIcon from "@material-ui/icons/OpenInNewRounded";
import BookmarkBorderRoundedIcon from "@material-ui/icons/BookmarkBorderRounded";

const Actions = ({ likes, comments, republishValue, favorites, handleRepublish }) => {
  const classes = usePostStyles();

  return (
    <CardActions className={classes.CardAction}>
      <IconButton aria-label="likes">
        <FavoriteBorderIcon />
        <Typography>{likes}</Typography>
      </IconButton>
      <IconButton aria-label="comments">
        <TextsmsOutlinedIcon />
        <Typography>{comments}</Typography>
      </IconButton>
      <IconButton aria-label="share" onClick={handleRepublish}>
        <OpenInNewRoundedIcon />
        <Typography>{republishValue}</Typography>
      </IconButton>
      <IconButton aria-label="favorite">
        <BookmarkBorderRoundedIcon />
        <Typography>{favorites}</Typography>
      </IconButton>
    </CardActions>
  );
};

export default Actions;
