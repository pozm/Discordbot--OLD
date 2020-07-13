exports.run = async (bot, message, args, LoG) => {
    const Discord = require("discord.js")
    const { TOKEN, PREFIX, mytime, activity, hexcolor, ownerid, clientID} = require('../../modules/config');
    const fs = require("fs")
    const ms = require("ms")
    const server = locate.SERVER
    const {getData, writeData} = require('../../modules/DataHandler.js')


    const guild = message.guild
    const channel = message.channel


    const serverdata = server[guild.id]

    

    function embedd() {
        emb = new Discord.RichEmbed()
        .setTitle('Server settings', message.author.avatarURL)
        .setColor('RED')
        .setDescription('Settings to alter what i do.')
        .setFooter(`Requested by ${message.author.username}`)
        .setTimestamp()
        
        .addField('Log the following?','...',true)
        .addField('Settings','...',true)
        .addBlankField()
        .addField('\🔄when a message gets updated', serverdata.mu == true? 'On' : 'Off',true)
        .addField('\❌Disabled commands',serverdata.disabled,true)
        .addBlankField(false)
        .addField('\🚮When a message gets deleted', serverdata.md == true? 'On' : 'Off',true)
        .addField('\⁉prefix', serverdata.prefix == '+'? 'default (+)':serverdata.prefix,true)
        .addBlankField(false)
        .addBlankField(true)
        .addField('\🆕Join role', serverdata.role == false ? 'Off': '<@&'+serverdata.role+'>' ,true);

        return emb


    }

    embed = createdEmbed()

    embed = await embed.then(m=> {return m;})
    embed.react('🔄')
    embed.react('🚮')
    embed.react('❌')
    embed.react('⁉')
    embed.react('🆕')


    const filter = (reaction, user) => reaction.users.has(bot.user.id) == true & user.id != bot.user.id & user.id == message.author.id
    const collector = embed.createReactionCollector(filter, { time: 60000 });
    
    collector.on('collect', r =>{

        var msgd = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 60000 });


        if (r.emoji.name == '🔄') {
            serverdata.mu == true ? serverdata.mu = false : serverdata.mu = true

        }
        else if (r.emoji.name == '🚮') {
            serverdata.md == true ? serverdata.md = false : serverdata.md = true

        }
        else if (r.emoji.name == '❌') {
            cmds = bot.Server_managementcommands.map(m=>m.help.usage != '+ss'? m.help.usage.trim().slice(1).split(/ +/g)[0] : '')
            message.channel.send(`These are the commands you can disable: ${cmds.join(' | ')}\n Please enter the one which you would like to disable.(Tip: you can put a comma to select multiple)`).then(m => {
                msgd.on('collect', message => {
                    if (message.content.includes(',')) {
                        newmsg = message.content.split(',')
                        newmsg = newmsg.map(m=> cmds.includes(m.replace(/\s/g, ""))? m.replace(/\s/g, ""):'')

                        if (serverdata.disabled == 'none') {
                            serverdata.disabled = newmsg
                        } 
                        else {
                            newmsg.map(v=>{
                                pos = serverdata.disabled.indexOf(v)
                                if (pos > -1) {
                                    serverdata.disabled.splice(pos,1)
                                }
                                else serverdata.disabled.push(v)
                            })
                        }
                    }
                    else if (!cmds.includes(message.content)) {m.delete();return message.channel.send('Thats not a valid command.');}
                    else {
                        if (serverdata.disabled.includes(message.content)) {
                            serverdata.disabled.splice(serverdata.disabled.indexOf(message.content),1)
                        }
                        else {
                            serverdata.disabled == 'none'? serverdata.disabled = [message.content] : serverdata.disabled.push(message.content)
                        }
                    }
                    if (serverdata.disabled == '' || serverdata.disabled == '[]') {serverdata.disabled = 'none'}
                    msgd.stop()
                    m.delete()
                    message.delete()
                    reloadEmbed(embed)
                })
                   
            })

        }
        else if (r.emoji.name == '⁉') {
            allowedp = ['.', '#', '~', '@', ':', ';', "!", "$", "£", "^", "*", "-", "_", "=", "+", `¬`, '?', '/', '>' ]
            message.channel.send(`These are the prefixes you can use: ${allowedp.join(' | ')}`).then(m=> {
                msgd.on('collect', message => {
                    if (allowedp.includes(message.content)) {
                        serverdata.prefix = message.content
                        reloadEmbed(embed)
                        m.delete()
                        message.delete()
                        msgd.stop()
                    }
                })
            })
        }
        else if (r.emoji.name == '🆕') {
            channel.send('Enter Either the role name (Tip: it can be shortend)').then(m=>{
                msgd.on('collect',async message => {
                    msgd.stop()
                    a = stuff.searchR(message.content, message.guild)
                    b = await a.then(v =>{ v
                        if(!v) return;
                        return message.guild.roles.get(v);
                    })
                    role = b
                    m.delete()
                    if (! role) return ''
                    serverdata.role = role.id
                    message.delete()
                    reloadEmbed(embed)
                })
            })
        }
        r.remove(message.author)
        reloadEmbed(embed)

    });


    collector.on('end',collected =>{
        embed.clearReactions()
        embed.delete(5000)
        message.delete()
        slogs.send('Server settings were changed :',embedd())
        server[guild.id] = serverdata
        writeData(server,'server')
    })


    function createdEmbed() {

        emb = embedd()

        msg = channel.send(emb)
        return msg

    }


    function reloadEmbed(Message) {

        emb = embedd()

        Message.edit(emb)

    }



}


exports.help = {
    usage:'+ss',
    desc:'Shows interface for Server Settings.',
    perms:['MANAGE_GUILD'],
    alias: ['settings']
}