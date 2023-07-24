import { Route, Routes } from "react-router-dom";

import YkNavbar from "../../components/YkNavbar/YkNavbar";
import HomePage from "../../pages/HomePage/HomePage";

const RoutesLayout: React.FC = () => {
  return (
    <>
      <YkNavbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default RoutesLayout;
