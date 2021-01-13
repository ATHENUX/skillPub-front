//material-UI
import { CardActions, IconButton } from "@material-ui/core";
import { usePostStyles } from "Assets/Styles/postsStyles";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
//import TextsmsOutlinedIcon from "@material-ui/icons/TextsmsOutlined";
import OpenInNewRoundedIcon from "@material-ui/icons/OpenInNewRounded";
//import BookmarkBorderRoundedIcon from "@material-ui/icons/BookmarkBorderRounded";
import FavoriteIcon from "@material-ui/icons/Favorite";

const Actions = ({ liked, handleRepublish, handleLike, handleDislike }) => {
  const classes = usePostStyles();

  return (
    <CardActions className={classes.CardAction}>
      {!liked ? (
        <IconButton aria-label="likes" onClick={handleLike}>
          <FavoriteBorderIcon />
        </IconButton>
      ) : (
        <IconButton aria-label="likes" onClick={handleDislike}>
          <FavoriteIcon />
        </IconButton>
      )}

      {/* <IconButton aria-label="comments">
        <TextsmsOutlinedIcon />
        <Typography>{comments}</Typography>
      </IconButton> */}
      <IconButton aria-label="share" onClick={handleRepublish}>
        <OpenInNewRoundedIcon />
      </IconButton>
      {/* <IconButton aria-label="favorite">
        <BookmarkBorderRoundedIcon />
        <Typography>{favorites}</Typography>
      </IconButton> */}
    </CardActions>
  );
};

export default Actions;
