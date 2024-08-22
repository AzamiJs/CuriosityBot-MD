 //Código elaborado por (https://github.com/AzamiJs)

const fs = require('fs')
const axios = require('axios')
const { exec, spawn, execSync } = require('child_process')
const speed = require('performance-now')
const chalk = require('chalk')
const yargs = require('yargs/yargs')
const _ = require('lodash')
const moment = require('moment')
const gradient = require('gradient-string')
const Jimp = require('jimp')
const path = require('path')
const fetch = require('node-fetch')
const { performance } = require('perf_hooks')
const osu = require('node-os-utils')
const PhoneNumber = require('awesome-phonenumber')
const yts = require('yt-search')
const ytdl = require('ytdl-core')
const FormData = require('form-data') 
const { youtubedl, youtubedlv2 } = require('@bochilteam/scraper');
const { WA_DEFAULT_EPHEMERAL, getAggregateVotesInPollMessage, generateWAMessageFromContent,  proto,  generateWAMessageContent, generateWAMessage,  prepareWAMessageMedia,  downloadContentFromMessage,  areJidsSameUser,  getContentType } = require('@whiskeysockets/baileys')
const {  smsg,  getGroupAdmins,  clockString,  sleep,  getBuffer,  fetchJson, isUrl } = require('./lib/func')
require('./store.js')

const msgs = (message) => {
return message.length >= 10 ? message.substring(0, 500) : message
}

module.exports = client = async (client, m, mesaages, store) => {
try {
const { type, quotedMsg, mentioned, now, fromMe } = m
var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.message.listResponseMessage && m.message.listResponseMessage.singleSelectReply.selectedRowId.startsWith('.') && m.message.listResponseMessage.singleSelectReply.selectedRowId) ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
var budy = (typeof m.text == 'string' ? m.text : '')
var prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : '' : prefa ?? global.prefix

const command = body.slice(prefix.length).trim().split(/\s+/)[0].toLowerCase()
const args = body.trim().split(/\s+/).slice(1)
const chatContent = (() => { 
const messageTypes = { 'conversation': m.message.conversation, 'imageMessage': m.message.imageMessage?.caption, 'documentMessage': m.message.documentMessage?.caption, 'videoMessage': m.message.videoMessage?.caption, 'extendedTextMessage': m.message.extendedTextMessage?.text, 'buttonsResponseMessage': m.message.buttonsResponseMessage?.selectedButtonId, 'templateButtonReplyMessage': m.message.templateButtonReplyMessage?.selectedId, 'listResponseMessage': m.message.listResponseMessage?.singleSelectReply?.selectedRowId, 'messageContextInfo': m.message.listResponseMessage?.singleSelectReply?.selectedRowId }; return messageTypes[m.mtype] || '' })()
const pushname = m.pushName || 'Sin nombre'
const text = args.join(' ')
const q = args.join(" ") 
const quoted = m.quoted || m
const mime = (quoted.msg || quoted).mimetype || ''
const isMedia = /image|video|sticker|audio/.test(mime)
const from = m.key.remoteJid
const isCreator = global.owner.some(([number]) => number.replace(/[^\d\s().+:]/g, '').replace(/\s/g, '') + '@s.whatsapp.net' === m.sender)
const isbot = await client.decodeJid(client.user.id)
const sender = m.isGroup ? (m.key.participant || m.participant) : m.key.remoteJid
const groupMetadata = m.isGroup ? await client.groupMetadata(from).catch(e => {}) : ''
const groupName = m.isGroup ? groupMetadata.subject : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
const isBotAdmins = m.isGroup ? groupAdmins.includes(isbot) : false
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const isAnti = true

const fkontak = { key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `6285600793871-1614953337@g.us` } : {}) }, message: { 'contactMessage': { 'displayName': `${pushname}`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': null, thumbnail: null,sendEphemeral: true}}}

//Base de datos
let user = global.db.data.users[m.sender]
let chats = global.db.data.chats[m.chat]

let isNumber = x => typeof x === 'number' && !isNaN(x)
if (typeof user !== 'object') global.db.data.users[m.sender] = {}
if (user) {
if (!('lenguaje' in user)) user.lenguaje = 'es'
if (!('registered' in user)) user.registered = false

if (!user.registered) {
if (!('name' in user)) user.name = m.name
if (!isNumber(user.age)) user.age = -1
if (!isNumber(user.regTime)) user.regTime = -1
}
if (!isNumber(user.limit)) user.limit = 20
if(!isNumber(user.premium)) user.premium = false
} else global.db.data.users[m.sender] = { limit: 20 }

if (typeof chats !== 'object') global.db.data.chats[m.chat] = {}
if (chats) {
if (!('welcome' in chats)) chats.welcome = true
if (!('antilink' in chats)) chats.antilink = true
if (!('antifake' in chats)) chats.antifake = false  
if (!('detect' in chats)) chats.detect = true 	
if (!('mute' in chats)) chats.mute = false
} else global.db.data.chats[m.chat] = {
welcome: true,
antilink: true,
antifake: false,
detect: true, 	
mute: false
}

global.mess = {
admin: 'Debes ser administrador para ejecutar esta función',
botAdmin: 'El bot debe ser administrador para ejecutar la función',
owner: 'Solo mi propietario puede hacer uso de este comando',
group: 'Esta función sólo funciona en chats grupales', 
private: 'Esta función sólo funciona en chats privados',
wait: '`Cargando...`'
}

const link = 'https://whatsapp.com/channel/0029VaB4w2ZFHWpwgyEe3w2k'
const fotos = 'https://qu.ax/lFTW.jpeg'
const Title = wm
const Body = 'Zam'

if (m.message) {
const fecha = chalk.bold.magentaBright(`\nFecha: ${chalk.whiteBright(moment().format('DD/MM/YY HH:mm:ss'))}`)
const mensaje = chalk.bold.greenBright(`\nMensaje: ${chalk.whiteBright(msgs(m.text))}`)
const usuario = chalk.bold.blueBright(`\nUsuario: ${chalk.yellowBright(pushname)}`)
const remitente = chalk.bold.redBright(`\nRemitente: ${gradient('deepskyblue', 'darkorchid')(sender)}`)
const grupo = m.isGroup ? chalk.bold.cyanBright(`\nGrupo: ${chalk.greenBright(groupName)}\nID: ${gradient('violet', 'midnightblue')(from)}`) : chalk.bold.redBright('\nChat privado\n')
console.log(`${fecha}${mensaje}${usuario}${remitente}${grupo}`)
}

if (m.mtype === 'interactiveResponseMessage') {   
let msg = m.message[m.mtype]  || m.msg
if (msg.nativeFlowResponseMessage && !m.isBot ) { 
let { id } = JSON.parse(msg.nativeFlowResponseMessage.paramsJson) || {}  
if (id) {
let emit = { 
key : { ...m.key } , 
message:{ extendedTextMessage : { text : id } } ,
pushName : m.pushName,
messageTimestamp  : m.messageTimestamp || 754785898978
}
return client.ev.emit('messages.upsert', { messages : [ emit ] ,  type : 'notify'})
}}}

if (global.db.data.chats[m.chat].antilink && groupMetadata) {
let linksProhibidos = {
'telegram': /telegram\.me|t\.me/gi,
'facebook': /facebook\.com/gi,
'whatsapp': /chat\.whatsapp\.com/gi,
'youtube': /youtu\.be|youtube\.com/gi
}
function vl(mensaje, tiposEnlaces) {
for (let tipo of tiposEnlaces) {
if (mensaje.match(linksProhibidos[tipo])) {
return true
}
}
return false
}
let EnlacesProhibidos = ['whatsapp', 'telegram']
if (vl(m.text, EnlacesProhibidos)) {
if (!isBotAdmins) return m.reply('El bot no es admin, no puede eliminar intrusos')
let gclink = (`https://chat.whatsapp.com/` + await client.groupInviteCode(m.chat))
let isLinkThisGc = new RegExp(gclink, 'i')
let isgclink = isLinkThisGc.test(m.text)
if (isgclink) return client.sendMessage(m.chat, { text: `El enlace pertenece a *${groupName}*` }, { quoted: m })
if (isAdmins) return client.sendMessage(m.chat, { text: 'No puedo eliminar un administrador' }, { quoted: m })
await client.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant } })
client.sendMessage(from, { text: `Anti Enlaces\n\n@${m.sender.split('@')[0]} mandaste un enlace prohibido`, contextInfo: { mentionedJid: [sender] } }, { quoted: m })
client.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}
}

