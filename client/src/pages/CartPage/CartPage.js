import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Button, Paper, Table, TextField, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import CartTableItem from "./CartTableItem";
import { transferCurrency } from "../../functions";
import { useStyles } from "./CartPageClasses";
import { useHttp } from "../../hooks/http.hook";
import { POST } from "../../constants";
import { clearProductCart } from "../../redux/reducers/appShopCardReducer";

function CartPage() {
  const classes = useStyles();

  const { request } = useHttp();

  const dispatch = useDispatch();

  const [values, setValues] = useState({
    text: '',
    adress: ''
  });

  const handleInputChange = useCallback(event => {
    setValues(prevValues => ({
      ...prevValues,
      [event.target.name]: event.target.value
    }));
  }, []);

  const { products, currency, productsStatus } = useSelector(store => ({
    products: store.appShopCard.products,
    currency: store.appCurrency,
    productsStatus: store.appUser.status
  }));

  const productsCount = useMemo(() => {
    return products.reduce((accum, currProd) => accum + currProd.count, 0);
  }, [products]);

  const productsPrice = useMemo(() => {
    return products.reduce((accum, currProd) => {
      const prodPrice = currProd.count * currProd.info.price;

      return accum + prodPrice;
    }, 0);
  }, [products, currency]);

  const handleSubmitOrder = useCallback(async () => {
    await request('/api/order', POST, {
      text: values.text,
      adress: values.adress,
      products,
      totalPrice: productsPrice
    });

    dispatch(clearProductCart());
  }, [values.adress, values.text, products]);

  useEffect(() => {
    document.title = 'Cart';
  }, []);

  return (
    <div className={classes.root}>
      <TableContainer
        variant="outlined"
        component={Paper}
        className={classes.table}
      >
        {!productsStatus.isSuccess ? (
          <CircularProgress className={classes.loader} />
        ) : (
          <Table aria-label="cart content">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Count</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => <CartTableItem product={ product.info } index={ index + 1 } key={ product.id } />)}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>
                  <Typography>{products.length}</Typography>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Typography>{productsCount}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{ transferCurrency(productsPrice, currency) }</Typography>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </TableContainer>
      <TextField
        label="Tap your preferences"
        name="text"
        variant="outlined"
        className={classes.textArea}
        value={values.text}
        onChange={handleInputChange}
      />
      <TextField
        name="adress"
        value={values.adress}
        onChange={handleInputChange}
        label="Tap your adress"
        variant="outlined"
        className={classes.textArea}
      />
      <Button
        variant="contained"
        color="primary"
        disableElevation
        className={classes.submitBtn}
        onClick={handleSubmitOrder}
      >
        Confirm order
      </Button>
    </div>
  )
}

export default memo(CartPage);