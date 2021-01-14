import { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

//Material-UI
import { Paper, Grid, Avatar, TextField } from "@material-ui/core";
import { usePostStyles } from "Assets/Styles/postsStyles";

//components
import RegularSpinner from "Components/spinner/RegularSpinner";
import SnackBar from "Components/SnackBar";
import PreviewImages from "./PreviewImages";
import PaperFooter from "./PaperFooter";

//i18n
import { useTranslation } from "react-i18next";

//Axios
import axios from "axiosConfig";

const AddPost = ({ user }) => {
  // Snackbar
  const initialSnackBarProps = {
    show: false,
    message: "",
    vertical: "top",
    horizontal: "left",
    severity: "error",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [snackBar, setSnackBar] = useState(initialSnackBarProps);
  const { register, handleSubmit, errors } = useForm();
  const classes = usePostStyles();
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
      let { success, message } = res.data;
      if (success) {
        if (message === "Post created") {
          initialSnackBarProps.message = t("post.created");
          initialSnackBarProps.severity = "success";
        } else {
          initialSnackBarProps.message = t("internal.server.error.title");
        }
      } else if (message === "There's a file which extension is not valid") {
        initialSnackBarProps.message = t("files.supported");
      } else if (message === "File too large") {
        initialSnackBarProps.message = t("file.too.large");
      } else {
        initialSnackBarProps.message = t("internal.server.error.title");
      }
      setIsLoading(false);
      setPreviewImages([]);
    } catch (error) {
      setIsLoading(false);
      setPreviewImages([]);
      initialSnackBarProps.message = t("internal.server.error.title");
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
      <Paper className={classes.paper}>
        <RegularSpinner isLoading={isLoading}>
          <form onSubmit={handleSubmit(handleAddPost)}>
            <Grid container>
              <Grid item xs={2} className={classes.avatar}>
                <Avatar src={user?.avatar}>{user?.fistName}</Avatar>
              </Grid>

              <Grid item xs={10}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  label={t("post.add")}
                  name="bodyContent"
                  autoComplete="off"
                  inputRef={register({
                    required: { value: true, message: t("post.add.message") },
                  })}
                  error={Boolean(errors?.bodyContent)}
                />
              </Grid>
              <Grid item xs={12}>
                <div className={previewImages.length > 0 ? classes.root : classes.hideGridList}>
                  {previewImages && (
                    <PreviewImages
                      previewImages={previewImages}
                      handleDeselectImage={handleDeselectImage}
                    />
                  )}
                </div>
              </Grid>
              <Grid item xs={12} className={classes.paperFooter}>
                <PaperFooter register={register} handleFileChange={handleFileChange} />
              </Grid>
            </Grid>
          </form>
        </RegularSpinner>
      </Paper>
      <SnackBar snackBar={snackBar} handleClose={handleClose} />
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.User,
});

export default connect(mapStateToProps)(AddPost);
