import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStyles } from './NavigationClasses';
import clsx from 'clsx';
import { useMemo, memo } from "react";

function Navigation({ className, ...props }) {
  const classes = useStyles();

  const NavigationInterface = useMemo(() => ([
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
  ]), []);

  return (
    <nav className={clsx(classes.root, className)}>
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

export default memo(Navigation);