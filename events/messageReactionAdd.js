module.exports = async (bot, messageReaction,user) => {
    const fs = require(`fs`)
    const { TOKEN, PREFIX, mytime, activity, logid, ownerid, clientID, by, BOTA,emotes} = require('../modules/config');
    const {improle} = require('../usage/staff'); 
    if(user.bot) return
    if(messageReaction.message.id == "560855277340196864") {
        bot.guilds.get('513498066427576320').fetchMember(user.id).then(m=>{var pmember =m
            try{
                if (improle[messageReaction.emoji].users.includes(user.id)) {
                    if(!pmember.roles.has(improle[messageReaction.emoji].roleid)) {pmember.addRole(improle[messageReaction.emoji].roleid)
                        user.send(`Added ${message.guild.roles.get(improle[messageReaction.emoji].roleid)}. ${emotes.ver}`)
                        bot.channels.get(logid).send(`${user} added ${message.guild.roles.get(improle[messageReaction.emoji].roleid)} to themselfs.`)
                    }
                    else {
                        user.send('You already have this role' + emotes.fal)
                        bot.channels.get(logid).send(`${user} Tried to add ${message.guild.roles.get(improle[messageReaction.emoji].roleid)}.`)
                    }
                } 
                else {
                    user.send('You dont have perms to. ' + emotes.fal)
                    bot.channels.get(logid).send(`${user} Tried to add ${message.guild.roles.get(improle[messageReaction.emoji].roleid)}.`)
                }
                messageReaction.remove()
                return
            }catch(e) {messageReaction.remove(user)}
        })
    }
}