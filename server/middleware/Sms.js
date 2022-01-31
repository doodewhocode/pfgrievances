const SMS = require('smsalert');
const sms = new SMS(username, password);



module.exports.sendSMS = async function (message, callback) {
    const resultMessage = sms.send(to, message, senderid).then((response) => {
        callback(response)
    }).catch(error => {
        callback(error)
    });
} 