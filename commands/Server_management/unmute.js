exports.run = async (bot, message, args) => {
    const Discord = require("discord.js")
    const ms = require("ms")
    const {getData, writeData} = require('../../modules/DataHandler.js')
    
    const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, hexcolor} = require('../../modules/config');
    const { embeds} = require('../../usage/embeds');
    let muteUser = message.mentions.members.first()
    let mutereason = 'Not declared.'

    if(message.content.includes('-')) {
        aa = message.content.split('-')
        aa = aa[1].split(' ')
        if(aa[0].includes('r')) {
            mutereason = aa.slice(1).join(' ')
        }
    }

    if(!muteUser) muteUser = await message.guild.fetchMember(await stuff.searchM(args[0], message.guild))
    if(!muteUser) return message.channel.send("you gotta ping the person you want to mute!").then(m=>m.delete(10000))
    if(!muteUser.manageable) return message.channel.send("I cannot mute that person.").then(m=>m.delete(10000))
    if(!muteUser.id == ownerid) return message.channel.send("Sorry, but nope.").then(m=>m.delete(10000))
    if(stuff.ffd == true) return message.channel.send("They have a higher role than you; Or they have the same role.")

    console.log(userInfo[muteUser.id].Mutes[message.guild.id].time)
    if (userInfo[muteUser.id].Mutes[message.guild.id].time) {
        userInfo[muteUser.id].Mutes[message.guild.id].time = new Date
        userInfo[muteUser.id].Mutes[message.guild.id].Ended = {'User' : message.member.id, 'Reason' : mutereason}
    }
    writeData(userInfo,'userInfo')
    message.channel.send(`${muteUser.user.username} Has now been unmuted`)

}
exports.class = class UnMuteCommand extends classes.Command {
    constructor(bot) {
        super(bot,{
            name:'unmute',
            desc:'Unmute people',
            alias : [''],
            memberName:'UnMute',
            group:'Server_Management',
            guildOnly : true,
            clientPerms : ['MANAGE_MEMBERS'],
            throt : {
                usage : 2,
                duration : 7,
            },
            ownerOnly : false
        })
    }
} 