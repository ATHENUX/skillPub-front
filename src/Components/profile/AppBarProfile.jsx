//material ui
import { Card, Divider, Button } from "@material-ui/core";
import { useProfileStyles } from "Assets/Styles/profileStyles";

//i18n
import { useTranslation } from "react-i18next";

const AppBarProfile = ({ isFixed }) => {
  const classes = useProfileStyles();
  const { t } = useTranslation();

  return (
    <Card
      elevation={0}
      className={`${classes.appBarProfile} ${isFixed ? classes.fixedAppBarProfile : ""}`}
    >
      <Button color="primary">{t("posts")}</Button>
      <Divider orientation="vertical" flexItem />
      <Button>{t("edit.profile")}</Button>
      <Divider orientation="vertical" flexItem />
      <Button>{t("favorites")}</Button>
    </Card>
  );
};

export default AppBarProfile;
