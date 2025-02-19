exports.customerQuoteResponseTemplate = (quote, logoBase64) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Quote Request</title>
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
            <h1>Thank You for Your Quote Request</h1> 
        </div>
        <div class="content">
            <p>Dear ${quote.FullName},</p>
            <p>Thank you for your quote request. Here are the details of your request:</p>
            <div class="quote-detail">
             <p><strong>Quote ID:</strong> #${quote.id}</p>
                <p><strong>Event Type:</strong> ${quote.EventType}</p>
                <p><strong>Event Date:</strong> ${quote.EventDate}</p>
                <p><strong>Event Venue:</strong> ${quote.EventVenue}</p>
                <p><strong>Estimated Number of Guests:</strong> ${quote.EstimatedNumberOfGuests}</p>
                <p><strong>Preferred Floral Colors:</strong> ${quote.PreferredFloralColors}</p>
            </div>
            <p>We will get back to you shortly with more details!</p>
        </div>
        <div class="footer">
            &copy; 2025 Your Company Name. All rights reserved.
        </div>
    </div>
</body>
</html>
`;