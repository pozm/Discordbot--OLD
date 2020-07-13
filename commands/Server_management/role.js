exports.run = async (bot, message, args) => {
    const Discord = require("discord.js")
    const ms = require('ms')
    const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, hexcolor} = require('../../modules/config');
    const { embeds} = require('../../usage/embeds');
    let roleM = args[1]
    let time2 = args[3]
    let reass = 'Not declared.'
    if(message.content.includes('-')) {
        aa = message.content.split('-')
        aa = aa[1].split(' ')
        if(aa[0].includes('r')) {
            reass = aa.slice(1).join(' ')
        }
    }
    if(!time2) time2 = ''
    if(isNaN(time2.slice(0,1))) time2 = ''
    adsa = true
    let member = message.mentions.members.first()
    if(!member) {
        ab = []
        a = stuff.searchM(args[2], message.guild, true)
        b = await a.then(v =>{ v
            if(!v) return;
            return message.guild.fetchMember(v);
        })
        member = b
    }

    let role = ''
    if(roleM) {
        ab = []
        fdsf = 'gdgdg'
        a = stuff.searchR(roleM, message.guild)
        b = await a.then(v =>{ v
            if(!v) return;
            return message.guild.roles.get(v);
        })
        role = b
    }
    else return message.channel.send('not a role')


    if(!member) {member = message.member
    adsa= false
}
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
    if(!args[0]) return message.channel.send('Use +help role for help.')
    if(stuff.ffd == true) return message.channel.send("They have a higher role than you; Or they have the same role.")
    else if(args[0].toLowerCase() == 'add' && message.guild.id!= '513498066427576320'|| args[0].toLowerCase() == 'add' && message.author.id == ownerid) {
        try{
            if(member.roles.exists(r=>r.id===role.id)) return message.channel.send('they/you already has that role.')
            member.addRole(role.id)
            message.delete(10000)
            message.channel.send(`I have given ${member.nickname || member.user.username} the role \`${role.name}\`.\nTime: ${time2 || 'permanently.'}`).then(m=>m.delete(10000))
            if(time2) {
            setTimeout(function() {member.removeRole(role.id).then(()=>message.channel.send(`I have removed \`${role.name}\` from ${member.nickname || member.user.username}.`).then(m=>m.delete(10000)))},ms(time2))
            }
            embeds.role(message.member, member, 'add', role, reass , time2 ,slogs)
        }catch(e) {return message.channel.send('Unable to Give that role.'), console.log(e.stack)}
    }


    else if(args[0].toLowerCase() == 'remove' && message.guild.id!= '513498066427576320'|| args[0].toLowerCase() == 'remove' && message.author.id == ownerid) {
        if(!role) {
            ab = []
            a = stuff.searchM(roleM, message.guild)
            b = await a.then(v =>{ v
                if(!v) return;
                return message.guild.roles.get(v);
            })
            role = b
        }
        try{
            if(!member.roles.exists(r=>r.id===role.id)) return message.channel.send('they/you Don\'t have that role.')
            member.removeRole(role.id)
            message.delete(10000)
            message.channel.send(`I have removed \`${role.name}\` from ${member.nickname || member.user.username}.\nTime: ${time2 || 'permanently.'}`).then(m=>m.delete(10000))
            if(time2) {
                setTimeout(function() {member.addRole(role.id).then(()=>message.channel.send(`I have given ${member.nickname || member.user.username} the role \`${role.name}\`.`).then(m=>m.delete(10000)))},ms(time2))
                }
                embeds.role(message.member, muteUser, 'remove', role, reass , time2 ,slogs)
        }catch(e) {return message.channel.send('Unable to Give that role.'), console.log(e.stack)}
    }







}
exports.help= {
    usage:'+role [<add> <remove>] <role name> <user> [time] [-r <reason>]',
    perms:['MANAGE_ROLES'],
    desc:'Adds / removes roles.'
}