import { useState, forwardRef } from "react";

//material ui
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
  DialogTitle as MuiDialogTitle,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import CloseIcon from "@material-ui/icons/Close";
import { useAccessStyleTheme } from "Assets/Styles/accessStyles";
import { withStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";

//i18n
import { useTranslation } from "react-i18next";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const newTransition = (props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
};

const Transition = forwardRef(newTransition);

const AlertDialogSlide = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const classes = useAccessStyleTheme();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

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
          <DialogTitle id="alert-dialog-slide-title" onClose={handleClose}>
            {t("forgot.password")}
          </DialogTitle>
          <LockIcon color="primary" className={classes.iconModal} />
          <form className={classes.formStyle} style={{ width: "100%" }}>
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
