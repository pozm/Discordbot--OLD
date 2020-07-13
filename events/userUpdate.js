module.exports = async (bot,oldu,newu) => {
    var colors = require('colors');
    const Discord = require("discord.js");
    const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, logid, hexcolor} = require('../modules/config');
    
    Chenl = bot.channels.get(logid)
    emble = new Discord.RichEmbed()
    .setTitle('A user has changed their stuff')
    .addField(oldu.username , `ID:${oldu.discriminator}\n[Avatar](${oldu.avatarURL})`,true)
    .addField('->','->',true)
    .addField(newu.username , `ID:${newu.discriminator}\n[Avatar](${newu.avatarURL})`,true)
    Chenl.send(emble)


}