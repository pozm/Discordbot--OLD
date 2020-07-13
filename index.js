const Discord = require("discord.js");
//modules
var colors = require('colors');
const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, ytkey,Odtok} = require('./modules/config');
const fs = require("fs");
const Enmap = require("enmap")
const bot = new Discord.Client({disableEveryone: true});
const { promisify } = require("util")
const readdir = promisify(fs.readdir)

require('dotenv').config()

Tenor = require("tenorjs").client({
  "Key": process.env.TENOR_KEY,
  "Filter": "off", 
  "Locale": "en_GB", 
  "MediaFilter": "minimal", 
  "DateFormat": "D/MM/YYYY - H:mm:ss A" 
});

if (Boolean(process.argv[2]) == true) testMode = true; else testMode = false


/*locate = {
  SERVER:server,
  userInfo:userInfo,
  DIR:__dirname,
  FIN:__filename,
}*/

classes = {
  Command : class {
    constructor(func, {name,desc,alias,memberName,group,guildOnly,clientPerms,throt,args,ownerOnly}) {
      this.Name = name
      this.desc = desc
      this.alias = alias
      this.memberName = memberName
      this.group = group
      this.guildOnly = guildOnly
      this.clientPerms = clientPerms
      this.throt = {Usage:throt.Usage,dur:throt.Dur}
      this.args = args ?  {Needed : args.Needed,Extra:args.Extra} : ''
      this.ownerOnly = ownerOnly
      this.run = func
    }
    Execute() {this.run()}
  }
}

Array.prototype.remove = function() {
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
          this.splice(ax, 1);
      }
  }
  return this;
};




/*OneDrive.items.listChildren({
  accessToken: Odtok,
}).then((childrens) => {
  console.log(childrens)
})*/
const {getData, writeData,goexit} = require('./modules/DataHandler')
//var userInfo = getData('userInfo')
//var server = getData('server')
//reloads data
setInterval(function() {
  writeall()
  locate = {
    SERVER:server,
    userInfo:userInfo,
    DIR:__dirname,
    FIN:__filename,
  }
},60000)

//defines the different types of commands

userInfo = getData('userInfo')
server = getData('server')
locate = {
  
  SERVER:server,
  userInfo:userInfo,
  DIR:__dirname,
  FIN:__filename,
}

function writeall() {
  writeData(userInfo,'userInfo')
  writeData(server,'server')
}

function initializeEvn(file,Existing) {

  if (file.split(".").slice(-1)[0] !== "js") return;
  delete require.cache[require.resolve(`./events/${file}`)];
  const evtName = file.split(".")[0];
  const event = require(`./events/${file}`);
  if (Existing) bot.removeAllListeners(evtName)
  console.log(`${Existing ? 'Re-initialized' : 'Initialized'} | `.bold.blue+ `${evtName}`.italic.white + ` <Event>`.bold.blue)
  return bot.on(evtName, event.bind(null, bot));

}


function initializeCmd(file,folder,update) {
  if (!file.endsWith(".js")) return;
  delete require.cache[require.resolve(`./commands/${folder}/${file}`)];
  let props = require(`./commands/${folder}/${file}`);
  let commandName = file.split(".")[0];
  try{
    help = props.help
    alias = help.alias
  }catch(e) {''}

  console.log(`${update == true ? 'Updated' : 'Loaded'} | `.bold.blue + commandName .bold.red + ' - '.bold.blue + `#${folder}`.white);
  try{
    if(alias) {
      alias.forEach(function(element){console.log(`${update == true ? 'Updated' : 'Loaded'} | `.bold.blue+element .bold.red+ ` [Alias of ${commandName}]`.red + ' - '.bold.blue + `#${folder}`.white), bot[`a${folder}commands`].set(element, props)})
    }
  }
  finally{bot[`${folder}commands`].set(commandName, props);}


}




//makes a loading global const
const load = async () => {
  const evtFiles = await readdir("./events/");
  const cmdFiles = await readdir("./commands/");

  evtFiles.forEach(file => {
    
    var evnt = initializeEvn(file)

    fs.watchFile(`./events/${file}`, () => initializeEvn(file,evnt) )
  })


   cmdFiles.forEach(folder => {
    if (!bot[folder+'commands']) bot[folder+'commands'] = new Enmap();bot['a'+folder+'commands'] = new Enmap();

    console.log('Got '.bold.blue + folder . bold.magenta)

    fs.readdir(`./commands/${folder}/`, (err, files) => {
      if (err) return console.error(err);
      files.forEach(file => { 
        initializeCmd(file,folder) 
        fs.watchFile(`./commands/${folder}/${file}`, () => initializeCmd(file,folder,true)

      )})

    });
  })
  //xa.run()
}

if (testMode == true) bot.login(process.env.TEST_DISCORD_TOKEN);
else bot.login(process.env.DISCORD_TOKEN);
//checks for client id


//activitydsa() // crash
process.on('exit',function(){
  writeall()
  goexit()
})

process.on('SIGINT', function () {
  console.log('Do not exit via ctrl + C!!'.bold.magenta + ' Going to exit in 5s'.bold.yellow);
  process.stdin.resume();
  goexit()
  setTimeout(function() {process.stdin.pause(); process.exit(1)},5000)
});
process.on('uncaughtException', function(e) {
  writeall()
  goexit()
 // console.log('Uncaught Exception...');
  console.log(`Error not caught! : ${e.name} - ${e.message}`.bold.cyan);
});

console.log('Going to load!'.underline.bold.green)

load();

app = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World!');
  res.end();
})

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
