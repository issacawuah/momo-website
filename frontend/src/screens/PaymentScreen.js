import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  CircularProgress,
  TextField,
  Box,
  Paper,
} from '@material-ui/core';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate('/shipping');
  }

  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Save payment method
      dispatch(savePaymentMethod('MoMo'));
      
      // Redirect to place order screen
      navigate('/placeorder');
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth="md" mx="auto" mt={4}>
      <CheckoutSteps step1 step2 step3 />
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Payment Method
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          MoMo Payment
        </Typography>
        <form onSubmit={submitHandler}>
          <TextField
            required
            fullWidth
            label="Phone Number"
            variant="outlined"
            margin="normal"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your MoMo phone number"
          />
          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Continue'
              )}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default PaymentScreen; 