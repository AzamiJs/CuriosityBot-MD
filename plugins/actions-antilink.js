let handler = m => m
handler.before = async function (m, { user, isBotAdmin, isAdmin }) {
if ((m.isBaileys && m.fromMe) || m.fromMe || !m.isGroup) return true

let chat = global.db.data.chats[m.chat]
let isGroupLink = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i.exec(m.text)

if (chat.antiLink && isGroupLink) {
if (isAdmin) {
return conn.reply(m.chat, `\`🚩 ¡Enlace detectado!\`\n\n*El antilink está activo, pero eres admin, ¡No eliminaré tu mensaje!*`, m)
}
if (!isBotAdmin) {
return conn.reply(m.chat, `\`🚩 ¡Enlace detectado!\`\n\n*No soy admin, no puedo eliminar los enlaces*`, m)
}

let userWarns = global.db.data.users[m.sender].warn || 0
userWarns++
global.db.data.users[m.sender].warn = userWarns

if (userWarns >= 3) {
await conn.groupRemove(m.chat, [m.sender])
} else {
conn.reply(m.chat, `\`🚩 ¡Enlace detectado!\`\n\n*${await this.getName(m.sender)} mandaste un enlace prohibido. Advertencia ${userWarns}/3*`, m)
}
await conn.sendMessage(m.chat, { delete: m.key })
await this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant } })
}
return true
}

module.exports = handler