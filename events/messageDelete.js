
module.exports = async (bot, message) => {
    const Discord = require("discord.js");
    const fs = require("fs")
    const server = locate.SERVER
    const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, logid, hexcolor} = require('../modules/config');
    try {
        if (message.id == lastmsg) return console.log('last msg')
    }
    finally {
    var lastmsg = message.id
    if (message.author.bot) return;
    if(message.channel.type == 'dm') return;
    message.guild.fetchAuditLogs({limit:1, type:"DELETE"})
    .then(
        async audit => {
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', minute:'numeric' };
            if(audit.entries.first().action == "MESSAGE_DELETE" && audit.entries.first().createdAt.toLocaleString('en-GB',options) == new Date().toLocaleString('en-GB',options) && audit.entries.first().target.id == message.author.id) {
            aav = `${audit.entries.first().target.username} had their message deleted by ${audit.entries.first().executor.username}`
         }
        else {
    aav = `${message.author.username} Deleted their own message`
    }
    mUPDembed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle(aav)
    .addField("Guild", message.guild.name,true)
    .addField("Channel", message.channel,true)
    .addField("message", message.content || "something went wrong")
    .setColor('RANDOM')
    .setFooter("title may not be correct.")
    loGE = bot.channels.get("547065256757690368")
    loGE.send(mUPDembed)
    if(server[message.guild.id].md == "true") bot.channels.get(server[message.guild.id].slog).send(mUPDembed)
        }
    )
    }
}