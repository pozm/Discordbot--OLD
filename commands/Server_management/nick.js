exports.run = async (bot, message, args) => {
    const Discord = require("discord.js")
    const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, hexcolor} = require('../../modules/config');
    let nickname = args.slice(1).join(" ")
    let Usernick = message.mentions.members.first()
    if(!Usernick) Usernick = await message.guild.members.get(await stuff.searchM(args[0], message.guild))
    if(!Usernick) return message.channel.send("You **MUST** tell me the person who you want to change the nick of.")
    if(nickname.length > 32) return message.channel.send("The nickname you provided was too long!")
    if(!nickname) nickname = Usernick.displayName
    if(stuff.ffd == true) return message.channel.send("They have a higher role than you; Or they have the same role.")
    stuff.loading()
    //console.log(nickname,'#',Usernick,'~')
    try{
        Usernick.setNickname(nickname)
        message.channel.send(`Sucessfully set ${Usernick.user.username}'s nickname to ${nickname}`)
    }catch(e){message.channel.send("Error! #-- something went wrong with setting the nickname")}
    let nickEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle(message.author.username + " changed " + Usernick.user.username + "'s nickname")
    .addField("Time", mytime + " [GMT]")
    .addField("nickname set", nickname)
    .setColor(hexcolor)
    //console.log(nickEmbed,slogs.name)
    slogs.send(nickEmbed)

}



exports.help= {
    usage:'+nick <user> <nickname>',
    perms:['MANAGE_NICKNAMES'],
    desc:'nicks\'s the user you ping'
}