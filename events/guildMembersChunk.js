
module.exports = async (bot, members, guild) => {
    const Discord = require("discord.js");
    const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, logid, hexcolor} = require('../modules/config');
    bot.channels.get(logid).send(`A raid may be starting.... \n ${members} \n have all came from ${guild.name}.`)


}