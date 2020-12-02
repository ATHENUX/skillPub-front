//material-UI
import { DialogTitle, Dialog, DialogContent, Button } from "@material-ui/core";
import { useSettingsStyles } from "Assets/Styles/settingsStyles";

const DialogAptitudes = ({ aptitudes, onClose, open, addSkills }) => {
  const classes = useSettingsStyles();

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {aptitudes.map((aptitud, id) => (
          <Button
            key={id}
            onClick={() => addSkills(aptitud.name, aptitud._id)}
            variant="contained"
            color={id % 2 ? "primary" : "secondary"}
          >
            {aptitud.name}
          </Button>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default DialogAptitudes;
