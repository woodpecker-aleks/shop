import { CircularProgress, Divider, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core";
import { memo, useEffect, useMemo, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { Link } from "react-router-dom";
import DynamicList from "../DynamicList/DynamicList";
import ShopCardItem from "./ShopCardItem";
import { useStyles } from "./ShopCardModalClasses";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

function ShopCardList({ products, ...props }) {
  const classes = useStyles();

  const scrollbarsStyles = useMemo(() => ({ width: '20vw', height: '50vh' }), []);

  let productList;
  productList = (
    <DynamicList
      className={classes.likedProductsList}
      model={products}
      itemKey={product => product.id}
      before={<>
        <ListItem button component={Link} to="/cart">
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
          Cart is empty
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