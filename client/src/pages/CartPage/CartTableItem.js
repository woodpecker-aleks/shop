import { TableRow, TableCell, Avatar, IconButton, Typography } from "@material-ui/core";
import { memo, useMemo, useCallback } from "react";
import { transferCurrency } from "../../functions";
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from "./CartPageClasses";
import AddSharpIcon from '@material-ui/icons/AddSharp';
import RemoveSharpIcon from '@material-ui/icons/RemoveSharp';
import BackspaceSharpIcon from '@material-ui/icons/BackspaceSharp';
import { Link } from 'react-router-dom';
import { removeProductFromCard, setProductCountFromCard } from "../../redux/reducers/appShopCardReducer";

function CartTableItem({ product, index, ...props }) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { shopCardProducts, currency } = useSelector(store => ({
    shopCardProducts: store.appShopCard.products,
    currency: store.appCurrency
  }));

  const count = useMemo(() => shopCardProducts.find(prod => prod.id === product._id)?.count, [shopCardProducts, product._id]);
  
  const dispatchRemoveProductFromCart = useCallback(() => {
    dispatch( removeProductFromCard(product._id) );
  }, [product._id, dispatch]);
  
  const dispatchIncrementProductCountFromCart = useCallback(() => {
    dispatch( setProductCountFromCard({ productId: product._id, count: shopCardProducts.find(prod => prod.id === product._id)?.count + 1 }));
  }, [product._id, shopCardProducts, dispatch]);

  const dispatchDecrementProductCountFromCart = useCallback(() => {
    dispatch( setProductCountFromCard({ productId: product._id, count: shopCardProducts.find(prod => prod.id === product._id)?.count - 1 }));
  }, [product._id, shopCardProducts, dispatch]);

  return (
    <TableRow>
      <TableCell>{ index }</TableCell>
      <TableCell
        className={ classes.productNameCell }
        component={ Link }
        to={`product/${ product.url }`}
      >
        <Avatar
          className={ classes.productAvatarCell }
          variant="rounded"
          alt={product.name}
          src={`/images/products/${product.mainImage}`}
          classes={{
            img: classes.productAvatar
          }}
        >

        </Avatar>
        <Typography>{ product.name }</Typography>
      </TableCell>
      <TableCell>
        <IconButton
          onClick={ dispatchIncrementProductCountFromCart }
          aria-label="increment"
          size="small"
        >
          <AddSharpIcon />
        </IconButton>
        <span className={ classes.productCount }>{ count }</span>
        <IconButton
          onClick={ dispatchDecrementProductCountFromCart }
          aria-label="decrement"
          size="small"
        >
          <RemoveSharpIcon />
        </IconButton>
      </TableCell>
      <TableCell>{ transferCurrency(product.price, currency) }</TableCell>
      <TableCell>
        <IconButton
          onClick={ dispatchRemoveProductFromCart }
          aria-label="remove"
          size="small"
        >
          <BackspaceSharpIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default memo(CartTableItem);