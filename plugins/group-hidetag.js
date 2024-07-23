const generateWAMessageFromContent = require('@whiskeysockets/baileys')

let handler = async(m, { conn, text, participants }) => {
if (!m.quoted && !text) return conn.reply(m.chat, `🚩 *Ingrese un texto*`, m, )

try { 
const fkontak = {"key":{"participants":"0@s.whatsapp.net","remoteJid":"status@broadcast","fromMe":false,"id":"Halo"},"message":{"contactMessage":{"vcard":`BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}},"participant":"0@s.whatsapp.net"};
let users = participants.map(u => conn.decodeJid(u.id))
let q = m.quoted ? m.quoted : m || m.text || m.sender
let c = m.quoted ? await m.getQuotedObj() : m.msg || m.text || m.sender
let msg = conn.cMod(m.chat, generateWAMessageFromContent(m.chat, { [m.quoted ? q.mtype : 'extendedTextMessage']: m.quoted ? c.message[q.mtype] : { text: '' || c }}, { quoted: fkontak, userJid: conn.user.id }), text || q.text, conn.user.jid, { mentions: users })
await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })

} catch {  

/**
[ By @NeKosmic || https://github.com/NeKosmic/ ]
**/  
    
let users = participants.map(u => conn.decodeJid(u.id))
let quoted = m.quoted ? m.quoted : m
let mime = (quoted.msg || quoted).mimetype || ''
let isMedia = /image|video|sticker|audio/.test(mime)
let more = String.fromCharCode(8206)
let masss = more.repeat(850)
let htextos = `${text ? text : "*Hola!!*"}`
if ((isMedia && quoted.mtype === 'imageMessage') && htextos) {
var mediax = await quoted.download?.()
conn.sendMessage(m.chat, { image: mediax, mentions: users, caption: htextos, mentions: users }, { quoted: m })
} else if ((isMedia && quoted.mtype === 'videoMessage') && htextos) {
var mediax = await quoted.download?.()
conn.sendMessage(m.chat, { video: mediax, mentions: users, mimetype: 'video/mp4', caption: htextos }, { quoted: m })
} else if ((isMedia && quoted.mtype === 'audioMessage') && htextos) {
var mediax = await quoted.download?.()
conn.sendMessage(m.chat, { audio: mediax, mentions: users, mimetype: 'audio/mp4', fileName: `Hidetag.mp3` }, { quoted: m })
} else if ((isMedia && quoted.mtype === 'stickerMessage') && htextos) {
var mediax = await quoted.download?.()
conn.sendMessage(m.chat, {sticker: mediax, mentions: users}, { quoted: m })
} else {
await conn.relayMessage(m.chat, {extendedTextMessage:{text: `${htextos}\n`, ...{ contextInfo: { mentionedJid: users, externalAdReply: { thumbnailUrl: thumb, sourceUrl: giturl }}}}}, {})
}}

}
handler.help = ['hidetag']
handler.tags = ['group']
handler.command = /^(hidetag)$/i

handler.group = true
handler.admin = true
handler.premium = true
module.exports = handler