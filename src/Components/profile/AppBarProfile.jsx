//material ui
import { Card, Divider, Button } from "@material-ui/core";
import { useProfileStyles } from "Assets/Styles/profileStyles";

const AppBarProfile = ({ isFixed }) => {
  const classes = useProfileStyles();

  return (
    <Card
      elevation={0}
      className={`${classes.appBarProfile} ${isFixed ? classes.fixedAppBarProfile : ""}`}
    >
      <Button color="primary">posts</Button>
      <Divider orientation="vertical" flexItem />
      <Button>Edit profile</Button>
      <Divider orientation="vertical" flexItem />
      <Button>favorites</Button>
    </Card>
  );
};

export default AppBarProfile;
