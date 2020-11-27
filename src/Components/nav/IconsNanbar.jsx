import { Link as RouterLink } from "react-router-dom";
//material ui
import { IconButton, Badge } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import NotificationsIcon from "@material-ui/icons/Notifications";

const IconsNanbar = () => {
  return (
    <>
      <IconButton aria-label="show 4 new mails" color="inherit">
        <MenuBookIcon />
      </IconButton>

      <IconButton aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={4} color="primary">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <IconButton
        aria-label="show 4 new mails"
        color="inherit"
        component={RouterLink}
        to="/Profile"
      >
        <AccountCircleIcon />
      </IconButton>
    </>
  );
};

export default IconsNanbar;
