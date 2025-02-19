const quoteService = require('../services/quoteService');
const emailService = require('../services/emailService');

// Function to create a quote
exports.createQuote = async (req, res) => {
    try {
        const quote = await quoteService.createQuote(req.body);
        await emailService.sendQuoteNotificationToAdmin(quote);
       // await emailService.sendQuoteResponseToCustomer(quote);
        res.status(201).json(quote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get all quotes (for admin)
exports.getAllQuotes = async (req, res) => {
    try {
        const quotes = await quoteService.getAllQuotes();
        res.json(quotes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get a quote by ID (for customer/admin)
exports.getQuoteById = async (req, res) => {
    try {
        const quote = await quoteService.getQuoteById(req.params.id);
        if (!quote) return res.status(404).json({ message: "Quote not found" });
        res.json(quote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.sendQuoteToCustomer = async (req, res) => {
    try {
        const { quoteId, quotedPrice, priceDescription, adminMessage } = req.body;
        const quote = await quoteService.getQuoteById(quoteId);
        if (!quote) {
            return res.status(404).json({ error: 'Quote not found' });
        }

      
        const updatedQuote = await quoteService.updateQuote(quoteId, {
            quotedPrice,
            priceDescription,
            adminMessage,
            status: 'QUOTED', 
            quoteSentDate: new Date()
        });

        await emailService.sendAdminQuoteResponse(updatedQuote);

        res.status(200).json({
            message: 'Quote sent successfully',
            quote: updatedQuote
        });
    } catch (error) {
        console.error('Error in sendQuoteToCustomer:', error);
        res.status(500).json({ error: error.message });
    }
};

// Update quote status
exports.updateQuoteStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }

        const quote = await quoteService.getQuoteById(id);
        if (!quote) {
            return res.status(404).json({ error: 'Quote not found' });
        }

        const updatedQuote = await quoteService.updateQuote(id, { status });

        res.status(200).json({
            message: 'Quote status updated successfully',
            quote: updatedQuote
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update quote details
exports.updateQuote = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const quote = await quoteService.getQuoteById(id);
        if (!quote) {
            return res.status(404).json({ error: 'Quote not found' });
        }

        const updatedQuote = await quoteService.updateQuote(id, updateData);

        res.status(200).json({
            message: 'Quote updated successfully',
            quote: updatedQuote
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get pending quotes
exports.getPendingQuotes = async (req, res) => {
    try {
        const pendingQuotes = await quoteService.getQuotesByStatus('PENDING');
        res.status(200).json(pendingQuotes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get quoted quotes
exports.getQuotedQuotes = async (req, res) => {
    try {
        const quotedQuotes = await quoteService.getQuotesByStatus('QUOTED');
        res.status(200).json(quotedQuotes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};