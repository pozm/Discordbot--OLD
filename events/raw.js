module.exports = async (bot, packet) => {
    const fs = require(`fs`)
      const { TOKEN, PREFIX, mytime, activity, logid,ownerid, clientID, by, BOTA} = require('../modules/config');
        // We don't want this to run on unrelated packets
        if (['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) {
        // Grab the channel to check the message from
        const channel = bot.channels.get(packet.d.channel_id);
        // There's no need to emit if the message is cached, because the event will fire anyway for that
        if (channel.messages.has(packet.d.message_id)) return;
        // Since we have confirmed the message is not cached, let's fetch it
        channel.fetchMessage(packet.d.message_id).then(message => {
            // Emojis can have identifiers of name:id format, so we have to account for that case as well
            const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
            // This gives us the reaction we need to emit the event properly, in top of the message object
            const reaction = message.reactions.get(emoji);
            // Adds the currently reacting user to the reaction's users collection.
            if (reaction) reaction.users.set(packet.d.user_id, bot.users.get(packet.d.user_id));
            // Check which type of event it is before emitting
            if (packet.t === 'MESSAGE_REACTION_ADD') {
                bot.emit('messageReactionAdd', reaction, bot.users.get(packet.d.user_id));
            }
            if (packet.t === 'MESSAGE_REACTION_REMOVE') {
                bot.emit('messageReactionRemove', reaction, bot.users.get(packet.d.user_id));
            }
        });
    }
    /*if (['MESSAGE_DELETE'].includes(packet.t)) {
        console.log(packet)
        const channel = bot.channels.get(packet.d.channel_id);
        if (channel.messages.has(packet.d.id)) return;
        channel.fetchMessage(packet.d.message_id).then(message => {
        bot.emit('messageDelete', message)
        console.log('yyy')
        })
    }*/
}