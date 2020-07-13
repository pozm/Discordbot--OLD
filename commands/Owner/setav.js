exports.run = async (bot, message, args) => {
    stuff.loading()
    try {
    await bot.user.setAvatar(args[0])
    message.channel.send(`Successfully changed my avatar to the image at \`${args[0]}\` `)
    bot.guilds.get('513498066427576320').setIcon(bot.user.avatarURL, 'My avatar changed!')
    }catch(e) {message.channel.send(`\`\`\`js\n ${e.stack}\n\`\`\` `)}
}
exports.help= {
    usage:'+setav [<url>] [<path>]',
    desc:'Changes the bot avatar'
}