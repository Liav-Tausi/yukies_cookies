import { Box } from "@mui/material"
import {useContext} from "react"
import { IAppConfig } from "../../../utils/enums/appConfigEnums/appConfigs";
import { AppContext } from "../../../reducers/appConfigReducer/appConfigReducer";
import cakeDrippingDark from "../../../assets/imgs/YKDrippingDark.svg"
import cakeDrippingLight from "../../../assets/imgs/YKDrippingLight.svg"


const DripDesign: React.FC = (): JSX.Element => {
  const { themeMode } = useContext(AppContext);
  return (
    <Box sx={{display: "flex"}}>
      {
        themeMode === IAppConfig.DarkTheme? (
          <>
            <Box sx={{flex: 1}}>
              <img src={cakeDrippingDark} className="cake-dripping-nav" alt="SVG 1" />
            </Box>
            <Box sx={{flex: 1}}>
              <img src={cakeDrippingDark} className="cake-dripping-nav" alt="SVG 2" />
            </Box>
          </>
        ) : (
          <>
            <Box sx={{flex: 1}}>
              <img src={cakeDrippingLight} className="cake-dripping-nav" alt="SVG 1" />
            </Box>
            <Box sx={{flex: 1}}>
              <img src={cakeDrippingLight} className="cake-dripping-nav" alt="SVG 2" />
            </Box>
          </>
        )
      }
      </Box>

  )

}

export default DripDesign;