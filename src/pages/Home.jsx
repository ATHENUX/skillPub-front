import useSEO from "Hooks/useSEO";

//styles
import useCustomStyles from "Assets/Styles/CustomStyles";

//i18n
//import { useTranslation } from "react-i18next";

import AddPost from "Components/posts/AddPost";

// const local = navigator.language
//Function component
const Home = () => {
  //const { t, i18n } = useTranslation()
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
