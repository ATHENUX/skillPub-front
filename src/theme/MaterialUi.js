import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";

const getTheme = (theme = "light") => {
  return createMuiTheme({
    palette: {
      primary: {
        main: purple["500"],
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#FFAD1F",
        contrastText: "#FFFFFF",
      },
      text: {
        secondary: "#C3C8CE",
      },
      type: theme,
      background: {
        default: theme === "light" ? "#eaeff5" : "#18181B",
        paper: theme === "light" ? "#fff" : "#1F1F23",
      },
    },
    props: {
      MuiButton: {
        disableElevation: true,
        style: {
          borderRadius: 50,
        },
      },
      MuiInputBase: {
        style: {
          borderRadius: 50,
        },
      },
    },
  });
};

export default getTheme;
