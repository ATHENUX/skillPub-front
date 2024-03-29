import { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeThemeMode } from "Redux/Reducers/ThemeMode";

//material-UI
import {
  IconButton,
  ListItemText,
  Divider,
  Avatar,
  ListItem,
  ListItemAvatar,
} from "@material-ui/core";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import PanToolIcon from "@material-ui/icons/PanTool";
import SettingsIcon from "@material-ui/icons/Settings";
// import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
// import FeedbackIcon from "@material-ui/icons/Feedback";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { StyledMenuItem, StyledMenu } from "Assets/Styles/navbarStyles";

//components
import Settings from "./Settings";

//i18n
import { useTranslation } from "react-i18next";

const CustomizedMenus = ({ changeThemeMode, mode }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const { t } = useTranslation();

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickTheme = () => {
    changeThemeMode(mode);
    localStorage.setItem("theme", mode);
  };

  const handleLogout = () => {
    localStorage.removeItem("session");
    history.push("/access");
  };

  return (
    <>
      <IconButton onClick={handleClick} color="inherit">
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <StyledMenuItem>
          <ListItem component="div">
            <ListItemAvatar>
              <Avatar>
                <FeedbackIcon fontSize="small" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={t("feed.back")} secondary={t("feed.back.text.secondary")} />
            <ArrowForwardIosIcon />
          </ListItem>
        </StyledMenuItem> */}

        <Divider component="li" />

        <StyledMenuItem onClick={() => setOpen(true)}>
          <ListItem component="div">
            <ListItemAvatar>
              <Avatar>
                <SettingsIcon fontSize="small" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={t("settings")} />
            <AssignmentIcon />
          </ListItem>
        </StyledMenuItem>

        <StyledMenuItem onClick={handleClickTheme}>
          <ListItem component="div">
            <ListItemAvatar>
              <Avatar>
                <EmojiObjectsIcon fontSize="small" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={t("theme")} />
            <Brightness4Icon />
          </ListItem>
        </StyledMenuItem>

        <StyledMenuItem onClick={handleLogout}>
          <ListItem component="div">
            <ListItemAvatar>
              <Avatar>
                <PanToolIcon fontSize="small" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={t("log.out")} />
          </ListItem>
        </StyledMenuItem>
      </StyledMenu>
      <Settings open={open} handleClose={handleCloseDialog} />
    </>
  );
};

const mapStateToProps = (state) => ({
  mode: state.ThemeMode,
});

const mapDispatchToProps = {
  changeThemeMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomizedMenus);
