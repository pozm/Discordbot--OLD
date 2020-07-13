exports.run = async (bot, message, args, LoG) => {
    const Discord = require("discord.js")
    const { TOKEN, PREFIX, mytime, activity, hexcolor, ownerid, clientID} = require('../../modules/config');
    const { embeds} = require('../../usage/embeds');
    let kickUser = message.mentions.members.first()
    let kickreason = args.slice(1).join(" ")
    if(!kickreason) kickreason = "Reason not declared"
    if(!kickUser) {
        kickUser = await stuff.searchM(args[0], message.guild)
    }
    if(!kickUser) return message.channel.send('You gotta tell me who to kick')
    if(!kickUser.kickable) return message.channel.send("I cannot kick that person.")
    if(!kickUser.id == ownerid) return message.channel.send("Sorry, but nope.")

    if(stuff.ffd == true) return message.channel.send("They have a higher role than you; Or they have the same role.")
    stuff.loading()
    try{
        kickUser.send(`Hey! you were kicked from ${message.guild.name} for ${kickreason}\nBy ${message.author.tag}`)
    }catch(e) {}
    setTimeout(function() {
        kickUser.kick(kickreason).then(message.channel.send(`Kicked ${kickUser.user.username} for \`${kickreason}\``))
    },300)
    embeds.kick(message.member, kickUser, kickreason, slogs)
    };
    exports.help= {
        usage:'+kick <user> <reason>',
        perms:['KICK_MEMBERS'],
        desc:'kicks\'s the user you ping'
    }