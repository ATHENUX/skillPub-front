import { useEffect, useState } from "react";

//material-UI
import { Card, CardContent, Typography, Divider, Button, Chip } from "@material-ui/core";
import { useSettingsStyles } from "Assets/Styles/settingsStyles";

//components
import DialogAptitudes from "./DialogAptitudes";
import BackdropSpinner from "Components/spinner/BackdropSpinner";
import RegularSpinner from "Components/spinner/RegularSpinner";

//i18n
import { useTranslation } from "react-i18next";

//axios
import axios from "axiosConfig";

const Skills = ({ saveSkills, handleSnackBar }) => {
  const [categories, setCategories] = useState([]);
  const classes = useSettingsStyles();
  const [open, setOpen] = useState(false);
  const [aptitudes, setAptitudes] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isLoadingBackdrop, setIsLoadingBackdrop] = useState(false);
  const [isLoadingRegular, setIsLoadingRegular] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    try {
      setIsLoadingRegular(true);
      (async () => {
        const res = await axios.get("/api/categories");
        if (res.data.success) {
          setCategories(res.data.categories);
        } else {
          handleSnackBar("error", t("internal.server.error.title"));
        }
        setIsLoadingRegular(false);
      })();
    } catch (error) {
      setIsLoadingRegular(false);
      handleSnackBar("error", t("internal.server.error.title"));
    }
  }, [setCategories, handleSnackBar, t]);

  const handleClickOpenDialog = async (id) => {
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
      handleSnackBar("error", t("internal.server.error.title"));
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
      setSkills([...skills, { name, id }]);
    }
  };

  const handleRemoveSkills = (id) => {
    const values = skills.filter((element) => element.id !== id);
    setSkills(values);
  };

  return (
    <>
      <Card elevation={0}>
        <CardContent className={classes.cardContent}>
          <div className={classes.spacingBottom}>
            <Typography>{t("skills")}</Typography>
            <Divider />
          </div>

          <RegularSpinner isLoading={isLoadingRegular}>
            <div className={classes.skillsContent}>
              {categories.map((category, id) => (
                <Button
                  key={id}
                  variant="contained"
                  className={classes.spacing}
                  onClick={() => handleClickOpenDialog(category._id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </RegularSpinner>

          {skills.length !== 0 && (
            <div>
              <div>
                <Typography>{t("added.skills")}</Typography>
                <Divider />
              </div>

              <div>
                {skills.map((skill, id) => (
                  <Chip
                    key={id}
                    className={classes.spacing}
                    label={skill.name}
                    onDelete={() => handleRemoveSkills(skill.id)}
                  />
                ))}
              </div>

              <Button variant="contained" color="primary" onClick={() => saveSkills(skills)}>
                {t("save")}
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
