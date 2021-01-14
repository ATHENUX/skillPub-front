import { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

//material-UI
import { Card, Divider, Button, Hidden } from "@material-ui/core";
import { useProfileStyles } from "Assets/Styles/profileStyles";

//components
import EditProfileDialog from "./EditProfileDialog";

//i18n
import { useTranslation } from "react-i18next";

const AppBarProfileMd = ({ isFixed, user }) => {
  const classes = useProfileStyles({ isFixed });
  const { userID } = useParams();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Hidden lgUp>
      <Card elevation={0} className={`${classes.appBarProfile}`}>
        <Button color="primary">{t("posts")}</Button>
        <Divider orientation="vertical" flexItem />
        {user._id === userID && (
          <>
            <Button onClick={handleClick}>{t("edit.profile")}</Button>
            <Divider orientation="vertical" flexItem />
          </>
        )}
        {/* <Button>{t("favorites")}</Button> */}
      </Card>
      <EditProfileDialog open={open} handleClose={handleClose} />
    </Hidden>
  );
};

const mapStateToProps = (state) => ({
  user: state.User,
});

export default connect(mapStateToProps)(AppBarProfileMd);
