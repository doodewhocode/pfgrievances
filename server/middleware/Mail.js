const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,// ClientID
    process.env.CLIENT_SECRET,// Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});

var smtpTransport = require("nodemailer-smtp-transport")

var transporterDetails = smtpTransport({
    host: 'mail.complyhrm.com',
    port: 587,
    secure: true,
    secureConnection: false, // TLS requires secureConnection to be false
    debug: true,
    auth: {
        user: "noreply@complyhr.com",
        pass: "yH!!H},vOvn_"
    },
    maxConnections: 5,
    maxMessages: 10
})

module.exports.cPanelMail = async function (mailOptions, callback) {
    var transporter = nodemailer.createTransport(transporterDetails);
    transporter.sendMail(mailOptions, (error, response) => {
        //error ? callback(error) : callback(response)
        callback(error, response)
        transporter.close();
    });
}

module.exports.sendMail = async function (mailOptions, callback) {
    const accessToken = await oauth2Client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.ADMIN_MAIL_ID,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    smtpTransport.sendMail(mailOptions, (error, response) => {
        //error ? callback(error) : callback(response)
        callback(error, response)
        smtpTransport.close();
    });
}