import { useState } from "react";
//Material-UI
import {
  Paper,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  Avatar,
  TextField,
  Button,
  Divider,
  IconButton,
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import CloseIcon from "@material-ui/icons/Close";

import RegularSpinner from "Components/spinner/RegularSpinner";
import SnackBar from "Components/SnackBar";

import { usePostStyles } from "Assets/Styles/postsStyles";

//Axios
import axios from "axiosConfig";

//react-form
import { useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";

const AddPost = () => {
  const classes = usePostStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  // Snackbar
  const initialSnackBarProps = {
    show: false,
    message: "",
    vertical: "top",
    horizontal: "left",
    severity: "error",
  };
  const [snackBar, setSnackBar] = useState(initialSnackBarProps);
  const { register, handleSubmit, errors } = useForm();

  const { t } = useTranslation();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length < 6) {
      Promise.all(
        files.map((file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener("load", (ev) => {
              resolve(ev.target.result);
            });
            reader.addEventListener("error", reject);
            reader.readAsDataURL(file);
          });
        })
      )
        .then((images) => setPreviewImages(images))
        .catch((error) => console.log(error));
    } else {
      initialSnackBarProps.message = t("maximum.files.supported");
      initialSnackBarProps.severity = "info";
      setSnackBar({
        ...initialSnackBarProps,
        show: true,
      });
    }
  };

  const handleDeselectImage = (selectedImage) => {
    const imageIndex = previewImages.indexOf(selectedImage);
    const newPreviewImages = previewImages;
    newPreviewImages.splice(imageIndex, 1);
    setPreviewImages([...newPreviewImages]);
  };

  const handleAddPost = async (data) => {
    let formData = new FormData();
    const { bodyContent, files } = data;
    formData.append("bodyContent", bodyContent);
    Array.from(files).forEach((file) => {
      formData.append("files[]", file);
    });
    let config = {
      headers: {
        auth: localStorage.getItem("session"),
      },
    };
    try {
      setIsLoading(true);
      const res = await axios.post("/api/posts", formData, config);
      let { success, message, post } = res.data;
      if (success) {
        const secondRes = await axios.put("/api/updatePostList", { _id: post._id }, config);
        success = secondRes.data.success;
        message = secondRes.data.message;
        if (message === "Pushed post list") {
          initialSnackBarProps.message = t("post.created");
          initialSnackBarProps.severity = "success";
        } else {
          initialSnackBarProps.message = t("password.message.error");
        }
      } else if (message === "There's a file which extension is not valid") {
        initialSnackBarProps.message = t("files.supported");
      } else if (message === "File too large") {
        initialSnackBarProps.message = t("file.too.large");
      } else {
        initialSnackBarProps.message = t("password.message.error");
      }
      setIsLoading(false);
      setPreviewImages([]);
    } catch (error) {
      setIsLoading(false);
      setPreviewImages([]);
      initialSnackBarProps.message = t("internal.server.error.title");
      console.log(error.message);
    }
    setSnackBar({
      ...initialSnackBarProps,
      show: true,
    });
  };

  const handleClose = () => {
    setSnackBar(initialSnackBarProps);
  };
  return (
    <>
      <Paper className={classes.paper} variant="outlined">
        <RegularSpinner isLoading={isLoading}>
          <form onSubmit={handleSubmit(handleAddPost)}>
            <Grid container>
              <Grid item xs={1}>
                <Avatar>S</Avatar>
              </Grid>

              <Grid item xs={11}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  label="Add a post"
                  name="bodyContent"
                  autoComplete="off"
                  inputRef={register({
                    required: { value: true, message: "Post body is required" },
                  })}
                  error={Boolean(errors?.bodyContent)}
                />
              </Grid>
              <Grid item xs={12}>
                <div className={previewImages.length > 0 ? classes.root : classes.hideGridList}>
                  {previewImages && (
                    <GridList cellHeight={200} cols={2} className={classes.gridList}>
                      {previewImages.map((selectedImage, index) => (
                        <GridListTile key={index} cols={1}>
                          <img src={selectedImage} alt={selectedImage} />
                          <GridListTileBar
                            actionPosition="right"
                            titlePosition="top"
                            className={classes.titleBar}
                            actionIcon={
                              <IconButton
                                className={classes.closeIcon}
                                size="small"
                                onClick={() => handleDeselectImage(selectedImage)}
                              >
                                <CloseIcon fontSize="inherit" />
                              </IconButton>
                            }
                          />
                        </GridListTile>
                      ))}
                    </GridList>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} className={classes.paperFooter}>
                <Divider />
                <div className={classes.postButtons}>
                  <div>
                    <input
                      accept="image/*"
                      multiple
                      className={classes.input}
                      id="icon-button-file"
                      name="files"
                      type="file"
                      ref={register}
                      onChange={handleFileChange}
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton color="inherit" aria-label="upload picture" component="span">
                        <ImageIcon />
                      </IconButton>
                    </label>
                  </div>
                  <div>
                    <Button variant="contained" color="primary" type="submit">
                      post
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </form>
        </RegularSpinner>
      </Paper>
      <SnackBar snackBar={snackBar} handleClose={handleClose} />
    </>
  );
};

export default AddPost;
