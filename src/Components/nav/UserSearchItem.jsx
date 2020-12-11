import {
  Divider,
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Close";

const UserSearchItem = () => {
  return (
    <>
      <ListItem button>
        <ListItemAvatar>
          <Avatar
            src="https://lh3.googleusercontent.com/a-/AOh14Gh8p8QUbCIL1ratTG5gv64oCmqwG5aATM5FJfS3Hw=s96-c"
            alt="some"
          />
        </ListItemAvatar>
        <ListItemText
          primary="textosuperlargoparaqueaparexzcanasas"
          primaryTypographyProps={{
            noWrap: true,
          }}
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" size="small">
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};

export default UserSearchItem;
