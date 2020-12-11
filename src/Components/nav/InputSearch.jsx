import { useState } from "react";

//material-UI
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useNavbarStyles } from "Assets/Styles/navbarStyles";

import PaperInputSearch from "./PaperInputSearch";

//i18n
import { useTranslation } from "react-i18next";

const InputSearch = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState("");
  const classes = useNavbarStyles();
  const { t } = useTranslation();

  const handleChange = (e) => {
    setSearchText(e.target.value);
    if (!anchorEl && e.target.value.trim() !== "") {
      setAnchorEl(e.currentTarget);
    } else if (e.target.value.trim() === "") {
      setAnchorEl(null);
    }
  };

  const handleClick = (e) => {
    if (!anchorEl && e.target.value.trim() !== "") {
      setAnchorEl(e.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
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
          value={searchText}
          onChange={handleChange}
          onFocus={handleClick}
          onBlur={handleClose}
        />
        <PaperInputSearch anchorEl={anchorEl} />
      </div>
    </>
  );
};

export default InputSearch;
