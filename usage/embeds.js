const Discord = require('discord.js')
exports.embeds = {
kick : function (mod, victim,reason, sLOG) {
    kickEMB = new Discord.RichEmbed()
    .setAuthor(mod.user.username, mod.user.avatarURL)
    .setTitle(`${mod.user.username} Kicked ${victim.user.username}`)
    .addField('Moderator : ',`${mod} (${mod.id})`)
    .addField('Victim :', `${victim} (${victim.id})`)
    .addField('Reason for kick :', reason || 'no reason')
    .setColor('RED')
    .setTimestamp()
    sLOG.send(kickEMB)
},
ban : function(mod, victim, reason, sLOG) {
    banEMB = new Discord.RichEmbed()
    .setAuthor(mod.user.username, mod.user.avatarURL)
    .setTitle(`${mod.user.username} Banned ${victim.user.username}`)
    .addField('Moderator : ',`${mod} (${mod.id})`)
    .addField('Victim :', `${victim} (${victim.id})`)
    .addField('Reason for ban :', reason || 'no reason')
    .setColor('RED')
    .setTimestamp()
    sLOG.send(banEMB)



},

warn : function(mod, victim,warnings, reason, sLOG) {
    warnEMB = new Discord.RichEmbed()
    .setAuthor(mod.user.username, mod.user.avatarURL)
    .setTitle(`${mod.user.username} Warned ${victim.user.username}`)
    .addField('Moderator : ',`${mod} (${mod.id})`)
    .addField('Victim :', `${victim} (${victim.id})`)
    .addField('Reason for warn :', reason || 'no reason')
    .addField('Warnings :', warnings)
    .setColor('RED')
    .setTimestamp()
    sLOG.send(warnEMB)



},
mute : function(mod, victim, type, length, reason, sLOG) {
    muteEMB = new Discord.RichEmbed()
    .setAuthor(mod.user.username, mod.user.avatarURL)
    .setTitle(`${mod.user.username} ${type == 'mute'? 'Muted' : 'Unmuted'} ${victim.user.username}`)
    .addField('Moderator : ',`<@${mod.user.id}> (${mod.user.id})`)
    .addField('Victim :', `<@${victim.id}> (${victim.id})`)
    .addField('Reason for mute :', reason || 'no reason')
    .addField('Status : ', type == 'mute' ? 'MUTED' : 'UNMUTED')
    .setColor(type == 'mute' ? 'RED' : 'GREEN')
    .setFooter('Muted till')
    .setTimestamp(length)
    sLOG.send(muteEMB)



},
role : function(mod, victim, type, role, reason, time,sLOG) {
    muteEMB = new Discord.RichEmbed()
    .setAuthor(mod.user.username, mod.user.avatarURL)
    .setTitle(`${mod.user.username} ${type == 'REMOVE' ? 'Removed a role from' : 'Added a role to'} ${victim.user.username}`)
    .addField('Moderator : ',`${mod} (${mod.id})`)
    .addField('Victim :', `${victim} (${victim.id})`)
    .addField('Reason for giveing/removing role :', reason || 'no reason')
    .addField('role : ', role)
    .addField('type : ', type == 'add' ? 'ADD' : 'REMOVE')
    .addField('Time :', time || 'perm.')
    .setColor(type == 'REMOVE' ? 'RED' : role.hexColor)
    .setTimestamp()
    sLOG.send(muteEMB)



},
other : function(mod, victim, type, pram1 , pram2) {
    otherEMB = new Discord.RichEmbed()
    .setAuthor(mod.user.username, mod.user.avatarURL)
    .setTitle(`${mod} ${type} ${victim}`)
    .addField('Moderator : ',`${mod} (${mod.id})`)
    .addField('Victim :', `${victim} (${victim.id})`)
    .addField(pram1.titl, pram1.nam)
    .addField(pram2.titl, pram2.nam)
    .setColor('LUMINOUS_VIVID_PINK')
    .setTimestamp()
    sLOG.send(otherEMB)
}
}