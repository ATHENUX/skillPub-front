//material-UI
import { Hidden, Card, CardContent } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { useProfileStyles } from "Assets/Styles/profileStyles";

const SkeletonSidebar = ({ isFixed }) => {
  const classes = useProfileStyles();
  return (
    <Hidden xsDown>
      <Skeleton
        variant="circle"
        width={90}
        height={90}
        className={`${classes.skeletonAvatar} ${isFixed ? classes.firstHiddenAvatar : ""} `}
      />

      <Skeleton
        variant="circle"
        width={50}
        height={50}
        className={`${classes.seconSkeletonAvatar} ${
          isFixed ? classes.secondHiddenSkeletonAvatar : ""
        } `}
      />
      <Card className={`${classes.sidebar} ${isFixed ? classes.fixedSidebar : ""} `} elevation={0}>
        <CardContent>
          <Skeleton
            width={90}
            height={40}
            variant="rect"
            className={`${classes.btn} ${classes.borderRadius}`}
          />

          <Skeleton variant="text" width={250} height={30} className={classes.marginTop} />
          {[60, 200, 150, 80, 190, 60, 80, 40].map((width, id) => (
            <Skeleton key={id} variant="text" width={width} />
          ))}

          <Skeleton variant="rect" height={50} />
          <Skeleton variant="text" width={60} />

          <div className={classes.contentSkills}>
            {[60, 100, 140, 80, 130, 60, 80, 60].map((width, id) => (
              <Skeleton
                key={id}
                variant="text"
                height={30}
                width={width}
                className={`${classes.borderRadius} ${classes.marginRight}`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </Hidden>
  );
};

export default SkeletonSidebar;
