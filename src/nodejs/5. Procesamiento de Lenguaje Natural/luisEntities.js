var restify = require('restify');
var builder = require('botbuilder');

// Levantar restify
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// No te preocupes por estas credenciales por ahora, luego las usaremos para conectar los canales.
var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

// Ahora utilizamos un UniversalBot
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Para utilizar variables de entorno
dotenv.config();

let luisApp = '>>> aqui to codigo de app de luis <<<';
let luisKey = '>>> aqui tu key <<<';

// Crear un procesador LUIS que apunte a nuestro modelo en el root (/)
var model = `https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/${luisApp}?subscription-key=${luisKey}&verbose=true&timezoneOffset=60&q=`

var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', dialog);

// Esta función se ejecuta cuando el Intent == add expense
dialog.matches('add expense', [
    function (session, args, next) {
        session.send(`Nuevo gasto recibido`)
    }
]);

// Esta función se ejecuta cuando el Intent == sendExpenses
dialog.matches('sendExpenses', [
    function (session, args, next) {
        session.send('Ok, procedemos al envío de tu hoja de gastos al departamento financiero.')
    }
]);

//Este es el Default, cuando LUIS no entendió la consulta.
dialog.onDefault(builder.DialogAction.send("Lo siento, no pude entenderte. Me lo puedes decir de nuevo pero de otra manera, por favor?"));