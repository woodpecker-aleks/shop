import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { useStyles } from "./ProductPageClasses";

function ProductPage() {
  const classes = useStyles();
  const { url } = useParams();
  const [product, setProduct] = useState(null);
  const { request, status } = useHttp();

  useEffect(() => {
    request(`/api/product/${url}`)
      .then(data => setProduct(data));
  });

  return (
    <div className={classes.root}>
    </div>
  );
}

export default ProductPage;