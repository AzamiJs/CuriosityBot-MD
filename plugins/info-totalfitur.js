let fs = require('fs')
let handler = async (m, { conn, args, command }) => {

let fitur = Object.values(features).filter(v => v.help && !v.disabled).map(v => v.help).flat(1)
let totalf = Object.values(global.features).filter(
(v) => v.help && v.tags).length
let hasil = fitur.length
let txt = `*• Todos los plugins* : ${hasil}`
conn.reply(m.chat, txt, fkontak, adReply)

}  
handler.help = ['totalfitur']
handler.tags = ['info']
handler.command = ['totalfitur']
module.exports = handler