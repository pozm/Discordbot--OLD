exports.run = async (bot, message, args, LoG) => {
    const Discord = require("discord.js")
    const { TOKEN, PREFIX, mytime, activity, hexcolor, ownerid, clientID} = require('../../modules/config');
    const fs = require("fs")
    const ms = require("ms")
    return message.channel.send('This command is obsolete, and will be removed in a later version.')
    const filter = (reaction,user) => reaction.emoji.name === '💥' && user.id === message.author.id
    const filter2 = (reaction,user) => reaction.emoji.name === '🔃' && user.id === message.author.id
    const cmdD = (reaction,user) => reaction.emoji.name === '❌' && user.id === message.author.id
    const prefix = (reaction,user) => reaction.emoji.name === '❗' && user.id === message.author.id
    const server = locate.SERVER
        ssemb = new Discord.RichEmbed()
        .setTitle(`Server settings for ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL)
        .addField('🔃Message updates', server[message.guild.id].mu)
        .addField('💥Message deletes', server[message.guild.id].md)
        .addField('❌Disabled CMDS', server[message.guild.id].disabled)
        .addField('❗prefix', server[message.guild.id].prefix)
        .setColor(hexcolor)
        message.channel.send(ssemb)
        .then(m=>{var ssv = m
        ssv.react('🔃').then(() => ssv.react('💥')).then(() => ssv.react('❌')).then(() => ssv.react('❗'));
        const collector = ssv.createReactionCollector(filter2, { time: 60000 });
        const collector2 = ssv.createReactionCollector(filter, { time: 60000 });
        const collector3 = ssv.createReactionCollector(cmdD, { time: 60000 });
        const collector4 = ssv.createReactionCollector(prefix, { time: 60000 });
        function arrayRemove(arr, value) {

            return arr.filter(function(ele){
                return ele != value;
            });
         
         }
         
            collector.on('collect', async(r) => {
                reaction = r
                if (reaction.emoji.name === '🔃') {
                    console.log('a')
                    afd = server[ssv.guild.id].mu
                    if(afd == "false") tda = "true"
                    else tda = "false"
                    server[ssv.guild.id].mu = tda
                     fs.writeFile(locate.DIR+"/Data/server.json", JSON.stringify(server, null, 4), (err) => {
                       if (err) console.log(err)
                     })
                     if(tda == "false")hfd = "disabled"
                     else if(tda == "true")hfd = "enabled"
                     ssemb = new Discord.RichEmbed()
                     .setTitle(`Server settings for ${ssv.guild.name}`)
                     .setThumbnail(message.guild.iconURL)
                     .addField('🔃Message updates', server[ssv.guild.id].mu)
                     .addField('💥Message deletes', server[ssv.guild.id].md)
                     .addField('❌Disabled CMDS', server[ssv.guild.id].disabled)
                     .addField('❗prefix', server[message.guild.id].prefix)
                     .setColor(hexcolor)
                     ssv.edit(ssemb)
                     bot.channels.get(server[message.guild.id].slog).send(ssemb)
                    ssv.channel.send('message update has been '+hfd).then(m=>m.delete(10000))
                    await ssv.clearReactions()
                    await ssv.react('🔃').then(() => ssv.react('💥')).then(() => ssv.react('❌')).then(() => ssv.react('❗'));
                }})
                collector2.on('collect', async(r) => {
                    reaction = r
                if (reaction.emoji.name === '💥') {
                    afd = server[ssv.guild.id].md
                    if(afd == "false") tda = "true"
                    else tda = "false"
                    server[ssv.guild.id].md = tda
                     fs.writeFile(locate.DIR+"/Data/server.json", JSON.stringify(server, null, 4), (err) => {
                       if (err) console.log(err)
                     })
                     if(tda == "false") hfd = "disabled"
                     else if(tda == "true")hfd = "enabled"
                     ssemb = new Discord.RichEmbed()
                     .setTitle(`Server settings for ${ssv.guild.name}`)
                     .setThumbnail(ssv.guild.iconURL)
                     .addField('🔃Message updates', server[ssv.guild.id].mu)
                     .addField('💥Message deletes', server[ssv.guild.id].md)
                     .addField('❌Disabled CMDS', server[ssv.guild.id].disabled.join('\n'))
                     .addField('❗prefix', server[message.guild.id].prefix)
                     .setColor(hexcolor)
                     bot.channels.get(server[ssv.guild.id].slog).send(ssemb)
                     ssv.edit(ssemb)
                    ssv.channel.send('message delete has been '+hfd).then(m=>m.delete(60000))
                    await ssv.clearReactions()
                    await ssv.react('🔃').then(() => ssv.react('💥')).then(() => ssv.react('❌')).then(() => ssv.react('❗'));
                }
        })
        collector4.on('collect', async(r) => {
            reaction = r
        if (reaction.emoji.name === '❗') {
           async function done(newp) {
                server[message.guild.id].prefix = newp
                fs.writeFile(locate.DIR+"/Data/server.json", JSON.stringify(server, null, 4), (err) => {
                    if (err) console.log(err)
                  })
                ssemb = new Discord.RichEmbed()
                .setTitle(`Server settings for ${ssv.guild.name}`)
                .setThumbnail(message.guild.iconURL)
                .addField('🔃Message updates', server[ssv.guild.id].mu)
                .addField('💥Message deletes', server[ssv.guild.id].md)
                .addField('❌Disabled CMDS', server[ssv.guild.id].disabled)
                .addField('❗prefix', newp)
                .setColor(hexcolor)
                ssv.edit(ssemb)
                slogs.send(ssemb)
               ssv.channel.send('The prefix has been set to '+newp).then(m=>m.delete(10000))
               await ssv.clearReactions()
               await ssv.react('🔃').then(() => ssv.react('💥')).then(() => ssv.react('❌')).then(() => ssv.react('❗'));
            }
                allowedp = ['.', '#', '~', '@', ':', ';', "!", "$", "£", "^", "*", "-", "_", "=", "+", `¬`, '?', '/', '\\', '>' ]
                message.channel.send('Enter in what you would like the prefix to be. \n please make sure that it is one of these : |' + allowedp.join(' | ')).then(m=>m.delete(10000))
                const pfx = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
                pfx.on('collect', async(message) => {
                    if(!allowedp.includes(message.content)) {
                        message.channel.send('You did not use a valid symbol.').then(m=>m.delete(10000))
                        await ssv.clearReactions()
                        await ssv.react('🔃').then(() => ssv.react('💥')).then(() => ssv.react('❌')).then(() => ssv.react('❗'));
                        return
                    }
                    newpf = message.content
                    pfx.stop()
                    done(newpf)
                })

        }
    })
            collector3.on('collect', async(r) => {
                reaction = r
                if (reaction.emoji.name === '❌') {
                    async function cmdf(disb) {
                        if(!disb[0]) disb = ["none"]
                        server[ssv.guild.id].disabled = disb
                        fs.writeFile(locate.DIR+"/Data/server.json", JSON.stringify(server, null, 4), (err) => {if (err) console.log(err)})

                    ssemb = new Discord.RichEmbed()
                    .setTitle(`Server settings for ${ssv.guild.name}`)
                    .setThumbnail(ssv.guild.iconURL)
                    .addField('🔃Message updates', server[ssv.guild.id].mu)
                    .addField('💥Message deletes', server[ssv.guild.id].md)
                    .addField('❌Disabled CMDS', `${disb.join('\n') || disb}`)
                    .addField('❗prefix', server[message.guild.id].prefix)
                    .setColor(hexcolor)
                    bot.channels.get(server[ssv.guild.id].slog).send(ssemb)
                    ssv.edit(ssemb)
                   //ssv.channel.send(disb + ' has been disabled.').then(m=>m.delete(10000))
                   await ssv.clearReactions()
                   await ssv.react('🔃').then(() => ssv.react('💥')).then(() => ssv.react('❌')).then(() => ssv.react('❗'));
                        }











                    var disvd = ''
                    dism = []
                    if(server[ssv.guild.id].disabled != 'none') {
                    knew= server[ssv.guild.id].disabled
                    }
                    else {knew = []}
                    bot.Server_managementcommands.forEach(function(element) {
                      cmdd = element.help.usage
                      rcmd = cmdd.replace('+', '').split(' ')
                      if(rcmd != 'ss' ) {
                      dism.push(`${rcmd[0]}`)
                      }
                    })
                    message.channel.send('These are the commands you can disable : ' + dism.join(' | ')).then(m=>m.delete(60000))
                    const msgd = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 60000 });
                    msgd.on('collect', message => {
                        let dmcd = message.content.trim().split(/ +/g)
                        if (dism.includes(message.content) || dism.includes(dmcd[0])) {
                            if(dmcd.includes(',')) {
                                dmcd.forEach(function(element) {
                                    if(element != ','&&knew.includes(element)) {
                                        var index = knew.indexOf(element);
                                        if (index > -1) {
                                          knew.splice(index, 1);
                                        }
                                        message.channel.send('Re-enabled ' +element).then(m=>m.delete(10000))
                                    }
                                    else {
                                        
                                    if(element != ',') {
                                        message.channel.send('Disabled ' + element).then(m=>m.delete(10000))
                                        knew.push(element)
                                    }
                                    }
                                })
                                disvd = dmcd.join(', ')
                                msgd.stop()
                                message.delete(10000)
                                cmdf(knew)
                
                            }

                            else {
                            if(knew.includes(message.content)) {
                                var index = knew.indexOf(message.content);
                                if (index > -1) {
                                  knew.splice(index, 1);
                                }
                                message.channel.send('Re-enabled ' +message.content).then(m=>m.delete(10000))
                            }
                            else {
                            message.channel.send('Okay! going to disable '+message.content).then(m=>m.delete(10000))
                            disvd = message.content
                            knew.push(message.content)
                            }
                            message.delete(10000)
                            msgd.stop()
                            cmdf(knew)
                            
                            }
                        
                        }

                      })
                


                }
            })
            collector.on('end', collected => ssv.delete());
            collector2.on('end', collected => message.delete())
        })
    }


exports.help = {
    usage:'+oldss',
    perms:['MANAGE_GUILD'],
    desc:'Shows interface for Server Settings.',
    alias: ['oldsettings']
}