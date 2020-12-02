//material-UI
import useCustomStyles from "Assets/Styles/CustomStyles";

//components
import AddPost from "Components/posts/AddPost";

//hooks
import useSEO from "Hooks/useSEO";

const Home = () => {
  const classes = useCustomStyles();

  useSEO({
    title: "Home",
    description: "home information",
  });

  return (
    <div className={classes.main}>
      <div className={classes.middle}>
        <AddPost />
      </div>
    </div>
  );
};

export default Home;
