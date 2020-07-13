exports.run = async (bot, message, args) => {
    const Discord = require('discord.js')
    var request = require('request');
    if (message.guild.id == '513498066427576320' && message.channel.id != '622384448272596993' && message.channel.parent.id != '555120516193845258') return message.channel.send('Pls ask for may may in <#622384448272596993>') // prevents flooding in my channel.
    msv = await message.channel.send('This might take a few seconds...')
    url1 = 'https://www.reddit.com/r/dankmemes/random.json'
    stuff.uplog('write', 'requesting '+ url1)
    request({
        url: url1,
        json: true
    },function (error, response, body) {
    if (!error && response.statusCode === 200) {
        //console.log(response)
        dat = body // Print the json response
        //for testing console.log(body[0].data.children[0].data)
        rl = body[0].data.children[0].data
        emb = new Discord.RichEmbed()
        .setAuthor('u/'+rl.author,'',)
        .setTitle(`'${rl.title}'`)
        .setImage(rl.url)
        .setURL('https://reddit.com'+rl.permalink)
        .setFooter(`Collected from : https://reddit.com/${rl.subreddit_name_prefixed} :)`)
        message.channel.send(emb)
        //old. message.channel.send({files:[String(body[0].data.children[0].data.url)]})
        msv.delete()
        stuff.uplog('add', `Got :`.bold.blue+` https://reddit.com${rl.permalink}`.bold.red)
        return;
    }
})
}
exports.class = class MemeCommand extends classes.Command {
    constructor(bot) {
        super(bot,{
            name:'meme',
            desc:'le epic may may',
            alias : [],
            memberName:'meme',
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
    usage:'+meme',
    desc:'gen meme'
}

