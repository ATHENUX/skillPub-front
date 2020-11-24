import { useEffect, useState } from "react";

//materiaL UI
import { Card, CardContent, Typography, Divider, Button, Chip } from "@material-ui/core";
import { useSettingsStyles } from "Assets/Styles/settingsStyles";

//components
import DialogAptitudes from "./DialogAptitudes";
import BackdropSpinner from "Components/spinner/BackdropSpinner";
import RegularSpinner from "Components/spinner/RegularSpinner";

//axios
import axios from "axiosConfig";

const Skills = ({ saveSkills }) => {
  const [categories, setCategories] = useState([]);
  const classes = useSettingsStyles();
  const [open, setOpen] = useState(false);
  const [aptitudes, setAptitudes] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isLoadingBackdrop, setIsLoadingBackdrop] = useState(false);
  const [isLoadingRegular, setIsLoadingRegular] = useState(false);

  useEffect(() => {
    setIsLoadingRegular(true);
    (async () => {
      const res = await axios.get("/api/categories");
      if (res.data.success) {
        setCategories(res.data.categories);
      } else {
        console.error("error");
      }
      setIsLoadingRegular(false);
    })();
  }, [setCategories]);

  const handleClickOpen = async (id) => {
    try {
      setIsLoadingBackdrop(true);
      const res = await axios.post(
        "/api/aptitudes",
        { idCategorie: id },
        { headers: { auth: localStorage.getItem("session") } }
      );
      if (res.data.success) {
        setAptitudes(res.data.aptitudes);
      }
    } catch (error) {
      console.log("error: ", error);
    }
    setIsLoadingBackdrop(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddSkills = (name, id) => {
    const validate = skills.find((element) => element.id === id);

    if (validate === undefined) {
      const add = skills;
      add.push({ name, id });
      setSkills(add);
    }
  };

  const handleDeleteSkills = (id) => {
    const values = skills.filter((element) => element.id !== id);
    setSkills(values);
  };

  return (
    <>
      <Card elevation={0}>
        <CardContent className={classes.cardContent}>
          <div>
            <Typography>Skills</Typography>
            <Divider />
          </div>
          <RegularSpinner isLoading={isLoadingRegular}>
            <div className={classes.skillsContent}>
              {categories.map((category, id) => (
                <Button
                  key={id}
                  variant="contained"
                  className={classes.skills}
                  onClick={() => handleClickOpen(category._id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </RegularSpinner>

          {skills.length !== 0 && (
            <div>
              <div>
                <Typography>Added skills</Typography>
                <Divider />
              </div>

              <div>
                {skills.map((skill, id) => (
                  <Chip
                    key={id}
                    className={classes.skills}
                    label={skill.name}
                    onDelete={() => handleDeleteSkills(skill.id)}
                  />
                ))}
              </div>

              <Button variant="contained" color="primary" onClick={() => saveSkills(skills)}>
                save
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <BackdropSpinner isLoading={isLoadingBackdrop} />
      <DialogAptitudes
        aptitudes={aptitudes}
        addSkills={handleAddSkills}
        open={open}
        onClose={handleClose}
      />
    </>
  );
};

export default Skills;
