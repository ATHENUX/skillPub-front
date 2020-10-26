//material ui
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

//styles
import { useNavbarStyles } from "Assets/Styles/navbarStyles";

//i18n
import { useTranslation } from "react-i18next";

const InputSearch = () => {
  const classes = useNavbarStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder={t("search")}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
};

export default InputSearch;
