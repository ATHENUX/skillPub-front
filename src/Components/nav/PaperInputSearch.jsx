import { Popper, Paper, List } from "@material-ui/core";

import UserSearchItem from "./UserSearchItem";

import { useNavbarStyles } from "Assets/Styles/navbarStyles";

const PaperInputSearch = ({ anchorEl }) => {
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
          <UserSearchItem />
        </List>
      </Paper>
    </Popper>
  );
};

export default PaperInputSearch;
