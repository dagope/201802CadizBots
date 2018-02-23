var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Credenciales  para conectar a los Canales.
var connector = new builder.ChatConnector({
    appId: '', //process.env.MicrosoftAppId,
    appPassword: '', // process.env.MicrosoftAppPassword
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());


var bot = new builder.UniversalBot(connector);
bot.set('storage', new builder.MemoryBotStorage());
bot.dialog('/', [ 
    Q_WhatsYourName, A_WhatsYourName
]);

function Q_WhatsYourName(session){
    builder.Prompts.text(session, "Hola, ¿Cómo te llamas?")    
}
function A_WhatsYourName(session, results){
    let name = results.response
    let answer = `Hola ${name}!`
    session.send(answer)
}