import { connect } from "react-redux";

//material-UI
import { Popper, Paper, List } from "@material-ui/core";
import { useNavbarStyles } from "Assets/Styles/navbarStyles";

//components
import UserSearchItem from "./UserSearchItem";

const PaperInputSearch = ({ anchorEl, searchedUsers }) => {
  const classes = useNavbarStyles();
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
          {searchedUsers.length > 0
            ? searchedUsers.map((user, index) => <UserSearchItem key={index} user={user} />)
            : "No users"}
        </List>
      </Paper>
    </Popper>
  );
};

const mapStateToProps = (state) => ({
  searchedUsers: state.SearchedUsers,
});

export default connect(mapStateToProps)(PaperInputSearch);
