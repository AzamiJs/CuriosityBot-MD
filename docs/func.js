const { proto, delay, getContentType, areJidsSameUser, generateWAMessage, prepareWAMessageMedia, generateWAMessageFromContent, downloadContentFromMessage } = require('@whiskeysockets/baileys')
const chalk = require('chalk')
const fs = require('fs')
const axios = require('axios')
const moment = require('moment-timezone')
const { sizeFormatter } = require('human-readable')
const util = require('util')
const Jimp = require('jimp')
const fetch = require('node-fetch')
const FileType = require('file-type')
const path = require('path')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('../docs/exif')

const unixTimestampSeconds = (date = new Date()) => Math.floor(date.getTime() / 1000)

exports.unixTimestampSeconds = unixTimestampSeconds

exports.generateMessageTag = (epoch) => {
let tag = (0, exports.unixTimestampSeconds)().toString()
if (epoch)
tag += '.--' + epoch
return tag
}

exports.processTime = (timestamp, now) => {
return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}

exports.getRandom = (ext) => {
return `${Math.floor(Math.random() * 10000)}${ext}`
}

exports.getBuffer = async (url, options) => {
try {
options ? options : {}
const res = await axios({
method: "get",
url,
headers: {
'DNT': 1,
'Upgrade-Insecure-Request': 1
},
...options,
responseType: 'arraybuffer'
})
return res.data
} catch (err) {
return err
}
}

exports.fetchJson = async (url, options) => {
try {
options ? options : {}
const res = await axios({
method: 'GET',
url: url,
headers: {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
},
...options
})
return res.data
} catch (err) {
return err
}
}

exports.runtime = function(seconds) {
seconds = Number(seconds)
var d = Math.floor(seconds / (3600 * 24))
var h = Math.floor(seconds % (3600 * 24) / 3600)
var m = Math.floor(seconds % 3600 / 60)
var s = Math.floor(seconds % 60)
var dDisplay = d > 0 ? d + (d == 1 ? ' day, ' : ' days, ') : ''
var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : ''
var mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : ''
var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : ''
return dDisplay + hDisplay + mDisplay + sDisplay
}

exports.clockString = (ms) => {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

exports.sleep = async (ms) => {
return new Promise(resolve => setTimeout(resolve, ms))
}

exports.isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

exports.getTime = (format, date) => {
if (date) {
return moment(date).locale('id').format(format)
} else {
return moment.tz('America/Mexico_City').locale('id').format(format)
}
}

exports.formatDate = (n, locale = 'id') => {
let d = new Date(n)
return d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}

exports.tanggal = (numer) => {
myMonths = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','diciembre']
myDays = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
var tgl = new Date(numer)
var day = tgl.getDate()
bulan = tgl.getMonth()
var thisDay = tgl.getDay(),
thisDay = myDays[thisDay]
var yy = tgl.getYear()
var year = (yy < 1000) ? yy + 1900 : yy
const time = moment.tz('America/Mexico_City').format('DD/MM HH:mm:ss')
let d = new Date
let locale = 'id'
let gmt = new Date(0).getTime() - new Date('1 Enero 1970').getTime()
let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]			
return `${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`
}

exports.formatp = sizeFormatter({
std: 'JEDEC',
decimalPlaces: 2,
keepTrailingZeroes: false,
render: (literal, symbol) => `${literal} ${symbol}B`,
})

exports.jsonformat = (string) => {
return JSON.stringify(string, null, 2)
}

function format(...args) {
return util.format(...args)
}

exports.logic = (check, inp, out) => {
if (inp.length !== out.length) throw new Error('Input and Output must have same length')
for (let i in inp)
if (util.isDeepStrictEqual(check, inp[i])) return out[i]
return null
}

exports.generateProfilePicture = async (buffer) => {
const jimp = await Jimp.read(buffer)
const min = jimp.getWidth()
const max = jimp.getHeight()
const cropped = jimp.crop(0, 0, min, max)
return {
img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
preview: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG)
}
}

