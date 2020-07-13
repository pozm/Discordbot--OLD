exports.run = async (bot, message, args, LoG) => {
    const Discord = require("discord.js")
    const {getData, writeData} = require('../../modules/DataHandler.js')
    const { TOKEN, PREFIX, mytime, activity, hexcolor, ownerid, clientID} = require('../../modules/config');
    const { embeds} = require('../../usage/embeds');
    const userInfo = locate.userInfo
    let reason = 'Not declared.'
    if(args[1]) reason = args.slice(1)
    let user = message.mentions.members.first()
    if(!user) user = await message.guild.members.get(await stuff.searchM(args[0], message.guild))
    if(!user) return message.channel.send('Unable to find that user.')
    if(user.id == ownerid) return message.channel.send('Uhh, sorry but nope.')
    if(stuff.ffd == true) return message.channel.send("They have a higher role than you; Or they have the same role.")
    stuff.loading()
    if (userInfo[user.id]['Warnings'][message.guild.id]) userInfo[user.id]['Warnings'][message.guild.id] ++
    else userInfo[user.id]['Warnings'][message.guild.id] = 1
    writeData(userInfo,'userInfo')
    try {
        user.send(`Oi, you were warned in ${message.guild}, by ${message.author}\n with reason : ${reason.join(' ')}`)
    }catch(e) {''}
    message.channel.send(`${user} was warned for ${reason.join(' ')}`)
    embeds.warn(message.member, user, userInfo[user.id]['Warnings'][message.guild.id], reason.join(' '), slogs)




}
exports.help = {
    usage : '+warn <user> <-r reason>',
    perms:['MANAGE_GUILD'],
    desc : 'Warn a user.'
}