import { useState } from "react";
import { connect } from "react-redux";
import { updateByField } from "Redux/Reducers/User";
//material-UI
import { IconButton, Typography, Avatar, Button } from "@material-ui/core";
import { useProfileStyles } from "Assets/Styles/profileStyles";
import EditIcon from "@material-ui/icons/Edit";

//components
import SnackBar from "Components/SnackBar";

//i18n
import { useTranslation } from "react-i18next";

//axios
import axios from "axiosConfig";

const EditProfilePhoto = ({ user, updateByField }) => {
  const initialSnackBarProps = {
    show: false,
    message: "",
    vertical: "top",
    horizontal: "left",
    severity: "error",
  };
  const [profilePhoto, setProfilePhoto] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackBar, setSnackBar] = useState(initialSnackBarProps);
  const classes = useProfileStyles();
  const { t } = useTranslation();

  const handleFileInputChange = (e) => {
    const newFile = e.target.files[0];
    const reader = new FileReader();
    if (newFile) {
      setFile(newFile);
      reader.readAsDataURL(newFile);
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file !== "") {
      try {
        setLoading(true);
        const profPhoto = new FormData();
        profPhoto.append("profilePhoto", file);
        let config = {
          headers: {
            auth: localStorage.getItem("session"),
          },
        };
        const res = await axios.put("/api/updateProfilePhoto", profPhoto, config);
        const { success, message, userUpdated } = res.data;
        if (success) {
          if (message === "Successfully added avatar") {
            initialSnackBarProps.severity = "success";
            initialSnackBarProps.message = t("successfully.added.profilePhoto");
          } else if (message === "Successfully updated profile photo") {
            initialSnackBarProps.severity = "success";
            initialSnackBarProps.message = t("successfully.updated.profilePhoto");
          }
          updateByField({
            avatar: userUpdated.avatar,
          });
        } else {
          if (message === "File too large") {
            initialSnackBarProps.message = t("file.too.large");
          } else if (message === "Error while uploading image to cloudinary") {
            initialSnackBarProps.message = t("image.upload.failed");
          } else if (message === "Invalid extension") {
            initialSnackBarProps.message = t("invalid.extension");
          } else if (message === "Profile picture taken either from Google or Facebook") {
            initialSnackBarProps.severity = "info";
            initialSnackBarProps.message = t("profilePhoto.google.facebook");
          } else {
            initialSnackBarProps.message = t("internal.server.error.title");
          }
        }
        setSnackBar({
          ...initialSnackBarProps,
          show: true,
        });
        setLoading(false);
        if (userUpdated) {
          setProfilePhoto(user.avatar);
          updateByField({
            avatar: userUpdated.avatar,
          });
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  const handleClose = () => {
    setSnackBar(initialSnackBarProps);
  };

  return (
    <>
      <SnackBar snackBar={snackBar} handleClose={handleClose} />
      <div className={classes.photosContainer}>
        <form onSubmit={handleSubmit}>
          <div className={classes.positioningContainer}>
            <Typography variant="h6" align="center" gutterBottom>
              {t("profile.photo")}
            </Typography>
            {!profilePhoto ? (
              <Avatar className={classes.large} src={user.avatar} alt="profile-picture" />
            ) : (
              <Avatar className={classes.large} src={profilePhoto} alt="selected-profile-picture" />
            )}

            <div className={classes.editProfileButton}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="icon-button-file-profile"
                type="file"
                name="profile"
                onChange={handleFileInputChange}
              />
              <label htmlFor="icon-button-file-profile">
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <EditIcon />
                </IconButton>
              </label>
            </div>
          </div>
          <div style={{ margin: 10 }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              type="submit"
              disabled={loading}
            >
              {!loading ? t("save") : t("saving")}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({ user: state.User });

const mapDispatchToProps = {
  updateByField,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePhoto);
