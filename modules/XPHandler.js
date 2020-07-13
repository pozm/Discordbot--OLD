const lvl1 = 40
const Discord = require("discord.js");
const Canvas = require('canvas');

function lvltoxp(lvl) {
    if (!lvl < 1) {
        return lvl1 *lvl + (lvl *100)
    }
    return lvl1
}

function Comparator(a, b) {
    if (a[0].lvl > b[0].lvl) return -1;
    else if (a[0].lvl == b[0].lvl) {if (a[0].xp > b[0].xp) return -1;}
    else return 1
}


exports.genTop = function(userInfo,guild) {
    var obj = {vals:[]}
    Object.entries(userInfo).forEach( (value,k) =>{
        v = value[1]
        if (v.Rank && guild.members.has(value[0]) == true) obj.vals.push([{lvl:v.Rank.level,xp:v.Rank.xp},guild.members.get(value[0])])
    })
    sorted = obj.vals.sort(Comparator)
    mapped = sorted.map(vvv => `${sorted.indexOf(vvv)+1}. ${vvv[1].displayName} - ${userInfo[vvv[1].id].Rank.level > 1? userInfo[vvv[1].id].Rank.level + ' Levels' : 'Level '+ userInfo[vvv[1].id].Rank.level}, ${userInfo[vvv[1].id].Rank.xp} Experience`)
    if (mapped.length > 10) mapped = mapped.slice(0,10)
    return {map:mapped,sort:sorted}
}

exports.checklvl = function(xp,lvl) {
    var nxtlvl = lvl + 1
    var nxtlvlxp = lvltoxp(nxtlvl)

    if (xp > nxtlvlxp) {
        return true;
    }
    return false;
}

exports.getGlobRank = function(member,guild,ui) {
    sorted = exports.genTop(ui,guild).sort
    var thing
    sorted.map(v => v[1].id == member.id ?thing = v : '')
    num = sorted.indexOf(thing)
    if (num == -1 ) return console.log('Denied')
    return num + 1
}

const applyText = (canvas, text, exp) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
        ctx.font = `${fontSize -= 10}px sans-serif`;
        if (exp) ctx.font = `${fontSize -= 12}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};

exports.makeimg = async function(member,xp,lvl,ui) {
    var xp = Number(xp)
    var canvas = Canvas.createCanvas(700, 250,);
    var ctx = canvas.getContext('2d');
    var lvl = Number(lvl)
    var nxtlvl = lvl + 1
    var lvlxp = lvltoxp(lvl)
    var nxtlvlxp = lvltoxp(nxtlvl)

    var needed = xp/nxtlvlxp * lvl1 
    console.log(exports.getGlobRank(member,member.guild,ui))
	ctx.font = applyText(canvas, `${member.displayName}`);
	ctx.fillStyle = '#ffffff';
    ctx.fillText(`${member.displayName}`, canvas.width / 2.8, canvas.height / 1.8);
    
    ctx.font = applyText(canvas, `Level ${lvl}`,true);
    ctx.fillStyle = '#ffffff';
    ctx.font = `${fontSize = 34}px sans-serif`;
    ctx.fillText(`Level ${lvl}`, canvas.width / 2.77, canvas.height / 1.5);
    

    ctx.font = applyText(canvas, `${xp}/${nxtlvlxp}`,true);
    ctx.fillStyle = '#ffffff';
    ctx.font = `${fontSize = 24}px sans-serif`;
    ctx.fillText(`${xp}/${nxtlvlxp}`, canvas.width / 1.24, canvas.height / 1.5);
    


    ctx.font = applyText(canvas, `#${exports.getGlobRank(member,member.guild,ui)}`,true);
    ctx.fillStyle = '#ffffff';
    ctx.font = `${fontSize = 24}px sans-serif`;
	ctx.fillText(`#${exports.getGlobRank(member,member.guild,ui)}`, canvas.width / 1.74, canvas.height / 1.5);

    //default bar
    ctx.beginPath()
    ctx.rect(250, 175 ,400 ,50)
    ctx.fillStyle = "white"
    ctx.fill();
    ctx.closePath()



    //xp overlap

    ctx.beginPath()
    ctx.rect(250, 175 ,needed*10,50)
    ctx.fillStyle = member.displayHexColor
    ctx.fill();
    ctx.closePath()

    
    ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

    var avatar = await Canvas.loadImage(member.user.displayAvatarURL);
    ctx.drawImage(avatar, 25, 25, 200, 200);
    
    var attachment = new Discord.Attachment(canvas.toBuffer(), 'Rank.png');

    return attachment
}

