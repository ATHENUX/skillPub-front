//material-UI
import useCustomStyles from "Assets/Styles/CustomStyles";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

//components
import AddPost from "Components/addPosts/AddPost";
import Post from "Components/post/Post";

//hooks
import useSEO from "Hooks/useSEO";

const Home = () => {
  const classes = useCustomStyles();
  const theme = useTheme();
  const watch = useMediaQuery(theme.breakpoints.up("sm"));

  useSEO({
    title: "Home",
    description: "home information",
  });

  return (
    <div className={classes.main}>
      <div className={watch ? classes.middle : ""}>
        <AddPost />
        <Post />
      </div>
    </div>
  );
};

export default Home;
