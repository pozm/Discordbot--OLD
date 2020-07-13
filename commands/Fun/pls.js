exports.run = async (bot, message, args) => {
    var request = require('request');
    const Discord = require("discord.js")
    const fs = require("fs")
    const colors = require('colors')
    const ms = require("ms")
    const { TOKEN, PREFIX, mytime, activity, by, ownerid, clientID, hexcolor, yt ,ig, ttv, sc, disc} = require('../../modules/config');
    user = message.mentions.members.first()
    if (!args[1] && !user) user = '!2'
    else if (!user) user = '!1'
    var searchVal
    if (user === '!1') {
        searchVal = await stuff.searchM(args[1],message.guild)
        user = (searchVal ? message.guild.members.get(searchVal) : null)
    }
    if (!args[0]) return;
    if (user === '!2') user = null


    function numgen(max, least) {
        return Math.floor(Math.random() * Math.floor(max) + Math.floor(least));
    }


    switch(args[0].toLowerCase()) {
        case 'orb' :
            if (user == null) return
            message.channel.send(`${user} YOU HAVE BEEN OBLITERATED! \n1-0\ntake this L nerd`, {files:[{attachment:'https://cdn.discordapp.com/attachments/555345019343470595/622484428706283540/tenor.gif',name:'Take-This-L-nerd.gif'}]});
        break;

        case 'clown' :
        if (user == null) return
            message.channel.send(`${user} You be clownin hard ${Emotes.useable(Emotes['Clownpepe'])}`, {files:['https://cdn.discordapp.com/attachments/521464396376047616/622164622966915103/EERbuIOW4AElmtP.jpg']})
        break;
        case 'help' :
            message.channel.send('cba to make this look nice so here. \n clown | orb\n help')

        break;
    }
    
}

exports.class = class PlsCommand extends classes.Command {
    constructor(bot) {
        super(bot,{
            name:'pls',
            desc:'pls dont take srs - lol (+pls help)',
            alias : ['please'],
            memberName:'pls',
            group:'Fun',
            guildOnly : false,
            clientPerms : ['SEND_MESSAGES'],
            throt : {
                usage : 1337,
                duration : 0,
            },
            ownerOnly : false
        })
    }
}

exports.help= {
    usage:'+pls',
    desc:'lol'
}