// após npm install twilio no prompt do node (instalar a biblioteca):
const Twilio = require("twilio")
//account sid, auth token
const client = new Twilio("AC3cf05e958bdc5c8bfd5baa701c8ced7e", "ac13d4a7d5253d355a5227080cfb0321")
//be carefull with the keys, we would have to substitute with environment variables 
// asyncronys method.This means that we  will go to the next line normally, and only whrn the request is ready do the then part
// the library automatically transformed de http response which is a JSON into an object
// //.list and.then are promises, every promise has the method .catch that we use to see if an error ocurs. Withou catch, since it is asyncron, it would just print Garhering... and woudnt show the error
client.messages.list().then(messages => console.log(`The most recent message is ${messages[0].body}`)).catch(err => console.error(err));
console.log('Gathering your message log')
// agora pra rodar a gente vai no prompt do node e coloca explore.js

