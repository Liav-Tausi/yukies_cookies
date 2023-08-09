import React, { ReactNode, useState, useContext } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { IColors } from "../../../utils/enums/styleEnums/colorsEnum";
import { IsExtraSmallScreenContext, IsMediumContext, IsSmallScreenContext } from "../../../reducers/appConfigReducer/appConfigReducer";

interface SimpleSliderProps {
  children: ReactNode;
}


const ResponsiveSlider: React.FC<SimpleSliderProps> = ({ children }: any): JSX.Element => {
  const isMediumScreen = useContext(IsMediumContext);
  const isSmallScreen = useContext(IsSmallScreenContext);
  const isExtraSmallScreen = useContext(IsExtraSmallScreenContext);
  const [currentPage, setCurrentPage] = useState(0);

  let ITEMS_PER_PAGE: number;

  if (isExtraSmallScreen) {
    ITEMS_PER_PAGE = 1;
  } else if (isSmallScreen) {
    ITEMS_PER_PAGE = 2; 
  } else if (isMediumScreen) {
    ITEMS_PER_PAGE = 3; 
  } else {
    ITEMS_PER_PAGE = 4; 
  }

  const handleNextSlide = () => {
  setCurrentPage((prevPage) => (prevPage - 1 + Math.ceil(children.length / ITEMS_PER_PAGE)) % Math.ceil(children.length / ITEMS_PER_PAGE));
  };

  const handlePrevSlide = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % Math.ceil(children.length / ITEMS_PER_PAGE));
  };

  return (
    <>
      <Box className="carousel-slider">
        <Box className="slide-container" style={{ transform: `translateX(-${currentPage * 100}%)` }}>
          {Array.from({ length: Math.ceil(children.length / ITEMS_PER_PAGE) }).map((_, slideIndex) => (
            <Box key={slideIndex} className="slide">
              {children.slice(slideIndex * ITEMS_PER_PAGE, (slideIndex + 1) * ITEMS_PER_PAGE)}
            </Box>
          ))}
        </Box>
      </Box>
      <IconButton color={IColors.Secondary} className="arrow left"  onClick={handleNextSlide}>
        <ArrowBackIosOutlinedIcon />
      </IconButton>
      <IconButton color={IColors.Secondary} className="arrow right" onClick={handlePrevSlide}>
        <ArrowForwardIosOutlinedIcon />
      </IconButton>

      <Box className="dots">
          {Array.from({ length: Math.ceil(children.length / ITEMS_PER_PAGE) }).map((_, index) => (
            <button key={index} className={`dot ${index === currentPage ? "active" : ""}`} onClick={() => setCurrentPage(index)} />
          ))}
      </Box>
    </>
  );
};

export default ResponsiveSlider;