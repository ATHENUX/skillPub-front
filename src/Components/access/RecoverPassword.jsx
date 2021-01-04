import { useState, forwardRef } from "react";

//material-UI
import {
  Button,
  Dialog,
  Link,
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
import Alert from "@material-ui/lab/Alert";

//i18n
import { useTranslation } from "react-i18next";

//axios
import axios from "axiosConfig";

const newTransition = (props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
};

const Transition = forwardRef(newTransition);

const AlertDialogSlide = () => {
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    severity: "error",
  });

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
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

  const sendEmail = async () => {
    if (email !== "") {
      const res = await axios.post("/api/sendEmail", { email });

      const { success, message } = res.data;

      if (success) {
        setAlert({
          message: t("check.email"),
          show: true,
          severity: "success",
        });
      } else {
        if (message === "Email not found") {
          setAlert({
            message: t("email.message.error"),
            show: true,
            severity: "error",
          });
        }
      }
    } else {
      setAlert({
        message: t("email.message.error.input.required"),
        show: true,
        severity: "error",
      });
    }
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
              name="email"
              label={t("modal.text")}
              autoFocus
              margin="dense"
              variant="outlined"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button onClick={sendEmail} variant="contained" color="primary">
              {t("send.email")}
            </Button>
          </form>
        </div>
        {alert.show && <Alert severity={alert.severity}>{alert.message}</Alert>}
      </Dialog>
    </>
  );
};
export default AlertDialogSlide;
