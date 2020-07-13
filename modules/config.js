exports.PREFIX = '+'

exports.secretgen = function (len){
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

  for (var i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}



exports.emotes = {
  ver : '<:verified:619924337033478164>',
  fal : '<:failed:619929255022821386>',
}

var times = {}

exports.getTimer = function(id) {
  time = times[id]
  splitted = time.split(':')
  splitted[0] =splitted[0] + ' Hours'
  splitted[1] =splitted[1] + ' Minutes'
  splitted[2] =splitted[2] + ' Seconds'
  Done = []
  num = 0
  splitted.map(v=>{num+=1;v.startsWith('00')? '':Done.push(v)})
  if (Done.length > 3) Done.pop()
  return `${Done.join(' and ')} (${time})`
}


exports.timer = async function(time,id) {
  var converted
  if (time.toLowerCase().includes('m')) {
    loc = time.search('m')
    sliced = time.slice(0,loc)
    if (Number(sliced) < 10) sliced = '0'+sliced
    converted = `00:${sliced}:59`
  }
  else if (time.toLowerCase().includes('s')) {
    loc = time.search('s')
    sliced = time.slice(0,loc)
    if (Number(sliced) < 10) sliced = '0'+sliced
    converted = `00:00:${sliced}`
  }
  else if (time.toLowerCase().includes('h')) {
    loc = time.search('h')
    sliced = time.slice(0,loc)
    if (Number(sliced) < 10) sliced = '0'+sliced
    converted = `${sliced}:59:59`
  }
  var splited = converted.split(':')
  var TimeObj = {'h':splited[0],'m':splited[1],'s':splited[2]}
  console.log(TimeObj)
  if (TimeObj['m'] != '00') {
      TimeObj['m'] = String(Number(TimeObj['m'] - 1))
  }
  setInterval(function() {    Main(TimeObj,this,id)   },1000)
  
  function Main(obj,invt, id) {
    if (obj['s'] == '00' & obj['h'] == '00' & obj['m'] == '00') return clearInterval(invt)
    obj = doS(obj)
    timed = Object.values(obj).join(':')
    times[id] = timed
  }
  function doH(obj) {
    if (obj['h'] != '00') {
      obj['h'] = String(Number(obj['h']) -1)
      obj['m'] = '59'
      obj['s'] = '59'
      if (obj['h'] < 10) obj['h'] = '0'+obj['h']
      return obj
    }
    return 
  }
  function doM(obj) {
    if (obj['m'] != '00') {
      obj['m'] = String(Number(obj['m']) -1)
      obj['s'] = '59'
      if (obj['m'] < 10) obj['m'] = '0'+obj['m']
      return obj
    }
    else return doH(obj)
  }
  function doS(obj) {
    if (obj['s'] != '00') {
      obj['s'] = String(Number(obj['s']) -1)
      if (obj['s'] < 10) obj['s'] = '0'+obj['s']
      return obj
    }
    else return doM(obj)
  }
}


exports.BOTA = {
    on: true,
    a: "-=Update 17 =- \nyeah just got rid of most bugs rlly.\nok thx for coming now bye",
    channel: "555101871916711956"

}

exports.capitalize = String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}





//sets up a 12hour time format
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;}
//exporting the 12hour time format
module.exports.mytime = formatAMPM(new Date)

exports.hexcolor = function() { return '#'+(Math.random()*0xFFFFFF<<0).toString(16)}


exports.activity = {
    //this is what its going to show on the profile
texts:['+Help -> Epic gamer','+help -> by Pozm#7825'],
    //this is the type it will show eg, playing, watching, listening or streaming.
type:"Playing",
    //url for twitch livestream, leave blank if you do not want to link.
url:"https://www.twitch.tv/pozus"
};
exports.logid = "537005255070580746"
//your id
exports.ownerid = "518763902570594314"
exports.altsid = ['288062966803333120']

//Your bots clientID
exports.clientID = "548470661777981461"


exports.by = `Pozm#2736`