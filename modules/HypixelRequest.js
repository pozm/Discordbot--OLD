const Request = require('request')

const {HypixelKey} = require('../../modules/config');

const http = require(http)

exports.GetPlayerData = async function(uuid) {


Request.post({url:`https://api.hypixel.net/player?key=${HypixelKey}&uuid=${uuid}`,})


}

