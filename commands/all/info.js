exports.run = async (bot, message, args) => {
    const Discord = require("discord.js")
    const fs = require("fs")
    const ms = require("ms")
    const { TOKEN, PREFIX, mytime, activity, by, ownerid, clientID, hexcolor, yt ,ig, ttv, sc, disc} = require('../../modules/config');
let infoEmbed = new Discord.RichEmbed()
.setTitle("Information")
.setColor('LUMINOUS_VIVID_PINK')
.setDescription("Pozus information")
.addField("Bot made by ", by,true)
.addField("Discord.js version", `[${Discord.version}](https://discord.js.org)`,true)
.addField('Uptime', ms(bot.uptime),false)
.addField('shard', '0',true)
.addField('Nodejs Version',`[${process.version}](https://https://nodejs.org/en/)`,true)
message.channel.send(infoEmbed)
}

exports.class = new classes.Command ( exports.run, {
    name:'info',
    desc:'sends embed of basic information of the bot.',
    alias : ['information'],
    memberName:'invite',
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
    usage:'+info',
    desc:'Nothing really.'
}