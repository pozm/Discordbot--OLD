exports.run = async (bot, message, args) => {
    const Discord = require("discord.js")
    const { TOKEN, PREFIX, mytime, activity, ownerid, clientID, hexcolor} = require('../../modules/config');
    message.channel.send(`Pong! It took me ${new Date().getTime() - message.createdTimestamp + " ms"} to respond!`);  



}

exports.class = new classes.Command ( exports.run, {
    name:'ping',
    desc:'pings discord\'s api from thiss bot (this is not your ping!!)',
    alias : [],
    memberName:'ping',
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
    usage:'+ping',
    desc:'Gets the response time of the bot.'
}