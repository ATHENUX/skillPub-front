import { useState, forwardRef } from "react";

//material-UI
import {
  Button,
  Dialog,
  Link,
  DialogContent,
  Slide,
  TextField,
  IconButton,
  useMediaQuery,
  Typography,
  DialogTitle,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import CloseIcon from "@material-ui/icons/Close";
import { useAccessStyle } from "Assets/Styles/accessStyles";
import { useTheme } from "@material-ui/core/styles";

//i18n
import { useTranslation } from "react-i18next";

const newTransition = (props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
};

const Transition = forwardRef(newTransition);

const AlertDialogSlide = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const classes = useAccessStyle();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

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

      <Dialog
        open={open}
        TransitionComponent={Transition}
        fullScreen={fullScreen}
        keepMounted
        maxWidth="xl"
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div className={classes.modalContainer}>
          <DialogTitle
            onClose={handleClose}
            disableTypography
            className={classes.diealogRecoverPassword}
          >
            <Typography variant="h6">{t("forgot.password")}</Typography>
            {handleClose ? (
              <IconButton aria-label="close" className={classes.btn} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            ) : null}
          </DialogTitle>
          <LockIcon color="primary" className={classes.iconModal} />
          <form className={classes.formStyleRecoverPassword}>
            <TextField
              type="email"
              label={t("modal.text")}
              autoFocus
              margin="dense"
              variant="outlined"
              size="small"
            />
          </form>
          <DialogContent>
            <Button variant="contained" color="primary">
              {t("send.email")}
            </Button>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
};
export default AlertDialogSlide;
