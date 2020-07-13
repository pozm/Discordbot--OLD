const Discord = require("discord.js");
const {getData, writeData} = require('../modules/DataHandler')
var userInfo = locate.userInfo
const tag_limit = {}
var colors = require('colors');

var Values = {
  throt : {
  }
}

setInterval(function(){writeData(userInfo,'userInfo')},300)
module.exports = async (bot, message) => {
  const {makeimg, checklvl} = require('../modules/XPHandler')
  const fs = require("fs")
  const server = locate.SERVER
  const {weapons, foundW} = require('../usage/items.js');
  const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, logid, hexcolor, by, BOTA, altsid} = require('../modules/config');
  bot[`Funcommands`].delete("money");
  const props = require(`../commands/Fun/money.js`);
  bot[`Funcommands`].set("money", props);
  bot[`Server_managementcommands`].delete("ss");
  const props2 = require(`../commands/Server_management/ss.js`);
  bot[`Server_managementcommands`].set("ss", props2);
  bot[`Funcommands`].delete("fight");
  const props3 = require(`../commands/Fun/fight.js`);
  bot[`Funcommands`].set("fight", props3);
  const loGC = bot.channels.get("537004152123817984");
  const LoG = bot.channels.get(logid);
  if (message.author.bot) return;
  if(message.content == "") message.content = "`Either File, Or Welcome message`"

  //console.log('triggered','gamer',message)

  if(!server['mainframe']) {
    server['mainframe'] = new Object
    server['mainframe'].dmlogs = true,
    server['mainframe'].cmdlogs = true,
    server['mainframe'].msglogs = true,
    server['mainframe'].ownerOnly = false
    writeData(server,'server')
  }

  //check to see if the message author has a higher role than the person who he @'d
  let FDSd = false;
  try{
    a = message.member.highestRole.position;
    b = message.mentions.members.first().highestRole.position;
    if (a <= b && message.member.id != ownerid && !altsid.includes(message.author.id)) FDSd = true;
  }catch(e) {}


  /*
   * 
   * Check if A users money / inv needs to be updated. 
   * 
  */

  var allW = []

  allW = Object.values(weapons).map(w=>w.name)

  Object.values(foundW).map(w=>allW.push(w.name))

  function checkuser(user) {
    if(!userInfo[user.id]) userInfo[user.id] = {
      "Warnings" : new Object,
    }
    if (Array.isArray(userInfo[user.id]['Warnings'])) userInfo[user.id]['Warnings'] = {}


    if(!userInfo[user.id].Mutes) {
      userInfo[user.id].Mutes = new Object
      userInfo[user.id].Mutes[message.guild.id] = {time:'0',roles:''}
    }
    //if(!userInfo[user.id].Mutes[message.guild.id].time) userInfo[user.id].Mutes[message.guild.id] = {time:'0',roles:''}
    if(!userInfo[user.id].Money) {
      userInfo[user.id].Money = new Object
      userInfo[user.id].Money[message.guild.id] = 1
    }

    if(!userInfo[user.id].Rank) {
      userInfo[user.id].Rank = {
        'level':0,
        'xp':1
      }
    }


    if(!userInfo[user.id].Settings) {
      userInfo[user.id].Settings = {
        'N_TimeoutEnd':false,
        'Away':{reason:'',active:false}
      }
    }
    
    if(!userInfo[user.id].Inv) {
      userInfo[user.id].Inv = {
        
        "Weapons" : user.id == ownerid? allW : ["Classic Sword", "Stick", "Sword"],
    
        "Items" : [],
    
        "Wins" : 0,
    
        "Loses" : 0,
    
        "Equiped" : ''
    
      }
    }
    
    writeData(userInfo,'userInfo')
    
  }





  myserv = bot.guilds.get('513498066427576320')

  Emotes = {
    'useable' : function (e) {
      return `<:${e.name}:${e.id}>`
    }
  }


  //allows for quick and easy access of emojis withing my guild
  myserv.emojis.map(e=>Emotes[e.name] = e)



  //actually adds the date.
  function dateAdd(date, interval, units) {
    if(!(date instanceof Date))
      return undefined;
    var bet = new Date(date);
    var checkRollover = function() { if(bet.getDate() != date.getDate()) bet.setDate(0);};
    switch(String(interval).toLowerCase()) {
      case 'year'   :  bet.setFullYear(bet.getFullYear() + units); checkRollover();  break;
      case 'quarter':  bet.setMonth(bet.getMonth() + 3*units); checkRollover();  break;
      case 'month'  :  bet.setMonth(bet.getMonth() + units); checkRollover();  break;
      case 'week'   :  bet.setDate(bet.getDate() + 7*units);  break;
      case 'day'    :  bet.setDate(bet.getDate() + units);  break;
      case 'hour'   :  bet.setTime(bet.getTime() + units*3600000);  break;
      case 'minute' :  bet.setTime(bet.getTime() + units*60000);  break;
      case 'second' :  bet.setTime(bet.getTime() + units*1000);  break;
      default       :  bet = undefined;  break;
    }
    return bet;
  }


  stuff = {

    stored_ConLog : [],


    uplog : function(type, mess) {



      switch(type) {
        case 'write' :

          a = process.stdout.write(mess)

        break;

        case 'add' :

        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(mess + '\n')

        break;
      }


    },

    //makes a new date which is ahead of time (used for timeouts / mutes)
    makeDate : function(monthm,weekm,daym,hourm,minm,secm) {
      now = new Date
      nowmonth = now.getMonth()
      nowday = now.getDate()
      nowhour = now.getHours()
      nowmin = now.getMinutes()
      nowsec = now.getSeconds()
      addedDates = {
        Months : nowmonth + monthm > 12? 12 : nowmonth + monthm,
        Days : nowday + daym > 30 ? 30 : nowday + daym,
        Hours : nowhour + hourm > 24 ? 24 : nowhour + hourm,
        Minutes: nowmin + minm,
        Secounds : nowsec + secm
      }
      actual = new Date
      actual = dateAdd(actual, 'month', monthm)
      actual = dateAdd(actual, 'week', weekm)
      actual = dateAdd(actual, 'day', daym)
      actual = dateAdd(actual, 'minute', minm)
      actual = dateAdd(actual, 'second', secm)
      return actual
    },

    //loading function (DEPRECATED)
    loading: function() {
      message.channel.send('Command should work '+Emotes.useable(Emotes.verified))
    },
    ffd : FDSd,


    //check if the user needs stuff
    updateUser: function(user) {  checkuser(user)  },


    //update ss
    ssUpdate: async function () {
      async function  update(guild,err,val) {
        console.log(`Detected an error! `.bold.blue + `${guild.name}`.bold.red + ` Does not have `.bold.blue+`${err}`.bold.red + ` server setting!`.bold.blue)
        slogs = await checkSlogs()

        

        if (err == 'all') {
          server[guild.id] = {
            'slog': slogs.id,
            'mu': false,
            'md': false,
            'disabled' : ["none"],
            'prefix' : "+",
            'role' : false,
            'cooldown':{cmds:[],time:0}
          }
        }
        else if (err) {
          server[guild.id][err] = val
        }

        writeData(server,'server')
      }
      if (!server[message.guild.id]) return await update(message.guild,'all')
      server[message.guild.id].slog== undefined? await update(message.guild,'slog',await checkSlogs().id) : ''
      server[message.guild.id].mu== undefined? await update(message.guild,'mu',false) : ''
      server[message.guild.id].md== undefined? await update(message.guild,'md',false) : ''
      server[message.guild.id].disabled== undefined? await update(message.guild,'disabled',["none"]) : ''
      server[message.guild.id].prefix== undefined? await update(message.guild,'prefix','+') : ''
      server[message.guild.id].role== undefined? await update(message.guild,'role',false) : ''
      server[message.guild.id].cooldown== undefined? await update(message.guild,'cooldown',{cmds:[],time:0}) : ''

    },
    //search for a member
    searchM : async function (ser, g, t) {
      if(t == true && !ser) {
        return message.member.id;
      }
      if (ser == '') return;
      var tyb = new Array()
      var kyb = new Array()
      obk = {
        id : kyb,
        name : tyb
      }
      regx = new RegExp('\\b' + ser.toLowerCase() + '?\\S+', 'gi')
      g.members.forEach(function(element) {
        var matchess = element.displayName.toString().toLowerCase().match(regx);
        checkuser(element)
        if(!matchess) matchess = element.user.username.toString().toLowerCase().match(regx);
        if(ser == element.user.id) obk.name.push(element.user.tag.toString()), obk.id.push(element.id)
        if(ser.toLowerCase() == element.user.tag.toString().toLowerCase()) obk.name.push(element.user.tag.toString()), obk.id.push(element.id)
        else if(matchess) obk.name.push(element.user.tag.toString()), obk.id.push(element.id)
      })

      if(obk.name.length >1) {
        oldm = await message.channel.send(`Detected ${obk.name.length} Possible ${ser}'s : \n${obk.name.map(p => obk.name.indexOf(p) + ' : ' + p).join('\n')}`)
        let msgs = await message.channel.awaitMessages(m=>{return m.author.id == message.author.id && Number(m.content) < obk.name.length }, {max :1, time :60000})
        oldm.delete()
        if (!obk.name[msgs.map(m=> m.content)]) return message.channel.send('not a valid num ').then(m=>m.delete(5000))
        else {
          //Chosen
          urd = obk.id[msgs.map(m=> m.content)]
          //console.log(obk.name[msgs.map(m=> m.content)])
          msgs.map(m=> m.delete())
          return urd;
        }
      }
      else if(!obk.name[0]) {
        //Couldn't find anyone
        console.log('own ~~ couldn\'t find anyone.')
        return message.member.id;
      }
      else {
        //chosen
        //console.log(obk.name[0])
        urd = obk.id[0]
        return urd;
      }
    },

    //search for a role
    searchR: async function (serv, gv) {
      var tybv = new Array()
      var kybv = new Array()
      obb = {
        id : kybv,
        name : tybv
      }
      regx = new RegExp('\\b' + serv + '?\\S+', 'gi')
      gv.roles.forEach(function(element) {
      var matchess = element.name.toString().match(regx);
      try {
        if(serv.toLowerCase() == element.name.toString().toLowerCase()) obb.name.push(element.name.toString()), obb.id.push(element.id)
        else if(matchess) obb.name.push(element.name.toString()), obb.id.push(element.id)
        }catch(e) {'a'}
      })

      if(obb.name.length >1) {
        message.channel.send(`Detected ${obb.name.length} ${serv}'s : \n${obb.name.map(p => obb.name.indexOf(p) + ' : ' + p).join('\n')}`).then(m=>m.delete(5000))
        let msgs = await message.channel.awaitMessages(m=>{return m.author.id == message.author.id}, {max :1, time :60000})
        if (!obb.name[msgs.map(m=> m.content)]) return message.channel.send('not a valid num ').then(m=>m.delete(5000))
        else {
          message.channel.send(`You've chosen ${obb.name[msgs.map(m=> m.content)]}`).then(m=>m.delete(5000))
          urd = obb.id[msgs.map(m=> m.content)]
          return urd;
        }
      }

      else if(!obb.name[0]) {
        message.channel.send(`unable to find a role with \`${serv}\` in its name.`).then(m=>m.delete(5000));
        return;
      }
      else {
        message.channel.send(`You've chosen ${obb.name[0]}`).then(m=>m.delete(5000))
        urd = obb.id[0]
        return urd;
      }
    }
  }


    
  //LOGGING DM EMBED
  dmembed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField("DM", "DM", true)
  .addField("message", message, true)
  .setColor('RANDOM')
  .setTimestamp();




  //dm logging handling
  if (message.channel.type == "dm"){
    if(server['mainframe'].dmlogs == true) {
      LoG.send(dmembed)
    }
    return
  }

  //msg logging handling
  else(dircc = message.mentions.members.first());
  let ownrr = message.guild.owner.id;
  if(ownrr == message.author.id) (ownrr = "True");
  else {ownrr = "False"}
  embfiles = [];
  emb2files = [];


  //MESSAGE LOGS


  chlr = 1;
  var Attachment = (message.attachments);
  Attachment.forEach(function(attachment) {
    embfiles.push(`[${chlr}. ${attachment.filename}](${attachment.url})`);
    chlr = chlr + 1;
  });
  embfiles.forEach(function(element) {
    var matchess = element.toString().match(/\bhttps?:\/\/\S+/gi);
    emb2files.push(matchess.toString().replace(')', ' '));
  });
  msgembed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField("Guild", message.guild.name+" ", true)
  .addField("Channel", `${message.channel}`, true)
  .addField("message", `[${message.content}](${message.url})`, true)
  .addField('Files', `${embfiles.join(' | ') || 'No files attached'}`)
  .setURL(message.url)
  .setColor('RANDOM')
  .setTimestamp()
  .attachFiles(emb2files);
  if(server['mainframe'].msglogs) {
    LoG.send(msgembed);
  }
  let surdd = message.mentions.members.first();










  /* 

      Start of new INV / MONEY STARTER

  */

  checkuser(message.member)
  if(surdd) {
    checkuser(surdd)
    
    if (userInfo[surdd.user.id].Settings.Away.active == true & surdd.user != message.author) message.channel.send(`Currently ${surdd.user.username} Isn't here. \nReasoning : ${userInfo[surdd.user.id].Settings.Away.reason}`)
  
  }


  /*

      END OF NEW INV / MONEY STARTER

  */


  /*

      Xp system stuff

  */

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  var xp = userInfo[message.author.id].Rank.xp
  var lvl = userInfo[message.author.id].Rank.level

  if (!tag_limit[message.author.id]) tag_limit[message.author.id] = {active : false,time:0}

  if (checklvl(xp,lvl) == true) {
    userInfo[message.author.id].Rank.level ++
    userInfo[message.author.id].Rank.xp = 0
    //console.log(`Level WENT UP! ${userInfo[message.author.id].Rank.level}`)
    message.channel.send('Congratulations, '+message.member.displayName+' You have leveled up to '+userInfo[message.author.id].Rank.level)
  }
  else if (tag_limit[message.author.id].active == false){
    userInfo[message.author.id].Rank.xp += getRandomInt(25)
    //console.log(`XP WENT UP! ${userInfo[message.author.id].Rank.xp}`)
    tag_limit[message.author.id] = {active : true,time:60000}
    setTimeout(function() {tag_limit[message.author.id] = {active : false,time:0}},tag_limit[message.author.id].time)
  }
  



  /*

      Setting prefix

  */


  try{
    if(server[message.guild.id].prefix) {
      usp = server[message.guild.id].prefix
    }
  } catch(e) {usp = PREFIX}
  if (testMode == true) usp = '='
  if (message.content.indexOf(usp) !== 0) return;
  // Our standard argument/command name definition.
  const args = message.content.slice(usp.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  prams = args.slice(0).join(" ") //EXTRA ARGS

  if (testMode == true && message.author.id != (ownerid) && ! altsid.includes(message.author.id)) return message.channel.send('You are not authorised to use the test version.')

  try{
    if(server[message.guild.id].disabled.includes(command)) return message.channel.send('This command is blocked.')
  }
  catch(e) {'a'}
  //CMD LOG
  cmdembed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.avatarURL)
  .setTitle(`${message.author.username} executed a command`)
  .addField("time", mytime,true)
  .addField("Command", command, true)
  .addField("To", `${dircc || "No one was ping'd"}`, true)
  .addField("Channel", message.channel, true)
  .addField("Server", message.guild.name,true)
  .addField("Who executed", message.author,true)
  .addField("Perms the user has", message.member.highestRole.permissions,true)
  .addField('Blocked?' ,server['mainframe'].ownerOnly)
  .setColor('RANDOM')
  .addField("Is server owner", ownrr, true)
  .addField("Command prams", `${prams || "There is no prams"}`, true)

  //SERVERLOGS
  async function checkSlogs () {
    let slogs = message.guild.channels.find(channel => channel.name === "pozus-logs")
    if(!slogs) {
      try{
        c = await message.guild.createChannel("pozus-logs", "text",[{id:message.guild.id, denied:["SEND_MESSAGES", "READ_MESSAGES"]}])
        console.log(c)
        c.send("These are my logs for your server!")
        slogs = c
        return c
      }catch(e) {message.channel.send("Something went wrong with creating a new channel. The error has been sent to `" + by + '`'), console.log(e.stack)}
    }
    else return slogs
  }
  slogs = await checkSlogs()
  await stuff.ssUpdate()

  vCmd = {
    queues : {[message.guild.id] : []},
    isPlaying : {[message.guild.id] : false}
  }

  function managePerms(permsReq) {
    return message.member.hasPermission(permsReq,false,true,true)
  }

  class throttle {
    constructor(cmd) {
      this.timeout = new Object()
      this.usages = new Object()
      this.timeout[cmd] = '0'
      this.usages[cmd] = 0
    }
    add(throt,type,cmd) {
      switch(type.toLowerCase()) {
        case 'timeout' :
          this.timeout[cmd] = dateAdd(new Date(),'second',throt.Dur)

        break;

        case 'usages' :

          this.usages[cmd] ++
        
        break;
      }
    }
    reset(cmd) {
      this.timeout[cmd] = '0'
      this.usages[cmd] = 0
    }
  }

  function handleThrot(throt,cmd) {
    cancle = false
    thr = new throttle(cmd)
    if(!Values.throt[message.member.id]) Values.throt[message.member.id] = thr
    if(!Values.throt[message.member.id].usages[cmd]) Values.throt[message.member.id] = thr
    CmdTimeout = Values.throt[message.member.id].timeout[cmd]
    CmdUsages = Values.throt[message.member.id].usages[cmd]
    if(CmdTimeout != '0') {
      if(new Date() >= CmdTimeout) {
        Values.throt[message.member.id].reset(cmd)
        console.log('resetted')
      }else if (new Date() < CmdTimeout) cancle = true
    } 
    else {
      Values.throt[message.member.id].add(throt,'usages',cmd)
      if (Values.throt[message.member.id].usages[cmd] >= throt.Usage) {
        console.log('adding a timeout')
        Values.throt[message.member.id].add(throt,'timeout',cmd)
      }
    }
    return cancle
  }

  function HandleClass(cmdclass) {
    if (! cmdclass.args) return console.log('Args Dont exist')
    if (cmdclass.args.Needed == []) return console.log('gucci')

    function convert(arg)  {

      if ((arg === 'true')) return (arg === 'true')
      else if ( parseInt(Arg) ) return parseInt(Arg)
      else if ( parseFloat(Arg) ) return parseFloat(Arg)
      //else if () {}

      return arg
    }


    var Con = true
    var err

    Combied = []
    cmdclass.args.Needed.map(o =>{ o.Extra = false; Combied.push(o) } ); cmdclass.args.Extra.map( t=> { t.Extra = true; Combied.push(t) } )

    Combied.forEach(e => {

      if (e.Extra == false) {

        if (Con == false) return

        console.log(`${args.length} vs ${e.Pos}`)

        if (args.length <= e.Pos && args[0] == null ) {
          Con = false 
          err = `You are missing a command parameter. < ${e.Name} >`; 
          return
        
        }
        else {

          Arg = args[e.Pos]

          Conv = convert(Arg)

          if ( typeof Conv  != e.Type) {

            Con = false

            err = `Argument < ${e.Pos} > Has unexpected type. Expected type : ${e.Type}, Type given : ${typeof Conv}`


          }

        }

      }

    })
    return {Con, err}
  }

  //checks if command is a fun command
  if(server['mainframe'].cmdlogs == true) {
  loGC.send(cmdembed)
  }
  if(server['mainframe'].ownerOnly == true && message.author.id != ownerid) return;

  commandTypes = {
    //Voice : bot.Voicecommands.get(command) || bot.aVoicecommands.get(command),
    Fun : bot.Funcommands.get(command) || bot.aFuncommands.get(command),
    All : bot.allcommands.get(command) || bot.aallcommands.get(command),
    SerMan : bot.Server_managementcommands.get(command) || bot.aServer_managementcommands.get(command),
    Owner : bot.Ownercommands.get(command) || bot.aOwnercommands.get(command),
  }
  var Cmd
  Object.values(commandTypes).forEach((e)=>{
    if (e == undefined || e == null) return
    Cmd = e
    
  })
  
  if(! Cmd ) return
  //console.log(Cmd)
  var leg = false
  if(!Cmd.class) leg = true//return message.channel.send(`Aaaaa pozm is an idiot and forgot to make this a class, \n<@${ownerid}>. `)
  else var classed = Cmd.class
  if (!leg) {
    var {Con, err} = HandleClass(classed)
    if (Con == false) return message.channel.send(err)
  }
  console.log(`Legacy mode :`.bold.blue +` ${leg == true ? 'yes' : 'no'}`.bold.red)
  if (leg == true) {
    //console.log(Cmd.help.perms)
    if (Cmd.help.perms) if(!managePerms(Cmd.help.perms) && message.author.id != ownerid) return message.channel.send(`${Emotes.useable(Emotes.failed)} You do not have the correct perms to run this cmd. (${Cmd.help.perms})`)
    Cmd.run(bot, message, args).catch(e=>console.log(`Caught error : ${e.name} - ${e.message}`.bold.blue +`(${command})`.bold.red + `\n-----stack-----\n${e.stack}\n-----stack-----`.bold.green));
  }
  else {
    if(!managePerms(classed.clientPerms) && message.author.id != ownerid) return message.channel.send(`${Emotes.useable(Emotes.failed)} You do not have the correct perms to run this cmd. (${classed.clientPerms})`)
    if(classed.ownerOnly == true && message.author.id != ownerid) return message.channel.send(`${Emotes.useable(Emotes.ownerOnly)} Sorry only \`${bot.users.get(ownerid).tag}\`Shall use this command.`)
    Bvd = handleThrot(classed.throt,command)
    if (Bvd == true) return message.channel.send(`You are being throttled. (for ${classed.throt.duration} secs)`)
    Cmd.run(bot, message, args).catch(e=>console.log(`Caught error : ${e.name} - ${e.message}`.bold.blue +`(${command})`.bold.red+`(${command})`.bold.red + `\n-----stack-----\n${e.stack}\n-----stack-----`.bold.green));
  }
}
