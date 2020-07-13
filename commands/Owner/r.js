exports.run = async(bot, message, args) => {
    const fs = require('fs')
    const { promisify } = require("util")
    const readdir = promisify(fs.readdir)
    const cmdFiles = await readdir("./commands/");
    let abc = 0
    cmdFiles.forEach(folder => {
    if(!args || args.size < 1) return message.channel.send("Must provide a command name to reload.");
    const commandName = args[0];
    // Check if the command exists and is valid
    if(!bot[`${folder}commands`].has(commandName)) {
        abc = abc + 1
        if(abc >= cmdFiles.length) {
      return message.channel.send("That command does not exist");
        }
        return
    }
    // the path is relative to the *current folder*, so just ./filename.js
    delete require.cache[require.resolve(`../${folder}/${commandName}.js`)];
    // We also need to delete and reload the command from the bot.commands Enmap
    var props 
    try {
      props = require(`../${folder}/${commandName}.js`);
    }
    catch(e) {return message.channel.send('I was able to get the error before it effected (check console for err)', console.log(`Caught error : ${e.name} - ${e.message} `.bold.blue + `(${commandName})`.bold.red))}
    bot[`${folder}commands`].delete(commandName);
    help = props.help
    if (!help ) help = props.class
    process.stdout.write('Going to reload '.bold.blue + `${commandName}`.bold.red);
    //console.log('Going to reload '.bold.blue + `${commandName}`.bold.red)
    alias = help.alias
    try{
      if(alias) {
        alias.forEach(function(element){bot[`a${folder}commands`].set(element, props)})
      }
    }
    finally{bot[`${folder}commands`].set(commandName, props);}
    //bot[`${folder}commands`].set(commandName, props);
    message.channel.send(`The command \`${commandName}\` has been reloaded (also its aliases)`);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write('successfully reloaded '.bold.blue + `${commandName}`.bold.red + '\n')
    })
  };

exports.class = class reloadCommand extends classes.Command {
  constructor(bot) {
      super(bot,{
          name:'r',
          desc:'Get reloaded',
          alias : ['reload'],
          memberName:'r',
          group:'owner',
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
  usage:'+r <commandName>',
  desc:'Relaods the command',
  alias:['reload']
}