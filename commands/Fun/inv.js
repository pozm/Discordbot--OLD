const Discord = require("discord.js");
const fs = require("fs")
const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, by} = require('../../modules/config.js');
//delete require.cache[require.resolve("../../usage/items.js")];
const {weapons, foundW, items} = require('../../usage/items.js');
const {getData, writeData} = require('../../modules/DataHandler.js')
//delete require.cache[require.resolve("../../Data/inv.json")];
exports.run = async (bot, message, args) => {
    var userInfo = locate.userInfo//getData('userInfo')

    var allW = []

    allW = Object.values(weapons).map(w=>w.name)
  
    Object.values(foundW).map(w=>allW.push(w.name))
    async function embno(msg1) {
        UserWeapons = userInfo[message.author.id]['Inv'].Weapons
        UserItems = userInfo[message.author.id]['Inv'].Items
        Userequip = userInfo[message.author.id]['Inv'].Equiped
        sortIt = 'None'
        if(UserItems && UserItems != []) {
            sortIt = UserItems.join(',').slice(0,18)+'...'
        }
        invEmb = new Discord.RichEmbed()
        .setTitle(`${message.author.username}'s Inventory`)
        .addField('🗝 Items',sortIt)
        .addField('🗡 Weapons',UserWeapons.join(',').slice(0,18)+'...')
        .addField('Equiped',Userequip ? Userequip : 'Nothing')
        .setColor('#b9ffa6')
        var msg
        if (msg1) {
            msg = await msg1.edit(invEmb)
            invEmb.fields.forEach(element => {
                if (element.value != 'None' && element.value != 'Nothing') {
                    emj = element.name.split(' ')[0]
                    msg.react(emj)
                }
            });
        } 
        else if (!msg1) {
            msg = await message.channel.send(invEmb)
            invEmb.fields.forEach(element => {
                if (element.value != 'None' && element.value != 'Nothing') {
                    emj = element.name.split(' ')[0]
                    msg.react(emj)
                }
            });
            re = await msg.awaitReactions((r,user) => user.id === bot.user.id,{max:2,time:15000})
            const filter = (reaction, user) => re.has(reaction.emoji.name) & user.id != bot.user.id & user.id == message.author.id
            collectr = msg.createReactionCollector(filter,{time: 45000})
            collectr.on('collect',async r => {
                await msg.clearReactions()//r.remove(message.author)
                //collectr.stop()
                conv = {
                    '🗝' : 'Items',
                    '🗡' : 'Weapons',
                }
                embUp(msg,conv[r.emoji.name])
            })
            collectr.on('end',()=> {
                msg.clearReactions()
                emnb = new Discord.RichEmbed(msg.embeds[0])
                console.log(emnb)
                emnb.setFooter('Cannot edit / change dir')
                msg.edit(emnb)
            })
        }
    }

    async function embUp(msg,typ2) {
        thingy = userInfo[message.author.id]['Inv'][typ2]
        emb = new Discord.RichEmbed()
        .setTitle(`${message.author.username}'s ${typ2}'s`)
        .setColor('#f9a6ff')
        thingy.map(v=>{
            typ = weapons[v]
            if(!typ) typ = foundW[v]
            if(!typ) typ = items[v]
            template = `Description : ${typ.desc}\nDamage : ${typ.dmg}\nDamage w crit : ${Number(typ.dmg) * 2}\nHit % : ${typ.hitP} %\nCrit Chance % : ${typ.critC} % ${typ.special ? `\n\n Special \nName: ${typ.special[0]} | Rounds : ${typ.special[1]} | Damage : ${typ.special[2]}` : ''}` || typ.desc 
            emb.addField(typ.name,template.slice(0,18)+'...',true)
        })
        emb.setFooter('Use +inv -i <name> to get more details!')
        msg.edit(emb)
        msg.react('⏪')
        const filter = (reaction, user) => reaction.users.has(bot.user.id) == true & user.id != bot.user.id & user.id == message.author.id
        collectr = msg.createReactionCollector(filter,{time: 45000})
        collectr.on('collect',async r => {
            await msg.clearReactions()//r.remove(message.author)
            collectr.stop()

            embno(msg)
        })
        
    }   



    if(!args[0]) {
        embno()
    }


    
    if(message.content.includes('-')) {
        bb = message.content.split('-')
        bb = bb[1].split(' ')
        if(bb[0].includes('i')) {
            itm = bb.slice(1).join(' ')
            typ = weapons[itm]
            if(!typ) typ = foundW[itm]
            if(!typ) typ = items[itm]
            if(!typ) return message.channel.send('Unable to find that item/Weapon.'); 
            template = `${typ.name}\nDescription : ${typ.desc}\nDamage : ${typ.dmg}\nDamage w crit : ${Number(typ.dmg) * 2}\nHit % : ${typ.hitP} %\nCrit Chance % : ${typ.critC} % ${typ.special ? `\n\n Special \nName: ${typ.special[0]} | Rounds : ${typ.special[1]} | Damage : ${typ.special[2]}` : ''}` || typ.desc 
            message.channel.send(template)
        } else if (bb[0].includes('e')) {
            itm = bb.slice(1).join(' ')
            typ = items[itm]
            if(!typ) return message.channel.send('Unable to find that item.'); 
            if(userInfo[message.author.id]['Inv'].Items.includes(typ.name)) userInfo[message.author.id]['Inv'].Equiped == typ.name ? userInfo[message.author.id]['Inv'].Equiped = '' : userInfo[message.author.id]['Inv'].Equiped = typ.name
            else return message.channel.send('You dont have this item.')
            if(userInfo[message.author.id]['Inv'].Equiped == typ.name) message.channel.send('Equiped ' + typ.name)
            else message.channel.send('Unequiped ' + typ.name)
            fs.writeFile("./Data/userInfo.json", JSON.stringify(userInfo, null, 4), (err) => {
                if (err) console.log(err);
              });
        } else if (bb[0].includes('add') & message.author.id == ownerid) {
            a = stuff.searchM(bb[1],message.guild, true)
            b = await a.then(v =>{ v
                if(!v) return;
                return message.guild.fetchMember(v);
            })
            user = b
            itm = bb.slice(2).join(' ')
            if (!itm) itm = bb.slice(1).join(' ')
            bypass = false
            worked = 'weapons'
            typ = weapons[itm]
            if(!typ) typ = foundW[itm]
            if(!typ) typ = items[itm],worked = 'items'
            if(itm == 'all') typ = allW,worked = 'all', bypass = true
            if(!typ & bypass == false) return message.channel.send('Unable to find that item/Weapon.'); 
            if (worked == 'weapons') {
                userInfo[user.id]['Inv'].Weapons.push(typ.name)
                message.channel.send('Added '+typ.name+' To '+user.user.username+'\'s weapon inv')
            }
            else if (worked == 'items') {
                userInfo[user.id]['Inv'].Items.push(typ.name)
                message.channel.send('Added '+typ.name+' To '+user.user.username+'\'s Item inv')
            }
            else if (worked == 'all') {
                userInfo[user.id]['Inv'].Weapons = typ
                message.channel.send('Added all Weapons To '+user.user.username+'\'s weapon inv')
            }
        }
    }


};
exports.help = {
    usage:'+inv [-i <name>] [-e <item-name>]',
    desc:'Allows you to see whats in your inventory, and get info about weapons/items you own.'
};