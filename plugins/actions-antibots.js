async function before(m, { isAdmin, isBotAdmin }) {
let chat = global.db.data.chats[m.chat]
if (chat.antiBot) {
if (m.isBaileys === true) {
if (m.fromMe || !isBotAdmin) {		 
} else {
conn.sendMessage(m.chat, { text: `\`🚩 Anti Bots\`\n\n*Hola @${m.sender.split("@")[0]}, parece que eres un bot, serás eliminado*` })
conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}
}
}
return
}

module.exports = { before }