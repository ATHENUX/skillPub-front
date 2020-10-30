import React from "react";

//material ui
import { Button, Dialog, Link, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, TextField } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";

//i18n
import { useTranslation } from "react-i18next";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Link href="#" onClick={handleClickOpen}>
        {t("recover.account")}
      </Link>

      <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
        <DialogTitle id="alert-dialog-slide-title">{t("forgot.password.two")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("forgot.password")}</DialogContentText>
          <TextField autoFocus margin="dense" id="name" label={t("modal.text")} type="email" fullWidth />
          <LockIcon color="primaryh" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
