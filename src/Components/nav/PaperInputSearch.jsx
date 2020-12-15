import { connect } from "react-redux";

//material-UI
import { Popper, Paper, List, Typography } from "@material-ui/core";
import { useNavbarStyles } from "Assets/Styles/navbarStyles";

//components
import UserSearchItem from "./UserSearchItem";

//i18n
import { useTranslation } from "react-i18next";

const PaperInputSearch = ({ anchorEl, searchedUsers }) => {
  const classes = useNavbarStyles();
  const { t } = useTranslation();
  return (
    <Popper
      id="simple-popper"
      placement="bottom-end"
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      className={classes.simplePopper}
    >
      <Paper className={classes.paperInputSearch} variant="outlined">
        <List dense={true}>
          {searchedUsers.length > 0 ? (
            searchedUsers.map((user, index) => <UserSearchItem key={index} user={user} />)
          ) : (
            <div className={classes.noUsers}>
              <Typography variant="body2">{t("no.users")}</Typography>
            </div>
          )}
        </List>
      </Paper>
    </Popper>
  );
};

const mapStateToProps = (state) => ({
  searchedUsers: state.SearchedUsers,
});

export default connect(mapStateToProps)(PaperInputSearch);
