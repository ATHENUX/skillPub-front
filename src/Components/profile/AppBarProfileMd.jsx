//material-UI
import { Card, Divider, Button, Hidden } from "@material-ui/core";
import { useProfileStyles } from "Assets/Styles/profileStyles";

//i18n
import { useTranslation } from "react-i18next";

const AppBarProfileMd = ({ isFixed }) => {
  const classes = useProfileStyles({ isFixed });
  const { t } = useTranslation();

  return (
    <Hidden lgUp>
      <Card elevation={0} className={`${classes.appBarProfile}`}>
        <Button color="primary">{t("posts")}</Button>
        <Divider orientation="vertical" flexItem />
        <Button>{t("edit.profile")}</Button>
        <Divider orientation="vertical" flexItem />
        <Button>{t("favorites")}</Button>
      </Card>
    </Hidden>
  );
};
export default AppBarProfileMd;