exports.bytesToSize = (bytes, decimals = 2) => {
if (bytes === 0) return '0 Bytes'

const k = 1024
const dm = decimals < 0 ? 0 : decimals
const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

const i = Math.floor(Math.log(bytes) / Math.log(k))

return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

exports.getSizeMedia = (path) => {
return new Promise((resolve, reject) => {
if (/http/.test(path)) {
axios.get(path)
.then((res) => {
let length = parseInt(res.headers['content-length'])
let size = exports.bytesToSize(length, 3)
if(!isNaN(length)) resolve(size)
})
} else if (Buffer.isBuffer(path)) {
let length = Buffer.byteLength(path)
let size = exports.bytesToSize(length, 3)
if(!isNaN(length)) resolve(size)
} else {
reject('error')
}
})
}

exports.parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

exports.getGroupAdmins = (participants) => {
let admins = []
for (let i of participants) {
i.admin === 'superadmin' ? admins.push(i.id) :  i.admin === 'admin' ? admins.push(i.id) : ''
}
return admins || []
}

exports.smsg = (client, m, store) => {
client.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
return buffer} 
if (!m) return m
let M = proto.WebMessageInfo
if (m.key) {
m.id = m.key.id
m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16
m.chat = m.key.remoteJid
m.fromMe = m.key.fromMe
m.isGroup = m.chat.endsWith('@g.us')
m.sender = client.decodeJid(m.fromMe && client.user.id || m.participant || m.key.participant || m.chat || '')
if (m.isGroup) m.participant = client.decodeJid(m.key.participant) || ''
}
if (m.message) {
m.mtype = getContentType(m.message)
m.msg = (m.mtype == 'viewOnceMessage' ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.mtype])
m.body = m.message.conversation || m.msg.caption || m.msg.text || (m.mtype == 'listResponseMessage') && m.msg.singleSelectReply.selectedRowId || (m.mtype == 'buttonsResponseMessage') && m.msg.selectedButtonId || (m.mtype == 'viewOnceMessage') && m.msg.caption || m.text
let quoted = m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null
m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
if (m.quoted) {
let type = Object.keys(m.quoted)[0]
m.quoted = m.quoted[type]
if (['productMessage'].includes(type)) {
type = Object.keys(m.quoted)[0]
m.quoted = m.quoted[type]
}
if (typeof m.quoted === 'string') m.quoted = {
text: m.quoted
}
m.quoted.mtype = type
m.quoted.id = m.msg.contextInfo.stanzaId
m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat
m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false
m.quoted.sender = client.decodeJid(m.msg.contextInfo.participant)
m.quoted.fromMe = m.quoted.sender === client.decodeJid(client.user.id)
m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || ''
m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
m.getQuotedObj = m.getQuotedMessage = async () => {
if (!m.quoted.id) return false
let q = await store.loadMessage(m.chat, m.quoted.id, conn)
return exports.smsg(client, q, store)
}
let vM = m.quoted.fakeObj = M.fromObject({
key: { remoteJid: m.quoted.chat, fromMe: m.quoted.fromMe, id: m.quoted.id },
message: quoted,
...(m.isGroup ? { participant: m.quoted.sender } : {})
})
m.quoted.delete = () => client.sendMessage(m.quoted.chat, { delete: vM.key })
m.quoted.copyNForward = (jid, forceForward = false, options = {}) => client.copyNForward(jid, vM, forceForward, options)
m.quoted.download = () => client.downloadMediaMessage(m.quoted)
}
}
if (m.msg.url) m.download = () => client.downloadMediaMessage(m.msg)
m.text = m.msg.text || m.msg.caption || m.message.conversation || m.msg.contentText || m.msg.selectedDisplayText || m.msg.title || ''

m.reply = (text, chatId = m.chat, options = {}) => Buffer.isBuffer(text) ? client.sendMedia(chatId, text, 'file', '', m, { ...options }) : client.sendText(chatId, text, m, { ...options })

