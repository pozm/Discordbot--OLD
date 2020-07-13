exports.run = async (bot, message, args) => {
    const Discord = require("discord.js")
    const fs = require ("fs")
    const ms = require (`ms`)
  //  const login = locate.LOGIN
  //  const money = locate.MONEY
    const { TOKEN, PREFIX, mytime, activity,logid, ownerid,by, clientID,secretgen} = require('../../modules/config');
    var server = locate.SERVER
    const {lpistaff} = require('../../usage/staff')
    var suggest = locate.suggestion
    var userInfo = locate.userInfo
    const {getData, writeData} = require('../../modules/DataHandler.js')
  //  const inv = locate.inv
   // delete require.cache[require.resolve("../../Data/inv.json")];
    const {weapons, foundW, items, SHOPiw} = require('../../usage/items.js');

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    var loggin = async() => {
      bot.channels.get("537005255070580746").send(`\`<Pozus security>\`:${message.author.tag} is executing (SUCCESSFUL?: \`${complete}\`)\n\`\`\`js\n${chck}\n\`\`\``)
      return
    }
    

  function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  }


  if(message.author.id !== ownerid) {
    message.channel.send(`Only ${bot.users.get(ownerid).username} shall use eval`)
    var  chck = args.join(" ")
    var complete = false
    loggin();
    return
  }

  try {
    const code = args.join(" ");
    let evaled = eval(code);

    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);

    message.channel.send(clean(evaled), {code:"js"});
    var complete = true
  } catch (err) {
    var complete = false
    message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  } finally {
    try{
    var chck = code
    }catch(e) {
    var chck = args.join(" ")
    }
    loggin();
  }


}



exports.class = class evalCommand extends classes.Command {
  constructor(bot) {
      super(bot,{
          name:'eval',
          desc:'execute code',
          alias : ['run'],
          memberName:'eval',
          group:'Owner',
          guildOnly : false,
          clientPerms : ['SEND_MESSAGES'],
          throt : {
              usage : 1337,
              duration : 0,
          },
          ownerOnly : true
      })
  }
}

exports.help= {
  usage:'+eval <code>',
  desc:'executes code.',
  alias:['run']
}