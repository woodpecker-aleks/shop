import { Box, Container } from "@material-ui/core";
import { memo } from "react";
import Navigation from "../Navigation/Navigation";
import { useStyles } from "./FooterClasses";

function Footer() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Container>
        <Navigation className={classes.navigation} />
      </Container>
    </Box>
  )
}

export default memo(Footer);