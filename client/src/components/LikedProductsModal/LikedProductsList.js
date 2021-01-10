import { CircularProgress, Typography } from "@material-ui/core";
import { memo, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { POST } from "../../constants";
import { useHttp } from '../../hooks/http.hook';
import DynamicList from "../DynamicList/DynamicList";
import LikedProductsItem from "./LikedProductsItem";
import { useStyles } from "./LikedProductsModalClasses";

function LikedProductsList({ productIds, ...props }) {
  const classes = useStyles();
  const isAuth = useSelector(store => store.appAuth.isAuth);
  const { request, status } = useHttp();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (isAuth) request('/api/products', POST, {
      filter: {},
      ids: productIds
    })
    .then(products => setProducts(products));
  }, [isAuth]);

  let likedProducts;
  if (!status.isSuccess) likedProducts = (
    <CircularProgress color="secondary" className={classes.progress} />
  )
  else if (!products.length) likedProducts = (
    <Typography
      variant="button"
      className={classes.notFoundText}
    >
      No liked products
    </Typography>
  )
  else likedProducts = (
    <DynamicList
      className={classes.likedProductsList}
      model={products}
      itemKey={product => product._id}
      schema={(product, deleteProduct) => <LikedProductsItem product={product} deleteProduct={deleteProduct} />}
      empty={
        <Typography
          variant="button"
          className={classes.notFoundText}
        >
          No liked products
        </Typography>
      }
    />
  )

  return likedProducts;
}

export default memo(LikedProductsList);