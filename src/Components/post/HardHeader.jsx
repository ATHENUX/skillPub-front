//material-UI
import { CardHeader, Avatar, IconButton, Badge, Typography } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import RepeatIcon from "@material-ui/icons/Repeat";
import { SmallAvatar, usePostStyles } from "Assets/Styles/postsStyles";

const HardHeader = () => {
  const classes = usePostStyles();
  return (
    <>
      <CardHeader
        avatar={
          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={
              <SmallAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg">
                M
              </SmallAvatar>
            }
          >
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg">
              J
            </Avatar>
          </Badge>
        }
        title="Juan pablo agudelo"
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      />
      <div className={classes.secondUser}>
        <div className={classes.secondUserTitle}>
          <RepeatIcon className={classes.smallText} />
          <Typography variant="subtitle1" className={classes.smallText}>
            Pepe pepinillo
          </Typography>
        </div>
        <Typography
          variant="subtitle2"
          className={`${classes.secondUserBody} ${classes.smallText}`}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic nostrum dolorem rerum
          incidunt rem vero laboriosam quia consequuntur enim, ratione voluptatem iste? Magni
          blanditiis numquam ad. Quas unde quod provident.
        </Typography>
      </div>
    </>
  );
};

export default HardHeader;
