const Discord = require("discord.js");
const { TOKEN, PREFIX, mytime, activity, ownerid, clientID} = require('../../modules/config');
exports.run = (bot, message, args) => {

let status = args.slice(0).join(" ")
if(status.toLowerCase() == "offline") {
    status = "invisible"
}
try{
bot.user.setStatus(status)
message.channel.send("Okay! attempted to change my status to " + status)
}catch(e) {message.channel.send("Something went wrong.")}



}
exports.help= {
    usage:'+status [offline] <status>',
    desc:'Changes the status of the bot'
}