import { connect } from "react-redux";
import { useParams } from "react-router-dom";

//material-UI
import { Card, Divider, Button, Hidden } from "@material-ui/core";
import { useProfileStyles } from "Assets/Styles/profileStyles";

//i18n
import { useTranslation } from "react-i18next";

const AppBarProfile = ({ isFixed, user }) => {
  const classes = useProfileStyles();
  const { userID } = useParams();
  const { t } = useTranslation();

  return (
    <Hidden mdDown>
      <Card
        elevation={0}
        className={`${classes.appBarProfile} ${isFixed ? classes.fixedAppBarProfile : ""}`}
      >
        <Button color="primary">{t("posts")}</Button>
        <Divider orientation="vertical" flexItem />
        {user._id === userID && (
          <>
            <Button>{t("edit.profile")}</Button>
            <Divider orientation="vertical" flexItem />
          </>
        )}
        <Button>{t("favorites")}</Button>
      </Card>
    </Hidden>
  );
};

const mapStateToProps = (state) => ({
  user: state.User,
});

export default connect(mapStateToProps)(AppBarProfile);
