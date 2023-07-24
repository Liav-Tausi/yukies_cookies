import {Container, Typography} from "@mui/material";
import { useTranslation } from 'react-i18next';
import { IColors } from "../../utils/enums/styleEnums/colorsEnum";
import ShopGrid from "../../components/ShopGrid/ShopGrid";

const HomePage: React.FC = (): JSX.Element => {
  const { t, i18n } = useTranslation();

  return (
    <Container>
      <Typography variant="h5" color={IColors.PrimaryLight} className="our-product">{t("ourCookies")}</Typography>
      <ShopGrid/>
    </Container>
  );
};

export default HomePage;
