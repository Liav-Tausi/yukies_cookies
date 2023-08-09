import { AppBar, Toolbar, Box, IconButton, Button, Drawer} from "@mui/material";
import YukiesCookies from "../../assets/imgs/YukiesCookies.svg";
import { useState, useContext } from "react";
import MenuLanguage from "./MenuLanguage/MenuLanguage";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { IStringsEn } from "../../../public/locales/en/enEnums/en";
import { IColors } from "../../utils/enums/styleEnums/colorsEnum";
import MenuThemeMode from "./MenuThemeMode/MenuThemeMode";
import DripDesign from "./DripDesign/DripDesign";
import { AppContext, IsSmallScreenContext } from "../../reducers/appConfigReducer/appConfigReducer";
import { IAppConfig } from "../../utils/enums/appConfigEnums/appConfigs";
import darkTheme from "../../assets/themes/darkTheme";
import lightTheme from "../../assets/themes/lightTheme";
import { YKNavBarProps } from "../../utils/interfaces/YKNavBarProps/YKNavBarProps";

const YkNavbar: React.FC<YKNavBarProps> = (props: YKNavBarProps) => {
  const { themeMode } = useContext(AppContext)
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  const handleLanguageChange = (value: string): void => {props.changeLang(value)};
  const isScreenSmall = useContext(IsSmallScreenContext)

  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar className="nav-toolbar" >
           {props.language === IStringsEn.En ? (
            <>
              { 
                isScreenSmall? (
                  <>
                    <img src={YukiesCookies} alt="YukiesCookies logo" style={{ height: "70px"}} />
                    <Button variant="contained" color={IColors.Secondary} onClick={() => setDrawerOpen(true)}>dw</Button>
                    <Drawer
                      anchor={IAppConfig.Right}
                      open={drawerOpen}
                      onClose={() => setDrawerOpen(false)}
                      PaperProps={{
                      sx : { backgroundColor: themeMode === IAppConfig.DarkTheme?darkTheme.palette.primary.main:lightTheme.palette.primary.main}
                      }}
                    >
                      <Box className="drawer">
                        <MenuLanguage handleLanguageChange={handleLanguageChange} />
                        <MenuThemeMode/>
                        <IconButton color={IColors.Secondary}>
                          <PermIdentityOutlinedIcon color={IColors.Secondary} className="app-bar-icon-avatar"/>
                        </IconButton>
                        <IconButton color={IColors.Secondary}>
                          <ShoppingCartOutlinedIcon color={IColors.Secondary} className="app-bar-icon-shopping-cart"/>
                        </IconButton>
                      </Box>
                    </Drawer>
                    
                  </>
                ):(
                  <>
                  <img src={YukiesCookies} alt="YukiesCookies logo" style={{ height: "70px" }} />
                  <Box className="margin-box-cart-menu">
                    <IconButton color={IColors.Secondary}>
                      <PermIdentityOutlinedIcon color={IColors.Secondary} className="app-bar-icon-avatar"/>
                    </IconButton>
                    <IconButton color={IColors.Secondary}>
                      <ShoppingCartOutlinedIcon color={IColors.Secondary} className="app-bar-icon-shopping-cart"/>
                    </IconButton>
                    <MenuLanguage handleLanguageChange={handleLanguageChange} />
                    <MenuThemeMode/>
                  </Box> 
                  </>
                )
              }       
            </>
          ) : (
            isScreenSmall? (
              <>
                <Drawer
                  anchor={IAppConfig.Left}
                  open={drawerOpen}
                  onClose={() => setDrawerOpen(false)}
                  PaperProps={{
                    sx : { backgroundColor: themeMode === IAppConfig.DarkTheme?darkTheme.palette.primary.main:lightTheme.palette.primary.main}
                  }}
                >
                  <Box className="drawer">
                    <IconButton color={IColors.Secondary}>
                      <ShoppingCartOutlinedIcon color={IColors.Secondary} className="app-bar-icon-shopping-cart"/>
                    </IconButton>
                    <IconButton color={IColors.Secondary}>
                      <PermIdentityOutlinedIcon color={IColors.Secondary} className="app-bar-icon-avatar"/>
                    </IconButton>
                    <MenuThemeMode/>
                    <MenuLanguage handleLanguageChange={handleLanguageChange} />
                  </Box>
                </Drawer>
                  <img src={YukiesCookies} alt="YukiesCookies logo" style={{ height: "70px", marginLeft: "auto" }} />
                <Button variant="contained" color={IColors.Secondary} onClick={() => setDrawerOpen(true)}>dw</Button>
              </>
            ):(
              <>                             
                <Box className="margin-box-cart-menu">
                  <IconButton color={IColors.Secondary}>
                    <ShoppingCartOutlinedIcon color={IColors.Secondary} className="app-bar-icon-shopping-cart"/>
                  </IconButton>
                  <IconButton color={IColors.Secondary}>
                    <PermIdentityOutlinedIcon color={IColors.Secondary} className="app-bar-icon-avatar"/>
                  </IconButton>
                  <MenuThemeMode/>
                  <MenuLanguage handleLanguageChange={handleLanguageChange} />
                </Box>
                <img src={YukiesCookies} alt="YukiesCookies logo" style={{ height: "70px", marginLeft: "auto" }} />
              </>
            )
          )
        }
        </Toolbar>
      </AppBar>
      <DripDesign/>
    </>
  );
};

export default YkNavbar;
