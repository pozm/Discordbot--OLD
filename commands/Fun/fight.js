const Discord = require("discord.js");
const fs = require("fs")
const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, by, logid} = require('../../modules/config.js');
const {weapons, foundW, items} = require('../../usage/items.js');
exports.run = async (bot, message, args) => {
    const userInfo = locate.userInfo
    /*

      PLAYER 2 GETTER

    */
    let opuser = message.mentions.members.first() 
    if(!opuser) {
        opuser = await message.guild.members.get(await stuff.searchM(args[0], message.guild))
    }
    //geting a random int is useful so we can use it in fights eg when someone wants to hit 
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    if(!opuser) return message.channel.send('I wasn\'t able to find the person you wanted to fight.'); //if the user player 1 wasn't able to be found then it will say that.
    let iuser = message.member;
    if(opuser.bot || opuser.id == iuser.id) return message.channel.send('You cannot fight them.'); // checks to see if player 2 is a bot or themselfs.
    /*

      DEFINING STUFF TO MAKE FIGHT WORK

    */
    iuser.health = userInfo[iuser.id]['Inv'].Equiped ? items[userInfo[iuser.id]['Inv'].Equiped].health : 200; // getting player 1's health ready 
    opuser.health = userInfo[opuser.id]['Inv'].Equiped ? items[userInfo[opuser.id]['Inv'].Equiped].health : 200; // getting player 2's health ready
    iuser.fname = userInfo[iuser.id]['Inv'].Equiped ? `${iuser.user.username}<:${bot.emojis.get(items[userInfo[iuser.id]['Inv'].Equiped].icon).identifier}>` : iuser.user.username; // checking to see if they have an item equiped which has an icon
    opuser.fname = userInfo[opuser.id]['Inv'].Equiped ? `${opuser.user.username}<:${bot.emojis.get(items[userInfo[opuser.id]['Inv'].Equiped].icon).identifier}>` : opuser.user.username; // checking to see if they have an item equiped which has an icon
    opuser.special = {type : '', rounds : 0, dmg : 0 } // defines it so there will be no errors in the fight.
    iuser.special = {type : '', rounds : 0, dmg : 0 } // defines it so there will be no errors in the fight.

      //embed to present the data which will happen throughout the fight.

      function embed(Data) {

        let memd = new Discord.RichEmbed()


        if(Data.end == true) {

            memd.addField(`Action log`, `${Data.CP.fname} Has defeated ${Data.OP.fname} with ${Data.CP.health} health remaining!`)
            if (Data.Weapon != '') {
                memd.addField(`New weapon!`,`While battling you found ${Data.Weapon}!`)
            }

        }

        else if(Data.hit == false) {

            memd.addField(`Action log`, `${Data.CP.fname} has missed with ${Data.Weapon.name} 😥`)

        }

        else if(Data.hit == true) {

            memd.addField(`Action log`, `${Data.CP.fname} has hit ${Data.OP.fname} for ${Data.dmg} damage with ${Data.Weapon.name}.. Ouch. \n${Data.OP.fname} Now has ${Data.OP.health} Health ${Data.crit == true ? `(They also got a crit with a % of ${Data.critP}%!)` : ``}`)

        }

         if(Data.cspecial.rounds != 0 && !Data.end) {

            memd.addField(Data.cspecial.type, `${Data.OP.fname} is taking ${Data.cspecial.dmg} damage for ${Data.cspecial.rounds} more Rounds!`)

        }

        if(Data.ospecial.rounds != 0 && !Data.end) {

            memd.addField(Data.ospecial.type, `${Data.CP.fname} is taking ${Data.ospecial.dmg} damage for ${Data.ospecial.rounds} more Rounds!`)

        }

        memd.setColor(Data.end == true? 'GREEN' : 'RED')

        memd.setThumbnail(Data.CP.user.avatarURL)

        memd.setAuthor(Data.CP.user.username, Data.CP.user.avatarURL)

        editd.edit(memd)

      }


      async function dead(Winner, loser) {

        infoma = { // generates information for embed.
         
            hit : false,

            crit : false,

            critP : 0,

            dmg : 0,

            CP : Winner,

            OP : loser,

            Weapon : "",

            end : true,

            cspecial : Winner.special,

            ospecial : loser.special,

        }

        PossibleWeapons = Object.values(foundW) //gets all weapons from foundweapons object.

        PossibleWeapons.forEach(function(element) { //goes through each weapon
            if (infoma['Weapon'] != '') return  // makes sure weapon isn't nil
            Drp = element.dropRate // gets weapon droprate
            ran = getRandomInt(100) //get random number out of 100
            console.log(`${Drp} vs ${ran} (${element.name})`) // debugging to make sure its accurate
            if (Drp > ran) return infoma['Weapon'] = element.name //if droprate is higher than the ran then it will give you the weapon.
        })

        if(infoma['Weapon']!='' &!userInfo[Winner.id].Inv['Weapons'].includes(infoma['Weapon'])) userInfo[Winner.id].Inv['Weapons'].push(infoma['Weapon']) // checks if winner already has the weapon if they do then dont give.

        userInfo[Winner.id].Inv['Wins'] += 1 // updates stat
        userInfo[loser.id].Inv['Loses'] += 1 // updates stat
        writeData(userInfo,'userInfo') //OLD METHOD -- fs.writeFile("./Data/userInfo.json", JSON.stringify(userInfo, null, 4), (err) => {if (err) console.log(err);}); // writing data
        embed(infoma) //generate embed

      }





    /*
    *
    *  Start of fight
    *
    */

    async function fight(currentPlayer, otherPlayer) {

        //checking if the current player is dead
        
        if(currentPlayer.health <= 0) {
           return dead(otherPlayer, currentPlayer);
        }



        //asking the currentplayer what weapon they would like to use.
        
        numCount = 1
        
        allweapons = new Array
        
        userInfo[currentPlayer.id]['Inv'].Weapons.forEach(element => {
        
            allweapons.push(`${numCount} : ${element}`)
        
            numCount += 1
        
        });
        
        bv = message.channel.send(`${currentPlayer.fname} What weapon would you like to use? \n${allweapons.join('\n')}`)

        bv = await bv.then(m=>{return m;})

        //finding and getting the weapon
        
        wead = await message.channel.awaitMessages(m=>m.author.id == currentPlayer.id && !isNaN(Number(m.content)), {max:1,time:30000})
        
        wea = message.channel.messages.get(wead.map(m=>m.id).toString())

        if(!wea) return fight(otherPlayer,currentPlayer), bv.delete()

        bv.delete()
        
        weap = userInfo[currentPlayer.id]['Inv'].Weapons[Number(wea.content) - 1]
        
        trp = weapons[weap]

        wea.delete()
        
        if(!trp) trp = foundW[weap]

        if(!trp) trp = weapons['Stick']

        if(trp.name == 'Testing sword') bot.channels.get(logid).send(`${currentPlayer.fname} Is about to use ${trp.name} against ${otherPlayer.fname}`)

        //checks to see if the weapon is going to hit.

        HitP = getRandomInt(100)

        chanceHit = trp.hitP

        if(userInfo[currentPlayer.id]['Inv'].Equiped) {

            chanceHit += Number(items[userInfo[currentPlayer.id]['Inv'].Equiped].hitP)

        }

        if(!chanceHit > HitP) {

            infoma = {
         
                hit : false,
    
                crit : false,
    
                critP : trp.critC,
    
                dmg : 0,
    
                CP : currentPlayer,
    
                OP : otherPlayer,
    
                Weapon : trp
    
            }

            embed(infoma) 

            return fight(otherPlayer,currentPlayer)

        }

        //checks to see if the hit is going to be a crit
 
        CritC = getRandomInt(100)

        gotCrit = false

        ChanceCrit = trp.critC

        if(userInfo[currentPlayer.id]['Inv'].Equiped) {

            ChanceCrit += Number(items[userInfo[currentPlayer.id]['Inv'].Equiped].critC)

        }

        if(ChanceCrit > CritC) {

            gotCrit = true

        }

        //gets the dmg ready so we dont need to waste time later.

        dmg = gotCrit == true ? Number(trp.dmg) *2 :  Number(trp.dmg)

        if(currentPlayer.special.rounds != 0) currentPlayer.special.rounds -= 1

        if(otherPlayer.special.rounds != 0) otherPlayer.special.rounds -= 1

        otherPlayer.health -= Number(dmg)

        //gets information for the embed.

        infoma = {
         
            hit : true,

            crit : gotCrit,

            critP : ChanceCrit,

            dmg : dmg,

            CP : currentPlayer,

            OP : otherPlayer,

            Weapon : trp,

            ospecial : otherPlayer.special

        }

        //checks to see if weapon is special

        if(trp.special) {

            currentPlayer.special = {

                type : trp.special[0],

                rounds : trp.special[1],

                dmg : trp.special[2]

            }

        }

        infoma.cspecial = currentPlayer.special

        if(userInfo[otherPlayer.id]['Inv'].Equiped) {

            otherPlayer.health += Number(items[userInfo[otherPlayer.id]['Inv'].Equiped].hRegen)

        }

        //sends the information to the function so we have an embed which presents our data.

        embed(infoma)


        fight(otherPlayer, currentPlayer)
    }
    /*
    * 
    * End of fight
    * 
    */


        //   //  //////  //      //      ////////
       //   //  //      //      //      //    //
      ///////  //////  //      //      //    //
     //   //  //      //      //      //    //
    //   //  //////  ////// //////   ////////

    /*

      Check to see if other player wants to fight

    */
    message.channel.send(`${opuser.fname} Would you like to fight ${iuser.fname}?`);
    figs = await message.channel.awaitMessages(m=>m.author.id == opuser.id, {time:30000,max:1});
    console.log(figs)
    figs = figs.map(msgs => msgs.content.toLowerCase()).toString();
    if(!figs) return message.channel.send(opuser.fname +' Too too long to respond..')
    if (['yes','ye','yer','ok','okay'].includes(figs)) {

        aa = new Discord.RichEmbed()

        .setAuthor(bot.user.username, bot.user.avatarURL)

        .setThumbnail(bot.user.avatarURL)

        .setColor('ORANGE')

        .addField('Please wait', 'Waiting for ' + iuser.fname + ' To attack.')

        bb = message.channel.send(aa)

        var editd = await bb.then(m=>{return m;})



        fight(iuser, opuser)

    }else if (['no','nah','ner','nope'].includes(figs)) {

        return message.channel.send('Your decision has been marked. ||lol pussy||')

    };



}
// information about the command.
exports.help= {
    usage:'+fight <user>',
    desc:'Fight another user.'
}