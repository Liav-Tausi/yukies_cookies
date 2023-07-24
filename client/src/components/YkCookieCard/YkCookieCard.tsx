import { IYkCookieCard } from "../../utils/interfaces/YkCookieCard/YkCookieCard"
import {Grid, Box, Typography, Button} from "@mui/material"
// import { useContext } from "react"
import CookieShadow from "./CookieShadow"
import { IColors } from "../../utils/enums/styleEnums/colorsEnum"
// import { IAppConfig } from "../../utils/enums/appConfigEnums/appConfigs"
// import { AppContext } from "../../reducers/appConfigReducer/appConfigReducer"

// sx={{ border: "2px solid " + (themeMode === IAppConfig.DarkTheme ? "#191919" : "#FCE6E0") }}

const YkCookieCard: React.FC<IYkCookieCard> = ({imgSrc, name, description}: IYkCookieCard): JSX.Element => {
  // const { themeMode } = useContext(AppContext)
  return (
    <Grid className="cookie-card-grid" >
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
        <Button color={"secondary"}>shop now</Button>
      </Box>
    </Grid>
  )
} 

export default YkCookieCard