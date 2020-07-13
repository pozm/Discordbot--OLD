const fs = require("fs");
const http = require("http");
var request = require('request');

var events = require('events');
var colors = require('colors');

var exiting = false

exports.goexit = function() {
    exiting = true
}

var basck = {dat : null, do : 'no'}

exports.getData = function(FileName) {
    if (exiting == true ) return
    checkf = fs.readFileSync(`./Data/${FileName}.json`, "utf8")
    //console.log(checkf)
    if (checkf == null || checkf == '') {
        checkf = fs.readFileSync(`./Data/backup/${FileName}.json`, "utf8")
        console.log('successfully loaded from backup of '.bold.blue+FileName .bold.red)
    }
    Data = JSON.parse(checkf);
    if (Data == null) return console.log(FileName .bold.red + 'Has nothing inside it.'.bold.blue)
    return Data
}

exports.writeData = function(thing, FileName,cal) {
    if (exiting == true ) return
    if (thing == null || thing == '') return console.log(`WriteData just got a request to write nothing to ${FileName}`.bold.blue)
    fs.writeFile(`./Data/${FileName}.json`, JSON.stringify(thing, null, 4), (err) => {if (err) console.log(err);});
    if (basck.do == 'no') return
    if (basck.do == 'done') {
        basck.do = 'ok'
    }
    basck.dat = thing
    if (basck.do == 'ok' && cal == null || cal == undefined) {
        basck.do = 'no'
        setTimeout(()=>{exports.writeData(basck.dat,`backup/${FileName}`,true);basck.do = 'done'},9000)
    } //else //console.log(`${Object.entries(basck)} ${typeof cal}`)
}

DataEvent = new events.EventEmitter();

exports.Event = DataEvent