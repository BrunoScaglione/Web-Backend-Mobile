// unlike the flask app, here we dont have only server side(have to load page to change things for ex)
// here we have server interfaced with client
// our client is the vue application running in the browser
// our server is  a node.js server;

//Have we built a restful api?
// requirements:
//client-server architecture: yes
//statelessness: yes (we  arent requiring any prior knowledge about the client)
//layered system: yes
//cacheability: we could do it
// Uniform Design{
// resource identification in requests: no (cuurently we are just representing all the compliments as strings and absolutely no way to identify them)
// resource manipulation through representations : no (we did  not allow )any manipulation of comments)
// self-descriptive messages: by using headers we can tell that this is json, the message sent down has a type and is clear that json decoded should be used
// HATEOS: proovides links, uris to learn more, documentation ..
//}

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const TwilioClient = require("twilio");
const app = express();
const port = 3000;

const client = new TwilioClient();
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// This is a single page application and it's all rendered in public/index.html
app.use(express.static("public"));
// Parse the body of requests automatically
app.use(bodyParser.json());

app.get("/api/compliments", async(req, res) => {
    // DONE: Get a list of messages sent from a specific number
    const sentMessages = await client.messages.list({ from: twilioPhoneNumber });
    // DONE: Gather only the body of those messages for sending to the client
    const compliments = sentMessages.map(message => message.body);
    res.json(compliments);
});

app.post("/api/compliments", async(req, res) => {
    const to = req.body.to;
    const from = process.env.TWILIO_PHONE_NUMBER;
    const body = `${req.body.sender} says: ${req.body.receiver} is ${req.body.compliment}. See more compliments at ${req.headers.referer}`;
    // verificar erros: por exemplo um número de telefone "42" 
    try {
        await client.messages.create({ to, from, body })
    } catch (err) {
        res.status(err.status).json({ sucess: false, message: err.message });
    }

    // TODO: Send a message
    await client.messages.create({ to, from, body }) // javascript sabe que eu quero dizer to: to etc
    res.json({ success: true });
});

app.listen(port, () => console.log(`Prototype is listening on port ${port}!`));