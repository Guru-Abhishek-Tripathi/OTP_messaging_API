const express = require('express');
const router = express.Router();

const accountSid = 'AC9bb19c5e3730ac2fe58823f81dd40300';
const authToken = '3c1d41f08fea759fc826ae0fd942822a';
const client = require('twilio')(accountSid, authToken);

router.post('/send', (req, res) => {
    console.log('req.body.Body', req.body.Body);

    client.messages
    .create({
        body: req.body.message,
        from: '+17329634477',
        to: req.body.to
    }).then(message => {
        console.log("MESSAGE: " + JSON.stringify(message));
        res.send({data:message.status});
    }, error => res.send({data:error.status}));
});

router.get('/smslist', (req, res) => {
    client.messages
    .list({linit: 100})
    .then(messages => {
        console.log("MESSAGES LIST: " + JSON.stringify(messages));
        var data = [];
        messages.forEach(m => {
            var object = {message: m.body, date: m.dateUpdated};
            data.push(object);
        });
        res.send(data);
    }, error => res.send(error));
});

router.get('/hello', (req, res)=> {
    var data = {
        "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "api_version": "2010-04-01",
        "body": "This is the ship that made the Kessel Run in fourteen parsecs?",
        "date_created": "Thu, 30 Jul 2015 20:12:31 +0000",
        "date_sent": "Thu, 30 Jul 2015 20:12:33 +0000",
        "date_updated": "Thu, 30 Jul 2015 20:12:33 +0000",
        "direction": "outbound-api",
        "error_code": null,
        "error_message": null,
        "from": "+15017122661",
        "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "num_media": "0",
        "num_segments": "1",
        "price": null,
        "price_unit": null,
        "sid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "status": "sent",
        "subresource_uris": {
            "media": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Media.json"
        },
        "to": "+15558675310",
        "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json"
    };

    console.log(data.status);

    res.send(JSON.stringify({
        "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "api_version": "2010-04-01",
        "body": "This is the ship that made the Kessel Run in fourteen parsecs?",
        "date_created": "Thu, 30 Jul 2015 20:12:31 +0000",
        "date_sent": "Thu, 30 Jul 2015 20:12:33 +0000",
        "date_updated": "Thu, 30 Jul 2015 20:12:33 +0000",
        "direction": "outbound-api",
        "error_code": null,
        "error_message": null,
        "from": "+15017122661",
        "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "num_media": "0",
        "num_segments": "1",
        "price": null,
        "price_unit": null,
        "sid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "status": "sent",
        "subresource_uris": {
            "media": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Media.json"
        },
        "to": "+15558675310",
        "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json"
    }));
})
module.exports = router;