const Discord = require("discord.js");
const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, hexcolor} = require('../../modules/config');
const { promisify } = require("util")
const fs = require('fs')
const readdir = promisify(fs.readdir)
exports.run = async(bot, message, args) => {
  cmdfiles = await readdir('./commands')

  function getHelpFromFile (file,folder, data) {
    let thelp = bot[`${folder}commands`].get(file) || bot[`a${folder}commands`].get(file)
    if (thelp == undefined || thelp == null) return data
    tclass = thelp.class
    thelp = thelp.help

    //console.log(tclass)

    if (!tclass) tclass = null
    if (data[folder.toLowerCase()] == null) data[folder.toLowerCase()] = {'commands' : [ {'command' : file,'help' : thelp,'class':tclass}]}
    else data[folder.toLowerCase()]['commands'].push({'command' : file,'help' : thelp,'class':tclass}) 
    return data
  }

  function hlpemb(type,data) {
    var end = []
    dd = data;dd[type.toLowerCase()]['commands'].forEach(v=>{
      usg = ''
      if (v.class != null) {
        if(v.class.usage) usg = v.class.usage
      }
      else if (v.help) {
        if(v.help.usage) usg = v.help.usage
      }
     // console.log(usg)
      if (usg == '') usg = 'usg not available.'
      end.push(`${v.command} — ${usg}`)
    });
    return end.join('\n')
  }

  async function searchFiles (search) {
    var data = new Object
    await cmdfiles.forEach(async folder => {
      fi = await fs.readdirSync(`./commands/${folder}/`, {withFileTypes : false});
      var commandName = search

      if (search == null) {
        fi.forEach(f=>{
          if (!f.endsWith('.js')) return
          f = f.replace('.js','')
          data = getHelpFromFile(f,folder,data)
        })
      } 

      else data = getHelpFromFile(commandName,folder,data)
    })

    return data;
  }
  if(args[0]) {

    msg = await message.channel.send('getting data...')
    dat = await searchFiles(args[0])
    if (Array.isArray(dat) && array.length) {

      message.channel.send('There has been an error fetching command data. error uploaded to console.')

      return;
    }

    cmd = dat[Object.keys(dat)[0]].commands[0]

    if (!cmd.class) cmd.class = cmd.help

    usage = [server[message.guild.id].prefix+cmd.command]

    if (cmd.class.args) {

      Combied = []
      cmd.class.args.Needed.map(o =>{ o.Extra = false; Combied.push(o) } ); cmd.class.args.Extra.map( t=> { t.Extra = true; Combied.push(t) } )

      Combied.forEach(e => {

        usage[e.Pos+1] = `${e.Extra ? `[${e.Name}]` : `<${e.Name}>`}`


      })

    }

    //console.log(cmd.class.alias.length? cmd.class.alias.join(' | ') : 'None')

    emb = new Discord.RichEmbed()
    .setTitle(cmd.command)
    .setDescription(cmd.class.desc)
    .addField('usage', usage.join(' '),true)
    .addField('alias(es)',cmd.class.alias.length? cmd.class.alias.join(' | ') : 'None',true)
    .addField('Type of command', cmd.class.group,true)
    .addField('Permissions needed', cmd.class.clientPerms ? cmd.class.clientPerms.join(' | ') : 'Command isn\'t updated yet')
    .setColor('PURPLE')
    .setFooter('requested by '+message.member.displayName)

    msg.edit(emb)
  }
    else {

      dat = await searchFiles(null)

      let b = new Discord.RichEmbed()
      .setTitle("Help embed!")
      .setAuthor(bot.users.get(ownerid).username, bot.users.get(ownerid).avatarURL)
      .setColor('RANDOM')
      .setFooter("Tip: use +help <commandname> for More information about the command.")
      .setTimestamp()
      Object.keys(dat).forEach((e)=>{if (e == 'owner') '';else b.addField(e.toUpperCase(),hlpemb(e,dat),true)})
      message.author.send(b).then(m=>{
      if(message.author.id == ownerid) {
        m.edit(b.addField(`OWNER`, hlpemb('owner',dat), true))
      }
    })
    message.delete()
  }

}

exports.class = new classes.Command ( exports.run, {
  name:'Help',
  desc:'Dm\'s you the help embed.',
  alias : ['cmd','cmds','commands'],
  memberName:'help',
  group:'all',
  guildOnly : false,
  clientPerms : ['SEND_MESSAGES'],
  args : {Needed : [], Extra : [{Name:'Command', Pos:1,Type:'string'}] },
  throt : {
      Usage : 2,
      Dur : 2,
  },
  ownerOnly : false
} )



exports.help= {
    usage:'+help',
    desc:'Shows help.',
    alias:['h','cmd', 'cmds', 'commands']
}