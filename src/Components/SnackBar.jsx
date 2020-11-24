//material ui
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const SnackBar = ({ snackBar, handleClose }) => {
  return (
    <Snackbar
      open={snackBar.show}
      anchorOrigin={{
        vertical: snackBar.vertical,
        horizontal: snackBar.horizontal,
      }}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <MuiAlert elevation={6} variant="filled" severity={snackBar.severity}>
        {snackBar.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default SnackBar;
