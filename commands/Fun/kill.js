const Discord = require("discord.js");
const fs = require("fs")
const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, by} = require('../../modules/config.js');


exports.run = async(bot, message, args) => {
  function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }


    var target = message.mentions.members.first()
    ufkx = ""
    if(target.id == ownerid || target.id ==  bot.user.id) {
      var target = message.author.displayName
      var ufkx = ";)"
    }
    if (!target) target = message.member.displayName
    else target = target.displayName
   // console.log(target.id,ownerid,bot.user.id)
    deaths = {
      0: `${target} tried to support donald trump`,
      1: `${target} fell out the world`,
      2: `${target} died of \`ligma\``,
      3: `f in the chat for ${target}`,
      4: `${target} was divided into ${getRandomInt(100)} pieces`,
      5: `${target} died from listening to too much mcmental 😰`,
      6: `${target} got stream sniped`,
      7: `${target} was obliterated by ${by}`,
      8: `${target} was killed by the amount of pings directed at him.`,
      9: `${target} was defeated by ${target}`,
      10:`f ||(lol got lazy)||`,
      11:`${target} unsmoothly hit on a girl`,
      12:`${target} spilled too much tea`,
      13:`${target} Bit directly into a hot potato, dying instantly`,
      14:`${target} ate orange with mouth ulcers`,
      15:`${target} drank Redbull Cola`,
      16:`${target} Tried to meet their waifu`,
      17:`${target} overdosed on dead and cringe memes`,
      18:`${target} got too many blue internet arrows`,
      17:`${target} traded two diamonds for 10 dirt blocks`
  
  
  }

  var use = getRandomInt(Object.keys(deaths).length)
  try{
    if(ab == getRandomInt(Object.keys(deaths).length)) use = getRandomInt(Object.keys(deaths).length)
  }catch(e){
    var ab = getRandomInt(Object.keys(deaths).length)
  }
  message.channel.send('> '+deaths[use] + " " + ufkx)

}
exports.help= {
    usage:'+kill [<user>]',
    desc:'\'kills\' the pinged user'
}