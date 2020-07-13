exports.run = async(bot, message, args) => {
    var {makeimg} = require('../../modules/XPHandler')
    const { TOKEN, PREFIX, mytime, activity, hexcolor, ownerid, clientID} = require('../../modules/config');
    //attc = await makeimg(message.member,args[0], args[1])

    //message()

    message.channel.send(`Test is successful! \nexecuter = ${message.author.username} \nDevice type(s) = ${Object.keys(message.author.presence.clientStatus).join(' | ')}`).catch(console.error);

}


exports.class = new classes.Command ( exports.run, {
    name:'test',
    desc:'Debugging boi',
    alias : ['t'],
    memberName:'test',
    group:'all',
    guildOnly : false,
    clientPerms : ['SEND_MESSAGES'],
    args : {Needed : [{Name : 'Test', Pos : 0, Type : 'boolean'}, ], Extra : [{Name:'ConsoleLog', Pos:1}] },
    throt : {
        Usage : 2,
        Dur : 2,
    },
    ownerOnly : false
} )


exports.help= {
    usage:'+test',
    desc:'Debug.'
}