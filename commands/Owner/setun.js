exports.run = async (bot, message, args) => {
    let Name = args.slice(0).join(" ")
    stuff.loading()
    try {
    await bot.user.setUsername(Name)
    message.channel.send(`Successfully changed my UserName to \`${Name}\``)
    }catch(e) {message.channel.send(`\`\`\`xl\n ${e.stack}\n\`\`\` `)}
}
exports.help= {
    usage:'+setun <name>',
    desc:'Changes the bot\'s username' 
}