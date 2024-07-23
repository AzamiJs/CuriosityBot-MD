let { spawn }  = require('child_process')
let handler  = async (m, { conn }) => {

if (!process.send) throw 'Dont: node main.js\nDo: node index.js'
if (conn.user.jid == conn.user.jid) {
await conn.reply(m.chat, '☁️ *Reiniciando*', m, )
process.send('reset')
} else throw '_eeeeeiiittsssss..._'

}
handler.help = ['restart']
handler.tags = ['owner']
handler.command = /^restart$/i
handler.owner = false
handler.mods = true
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

