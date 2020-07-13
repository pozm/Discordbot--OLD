exports.run = async (bot, message, args) => {
    const Discord = require("discord.js")
    const fs = require('fs')
    const userInfo = locate.userInfo
    const {weapons, foundW, items, SHOPiw} = require('../../usage/items.js');
    const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, hexcolor} = require('../../modules/config');
    async function emb() {
    shopEmb = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle('Store')
    Object.keys(SHOPiw).map(e=> {
        shopEmb.addField(`${Object.keys(SHOPiw).indexOf(e) +1} : ${e} — P£${SHOPiw[e].price}`, `"${SHOPiw[e].desc}"`)
    })
    shopEmb.setColor('GOLD')
    embmsg = message.channel.send(shopEmb)
    return embmsg = await embmsg.then(m=>m);
    }      
    async function aftr() {
    adf = emb()
    adf = await adf.then(v=>v)
    shopmsg = await message.channel.awaitMessages(m=>m.author.id == message.author.id,{max:1, time:30000})
    shopaws = message.channel.messages.get(shopmsg.map(e=>e.id).toString())
    if (!Number(shopaws)) return
    if(Number(shopaws.content)-1 > Object.keys(SHOPiw).length) {
        adf.delete()
        shopaws.delete()
        return aftr()
        }
        usmon = Number(userInfo[message.author.id]['Money'][message.guild.id]) 
        itmpri = SHOPiw[Object.keys(SHOPiw)[Number(shopaws.content)-1]]
        console.log(`${usmon} -- ${itmpri.name} (${itmpri.type})`)
        if(usmon < itmpri.price) return message.channel.send('You don\'t have enough money for this.')
        if(userInfo[message.author.id]['Inv'][itmpri.type].includes(itmpri.name)) return message.channel.send('You already have this')
        else {
            userInfo[message.author.id]['Inv'][itmpri.type].push(itmpri.name)
            userInfo[message.author.id]['Money'][message.guild.id] -= itmpri.price
            writeData(userInfo,'userInfo')
            message.channel.send(`You've purchased "${itmpri.name}"`)
        }
    }
    aftr()
}

exports.class = new classes.Command ( exports.run, {
    name:'shop',
    desc:'Shows shop embed to purchase weapons',
    alias : [],
    memberName:'shop',
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


exports.help ={
    usage : '+shop',
    Desc: 'Shop gui.'
}