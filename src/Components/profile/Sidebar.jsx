import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";

//material-UI
import {
  Avatar,
  Card,
  CardContent,
  Hidden,
  Typography,
  Divider,
  Button,
  Chip,
} from "@material-ui/core";
import { useProfileStyles } from "Assets/Styles/profileStyles";

//components
import SnackBar from "Components/SnackBar";

//i18n
import { useTranslation } from "react-i18next";

//axios
import axios from "axiosConfig";

const Sidebar = ({ isFixed, user, userLoggedIn }) => {
  const [snackBar, setSnackBar] = useState({
    show: false,
    message: "",
    vertical: "top",
    horizontal: "left",
    severity: "error",
  });
  const [iAmFollowing, setIAmFollowing] = useState(false);
  const classes = useProfileStyles();
  const { t } = useTranslation();

  useEffect(() => {
    const following = userLoggedIn?.following?.find((id) => id === user._id);
    setIAmFollowing(Boolean(following));
  }, [user, userLoggedIn]);

  const handleFollow = async () => {
    const res = await axios.post(
      "/api/follow",
      { id: user._id },
      { headers: { auth: localStorage.getItem("session") } }
    );
    if (res.data.success) {
      setIAmFollowing(true);
    } else {
      setSnackBar({ ...snackBar, show: true, message: t("internal.server.error.title") });
    }
  };

  const handleUnfollow = async () => {
    const res = await axios.post(
      "/api/unfollow",
      { id: user._id },
      { headers: { auth: localStorage.getItem("session") } }
    );
    if (res.data.success) {
      setIAmFollowing(false);
    } else {
      setSnackBar({ ...snackBar, show: true, message: t("internal.server.error.title") });
    }
  };

  const handleCloseSnackBar = () => {
    setSnackBar({ ...snackBar, show: false, severity: "error" });
  };

  return (
    <Hidden mdDown>
      <Avatar
        alt="avatar"
        className={`${classes.large} ${classes.firstAvatar} ${
          isFixed ? classes.firstHiddenAvatar : ""
        } `}
        src={user?.avatar}
      >
        {user?.firstName.substring(0, 1)}
      </Avatar>

      <Avatar
        alt="avatar"
        className={`${classes.secondAvatar} ${isFixed ? classes.secondHiddenAvatar : ""} `}
        src={user?.avatar}
      >
        {user?.firstName.substring(0, 1)}
      </Avatar>

      <Card className={`${classes.sidebar} ${isFixed ? classes.fixedSidebar : ""} `} elevation={0}>
        <CardContent>
          {user?._id !== userLoggedIn?._id && (
            <Button
              color="primary"
              variant="contained"
              className={classes.btn}
              onClick={iAmFollowing ? handleUnfollow : handleFollow}
            >
              {iAmFollowing ? t("unfollow") : t("follow")}
            </Button>
          )}

          <Typography
            variant="h6"
            className={`${classes.marginTop} ${
              user?._id === userLoggedIn?._id ? classes.space : ""
            }`}
          >
            {user.firstName + " " + user.lastName}
          </Typography>
          <div>
            {user?.description && (
              <div>
                <Typography>{t("profile.description")}:</Typography>
                <Typography variant="body1" className={classes.textSize}>
                  {user.description}
                </Typography>
              </div>
            )}

            {user?.phone && (
              <Typography className={classes.text}>
                {t("contact")}:
                <Typography component="strong" color="primary" className={classes.text}>
                  {user?.phone}
                </Typography>
              </Typography>
            )}
          </div>
          <Divider />
          <div className={classes.contentFollowers}>
            <Typography>
              {t("follower")}:
              <Typography component={RouterLink} color="primary" className={classes.text} to="/">
                {user?.follower?.length}
              </Typography>
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography>
              {t("following")}:
              <Typography component={RouterLink} color="primary" className={classes.text} to="/">
                {user?.following?.length}
              </Typography>
            </Typography>
          </div>
          {user?.listOfAptitudes?.length !== 0 && (
            <div>
              <Divider className={classes.marginTop} />
              <Typography>{t("skills")}</Typography>
              <div className={classes.contentSkills}>
                {user?.listOfAptitudes?.map((skill) => (
                  <Chip label={skill.name} key={skill._id} className={classes.skill} />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <SnackBar snackBar={snackBar} handleClose={handleCloseSnackBar} />
    </Hidden>
  );
};

const mapStateToProps = (state) => ({
  userLoggedIn: state.User,
});

export default connect(mapStateToProps)(Sidebar);
