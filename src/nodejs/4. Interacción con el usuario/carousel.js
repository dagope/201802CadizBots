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

var data = [
    { title: 'Goku normal',         subtitle: 'normal', text:'Un personaje sonriente',          urlImage: 'https://www.aquilomire.com/wp-content/uploads/2018/02/goku_by_maffo1989-d4vxux4.png'},
    { title: 'Goku Superguerro N1', subtitle: 'N1', text:'Suficiente para matar a Freezer',     urlImage: 'https://cdn2.areajugones.es/wp-content/uploads/2017/05/Goku_ssj_full_power.png'},
    { title: 'Goku Superguerro N2', subtitle: 'N2', text:'Aumenta el poder de Goku 100 veces',  urlImage: 'https://cdn4.areajugones.es/wp-content/uploads/2017/05/Goku_SSJ2_Electric.png'},
    { title: 'Goku Superguerro N3', subtitle: 'N3', text:'400 veces aumenta el poder de Goku desde su estado base', urlImage: 'https://cdn3.areajugones.es/wp-content/uploads/2017/05/SSJ3-1024x576.png'},
    { title: 'Goku Superguerro N4', subtitle: 'N4', text:'Obtenido tras controlar al mono dorado', urlImage: 'https://cdn4.areajugones.es/wp-content/uploads/2017/05/GokuSS4DBGT01.png'},            
    { title: 'Goku Superguerro God', subtitle: 'Dios', text:'Con ayuda de 5 Saiyans', urlImage: 'https://cdn4.areajugones.es/wp-content/uploads/2017/05/saiyangoddragonball.jpg'},
    { title: 'Goku Superguerro Blue ', subtitle: 'Blue', text:'Super Saiyan God Super Saiyan', urlImage: 'https://cdn2.areajugones.es/wp-content/uploads/2015/10/super_saiyan_god_super_saiyan__ssgss__goku_by_mikkkiwarrior3-d8wv7hx.jpg'},
];

// Dialogos
bot.dialog('/', [
    function (session) {
        var cards = getCards(session);         
        var msj = new builder.Message(session).attachmentLayout(builder.AttachmentLayout.carousel).attachments(cards);
        session.send(msj);            
        builder.Prompts.text(session, 'el siguiente en modo hero');
    },
    function (session, results) {
        var cards = getCards(session, 'hero');
        var msj = new builder.Message(session).attachmentLayout(builder.AttachmentLayout.carousel).attachments(cards);
        session.send(msj);
    }
]);

function getCards(session, typeCard){
    let cards = [];
    data.forEach(item => {
        let c = new builder.ThumbnailCard(session);        
        if(typeCard == 'hero')
            c = new builder.HeroCard(session);        
        
        c.title(item.title)
            .subtitle(item.subtitle)
            .text(item.text)
            .images([builder.CardImage.create(session, item.urlImage)])
            .buttons([builder.CardAction.openUrl(session, 'https://areajugones.sport.es/2017/10/08/las-20-transformaciones-de-goku-en-dragon-ball/', 'ver mas')])

        cards.push(c)
    });
    return cards
}

