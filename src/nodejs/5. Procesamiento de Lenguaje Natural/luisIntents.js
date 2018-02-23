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


let luisApp = '>>> aqui to codigo de app de luis <<<';
let luisKey = '>>> aqui tu key <<<';

// Crear un procesador LUIS que apunte a nuestro modelo en el root (/)   
var model = `https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/${luisApp}?subscription-key=${luisKey}&verbose=true&timezoneOffset=60&q=` // VERIFICAR LA URL SEA LA CORRECTA

var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', dialog);

// Esta función se ejecuta cuando el Intent == ordenarTaxi
dialog.matches('add expense', [
    function (session, args, next) {
        //builder.Prompts.text(session, 'Nuevo gasto recibido!');
        session.send(`Nuevo gasto recibido`)
        let info = {
            cost : 0,
            currency : '',
            type : '',
        };
        let eCost = builder.EntityRecognizer.findEntity(args.entities, 'cost');
        let eCurrency = builder.EntityRecognizer.findEntity(args.entities, 'currency');
        let eType = builder.EntityRecognizer.findEntity(args.entities, 'typeExpense');
        if(eCost) info.cost = eCost.entity;
        if(eCurrency) info.currency = eCurrency.entity;
        if(eType) info.type = eType.entity;
               
        let card = createReceiptCard(session, info);
        var msg = new builder.Message(session).addAttachment(card);
        session.send(msg);
        
    },
    // function(session, args) {
    //     session.send(`¿quieres añadir algún detalle del gasto?`)
    // }
]);

dialog.matches('sendExpenses', [
    function (session, args, next) {
        session.send('Ok, procedemos al envío de tu hoja de gastos al departamento financiero.')
    }
]);

//Este es el Default, cuando LUIS no entendió la consulta.
dialog.onDefault(builder.DialogAction.send("Lo siento, no pude entenderte. Me lo puedes decir de nuevo pero de otra manera, por favor?"));


function createReceiptCard(session, data) {

    let imgFlight = builder.CardImage.create(session, 'https://cdn4.iconfinder.com/data/icons/aiga-symbol-signs/444/aiga_departingflights-64.png')
    let imgTaxi = builder.CardImage.create(session, 'https://cdn4.iconfinder.com/data/icons/aiga-symbol-signs/388/aiga_taxi-64.png')
    let imgDefault = builder.CardImage.create(session, 'https://cdn2.iconfinder.com/data/icons/picol-vector/32/document_text-64.png')

    let img= imgDefault;
    if(data.type && data.type.indexOf("taxi") >= 0 )
        img = imgTaxi
    if(data.type && data.type.indexOf("vuelo") >= 0 )
        img = imgFlight


    let totalWithVat = data.cost * 0.21;
    totalWithVat += data.cost  * 1;
    return new builder.ReceiptCard(session)
        .title('David Gonzalo')
        .facts([
            builder.Fact.create(session, '05/02/2018', 'Fecha'),
        ])
        .items([
            builder.ReceiptItem.create(session, data.cost + ' €', data.type).image(img),
        ])
        .tax('21 %')        
        .total(totalWithVat + '')        
        ;
}