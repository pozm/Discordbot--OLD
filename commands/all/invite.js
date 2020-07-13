const Discord = require("discord.js");
const { TOKEN, PREFIX, mytime, activity, ownerid, clientID} = require('../../modules/config');
exports.run = async(bot, message, args) => {
    let perm = args[0]
    if(!perm) perm = 21469588398
    let emb = new Discord.RichEmbed
    emb.addField('V',`[Click me!](https://discordapp.com/api/oauth2/authorize?client_id=${clientID}&permissions=${perm}&scope=bot)`)
    message.channel.send(emb)

}

exports.class = new classes.Command ( exports.run, {
    name:'invite',
    desc:'Generates a invitecode for this bot.',
    alias : [],
    memberName:'invite',
    group:'all',
    guildOnly : false,
    clientPerms : ['SEND_MESSAGES'],
    args : {Needed : [], Extra : [{Name:'Permission', Pos:1,Type:'int'}] },
    throt : {
        Usage : 2,
        Dur : 2,
    },
    ownerOnly : false
  } )

exports.help= {
    usage:'+invite',
    desc:'get a invite link for this bot.'
}