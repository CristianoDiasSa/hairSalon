const accountSid = 'ACfc75e79dc1376951d54db69888d5c1b8';
const authToken = 'd6e5ef82ab035521dc8869f378514e92';
const client = require('twilio')(accountSid, authToken);

var express = require('express');
var port = process.env.PORT || 3000;
var app = express();

function sendMessageToWhatsApp(number, message) {
  client.messages
    .create({
      from: 'whatsapp:+14155238886',
      to: `whatsapp:${number}`,
      body: message
    })
    .then(message => console.log(`Message sent to ${message.to}`))
    .catch(error => console.log(error));
}

// Express route handler for the form submission
app.post('/submit-form', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = `Name: ${name}\nEmail: ${email}`;
  const phoneNumber = 'whatsapp number to send the message to';

  sendMessageToWhatsApp(phoneNumber, message);

  res.send('Message sent!');
});


var listener = app.listen(port, function () {
    console.log('Your app is listening on port ' + listener.address().port);
  });