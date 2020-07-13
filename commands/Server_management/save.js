exports.run = async (bot, message, args) => {
    const Discord = require("discord.js")
    const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, hexcolor,} = require('../../modules/config');
    let amount = args[0] = parseInt(args[0]) + 1
    if(!amount) amount = 10
    var savd = []
    var unisav = bot.channels.get("555124556789055520")
    var byy = message.author
    var tempsav = message.content
    message.channel.fetchMessages({ limit: amount }).then(m =>m.forEach(async(message, id) => {
        const Created = message.createdAt.toLocaleString('EN-GB')
        if(message.content.includes("save")) "a"
        else {
        savd.push(message.content + " `|` " + message.author.username + " `|` " + Created + `\n`)
    }
        
    }
    )
    ).then( async() => {
        savd = savd.join(""),
        slogs.send(`---------------------\n ${amount--} messages saved by ${byy.username} \n ${savd}`),
        unisav.send(`---------------------\n ${amount--} messages saved by ${byy.username} \n ${savd}`)
    })
    /*slogs.send(`-------\n ${amount--} messages saved by ${byy.username}`)
    unisav.send(`-------\n ${amount--} messages saved by ${byy.username}`)*/
    message.channel.send("saved!")





}
exports.help = {
    usage:"+save <amount(default is 10)>",
    perms:['MANAGE_CHANNELS'],
    desc:'saves messages'
}