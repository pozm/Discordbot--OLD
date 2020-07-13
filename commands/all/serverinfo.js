exports.run = async (bot, message, args) => {
    const Discord = require("discord.js")
    const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, hexcolor} = require('../../modules/config');
    serverEmbed = new Discord.RichEmbed()
    .setAuthor(message.guild.name)
    .setThumbnail(message.guild.iconURL)
    .setTimestamp()
    .setTitle("Serverinfo")
    .addField("Guild id", message.guild.id)
    .addField("Owner", message.guild.owner.user.tag)
    .addField("OwnerID", message.guild.owner.id)
    .addField("Region", message.guild.region.toUpperCase())
    .addField("Created at", message.guild.createdAt.toGMTString())
    .addField("Members", `${message.guild.members.filter(m => !m.user.bot).size} Cached Users\n${message.guild.members.filter(m => m.user.bot).size} Cached BOTs`)
    .addField("Roles",message.guild.roles.size - 1)
    .addField("Text channels", message.guild.channels.filter(channel => channel.type === 'text').size)
    .addField("Voice channels",message.guild.channels.filter(channel => channel.type === 'voice').size)
    .setColor(hexcolor)
    message.channel.send(serverEmbed)
}

exports.class = new classes.Command ( exports.run, {
    name:'serverinfo',
    desc:'shows basic information about the guild.',
    alias : ['si'],
    memberName:'serverinfo',
    group:'all',
    guildOnly : false,
    clientPerms : ['SEND_MESSAGES'],
    args : {Needed : [], Extra : [] },
    throt : {
        Usage : 2,
        Dur : 2,
    },
    ownerOnly : false
} )

exports.help= {
    usage:'+serverinfo',
    desc:'Self explanatory.'
}