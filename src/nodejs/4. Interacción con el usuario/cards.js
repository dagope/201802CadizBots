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
        
        builder.Prompts.choice(session, '¿Que tipo de tarjeta quieres ver?', CardNames, {
            maxRetries: 3,
            listStyle: builder.ListStyle.button,
            retryPrompt: 'Try again'
        });
        
    },
    function (session, results) {

        // create the card based on selection
        var selectedCardName = results.response.entity;
        var card = createCard(selectedCardName, session);

        // attach the card to the reply message
        var msg = new builder.Message(session).addAttachment(card);
        session.send(msg);
    }
]);

var HeroCardName = 'Hero card';
var ThumbnailCardName = 'Thumbnail card';
var ReceiptCardName = 'Receipt card';
var SigninCardName = 'Sign-in card';
var AnimationCardName = "Animation card";
var VideoCardName = "Video card";
var AudioCardName = "Audio card";
var CardNames = [HeroCardName, ThumbnailCardName, ReceiptCardName, SigninCardName, AnimationCardName, VideoCardName, AudioCardName];

function createCard(selectedCardName, session) {
    switch (selectedCardName) {
        case HeroCardName:
            return createHeroCard(session);
        case ThumbnailCardName:
            return createThumbnailCard(session);
        case ReceiptCardName:
            return createReceiptCard(session);
        case SigninCardName:
            return createSigninCard(session);
        case AnimationCardName:
            return createAnimationCard(session);
        case VideoCardName:
            return createVideoCard(session);
        case AudioCardName:
            return createAudioCard(session);
        default:
            return createHeroCard(session);
    }
}

var data = {
    title: 'Son Goku',         
    subtitle: 'Saiyan', 
    text:'Protagonista del manga y anime Dragon Ball creado por Akira Toriyama',          
    urlImage: 'https://www.aquilomire.com/wp-content/uploads/2018/02/goku_by_maffo1989-d4vxux4.png'
};

function createHeroCard(session) {    
    return new builder.HeroCard(session)
        .title(data.title)
        .subtitle(data.subtitle)
        .text(data.text)
        .images([
            builder.CardImage.create(session, data.urlImage)                
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'https://areajugones.sport.es/2017/10/08/las-20-transformaciones-de-goku-en-dragon-ball/', 'mas info'),
            builder.CardAction.openUrl(session, 'https://areajugones.sport.es/2017/10/08/las-20-transformaciones-de-goku-en-dragon-ball/', 'abrir')
        ]);

}
function createThumbnailCard(session) {
    return new builder.ThumbnailCard(session)
        .title(data.title)
        .subtitle(data.subtitle)
        .text(data.text)
        .images([
            builder.CardImage.create(session, data.urlImage)                
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'https://areajugones.sport.es/2017/10/08/las-20-transformaciones-de-goku-en-dragon-ball/', 'mas info'),
            builder.CardAction.openUrl(session, 'https://areajugones.sport.es/2017/10/08/las-20-transformaciones-de-goku-en-dragon-ball/', 'abrir')
        ]);
}

var order = 1234;
function createReceiptCard(session) {

    return new builder.ReceiptCard(session)
        .title('David Gonzalo')
        .facts([
            builder.Fact.create(session, '05/02/2018', 'Fecha'),
            builder.Fact.create(session, '1123', 'N.Pedido'),
            builder.Fact.create(session, 'VISA 5555-****', 'Método de pago')
        ])
        .items([
            builder.ReceiptItem.create(session, '38 €', 'Vuelo a BCN')                
                .image(builder.CardImage.create(session, 'https://cdn4.iconfinder.com/data/icons/aiga-symbol-signs/444/aiga_departingflights-64.png')),
            builder.ReceiptItem.create(session, '45 €', 'Taxi a Tokiota Inc.')                
                .image(builder.CardImage.create(session, 'https://cdn4.iconfinder.com/data/icons/aiga-symbol-signs/388/aiga_taxi-64.png'))
        ])
        .tax('21 %')        
        .total('100.43')        
        .buttons([
            builder.CardAction.openUrl(session, 'https://myapisenttoemail', 'Enviar por email')
                .image('https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-email-outline-64.png')
        ]);
}




function createSigninCard(session) {
    return new builder.SigninCard(session)
        .text('BotFramework Sign-in Card')        
        .button('Sign-in', 'https://login.microsoftonline.com');
}

function createAnimationCard(session) {
    return new builder.AnimationCard(session)
        .title('Goku OK')
        .subtitle('Animation Card')
        .image(builder.CardImage.create(session, 'https://docs.microsoft.com/en-us/bot-framework/media/how-it-works/architecture-resize.png'))
        .media([
            { url: 'https://media.giphy.com/media/6XsJEllKKX9MQ/giphy.gif' }
        ]);
}

function createVideoCard(session) {
    return new builder.VideoCard(session)
        .title('Transformaciones de goky')
        .subtitle('from youtube')
        .text('AQUÍ TODAS LAS TRANSFORMACIONES DE GOKU (Incluyendo SSJ Dios Azul)')
        .image(builder.CardImage.create(session, 'https://pm1.narvii.com/6327/e325f0d5b20a08de91cce65c1f70f14496b12960_hq.jpg'))
        .media([
            { url: 'https://www.youtube.com/watch?v=kiuIp7Huvsg' }
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'https://peach.blender.org/', 'Learn More')
        ]);
}

function createAudioCard(session) {
    return new builder.AudioCard(session)
        .title('I am your father')
        .subtitle('Star Wars: Episode V - The Empire Strikes Back')
        .text('The Empire Strikes Back (also known as Star Wars: Episode V – The Empire Strikes Back) is a 1980 American epic space opera film directed by Irvin Kershner. Leigh Brackett and Lawrence Kasdan wrote the screenplay, with George Lucas writing the film\'s story and serving as executive producer. The second installment in the original Star Wars trilogy, it was produced by Gary Kurtz for Lucasfilm Ltd. and stars Mark Hamill, Harrison Ford, Carrie Fisher, Billy Dee Williams, Anthony Daniels, David Prowse, Kenny Baker, Peter Mayhew and Frank Oz.')
        .image(builder.CardImage.create(session, 'https://upload.wikimedia.org/wikipedia/en/3/3c/SW_-_Empire_Strikes_Back.jpg'))
        .media([
            { url: 'http://www.wavlist.com/movies/004/father.wav' }
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'https://en.wikipedia.org/wiki/The_Empire_Strikes_Back', 'Read More')
        ]);
}