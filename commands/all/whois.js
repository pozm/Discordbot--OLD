exports.run = async (bot, message, args) => {
    const Discord = require("discord.js")
    const fs = require('fs')
   // const login = locate.LOGIN   
    const userInfo = locate.userInfo
    const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, hexcolor} = require('../../modules/config');
    let whois = message.mentions.members.first()
    if(!whois) {
        ab = []
        a = stuff.searchM(args[0], message.guild, true)
        b = await a.then(v =>{ v
            if(!v) return;
            return message.guild.fetchMember(v);
        })
        whois = b
    }
    if(!whois) whois = message.member
    let nick = whois.nickname 
    if(whois.id == ownerid) {
        var acvc = '7/2/2016, 12:22:32 PM' 
    }
    let vc = whois.voiceChannel
    let whoisEmbed = new Discord.RichEmbed()
    .setAuthor(whois.user.username, whois.user.avatarURL)
    .setTitle(`Who is ${whois.user.username}?`)
    .addField("Joined server at", whois.joinedAt.toLocaleString('en-GB'),true)
    .addField("Joined discord at", `${ acvc ||whois.user.createdAt.toLocaleString()}`,true)
    .addField('Status:', whois.presence.status,true)
    .addField('Game:', `${whois.presence.game || "No game."} ${whois.presence.game.type == 4 ? ' (NOT GAME)' : ''}`,true)
    .addField('Tag:', whois.user.discriminator,true)
    .addField('Id:', whois.user.id,true)
    .addField('Device(s)',whois.user.presence.clientStatus ? Object.keys(whois.user.presence.clientStatus).join(' | ') : 'None',true)
    .addField('Money', userInfo[whois.id]['Money'][message.guild.id],true)
    .addField('Warnings',userInfo[whois.id]['Warnings'][message.guild.id]? userInfo[whois.id]['Money'][message.guild.id] :'None',true)
    .addField('Is bot?', `${whois.user.bot || "not a bot."}`,true)
    .addField('Nickname:', `${nick || "No nickname."}`,true)
    //.addField('VoiceChannel:', `${`[${vc}](https://ptb.discordapp.com/channels/${message.guild.id}/${vc.id})`|| "Not in a vc"}`,true)
    .addField('Highest role:', whois.highestRole.name,true)
    .addField("Roles:",whois.roles? whois.roles.map(r => `${r}`).join(' | ') : 'No roles.')
    .setColor(whois.displayHexColor)
    .setThumbnail(whois.user.avatarURL)
    .setFooter(`Requested by ${message.author.username}`)
    .setTimestamp()

    console.log(whois.presence)

    message.channel.send(whoisEmbed)//.then(m=> m.delete(20000), message.delete(20000))
}

exports.class = new classes.Command ( exports.run, {
    name:'whois',
    desc:'Gets information about user',
    alias : [],
    memberName:'Whois',
    group:'all',
    guildOnly : false,
    clientPerms : ['SEND_MESSAGES'],
    args : {Needed : [], Extra : [{Name:'User', Pos:1,Type:'string'}] },
    throt : {
        Usage : 2,
        Dur : 2,
    },
    ownerOnly : false
  } )


exports.help= {
    usage:'+whois [user]',
    desc:'Gets information about a user.'
}