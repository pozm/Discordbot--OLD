exports.run = async (bot, message, args) => {
    const Discord = require("discord.js");
    user = message.mentions.members.first()
    var searchVal
    if (!user) user = '!1'
    if (args.length == 0) user = null
    if (user === '!1') {
        searchVal = await stuff.searchM(args[0],message.guild)
        console.log(searchVal)
        user = (searchVal ? message.guild.members.get(searchVal) : null)
    }
    if (user === '!2') user = null


    msg = await message.channel.send('This might take a few seconds.')
    var arr = []
    stuff.uplog('write', 'requesting a random gif from tenor' .bold.blue+ '(ANIME HUGS)' .bold.red)
    await Tenor.Search.Random("anime hugs", "1").then(Results => {
        Results.forEach(Post => {
            arr.push(Post.media[0].mediumgif.url)
        });
    }).catch(console.error);

    len = arr.length
    num = 0//numgen(len,0)
    emb = new Discord.RichEmbed()
    if(user == null) emb.setDescription(`*${bot.user.username} hugs ${message.member.displayName}*`)
    else emb.setDescription(`*${message.member.displayName} hugs ${user.displayName}*`)
    emb.setImage(arr[num])
    msg.edit(emb)
    stuff.uplog('add', 'Got gif in return : '.bold.blue+ arr[num] .bold.red)

}

exports.class = class HugCommand extends classes.Command {
    constructor(bot) {
        super(bot,{
            name:'hug',
            desc:'hug ppl or ur self',
            alias : [],
            memberName:'hug',
            group:'Fun',
            guildOnly : false,
            clientPerms : ['SEND_MESSAGES'],
            throt : {
                usage : 1337,
                duration : 0,
            },
            ownerOnly : false
        })
    }
}

exports.help= {
    usage:'+hug [user]',
    desc:'lol'
}