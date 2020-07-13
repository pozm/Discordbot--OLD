const Discord = require ('discord.js')
module.exports = async (bot) => {
  const {embeds} = require('../usage/embeds')
  const {getData, writeData} = require('../modules/DataHandler')
  const userInfo = locate.userInfo
  const {improle} = require('../usage/staff')
  const server = locate.SERVER
  const fs = require(`fs`)
  var colors = require('colors');
  const ms = require('ms')
  var { TOKEN, PREFIX, mytime, activity, ownerid, clientID, by, BOTA, logid} = require('../modules/config');
  console.log(`Bot now online! : ${mytime}`.bold.blue, ` <${testMode}> `);
  bot.channels.get(logid).send(`${bot.user.username} is online on ${bot.guilds.size} servers! \nbot online since : ${mytime}`)
  //bot annoucement checker.
  if(BOTA.on == true) {
    setInterval(function(){
      botac = bot.channels.get(BOTA.channel)
      botac.fetchMessages({ limit: 1 }).then(m =>m.forEach(async(message, id) => {
      if (message.content == BOTA.a) {delete require.cache[require.resolve(`../modules/config.js`)];return}
      else {
        bot.channels.get(BOTA.channel).send(BOTA.a)
       }
      }))
    },5000)
  }
  //makes sure that the errors don't crash the bot
  bot.on('error', e => console.log(`Caught error : ${e.message} (DiscordAPi)`.bold.blue));

  //check for different statuses
  if(testMode == true) bot.user.setActivity('ya boi be testing')
  else if (activity.texts.length == 1) {
    bot.user.setActivity(activity.texts[0])
  }  
  else {
    num = 0
    setInterval(function() {
      bot.user.setActivity(activity.texts[num])
      num = num + 1
      if (num > activity.texts.length) num = 0
    },30000)
  }
  //set up auto bot role
  if (testMode == false ) {
    msg = await bot.channels.get('560854898825232414').fetchMessage(improle.messageid)
    emb = new Discord.RichEmbed()
    Object.entries(improle).forEach((v,k) => {
      if (v[0] == 'messageid') return
    
      rects = msg.reactions 
    
      rects.forEach(async e => {
        usrs = await e.fetchUsers()
        if (usrs.map(f=>f).length > 1) {
          e.remove(usrs.filter(u=>u.id !=bot.user.id).map(vdf=>vdf.id).toString())
        } 
      })
      msg.react(v[0])
      newsr = v[1].users.filter(w=> w != '')
      uvsers = newsr.map(u=>
        {
          if (bot.users.get(u) == undefined || bot.users.get(u) == null) return 'err' 
          else return bot.users.get(u).username
        })
      
      emb.setTitle('React to get corresponding role')
      emb.setDescription('It will only give you the role if you actually have the perms to do so.')
      emb.addField(v[0],v[1].name + `\nUsers : ${uvsers.join(' | ')}`)
      msg.react(v[0])
    })
    msg.edit(emb)
  }
  //check for mutes
  setInterval(async function() {
    const userInfo = locate.userInfo
    Object.entries(userInfo).forEach(async(v,k)=>{
      //console.log(v)
      if (v[1].Mutes) {
        Object.entries(v[1].Mutes).forEach(async(vv,kk) => {
          guild = bot.guilds.get(vv[0])
          time = vv[1].time
          member = guild.members.get(v[0])
          if (!guild) return
          if (!member) return
          if (time != '0' && time != undefined) {
            role = guild.roles.find(r => r.name === 'pozus mute')
            if (!member.roles.has(role.id)) {
              if (!role) return console.log('a')
              member.addRole(role)
            }
            time = new Date(vv[1].time)
            now = new Date()
            //console.log(vv[1].time)
            //console.log(time.toLocaleTimeString(),'vs',now.toLocaleTimeString())
            if (now >= time) {
              let enddd = userInfo[member.id].Mutes[guild.id].Ended
              userInfo[member.id].Mutes[guild.id].time = '0'
              let ddd = member
              console.log('Mute removed from '.bold.blue + (member.displayName).bold.red)
              writeData(userInfo,'userInfo')
              if (!role) return// console.log('a')
              if (ddd.roles.has(role.id)) {
                await ddd.removeRole(role)
                addb = vv[1].roles
                unm = {unmuter : bot, reason: 'Time Expired'}
                if (enddd != 'no') unm = {unmuter: guild.members.get(enddd.User), reason : enddd.Reason}
                embeds.mute(unm.unmuter,ddd,'unmute',0,unm.reason,guild.channels.get(server[guild.id].slog))
                if (addb != null) {
                  addb.includes(role)? addb.map(m=>m == role.id ? m ='' : '') :''
                    ddd.addRoles(vv[1].roles)
                }// else console.log('no roles')
              }
            }
          }
        })
      }
    })
  },2000)


  //check for avatar updates
  if (testMode == true ) return
  avartrid = bot.user.avatar
  setInterval(function() {
    if (bot.user.avatar != avartrid) {
      bot.guild.get('513498066427576320').setIcon(bot.user.avatarURL, 'my avatar changed!')
      avartrid = bot.user.avatar
    } 
  }, 4000)
}