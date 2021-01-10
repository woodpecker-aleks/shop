import { memo, useCallback, useMemo } from "react";
import { useStyles } from "./ProductInfoClasses";
import { Rating, Skeleton } from '@material-ui/lab'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import TabsPanel from "../../../../components/TabsPanel/TabsPanel";
import { Button, Divider } from "@material-ui/core";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, Badge } from "@material-ui/core";
import { calcAverageNumOfArray, transferCurrency } from '../../../../functions';
import { useDispatch, useSelector } from "react-redux";
import ProductCardTimer from '../../../../components/ProductCard/ProductCardTimer';
import { disslikeProduct, likedProductSelector, likeProduct } from "../../../../redux/reducers/appLikedProductsCardReducer";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

function ProductInfo({ product, status, ...props }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const dispatchLikeProduct = useCallback(() => {
    dispatch( likeProduct(product._id) );
  }, [product._id, dispatch]);
  
  const dispatchDisslikeProduct = useCallback(() => {
    dispatch( disslikeProduct(product._id) );
  }, [product._id, dispatch]);
  
  const { currency, isLiked, isAuth } = useSelector(store => ({
    currency: store.appCurrency,
    isLiked: likedProductSelector(store, product._id),
    isAuth: store.appAuth.isAuth
  }));
  
  const rating = useMemo(() => {
    if (!product.rating?.length) return 0;
    else return calcAverageNumOfArray(product.rating);
  }, [product.rating]);

  const tabs = useMemo(() => ([
    'Description',
    'Options',
    'Comments'
  ]), []);

  const price = useMemo(() => {
    if (product.price) return transferCurrency(product.price, currency);
    else return 0;
  }, [product.price, currency]);

  const salePrice = useMemo(() => {
    if (product.sale?.price) return transferCurrency(product.sale.price, currency);
    else return null;
  }, [product.sale?.price, currency]);

  let productDescription = null;
  if (!status.isSuccess) productDescription = (
    <Skeleton
      className={classes.productDescription}
      height={200}
      width="100%"
      animation="wave"
    />
  )
  else productDescription = (
    <Typography
      variant="subtitle1"
      className={classes.productDescription}
    >
      {product.description}
    </Typography>
  )

  let productOptions = null;
  if (!status.isSuccess) productOptions = (
    <Skeleton
      height={200}
      width="100%"
      animation="wave"
    />
  )
  else productOptions = (
    <Table aria-label="product options">
      <TableHead>
        <TableRow>
          <TableCell>Option</TableCell>
          <TableCell>Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {product.options.map(option => (
          <TableRow key={option._id}>
            <TableCell>{option.name}</TableCell>
            <TableCell>{option.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  const panels = useMemo(() => ([
    productDescription,
    productOptions,
    'Comments'
  ]), [productDescription, productOptions]);

  let productHeader = null;
  if (!status.isSuccess) productHeader = (
    <Skeleton
      className={classes.productHeader}
      height={46}
      animation="wave"
    />
  ) 
  else productHeader = (
    <div className={classes.productHeader}>
      <Typography
        variant="h5"
        className={classes.productName}
      >
        {product.name}
      </Typography>
      <Rating
        value={rating}
        readOnly
        name="rating"
      />
    </div>
  )

  let availableSign = null;
  if (!status.isSuccess) availableSign = (
    <Skeleton
      className={classes.success}
      animation="wave"
      width="25%"
      height={32}
    />
  )
  else if (product.count) availableSign = (
    <Typography className={classes.success}>
      <CheckCircleOutlineIcon className={classes.statusIcon} />
      Are available
    </Typography>
  )
  else availableSign = (
    <Typography className={classes.error}>
      <HighlightOffIcon className={classes.statusIcon} />
      Not available
    </Typography>
  )

  let priceBar = null;
  if (salePrice) priceBar = (<>
    <Badge
      badgeContent="%"
      color="primary"
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Typography
        variant="h6"
        component="span"
        className={classes.cardNewPrice}
      >
        {salePrice}
      </Typography>
    </Badge>
    <Typography
      variant="h6"
      component="strike"
      className={classes.cardOldPrice}
    >
      {price}
    </Typography>
  </>)
  else priceBar = (
    <Typography
      variant="h6"
      component="span"
      className={classes.cardNewPrice}
    >
      {price}
    </Typography>
  )

  let productActionBar = null;
  if (!status.isSuccess) productActionBar = (
    <Skeleton
      className={classes.productActionBar}
      height={46}
      width="50%"
      animation="wave"
    />
  )
  else productActionBar = (
    <div className={classes.productActionBar}>
      {priceBar}
      <Button
        className={classes.productBuyBtn}
        variant="contained"
        disabled={product.count ? false : true}
      >
        Buy
      </Button>
      {isLiked ? (
        <Button
          startIcon={<FavoriteIcon className={classes.activeLikeIcon} />}
          onClick={dispatchDisslikeProduct}
          className={classes.productLikeBtn}
        >
          Like
        </Button>
      ) : (
        <Button
          startIcon={<FavoriteBorderOutlinedIcon />}
          onClick={dispatchLikeProduct}
          className={classes.productLikeBtn}
          disabled={!isAuth}
        >
          Like
        </Button>
      )}
      <ProductCardTimer className={classes.productSaleTimer} sale={product.sale} />
    </div>
  )

  return (
    <Paper
      className={classes.root}
      variant="outlined"
    >
      {productHeader}
      <Divider />
      {availableSign}
      {productActionBar}
      <Divider />
      <TabsPanel
        tabs={tabs}
        panels={panels}
      />
    </Paper>
  )
}

export default memo(ProductInfo);