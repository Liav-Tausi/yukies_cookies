import { Box, Divider } from "@mui/material"
import cookie1 from "../../assets/imgs/cookie1.png"
import cookie2 from "../../assets/imgs/cookie2.png"
import cookie3 from "../../assets/imgs/cookie3.png"
import cookie4 from "../../assets/imgs/cookie4.png"
import YkCookieCard from "../YkCookieCard/YkCookieCard"
import { AppContext } from "../../reducers/appConfigReducer/appConfigReducer"
import { useContext } from "react"
import { IAppConfig } from "../../utils/enums/appConfigEnums/appConfigs"
import darkTheme from "../../assets/themes/darkTheme"
import lightTheme from "../../assets/themes/lightTheme"

const ShopGrid: React.FC = (): JSX.Element => {
  const { themeMode } = useContext(AppContext)

  return (
    <Box className="relative-box gap-cookie-grid">
      <Box>
        <YkCookieCard imgSrc={cookie1} name={"Chocolate Fudge"} description={"Cocoa-infused Delight"} />
      </Box>
      <Divider orientation="vertical" flexItem sx={{backgroundColor:themeMode===IAppConfig.DarkTheme?darkTheme.palette.secondary.dark:lightTheme.palette.secondary.light }}/>
      <Box>
        <YkCookieCard imgSrc={cookie2} name={"Chocolate Chip"} description={"Classic & proven"} />
      </Box>
      <Divider orientation="vertical" flexItem sx={{backgroundColor:themeMode===IAppConfig.DarkTheme?darkTheme.palette.secondary.dark:lightTheme.palette.secondary.light }}/>
      <Box>
        <YkCookieCard imgSrc={cookie3} name={"Anzac Biscuit"} description={"Golden nostalgia"} />
      </Box>
      <Divider orientation="vertical" flexItem sx={{backgroundColor:themeMode===IAppConfig.DarkTheme?darkTheme.palette.secondary.dark:lightTheme.palette.secondary.light }}/>
      <Box>
        <YkCookieCard imgSrc={cookie4} name={"Chocolate"} description={"Chocolatey & Sweet"} />
      </Box>
    </Box>
  )
}

export default ShopGrid