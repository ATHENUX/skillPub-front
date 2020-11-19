//Material-UI
import { Paper, Grid, Typography, Avatar, TextField, Button, Divider } from "@material-ui/core";

import { usePostStyles } from "Assets/Styles/postsStyles";

const AddPost = () => {
  const classes = usePostStyles();
  return (
    <Paper className={classes.paper} variant="outlined">
      <Grid container>
        <Grid item xs={1}>
          <Avatar>S</Avatar>
        </Grid>
        <Grid item xs={11}>
          <TextField fullWidth variant="outlined" size="small" label="Add a post" />
        </Grid>
        <Grid item xs={12} className={classes.paperFooter}>
          <Divider />
          <Button variant="contained" color="primary">
            post
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddPost;
