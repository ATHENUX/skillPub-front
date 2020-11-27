import { Link as RouterLink } from "react-router-dom";

//material ui
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

const Sidebar = ({ isFixed }) => {
  const classes = useProfileStyles();

  return (
    <Hidden xsDown>
      <Avatar
        alt="avatar"
        className={`${classes.large} ${classes.firstAvatar} ${
          isFixed ? classes.firstHiddenAvatar : ""
        } `}
        src="https://i.pinimg.com/originals/89/34/fe/8934fe9034e62c3f9ef4f02eea2c56ab.png"
      />

      <Avatar
        alt="avatar"
        className={`${classes.secondAvatar} ${isFixed ? classes.secondHiddenAvatar : ""} `}
        src="https://i.pinimg.com/originals/89/34/fe/8934fe9034e62c3f9ef4f02eea2c56ab.png"
      />
      <Card className={`${classes.sidebar} ${isFixed ? classes.fixedSidebar : ""} `} elevation={0}>
        <CardContent>
          <Button color="primary" variant="contained" className={classes.btn}>
            Follow
          </Button>

          <Typography variant="h6" className={classes.marginTop}>
            Juan Pablo Agudelo Castro
          </Typography>

          <div>
            <Typography>Profile description:</Typography>
            <Typography variant="body1" className={classes.textSize}>
              This is the profile's description
            </Typography>
            <Typography className={classes.text}>
              Contact:
              <Typography component="strong" color="primary" className={classes.text}>
                3445453453454
              </Typography>
            </Typography>

            <Typography className={classes.text}>
              Address:
              <Typography component="strong" color="primary" className={classes.text}>
                Carrera 344 # 344- 544
              </Typography>
            </Typography>
          </div>
          <Divider />

          <div className={classes.contentFollowers}>
            <Typography>
              Follower:
              <Typography component={RouterLink} color="primary" className={classes.text} to="/">
                123K
              </Typography>
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography>
              Following:
              <Typography component={RouterLink} color="primary" className={classes.text} to="/">
                100k
              </Typography>
            </Typography>
          </div>

          <div>
            <Divider className={classes.marginTop} />
            <Typography>Skills</Typography>
            <div className={classes.contentSkills}>
              <Chip label="python" className={classes.skill} />
              <Chip label="react" className={classes.skill} />
              <Chip label="laravel" className={classes.skill} />
              <Chip label="javascript" className={classes.skill} />
              <Chip label="go" className={classes.skill} />
              <Chip label="C" className={classes.skill} />
            </div>
          </div>
        </CardContent>
      </Card>
    </Hidden>
  );
};

export default Sidebar;
