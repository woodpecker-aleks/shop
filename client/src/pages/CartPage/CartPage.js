import { memo, useEffect, useMemo, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { useHttp } from "../../hooks/http.hook";
import { useSelector } from 'react-redux';
import { POST } from "../../constants";
import CartTableItem from "./CartTableItem";

function CartPage() {
  const [products, setProducts] = useState([]);

  const { request, status } = useHttp();

  const { isAuth, shopCardProducts, currency } = useSelector(store => ({
    isAuth: store.appAuth.isAuth,
    shopCardProducts: store.appShopCard.products,
    currency: store.appCurrency
  }));
  
  const productIds = useMemo(() => shopCardProducts.map(product => product.id), [shopCardProducts]);

  useEffect(() => {
    if (isAuth) {
      request('/api/products', POST, {
        filter: {},
        ids: productIds
      })
      .then(products => setProducts(products));
    }
  }, [isAuth, productIds, request]);

  return (
    <div>
      <TableContainer
        variant="outlined"
        component={ Paper }
      >
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
            {products.map((product, index) => <CartTableItem product={ product } index={ index + 1 } key={ product._id } />)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default memo(CartPage);