m.copy = () => exports.smsg(client, M.fromObject(M.toObject(m)))

m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => client.copyNForward(jid, m, forceForward, options)

client.getName = (jid, withoutContact  = false) => { // jid = m.chat?
id = client.decodeJid(jid)
withoutContact = client.withoutContact || withoutContact 
let v
if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
v = store.contacts[id] || {}
if (!(v.name || v.subject)) v = client.groupMetadata(id) || {}
resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
})
else v = id === '0@s.whatsapp.net' ? {id, name: 'WhatsApp' } : id === client.decodeJid(client.user.jid) ?
client.user :
(store.contacts[id] || {})
return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
}
  
client.getFile = async (PATH, saveToFile = false) => { 
let res, filename
const data = Buffer.isBuffer(PATH) ? PATH : PATH instanceof ArrayBuffer ? PATH.toBuffer() : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await fetch(PATH)).buffer() : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
const type = await FileType.fromBuffer(data) || { mime: 'application/octet-stream', ext: '.bin', }
if (data && saveToFile && !filename) (filename = path.join(__dirname, '../tmp/' + new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, data))
return { res, filename, ...type, data, deleteFile() {
return filename && fs.promises.unlink(filename)
},
}}

m.react = (text, key, options) => client.sendMessage(m.chat, { react: {text, key: m.key }})
  
client.parseMention = async(text) => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')}

client.appenTextMessage = async(text, chatUpdate) => {
let messages = await generateWAMessage(m.chat, { text: text, mentions: m.mentionedJid }, {
userJid: client.user.id,
quoted: m.quoted && m.quoted.fakeObj
})
messages.key.fromMe = areJidsSameUser(m.sender, conn.user.id)
messages.key.id = m.key.id
messages.pushName = m.pushName
if (m.isGroup) messages.participant = m.sender
let msg = {
...chatUpdate,
messages: [proto.WebMessageInfo.fromObject(messages)],
type: 'append'
}
conn.ev.emit('messages.upsert', msg)
}

client.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)}
await client.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer}
client.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)}
await client.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer}
            
client.sendButton = async(jid, text = '', footer = '', buffer, buttons, copy, urls, quoted, options) => {
let img, video

if (/^https?:\/\//i.test(buffer)) {

try {
// Obtener el tipo MIME de la URL
const response = await fetch(buffer)
const contentType = response.headers.get('content-type')
if (/^image\//i.test(contentType)) {
img = await prepareWAMessageMedia({ image: { url: buffer } }, { upload: client.waUploadToServer })
} else if (/^video\//i.test(contentType)) {
video = await prepareWAMessageMedia({ video: { url: buffer } }, { upload: client.waUploadToServer })
} else {
console.error("Tipo MIME no compatible:", contentType)
}
} catch (error) {
console.error("Error al obtener el tipo MIME:", error)
}
} else {
            
try {
const type = await client.getFile(buffer)
if (/^image\//i.test(type.mime)) {
img = await prepareWAMessageMedia({ image: { url: buffer } }, { upload: client.waUploadToServer })
} else if (/^video\//i.test(type.mime)) {
video = await prepareWAMessageMedia({ video: { url: buffer } }, { upload: client.waUploadToServer })
}
} catch (error) {
console.error("Error al obtener el tipo de archivo:", error);
}
}

const dynamicButtons = buttons.map(btn => ({
name: 'quick_reply',
buttonParamsJson: JSON.stringify({
display_text: btn[0],
id: btn[1]
}), contextInfo:{
mentionedJid: null, 
forwardingScore: 1,
isForwarded: true,
forwardedNewsletterMessageInfo: { 
newsletterJid: '120363302472386010@newslette',
serverMessageId: '', 
newsletterName: `Hola` },
externalAdReply: { title: wm + ` 💫`, 
body: 'Zam',
mediaType: 1, 
renderLargerThumbnail: false,
previewType: `PHOTO`,
thumbnailUrl: 'https://qu.ax/lFTW.jpeg', 
sourceUrl: 'https://github.com/AzamiJs/CuriosityBot-MD' }}
}))

       
if (copy && (typeof copy === 'string' || typeof copy === 'number')) {
// Añadir botón de copiar
dynamicButtons.push({
name: 'cta_copy',
buttonParamsJson: JSON.stringify({
display_text: 'Copy', copy_code: copy })});}; if (urls && Array.isArray(urls)) { urls.forEach(url => { dynamicButtons.push({ name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: url[0], url: url[1], merchant_url: url[1] })})})}; const interactiveMessage = { body: { text: text }, footer: { text: footer }, header: { hasMediaAttachment: false, imageMessage: img ? img.imageMessage : null, videoMessage: video ? video.videoMessage : null }, nativeFlowMessage: { buttons: dynamicButtons, messageParamsJson: '' }}; let msgL = generateWAMessageFromContent(jid, { viewOnceMessage: { message: { interactiveMessage } } }, { userJid: client.user.jid, quoted }); client.relayMessage(jid, msgL.message, { messageId: msgL.key.id, ...options })}

