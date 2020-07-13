exports.run = async(bot, message, args) => {
    var {makeimg} = require('../../modules/XPHandler')
    const { TOKEN, PREFIX, mytime, activity, hexcolor, ownerid, clientID} = require('../../modules/config');
    msg = await message.channel.send('Ok.')
    function numgen(max, least) {
        return Math.floor(Math.random() * Math.floor(max) + Math.floor(least));
    }
    quotes = 
    [
        'Rawr🐲🐊 x3😋 nuzzles how are you😉🙂 pounces on you😛 you’re😃 so😄 warm🤒😈 o3o😏 notices😯 you have a bulge🍆 o:😯😮 someone’s happy😃 ;)😉😜 nuzzles your necky wecky😈😗~ murr~ hehehe😊 rubbies👋🤚 your bulgy🍆 wolgy you’re😌 so big😯😮 :oooo rubbies👋🤚 more on your bulgy🍆 wolgy it🚫 doesn’t stop🛑 growing ·///· 😐kisses😚😘 you🙂 and lickies😝👅💦💦',
        `Rawr hehe :heart_eyes::tiger::crocodile: x3:yum: nuzzles UwU :heart_eyes:how are you:wink::) pounces on you:stuck_out_tongue: you're:smiley: so:smile: warm:thermometer_face::smiling_imp: o3o:smirk: notices:hushed: you have a bulge:eggplant: o::hushed::open_mouth: someone's happy:blush::smiley: ;):wink::stuck_out_tongue_winking_eye: nuzzles your necky wecky:smiling_imp::kissing:~ murr~ hehehe:blush: rubbies:wave::raised_back_of_hand: your bulgy:eggplant: wolgy :kissing_heart:you're:relieved: so big:hushed::open_mouth: :oooo rubbies:wave::raised_back_of_hand: more on your bulgy:eggplant: wolgy it:no_entry_sign: doesn't stop:octagonal_sign: growing ·///· :neutral_face:kisses:kissing_closed_eyes::kissing_heart: you:) and lickies:stuck_out_tongue_closed_eyes::tongue::sweat_drops::sweat_drops: your necky:ear: daddy:sweat_drops::sweat_drops: likies :thumbsup:(;:relieved::stuck_out_tongue_winking_eye: nuzzles:upside_down: wuzzles I:heart_eyes: hope:pray::raised_hands: daddy:eggplant: really likes:thumbsup::sweat_drops::sweat_drops: $: wiggles butt:peach: and squirms I:wink: want:relieved: to see:eyes::eye::eye: your:yum: big:neutral_face: daddy:sweat_drops::sweat_drops: meat:eggplant::eggplant:~ wiggles butt:peach: I:confounded: have:pensive: a little:confounded: itcho3o:grimacing: wags:drooling_face: tail can you:smirk: please get my itch:wink:~ puts paws:feet: on your:muscle: chest nyea:thumbsup:~ its a seven:seven: inch:straight_ruler::triangular_ruler: itch:confounded: rubs:wave::raised_back_of_hand: your chest can you help:construction_worker: me:arrow_down: pwease:relieved::upside_down::cold_sweat::flushed::smiling_imp: squirms pwetty pwease:relieved::upside_down::cold_sweat::flushed::smiling_imp: sad face:frowning2:?:disappointed::sob::cry: I:grimacing::grimacing::weary: need to:two: be:bee: punished:rolling_eyes: runs paws:feet: down:arrow_down::arrow_down::arrow_down: your:laughing: chest and bites lip:lips::kiss: like I:arrow_down::rolling_eyes: need:neutral_face: to:two: be:bee: punished really good:thumbsup::thumbsup::ok_hand:~ :feet: on your bulge:eggplant: as I:arrow_down: lick:stuck_out_tongue_closed_eyes: my lips:kiss::lips: I'm:arrow_down::rolling_eyes: getting thirsty:sweat_drops::sweat_drops::sweat_drops:. I:arrow_down::sunglasses: can:) go:smiley: for:four: some:yum: milk:milk::baby_bottle::cow2: unbuttons:radio_button: your pants:jeans: as my eyes:eye::eye: glow:heart_eyes: you:wink: smell so sweet:smirk: :v:hushed: licks :eggplant: mmmm:slight_smile:~ so musky:smirk: drools:drooling_face: all over your :eggplant::sweat_drops::sweat_drops: your:sunglasses: daddy:eggplant::sweat_drops::sweat_drops::sweat_drops: meat:eggplant: I:smiley: like:thumbsup::ok_hand::heart_eyes: fondles Mr. Fuzzy Balls:dog::cat: heheheh:smile: puts snout on :soccer::baseball::basketball::volleyball::football::rugby_football::8ball::tennis::bowling::ping_pong: and inhales deeply:dash::dash::wind_blowing_face: oh:fearful: god:fearful: im so :smiling_imp:~ licks ur :soccer::baseball::basketball::volleyball::football::rugby_football::8ball::tennis::bowling::ping_pong: punish me:astonished: daddy:eggplant::sweat_drops:`,
    ]

    msgq = quotes[numgen(quotes.length,0)]
    msgs = []
    if (msgq.length > 1999) {
        msgs.push(msgq.slice(0,2000))
        msgs.push(msgq.slice(2000))
    }
    setTimeout(()=>{
        if (msgs != [] && msgs.length >0) {
            msg.edit(msgs[0])
            msg.channel.send(msgs[1])
            
        }
        else msg.edit(msgq)
    },5555)

}


exports.class = new classes.Command ( exports.run, {
    name:'cancer',
    desc:'get cancer!',
    alias : ['getcancer'],
    memberName:'cancer',
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