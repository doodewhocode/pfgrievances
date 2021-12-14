const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    "92257743746-1u04edf97ha6vr4o9kvuet39feif35ol.apps.googleusercontent.com", // ClientID
    "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", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: "1//04AUnJxv2A1gzCgYIARAAGAQSNwF-L9Ir2NN0mCHREjtJr8_fyNlT0Og36MX-71IRhjtm_QfHoLOMNM6B5fFbB20Tpd537tdvy64"
});

module.exports.sendMail = async function (mailOptions, callback) {
    const accessToken = await oauth2Client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "info@complyhrm.com",
            clientId: "92257743746-1u04edf97ha6vr4o9kvuet39feif35ol.apps.googleusercontent.com",
            clientSecret: "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",
            refreshToken: "1//04AUnJxv2A1gzCgYIARAAGAQSNwF-L9Ir2NN0mCHREjtJr8_fyNlT0Og36MX-71IRhjtm_QfHoLOMNM6B5fFbB20Tpd537tdvy64",
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