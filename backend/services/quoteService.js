const db = require('../db/db'); 


exports.createQuote = async (quoteData) => {
    const { FullName, Email, PhoneNumber, EventType, EventDate, EventVenue, EstimatedNumberOfGuests, PreferredFloralColors } = quoteData;
    const [result] = await db.query(
        "INSERT INTO Quotes (FullName, Email, PhoneNumber, EventType, EventDate, EventVenue, EstimatedNumberOfGuests, PreferredFloralColors,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [FullName, Email, PhoneNumber, EventType, EventDate, EventVenue, EstimatedNumberOfGuests, PreferredFloralColors, 'PENDING' ]
    );

    return { id: result.insertId, ...quoteData };
};

// Function to get all quotes (for admin perspective)
exports.getAllQuotes = async () => {
    const [rows] = await db.query("SELECT * FROM Quotes");
    return rows;
};

// Function to get a quote by ID (for customer/admin perspective)
exports.getQuoteById = async (id) => {
    const [rows] = await db.query("SELECT * FROM Quotes WHERE id = ?", [id]);
    if (rows.length === 0) return null;
    return rows[0];
};


exports.updateQuote = async (id, updateData) => {
    try {
        const updateFields = [];
        const updateValues = [];


        if (updateData.quotedPrice !== undefined) {
            updateFields.push('quotedPrice = ?');
            updateValues.push(updateData.quotedPrice);
        }
        if (updateData.priceDescription !== undefined) {
            updateFields.push('priceDescription = ?');
            updateValues.push(updateData.priceDescription);
        }
        if (updateData.adminMessage !== undefined) {
            updateFields.push('adminMessage = ?');
            updateValues.push(updateData.adminMessage);
        }
        if (updateData.status !== undefined) {
            updateFields.push('status = ?');
            updateValues.push(updateData.status);
        }
        if (updateData.quoteSentDate !== undefined) {
            updateFields.push('quoteSentDate = ?');
            updateValues.push(updateData.quoteSentDate);
        }

        // Add the ID to the values array
        updateValues.push(id);

        const query = `
            UPDATE quotes 
            SET ${updateFields.join(', ')}
            WHERE id = ?
        `;

        await db.query(query, updateValues);
        
        return this.getQuoteById(id);
    } catch (error) {
        console.error('Error in updateQuote:', error);
        throw new Error('Failed to update quote');
    }
};

exports.getQuotesByStatus = async (status) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM quotes WHERE status = ? ORDER BY EventDate ASC',
            [status]
        );
        return rows;
    } catch (error) {
        console.error('Error in getQuotesByStatus:', error);
        throw new Error('Failed to get quotes by status');
    }
};

