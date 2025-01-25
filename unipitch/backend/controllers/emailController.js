const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;  // Make sure to update to your callback URL
const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];


// Google OAuth redirect
exports.googleAuth = (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    res.redirect(authUrl);
};

// Google OAuth callback to handle token exchange
exports.googleAuthCallback = async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).send('Code not received');
    }

    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        if (!req.session) {
            return res.status(500).send('Session is not properly configured');
        }

        req.session.tokens = tokens; // Save tokens to session
        console.log('Tokens received:', tokens);

        res.send('Authorization successful! You can now send emails.');
    } catch (error) {
        console.error('Error during OAuth callback:', error);
        res.status(500).send('Error during OAuth callback');
    }
};




// Send email
exports.sendEmail = async (req, res) => {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
        return res.status(400).send('Missing required email fields.');
    }

    try {
        // Retrieve the OAuth credentials from session or wherever they were stored
        const tokens = req.session.tokens;  // Ensure the tokens are available

        if (!tokens) {
            return res.status(401).send('Authorization required.');
        }

        oauth2Client.setCredentials(tokens); // Set the credentials again

        const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

        const rawMessage = createRawMessage(to, subject, text);

        // Send the email
        await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: rawMessage,
            },
        });

        res.status(200).send('Email sent successfully.');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email.');
    }
};


// Helper function to encode email message in base64url
const createRawMessage = (to, subject, text) => {
    const message = [
        `To: ${to}`,
        `Subject: ${subject}`,
        '',
        text,
    ].join('\n');

    const encodedMessage = Buffer.from(message).toString('base64');
    return encodedMessage.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

