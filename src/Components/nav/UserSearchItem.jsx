import { Link } from "react-router-dom";

//material-UI
import { Divider, Avatar, ListItem, ListItemText, ListItemAvatar } from "@material-ui/core";

const UserSearchItem = ({ user }) => {
  return (
    <>
      <ListItem button component={Link} to={`/Profile/${user._id}`}>
        <ListItemAvatar>
          <Avatar src={user?.avatar} alt={`${user.firstName} ${user.lastName}`} />
        </ListItemAvatar>
        <ListItemText
          primary={`${user.firstName} ${user.lastName}`}
          primaryTypographyProps={{
            noWrap: true,
          }}
        />
      </ListItem>
      <Divider />
    </>
  );
};

export default UserSearchItem;
