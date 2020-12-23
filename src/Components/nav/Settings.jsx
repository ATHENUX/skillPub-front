//material-UI
import { Dialog } from "@material-ui/core";

//components
import Sidebar from "Components/nav/settings/Sidebar";

const Settings = ({ open, handleClose }) => {
  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <Sidebar handleClose={handleClose} />
    </Dialog>
  );
};

export default Settings;
