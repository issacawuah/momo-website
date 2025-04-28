import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CircularProgress,
  Box,
} from '@material-ui/core';
import { listProducts } from '../actions/productActions';
import Message from '../components/Message';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Latest Products
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" my={3}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Message severity="error">{error}</Message>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardActionArea component={Link} to={`/product/${product._id}`}>
                  <CardMedia
                    component="img"
                    alt={product.name}
                    height="200"
                    image={product.image}
                    title={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {product.description.substring(0, 100)}...
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ${product.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default HomeScreen; 