if (global.db.data.chats[m.chat].antifake && !isAdmins) {
let forbidPrefixes = ['965', '966', '971', '974', '212', '213', '216', '44', '1', '62', '61', '64', '353', '33', '32', '41', '352', '377', '351', '244', '258', '91', '977', '880', '92', '94', '960', '7', '380', '375', '998', '996', '373', '374', '994', '992', '62', '49', '43', '39', '378', '379', '86', '886', '852', '853', '65', '850', '82', '93', '98', '48', '84', '856', '855', '254', '255', '256', '250', '257', '258', '252', '269', '243', '90', '998', '60', '222', '27', '265']
for (let prefix of forbidPrefixes) {
if (m.sender.startsWith(prefix)) {
await m.reply('*Anti Fakes* activo')
client.groupParticipantsUpdate(m.chat, [m.sender], 'remove')}}}
  
switch(prefix && command) {

case 'bypass': {
m.reply('`Comandos Fallando`\n\n- Imagen\n- Pinterest\n- Wallpaper\n- Wikipedia')
}
break

case 'traducir': 
case 'translate': 
case 'tr': {
const translate = require('@vitalets/google-translate-api')
let codesidioma = '🇲🇽 *Español:* es\n🏴 *Welsh:* cy\n🇻🇳 *Vietnamese:* vi\n🇹🇷 *Turkish:* tr\n🇹🇭 *Thai:* th\n🇰🇬 *Tamil:* ta\n🇸🇪 *Swedish:* sv\n🇰🇪 *Swahili:* sw\n🇸🇰 *Slovak:* sk\n🇷🇸 *Serbian:* sr\n🇷🇺 *Russian:* ru\n🇷🇴 *Romanian:* ro\n🇵🇹 *Portuguese:* pt\n🇵🇱 *Polish:* pl\n🇳🇴 *Norwegian:* no\n🇲🇰 *Macedonian:* mk\n🇱🇻 *Latvian:* lv\n🇻🇦 *Latin:* la\n🇰🇷 *Korean:* ko\n🇯🇵 *Japanese:* ja\n🇮🇹 *Italian:* it\n🇮🇩 *Indonesian:* id\n🇮🇸 *Icelandic:* is\n🇭🇺 *Hungarian:* hu\n🇮🇳 *Hindi:* hi\n🇭🇹 *Haitian Creole:* ht\n🇬🇷 *Greek:* el\n🇩🇪 *German:* de\n🇫🇷 *French:* fr\n🇫🇮 *Finnish:* fi\n🇨🇨 *Esperanto:* eo\n🇬🇧 *English:* en\n🇳🇱 *Dutch:* nl\n🇩🇰 *Danish:* da\n🇨🇿 *Czech:* cs\n🇭🇷 *Croatian:* hr\n🇨🇳 *Chinese:* zh\n🇲🇰 *Catalan:* ca\n🇦🇲 *Armenian:* hy\n🇦🇪 *Arabic:* ar\n🇦🇱 *Albanian:* sq\n🇿🇦 *Afrikaans:* af'

if (!args || !args[0]) {
return m.reply('Ingrese el *código* del idioma más el *texto* que desea traducir\n\n`Ejemplo`: .translate ru Hola, ¿cómo estás?')
}

let lang = args[0]
let text = args.slice(1).join(' ')
const defaultLang = 'es'

if ((args[0] || '').length !== 2) {
lang = defaultLang
text = args.join(' ')
m.reply('Se ha detectado que no has ingresado un *código* de *idioma* válido. Se usará el idioma predeterminado (Español).')

}

if (!text && m.quoted && m.quoted.text) text = m.quoted.text

try {
const result = await translate(`${text}`, {to: lang, autoCorrect: true})
await m.reply(`${result.text}`)
} catch {
try {
const lol = await fetch(`https://api.lolhuman.xyz/api/translate/auto/${lang}?apikey=${lolkey}&text=${text}`)
const loll = await lol.json()
const result2 = loll.result.translated
await m.reply(`${result2}`)
} catch (e) {
await m.reply('No se pudo realizar la traducción: ' + e)
}
}
}
break

case 'google': 
case 'googleit': {
const google = require('google-it')

if (!text) {
return m.reply(`Ingrese algo *relevante* de lo que desea obtener *información*\n\n\`Ejemplo\`: ${prefix + command} Noticias n+`)
}

google({ 'query': text }).then(res => {
let teks = `\t\t\t\t\t\t\t *‹* Google Search‘s *›*\n\n`
res.forEach((g, index) => {
teks += `\`${index + 1}\`\n\n`
teks += `*· Título:* ${g.title}\n`
teks += `*· Descripción:* ${g.snippet}\n`
teks += `*· Enlace:* ${g.link}\n\n`
})
client.sendMessage(m.chat, { video: { url: 'https://qu.ax/cPnS.mp4' }, gifPlayback: true, caption: teks }, { quoted: m })
}).catch(err => {
m.reply('Ha ocurrido un error al realizar la búsqueda: ' + err)
})
break
}

case 'hd':
case 'remini': 
case 'calidad': {
const FormData = require('form-data') 
const Jimp =  require('jimp')

let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''

if (!mime) {
return m.reply(`Responde a una *imagen* usando este mismo *comando* (${prefix + command})`)
}

if (!/image\/(jpe?g|png)/.test(mime)) {
return m.reply(`Tipo de *media* no válida`)
}

m.reply('`Cargando Imágen`') 
try {
let img = await q.download?.()
let pr = await remini(img, 'enhance')
client.sendMessage(m.chat, { image: pr, caption: `Calidad mejorada` }, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 })
} catch (e) {
return m.reply('Ha ocurrido un error al intentar mejorar la calidad de la imagen: ' + e) 
}
}
break

