import { Breadcrumbs, Button } from '@material-ui/core';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import { Link, Route } from 'react-router-dom';
import { If } from '../../jsxOperators';
import { useStyles } from './BreadcrumbClasses';

function Breadcrumb(props) {
  const classes = useStyles(props);

  const breadcrumbNameMap = {
    '/sales': 'Sales',
    '/support': 'Support',
    '/about': 'About',
    '/brands': 'Brands',
    '/profile': 'Profile',
    '/mobile': 'Mobile',
    '/laptop': 'Laptop',
    '/cart': 'Cart',
    '/mobile/product': 'Product',
  };

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
                If(last)(() => (

                  <Button key={to}>
                    {breadcrumbNameMap[to]}
                  </Button>
                  
                ))
                .Else(() => (

                  <Button
                    component={Link}
                    to={to}
                    key={to}
                  >
                    {breadcrumbNameMap[to]}
                  </Button>
                  
                ))
              )
            })}
          </Breadcrumbs>
        );
      }}
    </Route>
  );
}

export default Breadcrumb;