var restify = require('restify');
var builder = require('botbuilder');

let https = require ('https');
let analyticsLangKey = '>>> aqui tu key <<<';
let uri = 'westeurope.api.cognitive.microsoft.com';
let path = '/text/analytics/v2.0/languages';

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
bot.dialog('/', [ 
    Q_Hello, A_DetectedLang
]);

function Q_Hello(session){
    builder.Prompts.text(session, "Hola, escribe algo y yo te diré en que idioma me hablas ;)")    
}
function A_DetectedLang(session, results){
    session.send("un segundo que estoy pensando....")    
    let text = results.response
    getLanguage(text).then( response => {
        let langs = ''
        response.documents[0].detectedLanguages.forEach(item => {
            langs += `- ${item.name}(${item.iso6391Name})`
        });
        session.send(`Me has hablado en: ${langs}`);
    });
    
}

function getLanguage(text){
    return new Promise(function(resolve, reject) {
        let documents = { 'documents': [
            { 'id': '1', 'text': text }
        ]};
        let body = JSON.stringify (documents);

        let request_params = {
            method : 'POST',
            hostname : uri,
            path : path,
            headers : {
                'Ocp-Apim-Subscription-Key' : analyticsLangKey,
            }
        };
    
        let req = https.request (request_params, function(response){
            let body = '';
            response.on ('data', function (d) {
                body += d;
            });
            response.on ('end', function () {
                let body_ = JSON.parse (body);
                let body__ = JSON.stringify (body_, null, '  ');
                console.log (body__);
                resolve(JSON.parse(body__));
            });
            response.on ('error', function (e) {
                console.log ('Error: ' + e.message);
                reject(err);
            }); 
        });
        req.write (body);
        req.end ();

    });
}

let response_handler = function (response) {
    let body = '';
    response.on ('data', function (d) {
        body += d;
    });
    response.on ('end', function () {
        let body_ = JSON.parse (body);
        let body__ = JSON.stringify (body_, null, '  ');
        console.log (body__);
    });
    response.on ('error', function (e) {
        console.log ('Error: ' + e.message);
    });
};