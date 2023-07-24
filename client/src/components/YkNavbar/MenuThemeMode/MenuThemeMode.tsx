import { useContext } from "react";
import { IconButton } from "@mui/material";
import { IAppConfig } from "../../../utils/enums/appConfigEnums/appConfigs";
import { MenuThemeMode } from "../../../utils/interfaces/NavBarMenu/menuThemeMode";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { IColors } from "../../../utils/enums/styleEnums/colorsEnum";
import { AppContext, AppDispatchContext } from "../../../reducers/appConfigReducer/appConfigReducer";
import { APP_ACTIONS } from "../../../utils/enums/appActions/appActions";

const MenuThemeMode: React.FC = () => {
  const { themeMode } = useContext(AppContext)
  const dispatch = useContext(AppDispatchContext);

  const handleThemeChange = (newTheme: string) => {
    if (dispatch) {
      dispatch({
        type: APP_ACTIONS.THEME_MODE,
        payload: newTheme,
      });
    }
  };

  return (
    <IconButton color={IColors.Secondary} onClick={() => handleThemeChange(
      themeMode === IAppConfig.LightTheme ? IAppConfig.DarkTheme : IAppConfig.LightTheme
    )}>
      {themeMode === IAppConfig.LightTheme ? (
        <LightModeOutlinedIcon color={IColors.Secondary} />
      ) : (
        <DarkModeOutlinedIcon color={IColors.Secondary} />
      )}
    </IconButton>
  );
};

export default MenuThemeMode;