case 'ia':
case 'chatgpt': {
if (!text) {
return m.reply(`Ingrese lo que *desea* preguntar a *ChatGPT*\n\n\`Ejemplo\`: ${prefix + command} ¿Qué es la teología?`)
}

try {
client.sendPresenceUpdate('composing', from)
const res = await axios.get(`https://deliriusapi-official.vercel.app/ia/gptweb?text=${text}`)
await m.reply(res.data.gpt)
} catch (e) {
return m.reply('Ha ocurrido un error al solicitar su petición: ' + e)
}
}
break

case 'menu':
case 'help':
case 'allmenu': {
const texto = `Menu - Curiosity

┌  ◦ Información
│  ◦ ${prefix}sc
│  ◦ ${prefix}ping
│  ◦ ${prefix}speedtest
└  ◦ Información

┌  ◦ On Off
│  ◦ ${prefix}on
│  ◦ ${prefix}off
└  ◦ On Off

┌  ◦ Buscadores
│  ◦ ${prefix}google
│  ◦ ${prefix}ia
└  ◦ Buscadores

┌  ◦ Herramientas
│  ◦ ${prefix}hd
│  ◦ ${prefix}traducir
└  ◦ Herramientas

┌  ◦ Descargas
│  ◦ ${prefix}play
│  ◦ ${prefix}play audio
│  ◦ ${prefix}play video
│  ◦ ${prefix}play mp3doc
│  ◦ ${prefix}play mp4doc
│  ◦ ${prefix}gitclone
│  ◦ ${prefix}tiktok
│  ◦ ${prefix}facebook
│  ◦ ${prefix}instagram
│  ◦ ${prefix}slider
│  ◦ ${prefix}x
│  ◦ ${prefix}gdrive
└  ◦ Descargas

┌  ◦ Grupo
│  ◦ ${prefix}admins
│  ◦ ${prefix}grupo
│  ◦ ${prefix}demote
│  ◦ ${prefix}fantasmas
│  ◦ ${prefix}hidetag
│  ◦ ${prefix}kick
│  ◦ ${prefix}link
│  ◦ ${prefix}promote
│  ◦ ${prefix}tagall
└  ◦ Grupo

┌  ◦ Stickers
│  ◦ ${prefix}s
└  ◦ Stickers

┌  ◦ Propietario
│  ◦ ${prefix}update
│  ◦ ${prefix}restart
│  ◦ ${prefix}join
│  ◦ ${prefix}getcase 
│  ◦ ${prefix}addcase 
└  ◦ Propietario`
await client.sendMessage(m.chat, {text: texto, contextInfo: { forwardingScore: 999, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterName: 'CuriosityBot', newsletterJid: "120363167110224268@newsletter", }, externalAdReply: { title: `© CuriosityBot-MD`, body: '', thumbnailUrl: 'https://qu.ax/lFTW.jpeg', sourceUrl: 'https://github.com/AzamiJs', mediaType: 1, renderLargerThumbnail: true }}}, {quoted: fkontak})
}
break

case 'ping': {
const girastamp = speed()
const latensi = speed() - girastamp
const _muptime = process.uptime() * 1000
const muptime = clockString(_muptime)
m.reply(`Tiempo de respuesta *${latensi.toFixed(4)}*\n\nTiempo de actividad *${muptime}*`)
}
break

case 'sc': case 'script': case 'git': {
try {
let res = await fetch('https://api.github.com/repos/AzamiJs/CuriosityBot-MD')
let json = await res.json()
let git = `*乂  Bot  -  Script*\n\n· *Nombre*: ${json.name}\n· *Visitantes*: ${json.watchers_count}\n· *Peso*: ${(json.size / 1024).toFixed(2)} MB\n· *Actualizado*: ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}\n· *Url* : ${json.html_url}\n\n	   ${json.forks_count} Forks · ${json.stargazers_count} Stars · ${json.open_issues_count} Issues`
await client.sendMessage(m.chat, {text: git, contextInfo: { forwardingScore: 999, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterName: 'CuriosityBot', newsletterJid: "120363167110224268@newsletter", }, externalAdReply: { title: `© CuriosityBot-MD`, body: '', thumbnailUrl: 'https://qu.ax/lFTW.jpeg', sourceUrl: 'https://github.com/AzamiJs', mediaType: 1, renderLargerThumbnail: true }}}, {quoted: fkontak})
} catch (e) {
m.reply(e)
}
}
break

