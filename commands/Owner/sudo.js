const Discord = require("discord.js");
const { TOKEN, PREFIX, mytime, activity, ownerid, clientID} = require('../../modules/config');
exports.run = async (bot, message, args) => {
    let pingus = message.guild.members.get(args[0])
    if(!pingus) return message.channel.send('User not in guild')
    var newmsg = message
    newmsg.author = pingus.user 
    newmsg.member = pingus
    newmsg.content = args.slice(1).join(' ')
    
    console.log(newmsg.content)
    bot.emit("message", newmsg)



}
exports.help = {
    usage:'+sudo <userid> [command with args]',
    desc:'Forces a user to run a command'
}