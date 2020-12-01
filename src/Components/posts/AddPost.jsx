import { useState } from "react";
//Material-UI
import {
  Paper,
  Grid,
  GridList,
  GridListTile,
  Avatar,
  TextField,
  Button,
  Divider,
  IconButton,
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";

import RegularSpinner from "Components/spinner/RegularSpinner";

import { usePostStyles } from "Assets/Styles/postsStyles";

//Axios
import axios from "axiosConfig";

//react-form
import { useForm } from "react-hook-form";

const AddPost = () => {
  const classes = usePostStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const { register, handleSubmit, errors } = useForm();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

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
      console.log(res.data);
      setIsLoading(false);
      const { success, message, post } = res.data;
      if (success) {
        console.log("Post created in database");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
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
                  error={Boolean(errors?.postBody)}
                />
              </Grid>
              <Grid item xs={12}>
                {previewImages && (
                  <div className={classes.root}>
                    <GridList cellHeight={200} className={classes.gridList} cols={2}>
                      {previewImages.map((selectedImage, index) => (
                        <GridListTile key={index} cols={1}>
                          <img src={selectedImage} alt={selectedImage} />
                        </GridListTile>
                      ))}
                    </GridList>
                  </div>
                )}
              </Grid>

              {/* <Grid container item xs={12} spacing={2} justify="space-evenly">
                {previewImages.map((selectedImage, index) => (
                  <Grid key={index} item xs={6}>
                    <img src={selectedImage} alt={selectedImage} style={{ height: 200 }} />
                  </Grid>
                ))}
              </Grid> */}

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
    </>
  );
};

export default AddPost;
