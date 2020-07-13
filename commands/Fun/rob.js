const Discord = require("discord.js");
const fs = require("fs")
const ms = require('ms')
const userInfo = locate.userInfo

const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, by} = require('../../modules/config.js');

var timeouts = {}
exports.run = async (bot, message, args) => {
    const {getData, writeData} = require('../../modules/DataHandler.js')
    //delete require.cache[require.resolve("../../Data/money.json")];
    function numgen(max, least) {
        return Math.floor(Math.random() * Math.floor(max) + Math.floor(least));
    }
    function percentCalc(a, b){
        var c = (parseFloat(b)/parseFloat(a))*100;
        return parseFloat(c);
    }
    function TimutR() {
        timeouts[message.author.id] = {time: 0, active: false}
    }

    if(!timeouts[message.author.id]) timeouts[message.author.id] = {time: 0, active: false}

    if(timeouts[message.author.id].active == true) return message.channel.send('You Wasn\'t able to rob ' + Usr.user.username + ' (chance is 0% due to timeout : '+timeouts[message.author.id].time+')')


    Usr = message.mentions.members.first()
    if (Usr.user.bot || Usr.id == '518763902570594314') return message.channel.send('You Wasn\'t able to rob ' + Usr.user.username + ' (chance is 25%)')

    if(userInfo[message.author.id]['Money'][message.guild.id].Timeout) return message.channel.send('You\'re on timeout.')
    if(!Usr) return message.channel.send('You need to specify who you want to rob.')
    if (numgen(100,0) > 25) return  message.channel.send('You Wasn\'t able to rob ' + Usr.user.username + ' (chance is 25%)')
    takin = numgen(5,1)
    timeut = numgen(35,10) + 'm'
    amut = percentCalc(Number(userInfo[Usr.user.id]['Money'][message.guild.id]), takin)
    message.channel.send(`Hi, this is pozm, Just wanted to let you know that robbing isn't very nice and that it is a crime, So yeah i will be taking the money you robbed, noob.`)
    userInfo['518763902570594314']['Money'][message.guild.id] += amut
    userInfo[Usr.user.id]['Money'][message.guild.id] -= amut
    timeouts[message.author.id] = {time: timeut, active: true}
    writeData(userInfo,'userInfo')
    setTimeout(TimutR,ms(timeut))

}
exports.help= {
    usage:'+rob <user>',
    desc:'steals money'
}