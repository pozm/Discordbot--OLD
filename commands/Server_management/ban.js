exports.run = async (bot, message, args, LoG) => {
    const Discord = require("discord.js")
    const { TOKEN, PREFIX, mytime, activity, hexcolor, ownerid, clientID} = require('../../modules/config');
    const { embeds} = require('../../usage/embeds');
    let banUser = message.mentions.members.first()
    let banreason = args.slice(1).join(" ")
    if(!banreason) banreason = "Reason not declared"
    if(args[0] == null) return message.channel.send(`${Emotes.useable(Emotes.failed)} Please dont do that again, its rather annoying when you just do "+ban" (or "+b")`)
    if(!banUser) banUser = await stuff.searchM(args[0], message.guild)
    if(!banUser) return message.channel.send("you gotta tell me the person you want to ban!")
    if(!banUser.bannable) return message.channel.send("I cannot ban that person.")
    if(!banUser.id == ownerid) return message.channel.send("Sorry, but nope.")
    if(stuff.ffd == true) return message.channel.send("They have a higher role than you; Or they have the same role.")
    stuff.loading()
    let dontDm
    try{
        banUser.createDm()
    }catch(e) {dontDm = true}
    if (dontDm == true) {
        banUser.ban(banreason).then(message.channel.send(`Banned ${banUser.user.username} for \`${banreason}\``))
    }
    else send(`Hey! you were Banned from ${message.guild.name}\nreason: \`${banreason}\`\nBy: \`${message.author.tag}\``).then(banUser.ban(banreason).then(message.channel.send(`Banned ${banUser.user.username} for \`${banreason}\``)))
    embeds.ban(message.member, banUser, banreason, slogs)
};


exports.class = class BanCommand extends classes.Command {
    constructor(bot) {
        super(bot,{
            name:'ban',
            desc:'ban ppl',
            alias : ['b'],
            memberName:'ban',
            group:'Server_Management',
            guildOnly : true,
            clientPerms : ['BAN_MEMBERS'],
            throt : {
                usage : 2,
                duration : 7,
            },
            ownerOnly : false
        })
    }
} 