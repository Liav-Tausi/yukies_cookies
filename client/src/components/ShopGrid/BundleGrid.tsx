import { Typography, Box, Button, Container, Divider} from "@mui/material"
import { useContext } from "react"
import bundle from "../../assets/imgs/bundle.jpg"
import bundle2 from "../../assets/imgs/bundle2.jpg"
import { AppContext, IsSmallScreenContext } from "../../reducers/appConfigReducer/appConfigReducer"
import { IAppConfig } from "../../utils/enums/appConfigEnums/appConfigs"
import { useTranslation } from 'react-i18next';
import { IColors } from "../../utils/enums/styleEnums/colorsEnum"

const BundleGrid: React.FC = (): JSX.Element => {
  const { themeMode } = useContext(AppContext)
  const { t, i18n } = useTranslation();
  const isSmallScreen = useContext(IsSmallScreenContext)
  const language: string = i18n.language

  return (
    <Box className="bundle-box" sx={{ border: "3px dashed " + (themeMode === IAppConfig.DarkTheme ? "#3D3836" : "#954535"),}}>
      <Box className="bundle-inner-box">
        <Container>
          <Box className="bundle-container-box">
            {language === IAppConfig.He ? (
              <>
              {
                  isSmallScreen? (
                    <Box className="drawer bundle-inner-box">
                        <img
                        src={bundle}
                        alt="cookie"
                        style={{
                        width: isSmallScreen? "10em": "25%",
                        height: "auto",
                        zIndex: 2,
                        borderRadius: "18px"
                        }}/>
                      <Divider color={IColors.Secondary} className="divider"/>
                        <img
                        src={bundle2}
                        alt="cookie"
                        style={{
                        width: isSmallScreen? "10em": "25%",
                        height: "auto",
                        zIndex: 2,
                        borderRadius: "18px"
                        }}/>
                    </Box>
                  ):(
                    <img
                    src={bundle}
                    alt="cookie"
                    style={{
                    width: isSmallScreen? "45%": "25%",
                    height: "auto",
                    zIndex: 2,
                    borderRadius: "18px",
                    }}
                    />
                  )
                }   
                <Box className="typography-button-box">
                  <Typography color={IColors.Secondary} variant="h5" className="bundle-text">
                    {t("bundleText")}
                  </Typography>
                  <Typography color={IColors.Secondary} variant="h5" className="bundle-text">
                    description
                  </Typography>
                  <Box className="shop-now-bundle-container bundle-container">
                    <Button className="shop-now shop-now-padding" color={"secondary"} variant="outlined">
                      {t("shopNow")}
                    </Button>
                  </Box>
                </Box>
              </>
            ) : (
              <>
                <Box className="typography-button-box">
                  <Typography color={IColors.Secondary} variant="h5" className="bundle-text">
                    {t("bundleText")}
                  </Typography>
                  <Typography color={IColors.Secondary} variant="h5" className="bundle-text">
                    description
                  </Typography>
                  <Box className="shop-now-bundle-container bundle-container">
                    <Button className="shop-now shop-now-padding" color={"secondary"} variant="outlined">
                      {t("shopNow")}
                    </Button>
                  </Box>
                </Box>
                {
                  isSmallScreen? (
                    <Box className="drawer bundle-inner-box">
                      <img
                      src={bundle}
                      alt="cookie"
                      style={{
                      width: isSmallScreen? "10em": "25%",
                      height: "auto", 
                      zIndex: 2,
                      borderRadius: "18px"
                      }}/>
                      <Divider color={IColors.Secondary} className="divider"/>
                      <img
                      src={bundle2}
                      alt="cookie"
                      style={{
                      width: isSmallScreen? "10em": "25%",
                      height: "auto",
                      zIndex: 2,
                      borderRadius: "18px"
                      }}/>
                    </Box>
                  ):(
                    <img
                    src={bundle}
                    alt="cookie"
                    style={{
                    width: isSmallScreen? "45%": "25%",
                    height: "auto",
                    zIndex: 2,
                    borderRadius: "18px",
                    }}
                    />
                  )
                }   
              </>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default BundleGrid