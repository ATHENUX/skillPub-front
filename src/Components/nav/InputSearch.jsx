import { useState } from "react";
import { connect } from "react-redux";
import { setSearchedUsers } from "Redux/Reducers/SearchedUsers";

//material-UI
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useNavbarStyles } from "Assets/Styles/navbarStyles";

//components
import PaperInputSearch from "./PaperInputSearch";

//i18n
import { useTranslation } from "react-i18next";

//axios
import axios from "axiosConfig";

const InputSearch = ({ setSearchedUsers }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useNavbarStyles();
  const { t } = useTranslation();

  const handleChange = async (e) => {
    if (!anchorEl && e.target.value.trim() !== "") {
      setAnchorEl(e.currentTarget);
      try {
        const res = await axios.post(`/api/searchByUser`, {
          name: e.target.value,
        });
        let { success, users } = res.data;
        if (success) {
          setSearchedUsers(users);
        }
      } catch (error) {
        console.log(error);
      }
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
          onChange={handleChange}
          onFocus={handleClick}
          onBlur={handleClose}
        />
        {anchorEl && <PaperInputSearch anchorEl={anchorEl} />}
      </div>
    </>
  );
};

const mapDispatchToProps = {
  setSearchedUsers,
};

export default connect(null, mapDispatchToProps)(InputSearch);
