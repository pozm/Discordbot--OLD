exports.run = async (bot, message, args) => {
    const Discord = require("discord.js")
    const fs = require("fs")
    const ms = require("ms")
    const { TOKEN, PREFIX, mytime, activity, by, ownerid, clientID, hexcolor, yt ,ig, ttv, sc, disc} = require('../../modules/config');
    const bs = require('../../usage/BSM')
    if(testMode == false) return message.channel.send('This command is under construction.')
    Maps = []
    msg = await message.channel.send('getting ready to instalize...')
    bs.maps.forEach(m=>{
        if (typeof m == 'string') return
        Maps.push(m)
    })
    msg.edit(`Instalized ${Maps.length} maps! in ${Date.now() -msg.createdTimestamp} seconds`)
    

}

exports.class = new classes.Command ( exports.run, {
    name:'bsm',
    desc:'WIP',
    alias : ['bloxsabermaps'],
    memberName:'bsm',
    group:'all',
    guildOnly : false,
    clientPerms : ['SEND_MESSAGES'],
    args : {Needed : [], Extra : [] },
    throt : {
        Usage : 2,
        Dur : 2,
    },
    ownerOnly : false
  } )

exports.help= {
    usage:'+bloxsabermaps',
    desc:'Shows data for stored blox saber maps.',
    alias:['bloxsabermaps']
}