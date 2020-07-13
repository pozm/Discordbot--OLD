const fs = require("fs")
const {clientID, by} = require("./config")
function CIC (){
    try {
        // if it does
          if (fs.existsSync("clientID.bat")) {}
          //if it doesnt exist
           else {  fs.appendFile('clientID.bat', `set clientid=${clientID}\n set owner=${by}`, function (err) {if (err) throw err; console.log('Installed CilentID.bat!');});}
           //if err gets produced
        } catch(err) {console.error(err)}
        
}
exports.CIC = CIC