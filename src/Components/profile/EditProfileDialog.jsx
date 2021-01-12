//import { useState } from "react";
//material-UI
import { Dialog, DialogContent, DialogTitle, Typography, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useProfileStyles } from "Assets/Styles/profileStyles";

//components
import EditBannerPhoto from "./EditBannerPhoto";
import EditProfilePhoto from "./EditProfilePhoto";
import EditProfileForm from "./EditProfileForm";

//i18n
import { useTranslation } from "react-i18next";

const EditProfileDialog = ({ open, handleClose }) => {
  const classes = useProfileStyles();
  const { t } = useTranslation();

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true} scroll="body">
        <DialogTitle>
          <div>
            <Typography variant="h6">{t("edit.profile")}</Typography>
            <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <EditBannerPhoto />
          <EditProfilePhoto />
          <EditProfileForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProfileDialog;
