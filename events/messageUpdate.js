
module.exports = async (bot, newMessage, oldMessage) => {
    const Discord = require("discord.js");
    const fs = require("fs")
    const server = locate.SERVER
    const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, logid, hexcolor} = require('../modules/config');
    if (oldMessage.author.bot) return;
    if(oldMessage.channel.type == 'dm') return;
    mUPDembed = new Discord.RichEmbed()
    .setAuthor(oldMessage.author.username, oldMessage.author.avatarURL)
    .setTitle(oldMessage.author.username + " Edited their message")
    .addField("Guild", oldMessage.guild.name,true)
    .addField("Channel", oldMessage.channel,true)
    .addField("Before", newMessage.content)
    .addField("After", oldMessage.content)
    .setColor('RANDOM')
    loGE = bot.channels.get("547065256757690368")
    loGE.send(mUPDembed)
    if(server[newMessage.guild.id].mu == "true") bot.channels.get(server[newMessage.guild.id].slog).send(mUPDembed)
}