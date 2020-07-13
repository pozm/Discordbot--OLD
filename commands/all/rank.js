exports.run = async (bot, message, args) => {
    const Discord = require("discord.js")
    const fs = require('fs')
    const {getData, writeData} = require('../../modules/DataHandler.js')
    const {makeimg,genTop} = require('../../modules/XPHandler')
    const userInfo = locate.userInfo
    const {weapons, foundW, items, SHOPiw} = require('../../usage/items.js');
    const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, hexcolor} = require('../../modules/config');
    var User = message.mentions.members.first()
    if(!User) {
        User = await message.guild.fetchMember(await stuff.searchM(args[0], message.guild, true))
    }
    if(message.content.includes('-') && message.author.id == ownerid) {
        aa = message.content.split('-')
        aa = aa[1].split(' ')
        if(aa[0].includes('add')) {
            if (aa[1].toLowerCase() == 'xp') userInfo[User.id].Rank.xp += Number(aa[2])
            else if (aa[1].toLowerCase() == 'lvl') userInfo[User.id].Rank.level += Number(aa[2])
        } else if (aa[0].includes('set')) {
            if (aa[1].toLowerCase() == 'xp') userInfo[User.id].Rank.xp = Number(aa[2])
            else if (aa[1].toLowerCase() == 'lvl') userInfo[User.id].Rank.level = Number(aa[2])
        } else if (aa[0].includes('take')) {
            if (aa[1].toLowerCase() == 'xp') userInfo[User.id].Rank.xp -= Number(aa[2])
            else if (aa[1].toLowerCase() == 'lvl') userInfo[User.id].Rank.level -= Number(aa[2])
        }
        writeData(userInfo,'userInfo')

    }




    if (message.content.includes('-top')) {
        msg = genTop(userInfo,message.guild,userInfo)
        msg2 = msg.map
        let emb = new Discord.RichEmbed
        emb.setAuthor(message.member.displayName,message.author.avatarURL)
        emb.setDescription('Top 10 highest ranked people in your guild.')
        emb.setFooter('Requested by '+message.member.displayName)
        emb.setTimestamp()
        emb.setColor('RANDOM')
        msg2.map(x=>{
            n = x.split('-')
            emb.addField(n[0],n[1],true)
        })
        return message.channel.send(emb)
    }
    var xp = userInfo[User.id].Rank? userInfo[User.id].Rank.xp : 1
    var lvl = userInfo[User.id].Rank? userInfo[User.id].Rank.level : 0
    img = await makeimg(User,xp,lvl,userInfo)

    message.channel.send(img)


    
}

exports.class = new classes.Command ( exports.run, {
    name:'rank',
    desc:'Shows your lvl + xp.',
    alias : [],
    memberName:'rank',
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


exports.help = {
    usage : '+rank',
    Desc: 'Shows your lvl + xp.'
}