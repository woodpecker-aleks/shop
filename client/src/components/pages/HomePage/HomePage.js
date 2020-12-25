import { Typography } from "@material-ui/core";
import BannerSlider from "../../BannerSlider/BannerSlider";
import CardsSlider from "../../CardsSlider/CardsSlider";
import { useStyles } from './HomePageClasses';

function HomePage() {
  const classes = useStyles();

  return (
    <>
      <BannerSlider className={classes.bannerSlider} />
      <Typography
        variant="h4"
      >
        Expensive
      </Typography>
      <CardsSlider />
    </>
  );
}

export default HomePage;