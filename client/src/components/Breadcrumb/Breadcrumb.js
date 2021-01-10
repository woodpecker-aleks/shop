import { Breadcrumbs, Button } from '@material-ui/core';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import { useMemo, memo } from 'react';
import { Link, Route } from 'react-router-dom';
import { useStyles } from './BreadcrumbClasses';

function Breadcrumb(props) {
  const classes = useStyles(props);

  const breadcrumbNameMap = useMemo(() => ({
    '/profile': 'Profile',
    '/cart': 'Cart',
    '/product': 'Product'
  }), []);

  return (
    <Route>
      {({ location }) => {
        if (location.pathname === '/') return null;
        else if (location.pathname === '/not-found') return null;
        const pathnames = location.pathname.split('/').filter((x) => x);

        return (
          <Breadcrumbs
            separator={<ChevronRightRoundedIcon />}
            aria-label="breadcrumb"
            className={classes.root}
          >
            <Button
              component={Link}
              to="/"
              startIcon={<HomeOutlinedIcon />}
            >
              Home
            </Button>
            {pathnames.map((path, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join('/')}`;

              return (
                (last) ? (

                  <Button key={to}>
                    {breadcrumbNameMap[to] ?? path}
                  </Button>
                  
                ) : (
                  <Button
                    component={Link}
                    to={to}
                    key={to}
                  >
                    {breadcrumbNameMap[to]}
                  </Button>
                )
              )
            })}
          </Breadcrumbs>
        );
      }}
    </Route>
  );
}

export default memo(Breadcrumb);