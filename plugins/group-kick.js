let handler = async (m, { teks, conn, isOwner, isAdmin, args }) => {
if (!m.mentionedJid[0] && !m.quoted) {
return conn.reply(m.chat, '🚩 *Etiqueta o responde al mensaje de la persona que quieres eliminar*', m)
}

let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender

const groupInfo = await conn.groupMetadata(m.chat)
const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net'
const ownerBot = global.owner[0][0] + '@s.whatsapp.net'

if (user === conn.user.jid) {
return conn.reply(m.chat, '🚩 *No puedo eliminar el bot del grupo*', m)
}

if (user === ownerGroup) {
return conn.reply(m.chat, '🚩 *No puedo eliminar al propietario del grupo*', m)
}

if (user === ownerBot) {
return conn.reply(m.chat, '🚩 *No puedo eliminar al propietario del bot*', m)
}

await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
}

handler.help = ['kick']
handler.tags = ['group']
handler.command = /^(kick)$/i

handler.group = true
handler.botAdmin = true
handler.admin = true
module.exports = handler