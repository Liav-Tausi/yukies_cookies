import { IYkCookieCard } from "../../utils/interfaces/YkCookieCard/YkCookieCard"
import {Grid, Box, Typography, Button} from "@mui/material"
import { useContext } from "react"
import CookieShadow from "../abstactComponents/CookieShadow/CookieShadow"
import { IColors } from "../../utils/enums/styleEnums/colorsEnum"
import { IAppConfig } from "../../utils/enums/appConfigEnums/appConfigs"
import { AppContext } from "../../reducers/appConfigReducer/appConfigReducer"
import { useTranslation } from "react-i18next"




const YkCookieCard: React.FC<IYkCookieCard> = ({imgSrc, name, description}: IYkCookieCard): JSX.Element => {
  const { t } = useTranslation();
  const { themeMode } = useContext(AppContext)

  return (
    <Grid className="gap-cookie-grid" sx={{ border: "3px dashed " + (themeMode === IAppConfig.DarkTheme ? "#3D3836" : "#954535") }}>
      <Typography className="cookie-header" color={IColors.Secondary}>
        {name}
      </Typography>
      <Box className="relative-box">
        <img src={imgSrc} alt="cookie" style={{ width: "165px", height: "165px", zIndex: 2 }} className="cookie-img" />
        <CookieShadow />
      </Box>
      <Box>
        <Typography className="cookie-footer" color={IColors.Secondary}>
          {description}
        </Typography>
        <Box className="shop-now-container">
          <Button  className="shop-now" color={"secondary"} variant="outlined" >
            {t("shopNow")}
          </Button>
        </Box>
      </Box>
    </Grid>
  )
} 

export default YkCookieCard