//material-UI
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

const UserSearchItem = ({ user }) => {
  return (
    <>
      <ListItem button>
        <ListItemAvatar>
          <Avatar src={user?.avatar} alt={`${user.firstName} ${user.lastName}`} />
        </ListItemAvatar>
        <ListItemText
          primary={`${user.firstName} ${user.lastName}`}
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
