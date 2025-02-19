
exports.adminQuoteNotificationTemplate = (quote, logoBase64) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Quote Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #FFF5FF;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 5px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #491247;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .logo {
            max-width: 150px;
            height: auto;
        }
        .content {
            padding: 20px;
            color: #000000;
        }
        .quote-detail {
            background-color: #FFF5FF;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
        }
        .footer {
            background-color: #491247;
            color: #ffffff;
            text-align: center;
            padding: 10px;
            font-size: 12px;
        }
        h1 {
            margin: 0;
            font-size: 24px;
            color: #ffffff;
        }
        p {
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
             <img src="cid:company-logo" alt="Company Logo" class="logo">
            <h1>New Quote Request - #${quote.id}</h1>
        </div>
        <div class="content">
            <p>A new quote request has been submitted:</p>
            <div class="quote-detail">
                <p><strong>Full Name:</strong> ${quote.FullName}</p>
                <p><strong>Email:</strong> ${quote.Email}</p>
                <p><strong>Phone Number:</strong> ${quote.PhoneNumber}</p>
                <p><strong>Event Type:</strong> ${quote.EventType}</p>
                <p><strong>Event Date:</strong> ${quote.EventDate}</p>
                <p><strong>Event Venue:</strong> ${quote.EventVenue}</p>
                <p><strong>Estimated Number of Guests:</strong> ${quote.EstimatedNumberOfGuests}</p>
                <p><strong>Preferred Floral Colors:</strong> ${quote.PreferredFloralColors}</p>
            </div>
        </div>
        <div class="footer">
            &copy; 2025 Emirose. All rights reserved.
        </div>
    </div>
</body>
</html>
`;

//send quotes to customers
exports.adminQuoteResponseTemplate = (quote, logoBase64) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Quote Details</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #FFF5FF;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 5px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #491247;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .logo {
            max-width: 150px;
            height: auto;
        }
        .content {
            padding: 20px;
            color: #000000;
        }
        .quote-detail {
            background-color: #FFF5FF;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
        }
        .price-section {
            background-color: #491247;
            color: #ffffff;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
            text-align: center;
        }
        .footer {
            background-color: #491247;
            color: #ffffff;
            text-align: center;
            padding: 10px;
            font-size: 12px;
        }
        h1 {
            margin: 0;
            font-size: 24px;
            color: #ffffff;
        }
        p {
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="cid:company-logo" alt="Company Logo" class="logo">
            <h1>Your Quote Details - #${quote.id}</h1>
        </div>
        <div class="content">
            <p>Dear ${quote.FullName},</p>
            <p>Thank you for your interest in our services. We're pleased to provide you with a quote for your event:</p>
            
            <div class="quote-detail">
                <p><strong>Event Details:</strong></p>
                <p><strong>Event Type:</strong> ${quote.EventType}</p>
                <p><strong>Event Date:</strong> ${quote.EventDate}</p>
                <p><strong>Event Venue:</strong> ${quote.EventVenue}</p>
                <p><strong>Number of Guests:</strong> ${quote.EstimatedNumberOfGuests}</p>
                <p><strong>Preferred Floral Colors:</strong> ${quote.PreferredFloralColors}</p>
            </div>

            <div class="price-section">
                <h2>Quote Amount</h2>
                <p style="font-size: 24px; font-weight: bold;">$${quote.quotedPrice}</p>
                <p>${quote.priceDescription || 'Includes all arrangements and setup'}</p>
            </div>

            <p>${quote.adminMessage || 'We would be honored to be part of your special day. This quote is valid for 14 days.'}</p>
            
            <p>To proceed with this quote or if you have any questions, please:</p>
            <ul>
                <li>Reply to this email</li>
                <li>Call us at: ${process.env.COMPANY_PHONE || '1-234-567-8900'}</li>
            </ul>
        </div>
        <div class="footer">
            &copy; 2025 Emirose. All rights reserved.
        </div>
    </div>
</body>
</html>
`;
