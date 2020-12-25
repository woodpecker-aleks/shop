import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import CardsSlider from "../../CardsSlider/CardsSlider";

const useStyles = makeStyles(theme => ({
  divider: {
    marginBottom: theme.spacing(5),
  },
  cards: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  scroll: {
    height: '100vh',
  }
}));

function HomePage(props) {
  const classes = useStyles(props);

  return (
    <>
      <CardsSlider />
    </>
  );
}

export default HomePage;