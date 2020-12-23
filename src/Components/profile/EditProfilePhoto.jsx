import { useState } from "react";
import { connect } from "react-redux";
//material-UI
import { IconButton, Typography, Avatar, Button } from "@material-ui/core";
import { useProfileStyles } from "Assets/Styles/profileStyles";
import EditIcon from "@material-ui/icons/Edit";

const EditProfilePhoto = ({ user }) => {
  const [profilePhoto, setProfilePhoto] = useState("");
  const classes = useProfileStyles();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
    }
  };
  return (
    <div className={classes.photosContainer}>
      <form>
        <div className={classes.positioningContainer}>
          <Typography variant="h6" align="center" gutterBottom>
            Profile Photo
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
          <Button variant="contained" color="primary" size="small">
            save
          </Button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.User });

export default connect(mapStateToProps)(EditProfilePhoto);
