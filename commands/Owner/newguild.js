exports.run = async (bot, message, args, loG) => {
    const Discord = require("discord.js")
    const { TOKEN, PREFIX, mytime, activity, ownerid, clientID} = require('../../modules/config');
    loG.send("Going to create a new guild....")
    let name = args[0]
    let region = args[1]
    if(!name) return message.channel.send("Add the name of the guild, please.")
    if(!region) return message.channel.send(`Please choose a region out of these \`('japan', 'singapore', 'eu-central', 'us-central', 'london', 'eu-west', 'amsterdam', 'brazil', 'us-west', 'hongkong', 'us-south', 'southafrica', 'us-east', 'sydney', 'frankfurt', 'russia')\``)
    a = bot.user.createGuild(name, region).then(guild => {
    var allchannels = []
    guild.channels.forEach(async (channel, id) => {
    if(channel.type == "text"){
    allchannels.push(id)}
})
bot.channels.get(allchannels[0]).createInvite({temporary:false,maxAge:0,maxUses:0,unique:true,reason:"DTW$^GSA" }).then(invite => message.channel.send(`Created an invite with a code of ${invite.code} \n INFO:\n guild : ${invite.guild}\n channel: ${invite.channel.name} \n who made it: ${invite.inviter} \n expires at: ${invite.expiresAt} \n URL :${invite.url}`))
})
}
exports.help= {
    usage:'+newguild <name> <region>',
    desc:'Creates a new guild with the bot as the owner'
}