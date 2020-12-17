//material-UI
import { Container, Typography } from "@material-ui/core";
import { useNavbarSetting } from "Assets/Styles/navbarStyles";

const Language = ({ orientation }) => {
  const classes = useNavbarSetting();
  return (
    <Container className={classes.container}>
      <Typography variant={orientation ? "h6" : "h3"}>Language</Typography>
      <p>content</p>
    </Container>
  );
};

export default Language;
