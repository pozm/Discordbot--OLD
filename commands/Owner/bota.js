var attempts = 0
exports.run = async (bot, message, args, loG) => {
    const Discord = require("discord.js")
    var { TOKEN, PREFIX, mytime, activity, ownerid, clientID, BOTA} = require('../../modules/config');
    delete require.cache[require.resolve(`../../modules/config.js`)];
    botac = bot.channels.get(BOTA.channel)
    botac.fetchMessages({ limit: 1 }).then(m =>m.forEach(async(messageg, id) => {
        if (messageg.content == BOTA.a) {
            message.channel.send('I have detected that the currently cached bota is the same as the old one, i will now clear and try again.').then(m=>m.delete(5000))
            delete require.cache[require.resolve('../../modules/config')]
            if (attempts > 0) return message.channel.send('I Checked two times, and i was unable to get a new value.'),attempts=0
            attempts++
            exports.run(bot,message,args,loG)
            return;
        }
        bot.channels.get(BOTA.channel).send(BOTA.a)
    }))
}
exports.help= {
    usage:'+bota',
    desc:'bot annoucement.'
}