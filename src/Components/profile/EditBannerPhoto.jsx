import { useState } from "react";
import { connect } from "react-redux";
import { updateByField } from "Redux/Reducers/User";

//material-UI
import { IconButton, Typography, Button } from "@material-ui/core";
import { useProfileStyles } from "Assets/Styles/profileStyles";
import EditIcon from "@material-ui/icons/Edit";
import { Image } from "cloudinary-react";

import { useTheme } from "@material-ui/core";

//components
import { Cropper } from "react-cropper";
import SnackBar from "Components/SnackBar";
import "cropperjs/dist/cropper.css";

//i18n
import { useTranslation } from "react-i18next";
//axios
import axios from "axiosConfig";

const EditBannerPhoto = ({ user, updateByField }) => {
  const initialSnackBarProps = {
    show: false,
    message: "",
    vertical: "top",
    horizontal: "left",
    severity: "error",
  };

  const [bannerPhoto, setBannerPhoto] = useState("");
  const [photo, setPhoto] = useState(user.banner);
  const [cropper, setCropper] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [snackBar, setSnackBar] = useState(initialSnackBarProps);
  const { t } = useTranslation();
  const classes = useProfileStyles();
  const theme = useTheme();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBannerPhoto(reader.result);
        setPhoto("");
      };
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (cropper) {
      cropper.getCroppedCanvas().toBlob(async (blob) => {
        const banner = new FormData();
        let croppedfile = new File([blob], selectedImage.name, { type: blob.type });
        banner.append("banner", croppedfile);
        let config = {
          headers: {
            auth: localStorage.getItem("session"),
          },
        };
        try {
          setLoading(true);
          const res = await axios.put("/api/updateBanner", banner, config);
          const { success, message, userUpdated } = res.data;
          if (success) {
            if (message === "Successfully added banner") {
              initialSnackBarProps.severity = "success";
              initialSnackBarProps.message = t("successfully.added.banner");
            } else if (message === "Successfully updated banner") {
              initialSnackBarProps.severity = "success";
              initialSnackBarProps.message = t("successfully.updated.banner");
            }
          } else {
            if (message === "Error while uploading image to cloudinary") {
              initialSnackBarProps.message = t("image.upload.failed");
            } else if (message === "File too large") {
              initialSnackBarProps.message = t("file.too.large");
            } else {
              initialSnackBarProps.message = t("internal.server.error.title");
            }
          }
          setSnackBar({
            ...initialSnackBarProps,
            show: true,
          });
          setLoading(false);
          setPhoto(userUpdated.banner);
          updateByField({
            banner: userUpdated.banner,
          });
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      });
    }
  };

  const handleClose = () => {
    setSnackBar(initialSnackBarProps);
  };
  return (
    <>
      <SnackBar snackBar={snackBar} handleClose={handleClose} />
      <div className={classes.photosContainer}>
        <div className={classes.positioningContainer}>
          <Typography variant="h6" align="center" gutterBottom>
            {t("banner.photo")}
          </Typography>
          <form onSubmit={handleSave}>
            {photo ? (
              <Image
                publicId={photo}
                cloudName={process.env.REACT_APP_CLOUD_NAME || "dmv4ug7sg"}
                className={classes.bannerPhoto}
              />
            ) : bannerPhoto ? (
              <>
                <Cropper
                  src={bannerPhoto}
                  className={classes.bannerPhoto}
                  initialAspectRatio={1}
                  viewMode={3}
                  dragMode="move"
                  guides={false}
                  minCropBoxHeight={200}
                  minCropBoxWidth={500}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false}
                  onInitialized={(instance) => setCropper(instance)}
                />
              </>
            ) : (
              <div
                className={classes.fakeBannerSkeleton}
                style={{ backgroundColor: theme.palette.background.default }}
              />
            )}
            <div className={classes.editPhotosButton}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="icon-button-file-banner"
                type="file"
                name="banner"
                onChange={handleFileInputChange}
              />
              <label htmlFor="icon-button-file-banner">
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <EditIcon />
                </IconButton>
              </label>
            </div>
            <div className={classes.saveButtons}>
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
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.User,
});

const mapDispatchToProps = {
  updateByField,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBannerPhoto);
