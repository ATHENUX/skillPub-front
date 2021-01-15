//materila-UI
import { Button, Container, Typography, Divider } from "@material-ui/core";

//i18n
import { useTranslation } from "react-i18next";

//hooks
import useLanguageBrowser from "Hooks/useLanguageBrowser";

const Successful = ({ finish }) => {
  const { t } = useTranslation();
  useLanguageBrowser();

  return (
    <Container>
      <Typography variant="h3">{t("great.settings")}</Typography>
      <Typography variant="h6">{t("welcome.Skillpub")}</Typography>
      <Divider />
      <Typography variant="h6">{t("what.skillpub")}</Typography>
      <Typography variant="body1">{t("skillpub.social.network")}</Typography>
      <Typography variant="h6">{t("version")}</Typography>
      <Typography variant="body1">{t("version.body")}</Typography>

      <Button variant="contained" color="primary" onClick={finish}>
        {t("finish")}
      </Button>
    </Container>
  );
};

export default Successful;
