const Discord = require("discord.js");
const fs = require("fs")
const userInfo = locate.userInfo
const {getData, writeData} = require('../../modules/DataHandler.js')
const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, by} = require('../../modules/config.js');
exports.run = async (bot, message, args) => {

    info = userInfo[message.author.id]

    //if (message.author.id != ownerid) return message.channel.send('Command not finshed yet.')

    var numtoval = {
        "1":'away',
        "2":'not',
    }
    var fliter = []

    function embed() {
        var emb = new Discord.RichEmbed()
        .setTitle('User settings!')
        .setDescription('To change do the following : Respond to this message with the number first then on / off then extra args using - EXAMPLE : 1 on -reason ok')
        .addField('1.Away',`When someone pings you alert them that you're not here \nStatus : ${info.Settings.Away.active == true? `ON | Reason : ${info.Settings.Away.reason}`: `OFF`}`,true)
        .addField('2.Notifs for timeouts', `Alerts you when your timeout ends.\nStatus : ${info.Settings['N_TimeoutEnd'] == true? 'ON' : 'OFF'}`,true)
        .setColor('GOLD')
        return emb
    }
    msg = message.author.send(embed())
    var dm = await message.author.createDM()
    var collector = dm.createMessageCollector(m=>m.author.id == message.author.id,{time:60000})
    collector.on('collect',m=>{
        args = m.content.trim().split(' ')
        dashed = m.content.trim().split('-')[1]
        if (dashed) dashed = dashed.split(' ')
        edit = args[0]
        if(!Number(edit)) return message.author.send('i didn\'t detect a num')
        val = args[1]
        typ = dashed? dashed.slice(1) : ''
        editing = numtoval[edit]
        if (editing == 'away') {
            info.Settings.Away.active = val == 'on'? true : false
            info.Settings.Away.reason = typ? typ.join(' ') : info.Settings.Away.reason == '' ? 'Classified' : info.Settings.Away.reason
            msg.then(m=>m.edit(embed()))
        }
        else if (editing == 'not') {
            info.Settings['N_TimeoutEnd'] = val == 'on'? true : false
            msg.then(m=>m.edit(embed()))
        }
    })
    collector.on('end',c=>writeData(info,'userInfo'))



}

exports.class = new classes.Command ( exports.run, {
    name:'usersettings',
    desc:'A command used to edit your settings for the bot',
    alias : ['us'],
    memberName:'usersettings',
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
    usage:'+usersettings',
    desc:'Settings for you.',
    alias:['us']
}