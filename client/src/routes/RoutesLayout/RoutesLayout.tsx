import {Route, Routes } from 'react-router-dom';
import YkNavbar from "../../components/YkNavbar/YkNavbar";
import HomePage from "../../pages/HomePage/HomePage";
import Login from "../../pages/LogInRegisterPage/Login";
import Register from "../../pages/LogInRegisterPage/Register";
import { RouteLayoutProps } from '../../utils/interfaces/routeLayoutProps/routeLayoutProps';

const RoutesLayout: React.FC<RouteLayoutProps> = (props: RouteLayoutProps) => {

  return (
    <>
      <YkNavbar changeLang={props.changeLang} language={props.language}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};

export default RoutesLayout;
