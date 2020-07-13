exports.run = async (bot, message, args, LoG) => {
    const Discord = require("discord.js")
    const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, hexcolor} = require('../../modules/config');
        let tomove = message.mentions.members.first()
        if(!tomove) {
            ab = []
            a = stuff.searchM(args[0], message.guild)
            b = await a.then(v =>{ v
                if(!v) return;
                return message.guild.fetchMember(v);
            })
            tomove = b
        }
        if(!tomove) return message.channel.send(`C'mon, How am i ment to move MR. NOBODY?`)
        if(stuff.ffd == true) return message.channel.send("They have a higher role than you; Or they have the same role.")
          stuff.loading()
    const muser = message.mentions.members.first()
    let mchanl = args.join(" ").slice(args[0].length +1)
    if(message.content.includes("-leave")) 
    {
        message.guild.createChannel("tempWCAGF","voice").then( h => {
        muser.setVoiceChannel(h.id)
        setTimeout(() => {
            h.delete()
        }, 444);
        })
        return
    }
    let gucc = message.guild.channels.find(channel => channel.name === mchanl)
    if(!gucc) return message.channel.send("Unable to find that voice channel, make sure the caps are correct")
    muser.setVoiceChannel(gucc.id)
}
exports.help= {
    usage:'+move [-leave] <user> <channel>',
    perms:['MOVE_MEMBERS'],
    desc:'Allows you to move or kick the pinged user\'s voicechat'
}
