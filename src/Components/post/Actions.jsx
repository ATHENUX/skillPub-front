//material-UI
import { CardActions, IconButton, Typography } from "@material-ui/core";
import { usePostStyles } from "Assets/Styles/postsStyles";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import TextsmsOutlinedIcon from "@material-ui/icons/TextsmsOutlined";
import OpenInNewRoundedIcon from "@material-ui/icons/OpenInNewRounded";
import BookmarkBorderRoundedIcon from "@material-ui/icons/BookmarkBorderRounded";

const Actions = () => {
  const classes = usePostStyles();

  return (
    <CardActions className={classes.CardAction}>
      <IconButton aria-label="favorite">
        <FavoriteBorderIcon />
        <Typography>22k</Typography>
      </IconButton>
      <IconButton aria-label="favorite">
        <TextsmsOutlinedIcon />
        <Typography>250</Typography>
      </IconButton>
      <IconButton aria-label="favorite">
        <OpenInNewRoundedIcon />
        <Typography>1200</Typography>
      </IconButton>
      <IconButton aria-label="favorite">
        <BookmarkBorderRoundedIcon />
        <Typography>5</Typography>
      </IconButton>
    </CardActions>
  );
};

export default Actions;
