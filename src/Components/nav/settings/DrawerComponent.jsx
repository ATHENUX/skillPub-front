//material-Ui
import { List, Drawer, Divider, ListItem, ListItemText } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useNavbarSetting } from "Assets/Styles/navbarStyles";

//i18n
import { useTranslation } from "react-i18next";

const DrawerComponent = ({ select, handleSelect, open, orientation }) => {
  const { t } = useTranslation();
  const classes = useNavbarSetting();

  return (
    <Drawer
      className={classes.drawer}
      variant={orientation ? "persistent" : "permanent"}
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
      open={open}
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button selected={select === 0} onClick={() => handleSelect(0)}>
          <ListItemText primary={t("account")} />
          <ArrowForwardIosIcon />
        </ListItem>
        <ListItem button selected={select === 1} onClick={() => handleSelect(1)}>
          <ListItemText primary={t("language")} />
          <ArrowForwardIosIcon />
        </ListItem>
        <ListItem button selected={select === 2} onClick={() => handleSelect(2)}>
          <ListItemText primary={t("change.password")} />
          <ArrowForwardIosIcon />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default DrawerComponent;
