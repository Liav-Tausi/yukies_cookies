import React, { useReducer, createContext, Dispatch, ReactNode } from "react";
import { INITIAL_APP_CONFIG } from "../../utils/interfaces/InitialAppConfig/InitialAppConfig";
import { ReducerAction } from "../../types/reducerTypes/reducerType";
import { APP_ACTIONS } from "../../utils/enums/appActions/appActions";
import { useMediaQuery } from "@mui/material";

const INITIAL_STATE: INITIAL_APP_CONFIG = {
  themeMode: "lightTheme"
};

const AppConfigReducer = (
  state: typeof INITIAL_STATE,
  action: ReducerAction
): typeof INITIAL_STATE => {
  switch (action.type) {
    case APP_ACTIONS.THEME_MODE:
      if (action.payload !== undefined) {
        return { ...state, themeMode: action.payload };
      }
      break;
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
  return state;
};

export const AppContext = createContext<typeof INITIAL_STATE>(INITIAL_STATE);
export const AppDispatchContext = createContext<Dispatch<ReducerAction> | null>(null);

export const IsExtraSmallScreenContext = createContext<Boolean | null>(null);
export const IsSmallScreenContext = createContext<Boolean | null>(null);
export const IsMediumContext = createContext<Boolean | null>(null);
export const IsLargeContext = createContext<Boolean | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appState, dispatch] = useReducer(AppConfigReducer, INITIAL_STATE);
  const isExtraSmallScreen = useMediaQuery("(max-width:630px)");
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const isMediumScreen = useMediaQuery("(max-width:1200px)");

  return (
      <IsMediumContext.Provider value={isMediumScreen}>
        <IsSmallScreenContext.Provider value={isSmallScreen}>
          <IsExtraSmallScreenContext.Provider value={isExtraSmallScreen}>
            <AppContext.Provider value={appState}>
              <AppDispatchContext.Provider value={dispatch}>
                {children}
              </AppDispatchContext.Provider>
            </AppContext.Provider>
          </IsExtraSmallScreenContext.Provider>
        </IsSmallScreenContext.Provider>
      </IsMediumContext.Provider>
  );
};


