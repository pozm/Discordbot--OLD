exports.run = async (bot, message, args) => {
    const Discord = require("discord.js")
    const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, hexcolor} = require('../../modules/config');
    if(!args[0]) return message.channel.send("Please provide a user id to unban someone! \n||https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID- ||")
    let bannedMember = await bot.fetchUser(args[0])
    let reason = args.slice(2).join(" ")
    if(!reason) reason = "No reason."
    if(!bannedMember) return message.channel.send("Please provide a user id to unban someone! \n||https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID- ||")
    message.guild.unban(bannedMember, {reason: reason})
    message.channel.send(`${bannedMember.tag} has been unbanned from the guild!`)
    try {
        bannedMember.send(`You were unbanned from ${message.guild.name}. \nReason : ${reason}, by ${message.author.username}`)
    } catch(e) {message.channel.send(`i was unable to alert ${bannedMember.tag} about their unban`)}
    let unbEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle(message.author.username + " unbanned " + bannedMember.username)
    .addField("Time", mytime + " [GMT]")
    .addField("reason", reason)
    .setColor(hexcolor)
    slogs.send(unbEmbed)


}
exports.help= {
    usage:'+unban <id> <reason>',
    perms:['BAN_MEMBERS'],
    desc:'unban\'s the user you ping / id of user'
}