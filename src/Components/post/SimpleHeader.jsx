//material-UI
import { CardHeader, Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const SimpleHeader = () => {
  return (
    <CardHeader
      avatar={<Avatar>J</Avatar>}
      title="Juan pablo agudelo"
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
    />
  );
};

export default SimpleHeader;
