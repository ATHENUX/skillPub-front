//material-UI
import { CardHeader, Avatar, IconButton, Badge, Typography } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import RepeatIcon from "@material-ui/icons/Repeat";
import { SmallAvatar, usePostStyles } from "Assets/Styles/postsStyles";

const HardHeader = ({
  avatar,
  firstName,
  lastName,
  avatarRepublish,
  firstNameRepublish,
  lastNameRepublish,
  republishedBodyContent,
}) => {
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
              <SmallAvatar alt="Remy Sharp" src={avatarRepublish}>
                {firstNameRepublish?.substring(0, 1)}
              </SmallAvatar>
            }
          >
            <Avatar alt="Travis Howard" src={avatar}>
              {firstName?.substring(0, 1)}
            </Avatar>
          </Badge>
        }
        title={firstName + " " + lastName}
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
            {firstNameRepublish + " " + lastNameRepublish}
          </Typography>
        </div>
        <Typography
          variant="subtitle2"
          className={`${classes.secondUserBody} ${classes.smallText}`}
        >
          {republishedBodyContent}
        </Typography>
      </div>
    </>
  );
};

export default HardHeader;
