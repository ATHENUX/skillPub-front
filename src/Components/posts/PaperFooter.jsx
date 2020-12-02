import React from "react";

//Material-UI
import { Button, Divider, IconButton } from "@material-ui/core";
import { usePostStyles } from "Assets/Styles/postsStyles";
import ImageIcon from "@material-ui/icons/Image";

const PaperFooter = ({ handleFileChange, register }) => {
  const classes = usePostStyles();
  return (
    <div>
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
    </div>
  );
};

export default PaperFooter;
