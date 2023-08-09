import { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesLayout from './routes/RoutesLayout/RoutesLayout';
import { ThemeProvider } from '@mui/material/styles';
import { I18nextProvider } from 'react-i18next';
import CssBaseline from '@mui/material/CssBaseline';
import i18n from '../public/i18n.ts';
import lightTheme from './assets/themes/lightTheme.ts';
import darkTheme from './assets/themes/darkTheme.ts';
import { IAppConfig } from './utils/enums/appConfigEnums/appConfigs.ts';
import { AppContext } from './reducers/appConfigReducer/appConfigReducer.tsx';

const App = (): JSX.Element => {
  const { themeMode } = useContext(AppContext);
    const [language, setLanguage] = useState<string>(i18n.language);
    const changeLang = (value: string): void => {
      setLanguage(value)
    }

    useEffect(() => {
    const cssPath: string = `./styles/${language}.css`;
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = cssPath;
    document.head.appendChild(linkElement);
    return () => {if (linkElement.parentElement === document.head) {
    document.head.removeChild(linkElement);}};
  }, [language]);

  return (
    <ThemeProvider theme={themeMode === IAppConfig.LightTheme ? lightTheme : darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <I18nextProvider i18n={i18n} >
            <RoutesLayout changeLang={changeLang} language={language}/>
        </I18nextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
