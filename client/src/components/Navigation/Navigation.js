import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStyles } from './NavigationClasses';

function Navigation() {
  const classes = useStyles();

  const NavigationInterface = [
    {
      name: 'Sales',
      linkTo: '/sales',
    },
    {
      name: 'Support',
      linkTo: '/support',
    },
    {
      name: 'About',
      linkTo: '/about',
    },
    {
      name: 'Brands',
      linkTo: '/brands',
    },
  ];

  return (
    <nav className={classes.root}>
      {NavigationInterface.map(route => (route.condition || route.condition === undefined) && (
        <Button
          className={classes.navLink}
          color="inherit"
          component={Link}
          to={route.linkTo}
          key={route.name}
          onClick={route.onClick}
        >
          {route.name}
        </Button>
      ))}
    </nav>
  );
}

export default Navigation;