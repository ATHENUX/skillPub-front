import { useState } from "react";
import { connect } from "react-redux";
import { getUserData } from "Redux/Reducers/User";
import useSEO from "Hooks/useSEO";

//Material ui
import { Button, Typography, withWidth, Container } from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import HomeIcon from "@material-ui/icons/Home";

//styles
import CustomStyles from "Assets/Styles/CustomStyles";

//i18n
import { useTranslation } from "react-i18next";

// const local = navigator.language
//Function component
const Home = ({ getUserData, user, width }) => {
  const { t, i18n } = useTranslation();
  const [marginChange, setmarginChange] = useState(true);
  const classes = CustomStyles({ hide: marginChange });

  useSEO({
    title: "Home",
    description: "home information",
  });

  const getUsers = async () => {
    const response = {
      name: "A test username",
      lastName: "A test last name",
      firstName: "A test first name",
    };
    getUserData(response);
  };

  const onChangeLanguaje = () => {
    i18n.changeLanguage("es");
  };

  return (
    <Container maxWidth={width}>
      <h1>
        {t("home")} <HomeIcon />
      </h1>
      <p>
        Screen size <strong>{width}</strong>{" "}
      </p>
      <Typography variant="h1"> hello world</Typography>
      <Button
        size="small"
        onClick={getUsers}
        startIcon={<AccountBoxIcon />}
        className={classes.btn}
      >
        get user
      </Button>
      <Button variant="contained" color="primary" onClick={() => setmarginChange(!marginChange)}>
        margin change
      </Button>

      <Button variant="contained" color="secondary" onClick={onChangeLanguaje}>
        on change languaje
      </Button>

      {user.name && (
        <ul>
          <li>{user.name}</li>
          <li>{user.lastName}</li>
          <li>{user.firstName}</li>
        </ul>
      )}
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <p key={i}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae repellat tempora mollitia
          iusto unde libero veritatis possimus dolore laudantium! Adipisci labore quia corrupti
          illum perspiciatis distinctio minus, accusamus reiciendis enim.
        </p>
      ))}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.User,
});

const mapDispatchToProps = {
  getUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(Home));
