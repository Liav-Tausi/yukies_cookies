import { AppBar, Toolbar, Box, IconButton} from "@mui/material";
import YukiesCookies from "../../assets/imgs/YukiesCookies.svg";
import { useState } from "react";
import i18n from "../../../public/i18n";
import MenuLanguage from "./MenuLanguage/MenuLanguage";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { IStringsEn } from "../../../public/locales/en/enEnums/en";
import { IColors } from "../../utils/enums/styleEnums/colorsEnum";
import MenuThemeMode from "./MenuThemeMode/MenuThemeMode";
import DripDesign from "./DripDesign/DripDesign";

const YkNavbar: React.FC = () => {
  const [language, setLanguage] = useState<string>(i18n.language);
  const handleLanguageChange = (value: string): void => {setLanguage(value)};

  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar className="nav-toolbar" >
          {language === IStringsEn.En ? (
            <>
              <img src={YukiesCookies} alt="YukiesCookies logo" style={{ height: "70px" }} />
              <Box  className="margin-box-cart-menu">
                <IconButton color={IColors.Secondary}>
                  <PermIdentityOutlinedIcon color={IColors.Secondary} className="app-bar-icon-avatar"/>
                </IconButton>
                <IconButton color={IColors.Secondary}>
                  <ShoppingCartOutlinedIcon color={IColors.Secondary} className="app-bar-icon-shopping-cart"/>
                </IconButton>
                <MenuLanguage handleLanguageChange={handleLanguageChange} language={language} />
                <MenuThemeMode/>
              </Box>
            </>
          ) : (
            <>
              <Box className="margin-box-cart-menu">
                <MenuThemeMode/>
                <MenuLanguage handleLanguageChange={handleLanguageChange} language={language} />
                <IconButton color={IColors.Secondary}>
                  <ShoppingCartOutlinedIcon color={IColors.Secondary} className="app-bar-icon-shopping-cart"/>
                </IconButton>
                <IconButton color={IColors.Secondary}>
                  <PermIdentityOutlinedIcon color={IColors.Secondary} className="app-bar-icon-avatar"/>
                </IconButton>
              </Box>
              <img src={YukiesCookies} alt="YukiesCookies logo" style={{ height: "70px", marginLeft: "auto" }} />
            </>
          )}
        </Toolbar>
      </AppBar>
      <DripDesign/>
    </>
  );
};

export default YkNavbar;
