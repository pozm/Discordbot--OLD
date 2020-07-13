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
      function TimutR() {
        timeouts[message.author.id] = {time: 0, active: false}
    }
    compan = args[0]

    if(!timeouts[message.author.id]) timeouts[message.author.id] = {time: 0, active: false}
    if(timeouts[message.author.id].active == true) return message.channel.send('You\'re still on time out for '+timeouts[message.author.id].time)
    if(!compan) return message.channel.send('You must say what you would like to steal / make a rip-off of')
    let orgincon = `Starting to steal ${compan}..`
    timou = numgen(15,5) + 'm'
    timeouts[message.author.id] = {time: timou, active: true}
    tr3 = message.channel.send(orgincon)
    tr3 = await tr3.then(m=>m);
    tr3.edit('Getting assets from ' + compan)
    setTimeout(function() {
        tr3.edit(`Building ${compan}`)
        setTimeout(function() {
            tr3.edit('Gaining players....')
            setTimeout(function() {
                mon = numgen(100000, 1)
                tr3.edit('You got a total of ' + mon + ' Users')
                message.channel.send(`You got P£${Math.trunc(mon / 10)} from stealing ${compan} but You're on timeout for ${timou}`)
                userInfo[message.author.id]['Money'][message.guild.id] += Math.trunc(mon / 10)
                writeData(userInfo,'userInfo')
                setTimeout(TimutR,ms(timou))
            }, numgen(5000,1000));
        }, numgen(5000,1000));
    }, numgen(5000,1000));










}
exports.help = {
    usage : '+steal <thing you want to steal>',
    desc : 'Steal or make a rip-off your favorite thing, or your most hated thing',
    alias : ['ripoff']
}