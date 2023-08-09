import { Grid } from "@mui/material";
import cookie1 from "../../assets/imgs/cookie1.png";
import cookie2 from "../../assets/imgs/cookie2.png";
import cookie3 from "../../assets/imgs/cookie3.png";
import cookie4 from "../../assets/imgs/cookie4.png";
import cookie5 from "../../assets/imgs/cookie5.png";
import cookie6 from "../../assets/imgs/cookie6.png";
import cookie7 from "../../assets/imgs/cookie7.png";
import YkCookieCard from "../YkCookieCard/YkCookieCard";
import { ICookie } from "../../utils/interfaces/ICookie/ICookie";
import ResponsiveSlider from "../abstactComponents/SliderShop/ResponsiveSlider";

const CookieGrid: React.FC = (): JSX.Element => {
  const cookieList: Array<ICookie> = [
    { id: 1, imgSrc: cookie1, name: "Chocolate Fudge", description: "Cocoa-infused Delight" },
    { id: 2, imgSrc: cookie2, name: "Chocolate Chip", description: "Classic & proven" },
    { id: 3, imgSrc: cookie3, name: "Anzac Biscuit", description: "Golden nostalgia" },
    { id: 4, imgSrc: cookie4, name: "Chocolate", description: "Chocolatey & Sweet" },
    { id: 5, imgSrc: cookie5, name: "Oreo Chocolate Chip", description: "Cocoa-infused Delight" },
    { id: 6, imgSrc: cookie6, name: "Oreo Chocolate Chip", description: "Cocoa-infused Delight" },
    { id: 7, imgSrc: cookie7, name: "Oreo Chocolate Chip", description: "Cocoa-infused Delight" },
  ];

  return (
    <Grid container spacing={0} className="relative-box" sx={{display: "inline-block"}}>
        <ResponsiveSlider>
          {cookieList.map((cookie) => (
            <Grid item key={cookie.id}>
              <YkCookieCard
                imgSrc={cookie.imgSrc}
                name={cookie.name}
                description={cookie.description}
              />
            </Grid>
          ))}
        </ResponsiveSlider>
      </Grid>
  );
};

export default CookieGrid;