case 'speedtest': case 'speed': {
const cp = require('child_process') 
const {promisify} = require('util') 
const exec = promisify(cp.exec).bind(cp)
let o
m.reply('> Cargando... 🚀🚀🚀')
try {
o = await exec('python3 speed.py --secure --share')
const {stdout, stderr} = o;
if (stdout.trim()) {
const match = stdout.match(/http[^"]+\.png/)
const urlImagen = match ? match[0] : null
await client.sendMessage(m.chat, {image: {url: urlImagen}, caption: stdout.trim()}, {quoted: m})}
if (stderr.trim()) { 
const match2 = stderr.match(/http[^"]+\.png/)
const urlImagen2 = match2 ? match2[0] : null 
await client.sendMessage(m.chat, {image: {url: urlImagen2}, caption: stderr.trim()}, {quoted: m})
}} catch (e) {
o = e.message
return m.reply(o)
console.log(e)}}
break 

case 'on':
case 'off': {
if (!m.isGroup) {
return m.reply(mess.group)
}
if (!isBotAdmins) {
return m.reply(mess.botAdmin)
}
if (!isAdmins) {
return m.reply(mess.admin)
}

if (!text) {
let txt = 'Seleccione una de las siguientes *configuraciones*'
let listSections = []    
listSections.push({
title: '',
rows: [
{ header: '', title: '🟢| Activar Antilink', id: `.on antilink`, description: `` }, 
{ header: '', title: '🔴| Desactivar Antilink', id: `.off antilink`, description: `` },
{ header: '', title: '🟢| Activar Antifake', id: `.on antifake`, description: `` }, 
{ header: '', title: '🔴| Desactivar Antifake', id: `.off antifake`, description: `` },
{ header: '', title: '🟢| Activar Welcome', id: `.on welcome`, description: `` }, 
{ header: '', title: '🔴| Desactivar Welcome', id: `.off welcome`, description: `` }
]})

await client.sendList(m.chat, txt, null, `Configuraciones`, listSections, { mentions: [sender]}, { quoted: fkontak })
return
}

let setting = text.trim().toLowerCase()

switch (setting) {
case 'antilink':
if (command === 'on') {
if (db.data.chats[m.chat].antilink) {
return m.reply('La función *Antilink* ya está *activada*')
}
db.data.chats[m.chat].antilink = true
m.reply('La función *Antilink* fue *activada*')
} else if (command === 'off') {
if (!db.data.chats[m.chat].antilink) {
return m.reply('La función *Antilink* ya está *desactivada*')
}
db.data.chats[m.chat].antilink = false
m.reply('La función *Antilink* fue *desactivada*')
break
}

case 'antifake':
if (command === 'on') {
if (db.data.chats[m.chat].antifake) {
return m.reply('La función *Antifake* ya está *activada*')
}
db.data.chats[m.chat].antifake = true
m.reply('La función *Antifake* fue *activada*')
} else if (command === 'off') {
if (!db.data.chats[m.chat].antifake) {
return m.reply('La función *Antifake* ya está *desactivada*')
}
db.data.chats[m.chat].antifake = false
m.reply('La función *Antifake* ya está *desactivada*')
break
}

case 'welcome':
if (command === 'on') {
if (db.data.chats[m.chat].welcome) {
return m.reply('El *mensaje* de bienvenida ya está *activado*')
}
db.data.chats[m.chat].welcome = true
m.reply('*Mensaje* de bienvenida *activado*')
} else if (command === 'off') {
if (!db.data.chats[m.chat].welcome) {
return m.reply('El *mensaje* de bienvenida ya está *desactivado*')
}
db.data.chats[m.chat].welcome = false
m.reply('*Mensaje* de bienvenida *desactivado*')
break
}

default:
m.reply('Elije una opción correcta: `antilink`, `antifake`, `welcome`\n\n- .on welcome\n- .off welcome')
break
}
}
break

case 'play': {
const { youtubedl, youtubedlv2 } = require('@bochilteam/scraper')
const yts = require('yt-search')
const ytdl = require('ytdl-core')

if (!text) {
return m.reply('*Ingrese el título de un vídeo junto al tipo de media que desea recibir*\n\nEjemplo: `!play audio Those Eyes`\n\n> Tipos de media: `audio`, `video`, `mp3doc`, `mp4doc`')
}

const parts = text.split(' ')
const selection = parts.shift().toLowerCase()
const query = parts.join(' ')

try {
if (query.length === 0) {
return m.reply('Parece faltar el título del vídeo')
}
m.reply(mess.wait)
var search = await yts(query)
var videos = search.videos

if (videos.length === 0) {
return m.reply('No se encontraron videos para el término de búsqueda proporcionado')
}
const video = videos[0]
const url = video.url
let dl_url, mimeType, videoUrl

switch (selection) {
case 'audio': {
let c = '360' + 'p'
const audiodl = await youtubedl(url).catch(async _ => await youtubedlv2(url))
audioUrl = await audiodl.video[c].download()
const ytMsg = `\`YouTube - ${query}\`\n\nTítulo: *${video.title}*\nVistas: *${video.views}*\nDuración: *${video.timestamp}*\nEnlace: ${url}\nDescripción: ${video.description}\n\n> Enviando ${selection}`
await client.sendMessage(m.chat, { image: { url: `${video.thumbnail}` }, caption: ytMsg }, { quoted: m })
await client.sendMessage(m.chat, { audio: { url: audioUrl }, mimetype: 'audio/mpeg' }, { quoted: m })
break
}
case 'video': {
const videodl = await youtubedl(url).catch(async _ => await youtubedlv2(url))
videoUrl = await videodl.video['360p'].download()
const ytMsg = `\`YouTube - ${query}\`\n\nTítulo: *${video.title}*\nVistas: *${video.views}*\nDuración: *${video.timestamp}*\nEnlace: ${url}\nDescripción: ${video.description}\n\n> Enviando ${selection}`
await client.sendMessage(m.chat, { image: { url: `${video.thumbnail}` }, caption: ytMsg }, { quoted: m })
await client.sendMessage(m.chat, { video: { url: videoUrl }, caption: '`Video de YouTube`' }, { quoted: m })
break
}
case 'mp3doc': {
const mp3dl = await youtubedl(url).catch(async _ => await youtubedlv2(url))
mp3Url = await mp3dl.video['360p'].download()
const ytMsg = `\`YouTube - ${query}\`\n\nTítulo: *${video.title}*\nVistas: *${video.views}*\nDuración: *${video.timestamp}*\nEnlace: ${url}\nDescripción: ${video.description}\n\n> Enviando ${selection}`
await client.sendMessage(m.chat, { image: { url: `${video.thumbnail}` }, caption: ytMsg }, { quoted: m })
await client.sendMessage(m.chat, { document: {url: mp3Url}, mimetype: 'audio/mpeg', fileName: `${query}.mp3`}, {quoted: m})
break
}
case 'mp4doc': {
const mp4dl = await youtubedl(url).catch(async _ => await youtubedlv2(url))
mp4Url = await mp4dl.video['360p'].download()
const ytMsg = `\`YouTube - ${query}\`\n\nTítulo: *${video.title}*\nVistas: *${video.views}*\nDuración: *${video.timestamp}*\nEnlace: ${url}\nDescripción: ${video.description}\n\n> Enviando ${selection}`
await client.sendMessage(m.chat, { image: { url: `${video.thumbnail}` }, caption: ytMsg }, { quoted: m })
await client.sendMessage(m.chat, { document: {url: mp4Url}, mimetype: 'video/mp4', fileName: `${query}.mp4`}, {quoted: m})
break
}
default:
return m.reply('Tipo de media no válido. Usa `audio`, `video`, `mp3doc` o `mp4doc`.\n\n- .play audio Cardigan')
}

} catch (e) {
m.reply('Ocurrió un error al procesar su solicitud: ' + e)
console.error(e)
}
}
break

case 'gitclone': {
const fetch = require('node-fetch')

if (!args[0]) {
return m.reply('Ingrese el enlace de un *repositorio* de *GitHub*\n\n`Ejemplo`: .gitclone https://github.com/AzamiJs/CuriosityBot-MD')
}
if (!args[0].includes('github.com')) {
return m.reply('Enlace no válido. Compruebe el enlace')
}

m.reply(mess.wait)

try {
let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let [, user, repo] = args[0].match(regex1) || []
repo = repo.replace(/.git$/, '')
let urlGit = `https://api.github.com/repos/${user}/${repo}/zipball`
let filename = (await fetch(urlGit, { method: 'HEAD' })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
client.sendMessage(m.chat, { document: { url: urlGit }, fileName: filename+'.zip', mimetype: 'application/zip' }, { quoted: m }).catch((err) => m.reply('Ha ocurrido un error al intentar descargar sus archivos: ' + err))
} catch (e) {
return m.reply('Ha ocurrido un error al intentar descargar sus archivos: ' + e) 
}
}
break

case 'tiktok': {
if (!text) {
return m.reply('Ingrese un *enlace* de vídeo de *TikTok*\n\n`Ejemplo`: .tiktok https://vm.tiktok.com/ZMrWSMM8r')
}
if (!text.includes('tiktok')) {
return m.reply('Enlace no válido. Compruebe la autenticidad del enlace')
}
try {
const tiktokData = await tiktokdl(text)
const txt = `*· Título:* ${tiktokData.data.title || 'Sin título'}
*· Subido:* ${tiktokData.data.create_time}

E S T A D O
*· Me gusta* – ${tiktokData.data.digg_count}
*· Comentarios* – ${tiktokData.data.comment_count}
*· Compartidas* – ${tiktokData.data.share_count}
*· Vistas* – ${tiktokData.data.play_count}
*· Descargas* – ${tiktokData.data.download_count}

*· Nombre:* ${tiktokData.data.author.nickname || 'Sin información del autor'}
\`${tiktokData.data.author.unique_id}\` - https://www.tiktok.com/@${tiktokData.data.author.unique_id}
*· Sonido:* ${tiktokData.data.music}\n`

const videoURL = tiktokData.data.play
client.sendMessage(m.chat, { caption: txt, video: { url: videoURL } }, { quoted: m })
} catch (e) {
m.reply('Error ' + e)
}
}
break

case 'facebook': 
case 'fb': {
const fetch = require('node-fetch')

if (!text) {
return m.reply('Ingrese un enlace de un *reel* de *Facebook*\n\n`Ejemplo`: .fb https://www.facebook.com/share/r/GB9op9yMyNUmFVH2/?mibextid=V2iOCx')
}

if (!text.includes('facebook')) {
return m.reply('Enlace no válido. Compruebe el enlace')
}

m.reply(mess.wait)

try {
const data = await fetch(`https://lolhuman.xyz/api/facebook?apikey=${lolkey}&url=${text}`)
let video = await data.json()
let buff = await video.result[0]

const caption = `Video de Facebook`

await client.sendMessage(m.chat, { video: { url: buff }, mimetype: 'video/mp4', fileName: `video.mp4`, caption: caption, mentions: [m.sender], }, { quoted: m })

} catch (e) {
m.reply('Ha ocurrido un error al descargar su video: ' + e)
}
}
break

case 'instagram':
case 'ig': {
const fetch = require('node-fetch')

if (!text) {
return m.reply('Ingrese un enlace de un *reel* de *Instagram*\n\n`Ejemplo`: .ig https://www.instagram.com/reel/C8Z0mgHuD4d/?igsh=bzE0bGo0eHRxd2dx')
}

if (!text.includes('instagram')) {
return m.reply('Enlace no válido. Compruebe el enlace')
}

m.reply(mess.wait)

try {
const data = await fetch(`https://lolhuman.xyz/api/instagram?apikey=${lolkey}&url=${text}`)
let video = await data.json()
let buff = await video.result[0]

const caption = `Instagram 🍃`

await client.sendMessage(m.chat, { video: { url: buff }, mimetype: 'video/mp4', fileName: `video.mp4`, caption: caption, mentions: [m.sender], }, { quoted: m })

} catch (e) {
m.reply('Ha ocurrido un error al descargar su solicitud: ' + e)
}
}
break

case 'twiter':
case 'tw':
case 'x': {
const fg = require('api-dylux')

if (!text) {
return m.reply('Ingrese un *enlace* de *X*\n\n`Ejemplo`: .x https://twitter.com/fernandavasro/status/1569741835555291139?t=ADxk8P3Z3prq8USIZUqXCg&s=19') 
}
      
try {
let { SD, HD, desc, thumb, audio } = await fg.twitter(text)
await client.sendMessage(m.chat, { video: { url: HD }, caption: `${desc}`}, { quoted: m })
} catch (e) {
m.reply('Ha ocurrido un error al descargar su video de x: ' + e) 
console.log(e)
}
}
break

case 'tiktokimg':
case 'slider':
case 'ttimg': {
const fetch = require('node-fetch')

if (!text) {
return m.reply('Ingrese un enlace de *tiktok* que contenga *imágenes*\n\n`Ejemplo`: .slider https://vm.tiktok.com/ZMr7dg1co/')
}

if (!(text.includes('http://') || text.includes('https://'))) {
return m.reply(`Este enlace no contiene *http://* ni *https://*`)
}

if (!text.includes('tiktok.com')) {
return m.reply(`El enlace no es válido. Compruebe la autenticidad del enlace`)
}

m.reply(mess.wait)

try {
let res = await fetch(`https://api.lolhuman.xyz/api/tiktokslide?apikey=${lolkey}&url=${text}`)
let anu = await res.json()
if (anu.status != '200') throw Error(anu.message)
anu = anu.result
if (anu.length == 0) throw Error('Error: no data')

let c = 0
for (let x of anu) {
if (m.isGroup) {
if (c == 0) {
await client.sendMessage(m.chat, { image: { url: x }, caption: `*Se ha enviado 1 de ${anu.length} imágenes*\n_El resto se enviará al privado_` }, { quoted: m })
} else {
await client.sendMessage(m.sender, { image: { url: x } })
}
} else {
await client.sendMessage(m.chat, { image: { url: x } })
}
c += 1
}
} catch (e) {
console.log(e)
return m.reply(`Ha ocurrido un error al descargar sus imágenes: ` + e)
}

}
break

case 'gdrive':
case 'drive': {
const fg = require('api-dylux')

if (!text) {
return m.reply('Ingrese un *enlace* de *Drive*\n\n`Ejemplo`: .drive https://drive.google.com/file/d/1dmHlx1WTbH5yZoNa_ln325q5dxLn1QHU/view')
}

if (!text.includes('drive')) {
return m.reply('El enlace no es válido. Compruebe el enlace')
}

try {
let res = await fg.GDriveDl(text)
client.sendMessage(m.chat, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, { quoted: m })
} catch (e) {
m.reply('Ha ocurrido un error al descargar su documento: ' + e)
}
}
break

case 'admins': 
case 'admin': {
if (!m.isGroup) {
return m.reply(mess.group)
}

if (!text) {
return m.reply('Ingrese su *motivo* por el cual desea la presencia de *admins*')
}
if (text.length < 10) {
return m.reply('Parece un motivo corto')
}

const pp = await client.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://qu.ax/OEgX.jpg'
const groupAdmins = participants.filter(p => p.admin)
const listaAdmins = groupAdmins.map((v, i) => `\`${i + 1}\` @${v.id.split('@')[0]}`).join('\n')
const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'

let mensaje = args.join` `
let yo = `Mensaje: ${text}`
let texto = `${yo}

⚠️ Staff del grupo ⚠️
${listaAdmins}`.trim()
client.sendMessage(m.chat, { image: { url: pp }, caption: texto, mentions: [...groupAdmins.map(v => v.id), owner]}, { quoted: m })
}
break

case 'grupo':
case 'group': 
case 'settings': {
if (!m.isGroup) {
return m.reply(mess.group)
}

if (!isBotAdmins) {
return m.reply(mess.botAdmin)
}

if (!isAdmins) {
return m.reply(mess.admin)
}

const isClose = { 'open': 'not_announcement', 'close': 'announcement', 'abierto': 'not_announcement', 'cerrado': 'announcement', 'abrir': 'not_announcement', 'cerrar': 'announcement', 'desbloquear': 'unlocked', 'bloquear': 'locked' }[(args[0] || '')]
if (isClose === undefined) { 
return m.reply('*Seleccione una opción para configurar el grupo*\n\n`Ejemplo`:\n○ !grupo abrir\n○ !grupo cerrar\n○ !grupo bloquear\n○ !grupo desbloquear')
}
await client.groupSettingUpdate(m.chat, isClose)
{ m.reply('> Grupo configurado correctamente') }
}
break

case 'demote': 
case 'degradar': 
case 'quitaradmin': {
if (!m.isGroup) {
return m.reply(mess.group)
}

if (!isBotAdmins) {
return m.reply(mess.botAdmin)
}

if (!isAdmins) {
return m.reply(mess.admin)
}

if (isNaN(text) && !text.match(/@/g)){
} else if (isNaN(text)) {
var number = text.split`@`[1]
} else if (!isNaN(text)) {
var number = text
}
if (!text && !m.quoted) {
return m.reply('Etiquete al *administrador* que desea *degradar*')
}
if (number.length > 13 || (number.length < 11 && number.length > 0)) {
return m.reply('Número proporcionado incorrecto')
}
try {
if (text) {
var User = number + '@s.whatsapp.net'
} else if (m.quoted.sender) {
var User = m.quoted.sender
} else if (m.mentionedJid) {
var User = number + '@s.whatsapp.net'
} 
} catch (e) {
} finally {
client.groupParticipantsUpdate(m.chat, [User], 'demote')
m.reply('> Degradado con éxito')
}
}
break

case 'fantasmas': {
const { areJidsSameUser } = require('@whiskeysockets/baileys')

if (!m.isGroup) {
return m.reply(mess.group)
}

if (!isAdmins) {
return m.reply(mess.admin)
}

let member = participants.map(u => u.id)
if (!text) {
var sum = member.length
} else {
var sum = text} 
var total = 0
var sider = []
for (let i = 0; i < sum; i++) {
let users = m.isGroup ? participants.find(u => u.id == member[i]) : {}
if ((typeof global.db.data.users[member[i]] == 'undefined' || global.db.data.users[member[i]].chat == 0) && !users.isAdmin && !users.isSuperAdmin) { 
if (typeof global.db.data.users[member[i]] !== 'undefined'){
if (global.db.data.users[member[i]].whitelist == false){
total++
sider.push(member[i])}
} else {
total++
sider.push(member[i])}}}

if (total == 0) {
return m.reply('Este grupo es activo')
}
client.sendMessage(m.chat, { text: `Lista de inactivos\n${sider.map(v => '· @' + v.replace(/@.+/, '')).join('\n')}`, mentions: sider }) 
}
break

case 'hidetag':
case 'notificar':
case 'tag': {
if (!m.isGroup) {
return m.reply(mess.group)
}

if (!isBotAdmins) {
return m.reply(mess.botAdmin)
}

if (!isAdmins) {
return m.reply(mess.admin)
}

if (!m.quoted && !text) {
return m.reply('Ingrese o responda a un *texto* para continuar')
}
try { 
client.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: participants.map(a => a.id) })
} catch {  
client.sendMessage(m.chat, { text : text ? text : '' , mentions: participants.map(a => a.id)}, { quoted: null, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}
}
break

case 'kick':
case 'kill': 
case 'matar': 
case 'sacar': {
if (!m.isGroup) {
return m.reply(mess.group)
}

if (!isBotAdmins) {
return m.reply(mess.botAdmin)
}

if (!isAdmins) {
return m.reply(mess.admin)
}

if (!m.mentionedJid[0] && !m.quoted) {
return m.reply('Etiqueta o responde al mensaje de la *persona* que quieres *eliminar*')
}

let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender

const groupInfo = await client.groupMetadata(m.chat)
const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net'
const ownerBot = global.owner[0][0] + '@s.whatsapp.net'

if (user === client.user.jid) {
return m.reply('No puedo eliminar el *bot* del grupo')
}

if (user === ownerGroup) {
return m.reply('No puedo eliminar al *propietario* del grupo')
}

if (user === ownerBot) {
return m.reply('No puedo eliminar al *propietario* del bot')
}

await client.groupParticipantsUpdate(m.chat, [user], 'remove')
}
break

case 'link':
case 'enlace': {
if (!m.isGroup) {
return m.reply(mess.group)
}

if (!isBotAdmins) {
return m.reply(mess.botAdmin)
}
let group = m.chat
let linkk = 'https://chat.whatsapp.com/' + await client.groupInviteCode(group)
client.sendMessage(m.chat, {text: '🚩\v' + linkk }, {quoted: m }, { detectLink: true })
}
break

case 'promote': 
case 'promover': 
case 'daradmin': {
if (!m.isGroup) {
return m.reply(mess.group)
}

if (!isBotAdmins) {
return m.reply(mess.botAdmin)
}

if (!isAdmins) {
return m.reply(mess.admin)
}

if (isNaN(text) && !text.match(/@/g)){
} else if (isNaN(text)) {
var number = text.split`@`[1]
} else if (!isNaN(text)) {
var number = text
}
if (!text && !m.quoted) {
return m.reply('Etiquete al *usuario* que desea *promover*')
}
if (number.length > 13 || (number.length < 11 && number.length > 0)) {
return m.reply('Número proporcionado incorrecto')
}
try {
if (text) {
var User = number + '@s.whatsapp.net'
} else if (m.quoted.sender) {
var User = m.quoted.sender
} else if (m.mentionedJid) {
var User = number + '@s.whatsapp.net'
} 
} catch (e) {
} finally {
client.groupParticipantsUpdate(m.chat, [User], 'promote')
m.reply('> Usuario promovido con éxito')
}
}
break

case 'tagall': {
if (!m.isGroup) {
return m.reply(mess.group)
}

if (!isBotAdmins) {
return m.reply(mess.botAdmin)
}

if (!isAdmins) {
return m.reply(mess.admin)
}

let teks = `🚩 *Cluster - TagAll*\n\n`
teks += `Mensaje: ${q ? q : `Sin mensaje`}\n\n`
for (let mem of participants) {
teks += `- @${mem.id.split('@')[0]}\n`
}
client.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
}
break 
		
case 'yts':
case 'ytsearch': {
if (!text) {
return m.reply('Ingrese el *título* de un *vídeo*\n\n`Ejemplo`: .yts CuriosityBot-MD')
}

let ress = await yts(`${text}`)
let armar = ress.all
const Ibuff = await getBuffer(armar[0].image)
let teks2 = armar.map(v => {
switch (v.type) {
case 'video': return `
Título: *${v.title}* 
Duración: ${v.timestamp}
Subido: ${v.ago}
Vistas: ${v.views}
Url: ${v.url}
`.trim()
case 'channel': return `
Canal: *${v.name}*
Url: ${v.url}
Subscriptores: ${v.subCountLabel} (${v.subCount})
Videos totales: ${v.videoCount}
`.trim()
}
}).filter(v => v).join('\n----------------------------------------\n')
client.sendMessage(m.chat, { image: Ibuff, caption: teks2 }, { quoted: m })
.catch((err) => {
m.reply('Error')
})
}
break

case 'getcase': {
if (!isCreator) {
return m.reply(mess.owner)
}
	
if (!text) {
return m.reply('Ingrese el *comando* que desea obtener *código*\n\n`Ejemplo`: .getcase play')
}

try {
bbreak = 'break'
m.reply('case ' + `'${args[0]}'` + fs.readFileSync('./curiosity.js').toString().split(`case '${args[0]}'`)[1].split(bbreak)[0] + bbreak)
} catch (e) { 
m.reply('Ha ocurrido un error al obtener el código: ' + e)
} 
}
break

case 'addcase': {
if (!isCreator) {
return m.reply(mess.owner)
}
	
if (!text) {
return m.reply('Ingrese el *código* que desea agregar como *comando*')
}

try {
const addcase =[fs.readFileSync('curiosity.js', 'utf8').slice(0, fs.readFileSync('curiosity.js', 'utf8').lastIndexOf('break') + 5), q, fs.readFileSync('curiosity.js', 'utf8').slice(fs.readFileSync('curiosity.js', 'utf8').lastIndexOf('break') + 5)].join('\n')
fs.writeFileSync('curiosity.js', addcase)
m.reply(`Comando:\n${text}\nAgregado con éxito.`) 
} catch (e) {
return m.reply('Ha ocurrido un error al agregar su comando: ' + e)
}
}
break

case 'join': 
case 'unete': {
const linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
const link = m.quoted?.text ?? text
const [_, code] = link.match(linkRegex) || []

if (!code) {
return m.reply('Ingresa el *enlace* del grupo que debo unirme')
}
if (isCreator || m.fromMe) {
try {
const result = await client.groupAcceptInvite(code)
m.reply('Me uni con éxito')
} catch (e) {
m.reply('Ha ocurrido un error al intentar unirme al grupo: ' + e)
}
}
}
break

case 'update':
case 'actualizar':
case 'gitpull':
if (!isCreator) {
return m.reply(mess.owner)
}

try {
const stdout = execSync('git pull' + (m.fromMe && q ? ' ' + q : ''))
let message = stdout.toString()
if (message.includes('Already up to date.')) message = 'Todo actualizado'
if (message.includes('Updating')) message = 'Actualización completada\n\n' + stdout.toString()
m.reply(message)
} catch (e) {
try {
const status = execSync('git status --porcelain')
if (status.length > 0) {
const conflictedFiles = status.toString().split('\n').filter(line => line.trim() !== '').map(line => {
if (line.includes('.npm/') || line.includes('.cache/') || line.includes('tmp/') || line.includes('session/') || line.includes('npm-debug.log')) {
return null
}
return '*→ ' + line.slice(3) + '*'
}).filter(Boolean)
if (conflictedFiles.length > 0) {
const errorMessage = `Se han detectado cambios locales en archivos del bot que entran en conflicto con las actualizaciones del repositorio. Para actualizar, reinstala el bot o realiza las actualizaciones manualmente\n\nArchivos en conflicto:\n\n${conflictedFiles.join('\n')}`
await m.reply(errorMessage)
}
}
} catch (error) {
console.error(error)
let errorMessage2 = 'Ha ocurrido un error'
if (error.message) {
errorMessage2 += '\nMensaje de error: ' + error.message
}
await m.reply(errorMessage2)
}
}
break

case 's': case 'sticker': {
const d = new Date(new Date + 3600000)
const locale = 'es-ES'
const dias = d.toLocaleDateString(locale, {weekday: 'long'})
const fecha = d.toLocaleDateString(locale, {day: '2-digit', month: '2-digit', year: 'numeric'})

let sticker2 = `${wm}\nAutor:\nFecha:\nDía:\nCreador:`
let sticker3 = `${vs}\n${pushname}\n${fecha}\n${dias}\nZam`

if (/image/.test(mime)) {
media = await quoted.download()  
let encmedia = await client.sendImageAsSticker(m.chat, media, m, { packname: sticker2, author: sticker3, contextInfo: {forwardingScore: 9999999, isForwarded: true, externalAdReply:{ showAdAttribution: false, title: wm, mediaType: 2, sourceUrl: 'https://github.com/AzamiJs', thumbnailUrl: 'https://qu.ax/lFTW.jpeg'}}})
await fs.unlinkSync(encmedia)  
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 20) {
return m.reply('El video no puede ser muy largo')
}
media = await quoted.download()

let encmedia = await client.sendVideoAsSticker(m.chat, media, m, { packname: sticker2, author: sticker3, contextInfo: {forwardingScore: 9999999, isForwarded: true, externalAdReply:{ showAdAttribution: false, title: wm, mediaType: 2, sourceUrl: 'https://github.com/AzamiJs', thumbnailUrl: 'https://qu.ax/lFTW.jpeg'}}})
await new Promise((resolve) => setTimeout(resolve, 2000))
await fs.unlinkSync(encmedia)  
} else {
m.reply('Responda a una *imagen* o *video*')
}
}
break

function ucapan() {
const time = moment.tz('America/Mexico_City').format('HH')
if (time >= 17) {
return 'Buenas noches'
} else if (time >= 15) {
return 'Buenas tardes'
} else if (time >= 11) {
return 'Buenas tardes'
} else if (time >= 4) {
return 'Buenos días'
} else {
return 'Buenas madrugadas'
}
}

async function GDriveDl(url) {
let id
if (!(url && url.match(/drive\.google/i))) throw 'Invalid URL'
id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1]
if (!id) throw 'ID Not Found'
const res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
method: 'post',
headers: {
'accept-encoding': 'gzip, deflate, br',
'content-length': 0,
'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
'origin': 'https://drive.google.com',
'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
'x-drive-first-party': 'DriveWebUi',
'x-json-requested': 'true'}})
const { fileName, sizeBytes, downloadUrl } = JSON.parse((await res.text()).slice(4))
if (!downloadUrl) throw 'Link Download Limit!'
const data = await fetch(downloadUrl)
if (data.status !== 200) throw data.statusText
return {downloadUrl, fileName, fileSize: formatSize(sizeBytes), mimetype: data.headers.get('content-type')}
}
		
async function remini(imageData, operation) {
return new Promise(async (resolve, reject) => {
const availableOperations = ['enhance', 'recolor', 'dehaze']
if (availableOperations.includes(operation)) {
operation = operation
} else {
operation = availableOperations[0]
}
const baseUrl = 'https://inferenceengine.vyro.ai/' + operation + '.vyro'
const formData = new FormData()
formData.append('image', Buffer.from(imageData), {filename: 'enhance_image_body.jpg', contentType: 'image/jpeg'})
formData.append('model_version', 1, {'Content-Transfer-Encoding': 'binary', contentType: 'multipart/form-data; charset=utf-8'})
formData.submit({url: baseUrl, host: 'inferenceengine.vyro.ai', path: '/' + operation, protocol: 'https:', headers: {'User-Agent': 'okhttp/4.9.3', Connection: 'Keep-Alive', 'Accept-Encoding': 'gzip'}},
function (err, res) {
if (err) reject(err)
const chunks = []
res.on('data', function (chunk) {chunks.push(chunk)})
res.on('end', function () {resolve(Buffer.concat(chunks))})
res.on('error', function (err) {
reject(err)
})},)})}

async function tiktokdl(url) {
let tikwm = `https://www.tikwm.com/api/?url=${url}?hd=1`
let response = await (await fetch(tikwm)).json()
return response
}
		
default:
     
if (budy.startsWith('_')) {
if (!isCreator) return
try {
return m.reply(JSON.stringify(eval(budy.slice(2)), null, '\t'))
} catch (e) {
e = String(e)
m.reply(e)
}}
if (budy.startsWith('-')) {
if (!isCreator) return
try {
return m.reply(JSON.stringify(eval(`(async () => { ${budy.slice(3)} })()`), null, '\t'))  //gata.sendMessage(from, JSON.stringify(eval(`(async () => { ${budy.slice(3)} })()`), null, '\t'), text, { quoted: msg })
} catch (e) {
e = String(e)
m.reply(e)
}}
		
}
} catch (zam) {
console.log(zam)
}}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.greenBright(`\n\nSe actualizo el archivo ${__filename}`))
delete require.cache[file]
require(file)
})
