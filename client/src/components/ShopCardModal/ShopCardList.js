import { CircularProgress, Divider, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core";
import { memo, useEffect, useMemo, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { Link } from "react-router-dom";
import { POST } from "../../constants";
import { useHttp } from '../../hooks/http.hook';
import DynamicList from "../DynamicList/DynamicList";
import ShopCardItem from "./ShopCardItem";
import { useStyles } from "./ShopCardModalClasses";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

function ShopCardList({ productIds, ...props }) {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const { status, request } = useHttp();
  const scrollbarsStyles = useMemo(() => ({ width: '20vw', height: '50vh' }), []);

  useEffect(() => {
    request('/api/products', POST, {
      filter: {},
      ids: productIds
    })
    .then(products => setProducts(products));
  }, []);

  let productList;
  if (!status.isSuccess) productList = (
    <CircularProgress color="secondary" className={classes.progress} />
  )
  else productList = (
    <DynamicList
      className={classes.likedProductsList}
      model={products}
      itemKey={product => product._id}
      before={<>
        <ListItem button component={Link} to="/card">
          <ListItemIcon>
            <ShoppingCartOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="To cart" />
        </ListItem>
        <Divider />
      </>}
      schema={(product, deleteProduct) => <ShopCardItem product={product} deleteItem={deleteProduct} />}
      empty={
        <Typography
          variant="button"
          className={classes.notFoundText}
        >
          Card is empty
        </Typography>
      }
    />
  );

  return (
    <Scrollbars style={scrollbarsStyles}>
      {productList}
    </Scrollbars>
  )
}

export default memo(ShopCardList);