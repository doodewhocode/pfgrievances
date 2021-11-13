const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    "", // ClientID
    "", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: ""
});

module.exports.sendMail = async function (mailOptions, callback) {
    const accessToken = await oauth2Client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "",
            clientId: "",
            clientSecret: "",
            refreshToken: "",
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