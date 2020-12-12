//material-UI
import { CardHeader, Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const SimpleHeader = ({ avatar, firstName, lastName }) => {
  return (
    <CardHeader
      avatar={<Avatar src={avatar}>{firstName?.substring(0, 1)}</Avatar>}
      title={firstName + " " + lastName}
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
    />
  );
};

export default SimpleHeader;
