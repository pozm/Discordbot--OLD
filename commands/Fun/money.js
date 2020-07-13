const Discord = require("discord.js");
const fs = require("fs")
const userInfo = locate.userInfo
const {getData, writeData} = require('../../modules/DataHandler.js')
const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, by} = require('../../modules/config.js');
exports.run = async (bot, message, args) => {
    var User = message.mentions.members.first()
    console.log(args[0])
    if(!User) User = await message.guild.members.get(await stuff.searchM(args[0], message.guild, true))
    if(message.content.includes('-') && message.author.id == ownerid) {
        aa = message.content.split('-')
        aa = aa[1].split(' ')
        if(aa[0].includes('add')) {
            userInfo[User.id]['Money'][message.guild.id] += Number(aa[1])
        } else if (aa[0].includes('set')) {
            userInfo[User.id]['Money'][message.guild.id] = Number(aa[1])
        } else if (aa[0].includes('take')) {
            userInfo[User.id]['Money'][message.guild.id] -= Number(aa[1])
        }
        message.channel.send(`${User.user.username} Now has P£${userInfo[User.id]['Money'][message.guild.id]} in ${message.guild.name}`)
        writeData(userInfo,'userInfo')
    }else {
        message.channel.send(`${User.user.username} Currently has P£${userInfo[User.id]['Money'][message.guild.id]} in ${message.guild.name}`)
    }
}
exports.help= {
    usage:'+money',
    desc:'Shows / adds money for a user /self',
    alias:['bal','balance']
}