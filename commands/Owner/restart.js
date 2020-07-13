exports.run = async (bot, message, args, loG) => {
    const Discord = require("discord.js")
    const { TOKEN, PREFIX, mytime, activity, ownerid, clientID} = require('../../modules/config');
    try {
        message.channel.send("Restarting!..")
        .then(()=>process.exit())
    }catch(e) {message.channel.send(`There was an error with ending.. :\n ${e.message} `)}



}
exports.help= {
    usage:'+restart',
    desc:'Restarts downs the bot'
}