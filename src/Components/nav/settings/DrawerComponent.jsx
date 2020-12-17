//material-Ui
import { List, Drawer, Divider, ListItem, ListItemText } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useNavbarSetting } from "Assets/Styles/navbarStyles";

const DrawerComponent = ({ select, handleSelect, open, orientation }) => {
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
          <ListItemText primary="Account" />
          <ArrowForwardIosIcon />
        </ListItem>
        <ListItem button selected={select === 1} onClick={() => handleSelect(1)}>
          <ListItemText primary="Language" />
          <ArrowForwardIosIcon />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default DrawerComponent;
