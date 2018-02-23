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
bot.set('storage', new builder.MemoryBotStorage());
server.post('/api/messages', connector.listen());

// Dialogos
bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, '¿Cómo te llamas?');
    },
    function (session, results) {
        let msj = results.response;
        session.send(`Hola ${msj}!`);

        session.beginDialog('/preguntarLugar');
    },
    function (session) {
        if (session.dialogData.lugar) {
            session.send(`Saludos por ${session.userData.lugar}`);
        }
        else {
            session.send('Ya no me acuerdo donde estás.');
        }
    }
]);

bot.dialog('/preguntarLugar', [
    function (session) {
        builder.Prompts.text(session, '¿Dónde estás?');
    },
    function (session, results) {
        session.dialogData.lugar = results.response;

        session.endDialog(`Saludos por ${session.dialogData.lugar} (me acuerdo en este diálogo!)`)
    }
]);