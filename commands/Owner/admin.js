exports.run = async (bot, message, args) => {
    const Discord = require("discord.js")
    const fs = require ("fs")
    const ms = require (`ms`)
   // const money = locate.MONEY
    const userInfo = locate.userInfo
    const { TOKEN, PREFIX, mytime, activity,logid, ownerid,by, clientID } = require('../../modules/config');
    const server = locate.SERVER
    const {lpistaff} = require('../../usage/staff')
    const suggest = locate.suggestion
   // const inv = locate.inv
   // delete require.cache[require.resolve("../../Data/inv.json")];
    const {weapons, foundW, items, SHOPiw} = require('../../usage/items.js');
    const data = {
        "server" : server,
       // "money" : money,
        //"login" : login,
        //"inv" : inv,
        "suggest" : suggest,
        "userInfo" : userInfo
    }

    function embedd(wtd,back) {
        eval(wtd)
        if(back) embd.addField('<--', 'back')
        savd.edit(embd)
    }  

    async function EMdata(keey, type, keey2,inf) {
        function mkemb(highlight,counter) {
        embd = new Discord.RichEmbed()
        .setTitle(`Main Menu -> Data -> ${type} -> ${keey2}` )
        Object.keys(data[type][keey]).forEach(function(element) {
            try {
                if (typeof data[type][keey][element] === 'string') fdjh()
                embd.addField(counter, highlight == counter ? `**${element} - \n${Object.keys(data[type][keey][element]).map(e=>`${e} - ${data[type][keey][element][e]}`).join('\n')}**` : `${element} - \n${Object.keys(data[type][keey][element]).map(e=>`${e} - ${data[type][keey][element][e]}`).join('\n')}`)
            }catch(e) {
                embd.addField(counter, highlight == counter ? `**${element} - ${data[type][keey][element]}**` : `${element} - ${data[type][keey][element]}`)
            }
            counter = counter +1
        })
        embd.setColor('RED')
        return embd;
        }
        
        //savd.edit(mkemb())
        embedd(mkemb('',1), true)
        let fouchose = await message.channel.awaitMessages(m=>! isNaN(m.content) || m.content == '<--' || m.content == '-back'&& m.author.id == message.author.id, {max : 1, time : 30000})
        let fouaws = message.channel.messages.get(fouchose.map(m=>m.id).toString())
        if(!fouaws) return savd.delete()
        if(fouaws.content == '<--' || fouaws.content == '-back') return Edata(type,inf,''),fouaws.delete()
        if(Number(fouaws.content) > Object.keys(data[type][keey]).length) return EMdata(keey, type, keey2),fouaws.delete()
        embedd(mkemb(Number(fouaws.content), 1), true)
        let dataEdit = await message.channel.awaitMessages(m=>m.author.id == message.author.id, {max : 1, time : 60000})
        dataEdit = message.channel.messages.get(dataEdit.map(m=>m.id).toString())
        edin = data[type][keey][Object.keys(data[type][keey])[Number(fouaws.content)-1]]
        if(!dataEdit.content.includes(`edin`)) {
            edin = eval(`${dataEdit.content}`)
        }else {
            eval(`${dataEdit.content}`)
        }
        data[type][keey][Object.keys(data[type][keey])[Number(fouaws.content)-1]] = edin
        fs.writeFile(locate.DIR+"/Data/"+type+".json", JSON.stringify(data[type], null, 4), (err) => {
            if (err) console.log(err)})
        return EMdata(keey, type, keey2),dataEdit.delete(),fouaws.delete()
    }

    async function Edata(type, einf, ty2) {
        function pageing(x,y, yxy) {
            if(ty2 && yxy == 'n')x = x +4 ,y = y +4
            if(ty2 && yxy == 'b')x = x -4 ,y = y -4
            if(x == false) x = 0
            if(y == false) y = 4
            tmp2 = new Array
            xinn = new Array
            console.log(Object.keys(type))
            console.log('##############')
            if (typeof type === 'object') objd = Object.keys(type),console.log('aaaaaaaaaaabb')
            else objd = Object.keys(data[type]),console.log('bbbbbbbbbbbbbbbbbb')
            console.log(objd)
            objd.forEach(function(element) {
                if(type == 'money') {
                    try {
                        tmp2.push(`${bot.users.get(element.split('|')[0]).tag} - (${bot.guilds.get(element.split('|')[1]).name})` )
                        xinn.push(element)
                    }catch(e) {}
                }
                else if (type == 'server') {
                    try {
                        tmp2.push(`${bot.guilds.get(element).name} - (${element})` )
                        xinn.push(element) 
                    }catch(e) {}
                }
                else {
                    try{

                        tmp2.push(`${bot.users.get(element).tag} - (${element})`)
                        xinn.push(element)
                    }catch(e) {}
                }
            })
            console.log('aaaaaaaaaaa')
            qinfo = {
                tmpb : tmp2.slice(x,y),
                pageAt : y / 4,
                "x" : x,
                "y" : y,
                last : y >= tmp2.length -1 ? 'yes' : 'no',
                idd : xinn.slice(x,y)
            }
            return qinfo;
        }
        gfds = type.toString()
        console.log(`~~~~~~~~~~~~~~~~~~~~~~~~\n${gfds}\n~~~~~~~~~~~~~~~~~~~~~~~~`)
        if(!einf) {
            //console.log('no!?')
            cfd = pageing(false, false, 'n')
        } else {
            cfd = pageing(einf.x, einf.y, ty2)
        }
        //console.log(cfd.tmpb)
        //console.log(cfd.idd)
        let xstr = `embd = new Discord.RichEmbed()
        .setTitle(\`Main Menu -> Data -> \${gfds} #\${cfd.pageAt}\`)
        cfd.tmpb.map(e=>embd.addField(\`\${cfd.tmpb.indexOf(e) +1} \`, e, cfd.tmpb.indexOf(e) +1? true : false))
        if(cfd.pageAt != 1) embd.addField('<-', 'page back',true)
        if(cfd.last == 'no') embd.addField('->', 'Next page',true)
        embd.setColor('ORANGE')
        `
        embedd(xstr, true)

        let trichose = await message.channel.awaitMessages(m=>! isNaN(m.content) || m.content == '<--' || m.content == '-back'|| m.content == 'back' || m.content == 'next' || m.content == '->' || m.content == '<-' && m.author.id == message.author.id, {max : 1, time : 30000})
        let triaws = message.channel.messages.get(trichose.map(m=>m.id).toString())
        if(!triaws) return savd.delete()
        if(triaws.content == '<--' || triaws.content == '-back') return Adata(),triaws.delete()
        if(triaws.content == '<-' || triaws.content == 'back') return Edata( gfds,cfd,'b'),triaws.delete()
        if(triaws.content == '->' || triaws.content == 'next') return Edata( gfds,cfd,'n'),triaws.delete()
        if(Number(triaws.content) > 4) return Edata(gfds, ''),triaws.delete()
        EMdata(cfd.idd[Number(triaws.content) -1],gfds, cfd.tmpb[Number(triaws.content) -1],cfd)
        triaws.delete()
    }




    async function Adata() {
        tmp = new Array
        Object.keys(data).forEach(function(element) {
            tmp.push(element)
        })




        xstr = `embd = new Discord.RichEmbed()
        .setTitle('Main Menu -> Data')
        tmp.map(e=>embd.addField(\`\${tmp.indexOf(e) +1} \`,e))
        embd.setColor('BLUE')
        `
        embedd(xstr, true)
        twochose = await message.channel.awaitMessages(m=>! isNaN(m.content) || m.content == '<-' || m.content == '-back' && m.author.id == message.author.id, {max : 1, time : 30000})
        let twoaws = message.channel.messages.get(twochose.map(m=>m.id).toString())
        if(!twoaws) return savd.delete()
        if(twoaws.content == '<--' || twoaws.content == '-back') return start()
        if(Number(twoaws.content) > tmp.length +1) return Adata('start()')
        Edata(Object.keys(data)[Number(twoaws.content)-1], '')
        twoaws.delete()
    }



    async function sec(back) {
        function mkembd(sel) {
            embd = new Discord.RichEmbed()
            .setTitle('Main menu -> Security')
            Object.keys(server['mainframe']).map(e=>embd.addField(Object.keys(server['mainframe']).indexOf(e), Object.keys(server['mainframe']).indexOf(e) == sel ? `**${e} — ${server['mainframe'][e].toString()}**` :`${e} — ${server['mainframe'][e].toString()}`))
            embd.setColor('PURPLE')
        }
        embedd(mkembd(),true)
        secmsg = await message.channel.awaitMessages(m=>m.author.id == message.author.id, {max:1,time:30000})
        secaws = message.channel.messages.get(secmsg.map(e=>e.id).toString())
        if(secaws == '-back' || secaws == '<--') return eval(back)
        if(Number(secaws.content) > Object.keys(server['mainframe']).length) return sec(back)
        embedd(mkembd(Number(secaws.content)),true)
        seced = await message.channel.awaitMessages(m=>m.author.id == message.author.id, {max:1,time:30000})
        secedA = message.channel.messages.get(seced.map(e=>e.id).toString())
        server['mainframe'][Object.keys(server['mainframe'])[secaws.content]] = eval(secedA.content)
        fs.writeFile(locate.DIR+"/Data/server.json", JSON.stringify(server, null, 4), (err) => {
            if (err) console.log(err)})
        return sec(back)
    }




    async function start() {


    xstr = `embd = new Discord.RichEmbed()
            .setTitle('Home Screen')
            .addField('1','Data')
            .addField('2','Command execution')
            .addField('3','Security')
            .setColor('GREEN')

            `
    embedd(xstr)
    Onechose = await message.channel.awaitMessages(m=>! isNaN(m.content) && m.author.id == message.author.id, {max : 1, time : 30000})
    let oneaws = message.channel.messages.get(Onechose.map(m=>m.id).toString())
    if(!oneaws) return savd.delete()
    if(Number(oneaws.content) > 6) return start()
    else {
        if(Number(oneaws.content) == 1) {
            Adata('start()')
        }
        if(Number(oneaws.content) == 3) {
            sec('start()')
        }
        if(oneaws.content == '5') {
            savd.edit('Exiting...')
            savd.delete(5000)
        }
    }
    oneaws.delete()
    }














    emd = message.channel.send('Loading..')
    var savd = await emd.then(m=> {return m;})
    start()



}
exports.help ={
    desc : 'Admin console',
    usage :'+admin',
    alias : ['console','adm']
}