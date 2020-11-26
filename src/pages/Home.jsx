import { useState } from "react";
import useSEO from "Hooks/useSEO";

//Material ui
import { Button, TextField } from "@material-ui/core";

//styles
import useCustomStyles from "Assets/Styles/CustomStyles";

//i18n
import { useTranslation } from "react-i18next";

import axios from "axiosConfig";
import AddPost from "Components/posts/AddPost";

// const local = navigator.language
//Function component
const Home = () => {
  //const { t, i18n } = useTranslation();
  const [selectedFormData, setSelectedFormData] = useState({
    postBody: "",
    files: null,
  });
  const classes = useCustomStyles();

  useSEO({
    title: "Home",
    description: "home information",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("postBody", selectedFormData.postBody);
    formData.append("files", selectedFormData.files);
    //const res = await axios.post("/api/posts", formData);
  };

  const handleChange = (e) => {
    setSelectedFormData({ ...selectedFormData, postBody: e.target.value });
  };

  const handleFileInputChange = (e) => {
    setSelectedFormData({ ...selectedFormData, files: e.target.files });
  };

  return (
    <div className={classes.main}>
      <div className={classes.middle}>
        <AddPost />
      </div>
    </div>
  );
};

export default Home;
