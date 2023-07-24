import {Button, Menu, MenuItem } from "@mui/material";
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { IStringsEn } from "../../../../public/locales/en/enEnums/en";
import { IStringsHe } from "../../../../public/locales/he/heEnums/he";
import i18n from "../../../../public/i18n";
import { useState, useEffect } from "react";
import { IColors } from "../../../utils/enums/styleEnums/colorsEnum";
import { useTranslation } from 'react-i18next';
import { MenuLanguageProps } from "../../../utils/interfaces/NavBarMenu/menuLanguageProps";


const MenuLanguage: React.FC<MenuLanguageProps> = (props: MenuLanguageProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();

  const handleLanguageChange = (language: string): void => {
    i18n.changeLanguage(language);
    props.handleLanguageChange(language)
    setAnchorEl(null);
  };
  useEffect(() => {
    const cssPath: string = `./styles/${props.language}.css`;
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = cssPath;
    document.head.appendChild(linkElement);
    return () => {if (linkElement.parentElement === document.head) {
    document.head.removeChild(linkElement);}};
  }, [props.language]);
  
  return (
    <>
      <Button
        className="button-lang"
        color={IColors.Secondary}
        onClick={event => setAnchorEl(event.currentTarget)}
        startIcon={<LanguageOutlinedIcon className="app-bar-icon-language" />}
      >
        {t("language")}
      </Button>
      <Menu
        className="button-lang"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleLanguageChange(IStringsEn.En)}>
          {IStringsEn.English}
        </MenuItem>
        <MenuItem onClick={() => handleLanguageChange(IStringsHe.He)}>
          {IStringsHe.Hebrew}
        </MenuItem>
      </Menu>
    </>
  )
}

export default MenuLanguage;