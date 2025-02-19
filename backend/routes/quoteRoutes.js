const express = require('express');
const quoteController = require('../controllers/quoteController');

const router = express.Router();


router.post('/', quoteController.createQuote);
router.post('/send-quote', quoteController.sendQuoteToCustomer);
router.get('/', quoteController.getAllQuotes);
router.get('/:id', quoteController.getQuoteById);
router.put('/:id', quoteController.updateQuote);

router.get('/status/pending', quoteController.getPendingQuotes);
router.get('/status/quoted', quoteController.getQuotedQuotes);
router.patch('/:id/status', quoteController.updateQuoteStatus);

module.exports = router;
