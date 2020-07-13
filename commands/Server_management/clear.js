exports.run = async (bot, message, args) => {
    const Discord = require("discord.js")
    const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, hexcolor} = require('../../modules/config');
let clear = args[0]
if(!clear) return message.channel.send("Enter a number.").then(m => m.delete(10000))
if(clear.length > 3) return message.channel.send("Please enter a number between 1 - 99").then(m => m.delete(10000))
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
let pUser = message.author
if(isNaN(clear)) return message.channel.send("Enter a number.").then(m => m.delete(10000))
await message.delete()
try{
    message.channel.bulkDelete(clear).then(message.channel.send(`${clear} Message(s) were deleted by ${pUser.username.capitalize()}`).then(m => m.delete(10000)))
}catch(e) {''}


}
exports.help= {
    usage:'+clear <amount>',
    perms:['MANAGE_CHANNELS'],
    desc:'Clears the amount of messages from the chat.'
}