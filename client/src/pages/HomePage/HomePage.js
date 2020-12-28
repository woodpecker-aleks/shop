import { Typography } from "@material-ui/core";
import BannerSlider from "../../components/BannerSlider/BannerSlider";
import CardsSlider from "../../components/CardsSlider/CardsSlider";
import { useStyles } from './HomePageClasses';
import { useEffect, useMemo } from 'react';
import BransSlider from "../../components/BrandsSlider/BrandsSlider";

function HomePage() {
  const classes = useStyles();
  const brands = useMemo(() => ([
    "/images/brands/mi.jpg",
    "/images/brands/apple.jpg",
    "/images/brands/samsung.jpg",
    "/images/brands/lg.jpg",
    "/images/brands/sony.jpg"
  ]), []);

  const popularProductsFilter = useMemo(() => ({
    filter: {},
    max: 8,
    sort: ['popular']
  }), []);

  const newProductsFilter = useMemo(() => ({
    filter: {},
    max: 8,
    sort: ['newer']
  }), []);

  const saleProductsFilter = useMemo(() => ({
    filter: {
      sale: true
    },
    max: 8,
  }), []);

  useEffect(() => {
    document.title = 'Home Page';
  }, []);

  return (<>
    <Typography
      variant="button"
      className={classes.title}
    >
      Events
    </Typography>
    <BannerSlider className={classes.bannerSlider} />
    <Typography
      variant="button"
      className={classes.title}
    >
      Popular
    </Typography>
    <CardsSlider filter={popularProductsFilter} />
    <Typography
      variant="button"
      className={classes.title}
    >
      Sales
    </Typography>
    <CardsSlider filter={saleProductsFilter} />
    <Typography
      variant="button"
      className={classes.title}
    >
      New
    </Typography>
    <CardsSlider filter={newProductsFilter} />
    <Typography
      variant="button"
      className={classes.title}
    >
      Brands
    </Typography>
    <BransSlider cards={brands} />
  </>);
}

export default HomePage;