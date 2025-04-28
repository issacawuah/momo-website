const express = require('express');
const router = express.Router();
const axios = require('axios');

// Initialize MoMo payment
router.post('/momo', async (req, res) => {
    try {
        const { amount, phoneNumber, orderId } = req.body;

        // MoMo API configuration
        const momoConfig = {
            apiKey: process.env.MOMO_API_KEY,
            apiSecret: process.env.MOMO_API_SECRET,
            environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
        };

        // Create payment request
        const paymentRequest = {
            amount: amount,
            currency: 'XAF',
            externalId: orderId,
            payer: {
                partyIdType: 'MSISDN',
                partyId: phoneNumber
            },
            payerMessage: 'Payment for order ' + orderId,
            payeeNote: 'Thank you for your purchase'
        };

        // Make request to MoMo API
        const response = await axios.post(
            `https://${momoConfig.environment}.mtn.cm/collection/v1_0/requesttopay`,
            paymentRequest,
            {
                headers: {
                    'Authorization': `Bearer ${momoConfig.apiKey}`,
                    'X-Reference-Id': orderId,
                    'X-Target-Environment': momoConfig.environment,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.json({
            status: 'success',
            message: 'Payment initiated successfully',
            data: response.data
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Payment initiation failed',
            error: error.message
        });
    }
});

// Check payment status
router.get('/momo/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;

        // MoMo API configuration
        const momoConfig = {
            apiKey: process.env.MOMO_API_KEY,
            apiSecret: process.env.MOMO_API_SECRET,
            environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
        };

        // Check payment status
        const response = await axios.get(
            `https://${momoConfig.environment}.mtn.cm/collection/v1_0/requesttopay/${orderId}`,
            {
                headers: {
                    'Authorization': `Bearer ${momoConfig.apiKey}`,
                    'X-Target-Environment': momoConfig.environment
                }
            }
        );

        res.json({
            status: 'success',
            data: response.data
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to check payment status',
            error: error.message
        });
    }
});

module.exports = router; 