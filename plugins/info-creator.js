var handler = async (m, { conn }) => {
const p = nomorown
let pp = await conn.profilePictureUrl(`${p}@s.whatsapp.net`, 'image').catch((_) => thumb)
let owner = `wa.me/${p}`
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:WhatsApp; BANG SYAII\nZam\nORG: ${nameowner}\nTITLE:soft\nitem1.TEL;waid=${nomorown}:${nomorown}\nitem1.X-ABLabel:Contactar al propietario\nitem2.URL:https://github.com/AzamiJs\nitem2.X-ABLabel:💬 Más\nitem3.EMAIL;type=INTERNET: thecuriositybot@gmail.com\nitem3.X-ABLabel:Email\nitem4.ADR:;;🇲🇽 México;;;;\nitem4.X-ABADR:💬 Más\nitem4.X-ABLabel:Ubicación\nEND:VCARD`

const sentMsg = await conn.sendMessage(m.chat, {contacts: {displayName: wm,contacts: [{ vcard }]},    contextInfo: {externalAdReply: { title: wm, body: wm, thumbnailUrl: pp, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}}, { quoted: fkontak })
await conn.reply(m.chat,  '*❕ él es mi dueño, si quieres reportar un error contáctalo*', sentMsg)
}

handler.help = ['owner', 'creator']
handler.tags = ['info']
handler.command = ['owner', 'creator']
handler.limit = true

module.exports = handler