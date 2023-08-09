import {Container, Typography} from "@mui/material";
import { useTranslation } from 'react-i18next';
import { IColors } from "../../utils/enums/styleEnums/colorsEnum";
import CookieGrid from "../../components/ShopGrid/CookieGrid";
import BundleGrid from "../../components/ShopGrid/BundleGrid";

const HomePage: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <Container>
        <Typography variant="h5" color={IColors.PrimaryLight} className="our-product">{t("ourCookies")}</Typography>
        <CookieGrid/>
        <Typography variant="h5" color={IColors.PrimaryLight} className="bundles">{t("bundles")}</Typography>
        <BundleGrid/>
        <Typography variant="h5" color={IColors.PrimaryLight} className="about">{t("about")}</Typography>
      </Container>
    </>
  );
};

export default HomePage;
