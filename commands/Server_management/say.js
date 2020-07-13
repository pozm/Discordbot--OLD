exports.run = async (bot, message, args) => {
    const Discord = require("discord.js")
    const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, hexcolor} = require('../../modules/config');
let say = args.slice(0).join(" ")
if(!say) return message.channel.send("Unable to understand what you said").then(m=>m.delete(10000))
message.channel.startTyping()
setTimeout(()=>{
    message.channel.stopTyping(true)
    message.channel.send(say + " `-"+message.author.username.slice(0,-message.author.username.length +1)+"`")
},say.length*55)












}



exports.help= {
    usage:'+say <message>',
    perms:['ADMINISTRATOR'],
    desc:'makes the bot send a message'
}