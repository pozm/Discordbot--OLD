const Discord = require("discord.js");
const fs = require("fs")
const Enmap = require("enmap");
const ms = require('ms')
const userInfo = locate.userInfo

var timeouts = {}
exports.run = async(bot, message, args) => {
  const {getData, writeData} = require('../../modules/DataHandler.js')
  const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, by,altsid,timer, getTimer,secretgen} = require('../../modules/config.js');
    let wur = message.mentions.members.first()
    function makelen() {
        var text = "";
        var possible = "mmmmmmmssss";
      
        for (var i = 0; i < 1; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
      }
    function getRandomInt(max, least) {
        return Math.floor(Math.random() * Math.floor(max) + Math.floor(least));
      }

      

      function TimutR() {
        timeouts[message.author.id] = {time: 0, active: false}
        if (userInfo[message.author.id].Settings['N_TimeoutEnd'] == true) message.channel.send(`${message.author} Your timeout has ended.`)
      }



      amn = getRandomInt(3000, 800)
      outd = getRandomInt(15,5) + makelen()

      console.log(timeouts)

      if(!timeouts[message.author.id]) timeouts[message.author.id] = {time: 0, active: false}

      if(timeouts[message.author.id].active == true) return message.channel.send('You\'re still on time out for '+getTimer(timeouts[message.author.id].id))//+timeouts[message.author.id].time)

      message.channel.send('You worked and you got P£' +amn +` (But sadly you are now on time out for ${outd}) `)
      userInfo[message.author.id]['Money'][message.guild.id] += amn
      timeouts[message.author.id] = {time: outd, active: true,id:secretgen()}
      writeData(userInfo,'userInfo')
      timer(outd,timeouts[message.author.id].id)
      setTimeout(TimutR,ms(outd))
      
}
exports.help ={
    usage:'+work',
    desc:'A decent way to make money if no one if brave enough to fight you.'
}