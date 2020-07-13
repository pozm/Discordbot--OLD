exports.run = async (bot, message, args) => {
    const Discord = require("discord.js")
    const ms = require("ms")
    
    const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, hexcolor} = require('../../modules/config');
    const { embeds} = require('../../usage/embeds');
    let muteUser = message.mentions.members.first()
    let mutereason = 'Not declared.'
    if (args[2]) mutereason = args[2]

    if(message.content.includes('-')) {
        aa = message.content.split('-')
        aa = aa[1].split(' ')
        if(aa[0].includes('r')) {
            mutereason = aa.slice(1).join(' ')
        }
    }
    bt = args.slice(1,7)
    console.log(bt)
    console.log(bt.indexOf('-r'))
    bt.indexOf('-r') != -1? bt = bt.slice(0,bt.indexOf('-r')): bt = args.slice(1,7)
    console.log(bt)
    times = {month : 0,weeks : 0,days : 0,hours : 0,mins : 0,secs : 0}
    bt.forEach((v,k) => {
        v = v.toLowerCase()
        console.log(v)
        v =v.replace('-r','')
        if(v.includes('m') || v.includes('minutes') || v.includes('mins')) {
            times.mins = Number(v.replace(/\D/g,''))
        }
        if(v.includes('h') || v.includes('hours') || v.includes('hour')) {
            times.hours = Number(v.replace(/\D/g,''))
        }
        if(v.includes('s') || v.includes('secs') || v.includes('seconds')) {
            times.secs = Number(v.replace(/\D/g,''))
        }
        if(v.includes('mon') || v.includes('month') || v.includes('months')) {
            times.months = Number(v.replace(/\D/g,''))
        }
        if(v.includes('d') || v.includes('days') || v.includes('day')) {
            times.days = Number(v.replace(/\D/g,''))
        }
        if(v.includes('w') || v.includes('weeks') || v.includes('week')) {
            times.weeks = Number(v.replace(/\D/g,''))
        }
    })
    date = stuff.makeDate(times.month,times.weeks,times.days,times.hours,times.mins,times.secs)
    if(!muteUser) muteUser = await message.guild.fetchMember(await stuff.searchM(args[0], message.guild))
    if(!muteUser) return message.channel.send("you gotta ping the person you want to mute!").then(m=>m.delete(10000))
    if(!muteUser.manageable) return message.channel.send("I cannot mute that person.").then(m=>m.delete(10000))
    if (date.toString() == new Date().toString()) return message.channel.send('Please specify how long you want to mute the user for')
    if(!muteUser.id == ownerid) return message.channel.send("Sorry, but nope.").then(m=>m.delete(10000))
    if(stuff.ffd == true) return message.channel.send("They have a higher role than you; Or they have the same role.")
    stuff.loading()
    userInfo = locate.userInfo
    let mrole = message.guild.roles.find(role => role.name === "pozus mute")
    if(!mrole) {
        try{
            mrole = await message.guild.createRole({name:"pozus mute", color:'RED',permissions:[]});
            message.channel.send("made mute role");
            mrole.setPermissions(0);
            message.guild.channels.forEach(async (channel, id ) => {
                await channel.overwritePermissions(mrole, {SEND_MESSAGES:false,READ_MESSAGES:false,ADD_REACTIONS: false});
            });


        }catch(e) {message.channel.send("Something went wrong with making the mute role / updating channels.").then(m=>m.delete(10000))}
    }
    muteEmbed = new Discord.RichEmbed()


    userInfo[muteUser.id].Mutes[message.guild.id] = {time:date,roles:muteUser.roles.map(r=>r)}
    userInfo[muteUser.id].Mutes[message.guild.id].Ended = 'no' 
    let p = muteUser.roles
    await muteUser.removeRoles(p)
    await muteUser.addRole(mrole.id)
    message.channel.send(`${muteUser.user.username} Has now been muted until ${date.toGMTString()}`)
    embeds.mute(message.member, muteUser, 'mute', date.toGMTString(), mutereason,slogs)
    /*setTimeout(async function() {
        message.channel.send(`${muteUser.user.username} Has now been unmuted`).then(m=>m.delete(10000))
        await muteUser.addRoles(p)
        embeds.mute(message.guild.members.get(bot.user.id), muteUser, 'unmute', muteTime, 'Time expired.',slogs)
        await muteUser.removeRole(mrole.id)
    },ms(muteTime))*/
}
exports.help= {
    usage:'+mute <user> <time>(mon, d, h, m, s, w) -r <reason>',
    perms:['MANAGE_GUILD'],
    desc:'mutes\'s the user you ping with time.'
}