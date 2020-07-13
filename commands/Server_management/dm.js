exports.run = async (bot, message, args) => {
    const Discord = require("discord.js")
    const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, hexcolor} = require('../../modules/config');
    let dsay = args.slice(1).join(" ")
    let dmus = message.mentions.members.first()
    if(!dmus) dmus = await message.guild.fetchMember(await stuff.searchM(args[0], message.guild))
    if(!dmus) return message.channel.send("Please tell me the person you want to dm.").then(m=>m.delete(10000))
    if(!dsay) return message.channel.send("Unable to understand what you said").then(m=>m.delete(10000))
    message.delete("Saying!")
    dmus.send(dsay + " ` -"+message.author.username.slice(0,-message.author.username.length +1)+"`")













}
exports.help= {
    usage:'+dm <user> <message>',
    perms:['ADMINISTRATOR'],
    desc:'dm\'s the user you ping'
}