client.sendList = async(jid, title, text, buttonText, listSections, quoted, options = {}) => {
const sections = [...listSections];
const message = {
interactiveMessage: {
header: {title: title} ,
body: {text: text}, 
nativeFlowMessage: {
buttons: [
{
name: 'single_select',
buttonParamsJson: JSON.stringify({
title: buttonText,
sections
})
}
],
messageParamsJson: ''
}
}
}
await client.relayMessage(jid, { viewOnceMessage: { message } }, {});
}

client.sendContextInfo = async(jid, text = '', options, quoted) => {
//let prep = generateWAMessageFromContent(jid, { extendedTextMessage: { text: text, contextInfo: { externalAdReply: { title: '© CuriosityBot-MD', body: 'Zam', thumbnailUrl: 'https://qu.ax/lFTW.jpeg', sourceUrl: 'https://whatsapp.com/channel/0029VaB4w2ZFHWpwgyEe3w2k' }, mentionedJid: await client.parseMention(text) }}}, { quoted: m })
let prep = generateWAMessageFromContent(jid, { extendedTextMessage: { text: text, contextInfo: { mentionedJid: null, forwardingScore: 1, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363167110224268@newsletter', serverMessageId: '', newsletterName: `CuriosityBot` }, externalAdReply: { title: `CuriosityBot-MD 💫`, body: 'Zam', mediaType: 1, renderLargerThumbnail: false, previewType: `PHOTO`, thumbnailUrl: 'https://qu.ax/lFTW.jpeg', sourceUrl: 'https://github.com/AzamiJs/CuriosityBot-MD' }}}}, { quoted: m })
return client.relayMessage(jid, prep.message, { messageId: prep.key.id })
}

client.sendContextInfoIndex = async(jid, text = '', options, quoted) => {
let prep = generateWAMessageFromContent(jid, { extendedTextMessage: { text: text, contextInfo: { mentionedJid: null, forwardingScore: 1, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363167110224268@newsletter', serverMessageId: '', newsletterName: `CuriosityBot` }, externalAdReply: { title: `CuriosityBot-MD 💫`, body: 'Zam', mediaType: 1, renderLargerThumbnail: false, previewType: `PHOTO`, thumbnailUrl: 'https://qu.ax/lFTW.jpeg', sourceUrl: 'https://github.com/AzamiJs/CuriosityBot-MD' }}}}, { quoted: null })
return client.relayMessage(jid, prep.message, { messageId: prep.key.id })
}

client.reply = async(jid, text = '', quoted, options) => {
return Buffer.isBuffer(text) ? client.sendFile(jid, text, 'file', '', quoted, false, options) : client.sendMessage(jid, { ...options, text }, { quoted, ...options })
}

return m
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})
