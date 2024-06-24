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
const { youtubedl, youtubedlv2 } = require('@bochilteam/scraper')
const { WA_DEFAULT_EPHEMERAL, getAggregateVotesInPollMessage, generateWAMessageFromContent,  proto,  generateWAMessageContent, generateWAMessage,  prepareWAMessageMedia,  downloadContentFromMessage,  areJidsSameUser,  getContentType } = require('@whiskeysockets/baileys')
const {  smsg,  getGroupAdmins,  clockString,  sleep,  getBuffer,  fetchJson, isUrl } = require('./lib/simple')
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
if (!('antilink' in chats)) chats.antilink = true
if (!('antifake' in chats)) chats.antifake = false  
if (!('detect' in chats)) chats.detect = true 	
if (!('mute' in chats)) chats.mute = false
} else global.db.data.chats[m.chat] = {
antilink: true,
antifake: false,
detect: true, 	
mute: false
}
  
//Lenguaje
let lang = global.db.data.users[m.sender]?.lenguaje || 'es'
const L = JSON.parse(fs.readFileSync(`./lib/idiomas/${lang}.json`))
const {
config: { anti_link: nLnk, anti_fake: aFk }, 
ai: { gemini, ia }, 
info: { menu, allmenu, ping, status, report, script }, 
dl: { play, play2, play3, gitclone: clone, tiktok, facebook },
group: { admins, settings, demote, fantasmas, hidetag, infogroup, kick, promote, tagall },
owner: { update: upd, join, restart }, 
rpg: { reg }, setup,
on_off: { antilink, antifake },
tools: { traducir, google },
stickers: { sticker }
} = L

global.mess = {
success: setup.text1, admin: setup.text2,
botAdmin: setup.text3, owner: setup.text4,
group: setup.text5, private: setup.text6,
bot: setup.text7, error: setup.text8,
wait: setup.text9, premium: setup.text10
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

if (global.db.data.chats[m.chat].antilink && global.db.data.users[m.sender].lenguaje && groupMetadata) {
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
if (!isBotAdmins) return m.reply(nLnk.text6)
let gclink = (`https://chat.whatsapp.com/` + await client.groupInviteCode(m.chat))
let isLinkThisGc = new RegExp(gclink, 'i')
let isgclink = isLinkThisGc.test(m.text)
if (isgclink) return client.sendMessage(m.chat, { text: nLnk.text1 + ` *${groupName}*` }, { quoted: m })
if (isAdmins) return client.sendMessage(m.chat, { text: nLnk.text2 }, { quoted: m })
if (isCreator) return client.sendMessage(m.chat, { text: nLnk.text3 }, { quoted: m })
await client.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant } })
client.sendMessage(from, { text: `${nLnk.text4}\n\n@${m.sender.split('@')[0]} ${nLnk.text5}`, contextInfo: { mentionedJid: [sender] } }, { quoted: m })
}
}

if (global.db.data.chats[m.chat].antifake && !isAdmins && global.db.data.users[m.sender].lenguaje) {
let forbidPrefixes = ['965', '966', '971', '974', '212', '213', '216', '44', '1', '62', '61', '64', '353', '33', '32', '41', '352', '377', '351', '244', '258', '91', '977', '880', '92', '94', '960', '7', '380', '375', '998', '996', '373', '374', '994', '992', '62', '49', '43', '39', '378', '379', '86', '886', '852', '853', '65', '850', '82', '93', '98', '48', '84', '856', '855', '254', '255', '256', '250', '257', '258', '252', '269', '243', '90', '998', '60', '222', '27', '265']
for (let prefix of forbidPrefixes) {
if (m.sender.startsWith(prefix)) {
await m.reply(aFk.text1)
client.groupParticipantsUpdate(m.chat, [m.sender], 'remove')}}}
  
switch(prefix && command) {

  case 'zam': {
   client.sendButton(m.chat, 'Curio', 'Zam', null, [['Menu', `.menu`]], null, null, m)
await client.sendContextInfo(m.chat, wm, Title, Body, link, m)
  }
    break

case 'gemini': {
if (!text) {
return m.reply(`${gemini.text1}\n_${prefix + command} ${gemini.text2}_`)
}
try {
client.sendPresenceUpdate('composing', from)
const response = await fetch(`https://aemt.me/gemini?text=${text}`)
var res2 = await response.json()
await m.reply(res2.result)
} catch (error) {
return m.reply(gemini.text3 + '\n\n> ' + error)
}
}
break

case 'wallpaper': {
if (!text) return m.reply(`${google.text1}\n${prefix + command} anime`) 
let { wallpaper, wallpaperv2 } = require('@bochilteam/scraper')
let _res = await (/2/.test(command) ? wallpaperv2 : wallpaper)(text) 
let _img = _res[Math.floor(Math.random() * _res.length)]
client.sendMessage(m.chat, { image: { url: _img }, caption: `_${text}_`}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
break

case 'pinterest': {
const {pinterest} = require('@bochilteam/scraper') 
if (!text) return m.reply(`${google.text1}\n${prefix + command} Gatos`)
const json = await pinterest(text)
client.sendMessage(m.chat, { image: { url: getRandom(json) }, caption: `_${text}_`}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
break 

case 'wikipedia': case 'wiki': {
if (!text) return m.reply(`${google.text1}\n${prefix + command} quien es Colón?`)
try {
const link =  await axios.get(`https://es.wikipedia.org/wiki/${text}`)
const $ = cheerio.load(link.data)
let wik = $('#firstHeading').text().trim()
let resulw = $('#mw-content-text > div.mw-parser-output').find('p').text().trim()
m.reply(`RESULTADOS :\n\n${resulw}`)
} catch (e) {
console.log(e)}}
break 

case 'hd': {
const FormData = require("form-data") 
const Jimp =  require("jimp") 
let q = m.quoted ? m.quoted : m;
let mime = (q.msg || q).mimetype || q.mediaType || "";
if (!mime) return m.reply(`🍟 Responde a una imagen con el comando: ${prefix + command}*`) 
if (!/image\/(jpe?g|png)/.test(mime)) return m.reply(`🚩 *formato incorrecto*`) 
m.reply(`Espere.....`) 
try {
let img = await q.download?.();
let pr = await remini(img, "enhance");
client.sendMessage(m.chat, {image: pr, caption: `resultados`}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100});
} catch (e) {
return m.reply("error\n\n" + e) 
console.log(e) 
}}
break
		
case 'ia': case 'chatgpt': {
if (!text) {
return m.reply(`${ia.text1}\n_${prefix + command} ${ia.text2}_`)
}
try {
client.sendPresenceUpdate('composing', from)
const aa = await axios.get(`https://delirius-api-oficial.vercel.app/api/chatgpt?q=${text}`)
await m.reply(aa.data.data)
} catch (error) {
return m.reply(ia.text3 + '\n\n> ' + error)}
}
break

case 'menu': {
try {
let leng = lang === 'es' ? 'Español 🇲🇽' : 'English 🇺🇲'
const messs = `${ucapan()}\n
${menu.text1} ${prefix}
${menu.text2} ${Object.keys(global.db.data.users).length}
${menu.text3} ${leng}
\n${menu.text4}
${menu.text5} Zam
${menu.text6} New@1.0.0\n
${menu.text7}\n\n🌐 _https://whatsapp.com/channel/0029VaB4w2ZFHWpwgyEe3w2k_`
let listSections = []    
listSections.push({
title: '',
rows: [{ header: "Menu Completo", title: "", id: `.allmenu`, description: `Para ver todos los comandos\n` }, { header: "Estado", title: "", id: `.estado`, description: `Para ver el status del Bot\n` },
{ header: "Velocidad", title: "", id: `.ping`, description: `Ver velocidad del bot\n` },
{ header: "Creador", title: "", id: `.owner`, description: `Muestra el contacto de mi creador\n` },
{ header: "Información", title: "", id: `.infobot`, description: `Muestra toda la información de Curiosity\n` },
{ header: "Idioma", title: "", id: `.idioma`, description: `Cambia tu idioma\n` }
]})
await client.sendList(m.chat, messs, null, `🚀 Sub Menu`, listSections, { mentions: [sender]}, {quoted: fkontak})
} catch (error) {
return m.reply(menu.text8 + '\n\n> ' + error)
}
}
break

case 'menuall': case 'allmenu': {
const texto = `${allmenu.text1}
\n${allmenu.text2}
\n┌  ◦ Información
│  ◦ ${prefix}infobot
│  ◦ ${prefix}ping 
│  ◦ ${prefix}estado
│  ◦ ${prefix}reporte
│  ◦ ${prefix}sc
│  ◦ ${prefix}owner
│  ◦ ${prefix}speedtest
│  ◦ ${prefix}bot
└  ◦ Información\n
┌  ◦ On Off
│  ◦ ${prefix}antilink
│  ◦ ${prefix}antifake
│  ◦ ${prefix}welcome
└  ◦ On Off\n
┌  ◦ Buscadores
│  ◦ ${prefix}google
│  ◦ ${prefix}imagen
│  ◦ ${prefix}wikipedia
│  ◦ ${prefix}wallpaper
│  ◦ ${prefix}pinterest
│  ◦ ${prefix}ia
│  ◦ ${prefix}gemini
└  ◦ Buscadores\n
┌  ◦ Herramientas
│  ◦ ${prefix}hd
│  ◦ ${prefix}traducir
└  ◦ Herramientas\n
┌  ◦ Descargas
│  ◦ ${prefix}play
│  ◦ ${prefix}play2
│  ◦ ${prefix}play3
│  ◦ ${prefix}gitclone
│  ◦ ${prefix}tiktok
│  ◦ ${prefix}facebook
│  ◦ ${prefix}apkmod
│  ◦ ${prefix}apk
│  ◦ ${prefix}twiter
│  ◦ ${prefix}x
│  ◦ ${prefix}tiktokimg
│  ◦ ${prefix}lyrics
│  ◦ ${prefix}letra
│  ◦ ${prefix}gdrive
└  ◦ Descargas\n
┌  ◦ Grupo
│  ◦ ${prefix}admins
│  ◦ ${prefix}grupo
│  ◦ ${prefix}demote
│  ◦ ${prefix}fantasmas
│  ◦ ${prefix}hidetag
│  ◦ ${prefix}infogroup
│  ◦ ${prefix}kick
│  ◦ ${prefix}link
│  ◦ ${prefix}promote
│  ◦ ${prefix}tagall
└  ◦ Grupo\n
┌  ◦ Usuario
│  ◦ ${prefix}reg
│  ◦ ${prefix}idioma
└  ◦ Usuario\n
┌  ◦ Stickers
│  ◦ ${prefix}s
│  ◦ ${prefix}attp
└  ◦ Stickers\n
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

case 'infobot': {
const texto = `🔍 *Información de CuriosityBot-MD* 🔍\n
👨‍💻 Desarrollador: Zam
🚀 Estado: Versión Beta en desarrollo
🛠️ Estructura actual: Switch Case
📜 Versión anterior: Plugin (base donada a GataDios, ahora YartexBot-MD)
📢 El bot está en fase beta y puede tener comandos limitados. Estamos trabajando para expandir sus capacidades. ¡Tu apoyo es fundamental para nuestro crecimiento y mejora continua! Gracias por ser parte de esta aventura.`
client.sendButton(m.chat, texto, wm, '', [['Menu', `.menu`], ['Velocidad', `.ping`]], null, [['Canal', 'https://whatsapp.com/channel/0029VaB4w2ZFHWpwgyEe3w2k']], m)
}
break

case 'ping': {
const girastamp = speed()
const latensi = speed() - girastamp
const _muptime = process.uptime() * 1000
const muptime = clockString(_muptime)
m.reply(`${ping.text1} *${latensi.toFixed(4)}*\n\n${ping.text2} *${muptime}*`)
}
break

case 'estado': case 'status': {
const NotDetect = status.text1
const old = performance.now()
const { cpu, drive, mem, netstat, os } = osu
const getCPUInfo = async () => {
try {
const cpuCount = cpu.count()
const cpuModel = cpu.model()
const cpuUsage = await cpu.usage()
return { cpuCount, cpuModel, cpuUsage }
} catch {
return { cpuCount: NotDetect, cpuModel: NotDetect, cpuUsage: NotDetect }
}
}
const getDriveInfo = async () => {
try {
const info = await drive.info()
const driveTotal = `${info.totalGb} GB`
const driveUsed = info.usedGb
const drivePer = `${info.usedPercentage}%`
return { driveTotal, driveUsed, drivePer }
} catch {
return { driveTotal: NotDetect, driveUsed: NotDetect, drivePer: NotDetect }
}
}
const getMemInfo = async () => {
try {
const info = await mem.info()
const ramTotal = info.totalMemMb
const ramUsed = info.usedMemMb
return { ramTotal, ramUsed }
} catch {
return { ramTotal: NotDetect, ramUsed: NotDetect }
}
}
const getNetstatInfo = async () => {
try {
const info = await netstat.inOut()
const netsIn = `${info.total.inputMb} MB`
const netsOut = `${info.total.outputMb} MB`
return { netsIn, netsOut }
} catch {
return { netsIn: NotDetect, netsOut: NotDetect }
}
}
const [cpuInfo, driveInfo, memInfo, netstatInfo] = await Promise.all([getCPUInfo(), getDriveInfo(), getMemInfo(), getNetstatInfo()])
const neww = performance.now()
const ping = Math.round(neww - old)
const ramPer = memInfo.ramUsed && memInfo.ramTotal ? `${Math.round(100 * (memInfo.ramUsed / memInfo.ramTotal))}%` : NotDetect
const report = `${status.text2}\n\n*OS* : ${os.platform()}\n*CPU Model* : ${cpuInfo.cpuModel}\n*CPU Core* : ${cpuInfo.cpuCount} Centro\n*CPU* : ${cpuInfo.cpuUsage}%\n*Ram* : ${memInfo.ramUsed} / ${memInfo.ramTotal} MB (${ramPer})\n*Drive* : ${driveInfo.driveUsed} / ${driveInfo.driveTotal} (${driveInfo.drivePer})\n*Ping* : ${ping} ms\n*Internet IN* : ${netstatInfo.netsIn}\n*Internet OUT* : ${netstatInfo.netsOut}`
await m.reply(`_${status.text3} ${command}..._`)
client.sendButton(m.chat, report, wm, 'https://telegra.ph/file/6cbf9148b572711e9b000.jpg', [['Menu', `.menu`], ['Velocidad', `.ping`]], null, [['Canal', 'https://whatsapp.com/channel/0029VaB4w2ZFHWpwgyEe3w2k']], m)
}
break

case 'reporte': case 'report': {
if (!text) return m.reply(`${report.text1}\n_!${command} ${report.text2}_`)
if (text.length < 10) return m.reply(report.text3)
if (text.length > 1000) return m.reply(report.text4)
let teks = `${report.text5}\n\n${report.text6}\n*Wa.me/${m.sender.split`@`[0]}*\n${report.text7}\n_${text}_`
client.sendMessage('5214434703586@s.whatsapp.net', {text: teks}, {quoted: m})
m.reply(report.text8)
}
break

case 'sc': case 'script': case 'git': {
let res = await fetch('https://api.github.com/repos/AzamiJs/CuriosityBot-MD')
let json = await res.json()
m.reply('https://github.com/AzamiJs/CuriosityBot-MD')
//let git = `*乂  B O T  -  S C R I P T*\n\n${script.text1} ${json.name}\n${script.text2} ${json.watchers_count}\n${script.text3} ${(json.size / 1024).toFixed(2)} MB\n${scr.text4} ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}\n${script.text5} ${json.html_url}\n\n\t\t\t\t\t${json.forks_count} Forks · ${json.stargazers_count} Stars · ${json.open_issues_count} Issues` await client.sendMessage(m.chat, { text: git, contextInfo: { forwardingScore: 999, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterName: 'CuriosityBot', newsletterJid: "120363167110224268@newsletter", }, externalAdReply: { title: `© CuriosityBot-MD`, body: '', thumbnailUrl: 'https://qu.ax/lFTW.jpeg', sourceUrl: 'https://github.com/AzamiJs', mediaType: 1, renderLargerThumbnail: true }}}, {quoted: m})
}
break

case 'owner': case 'contacto': case 'creador': case 'dueño': case 'creator': case 'contact': {
const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? client.user.jid : m.sender
const pp = await client.profilePictureUrl(who).catch(_ => '')
const biografia = await client.fetchStatus('5214434703586' +'@s.whatsapp.net').catch(_ => 'Sin Biografía')
const bio = biografia.status?.toString() || 'Sin Biografía'
await client.sendContactArray(m.chat, [['5214434703586', `Zam`, `🌐 Creador`, 'Zam', 'thecuriositybot@gmail.com', `🇲🇽 México`, `https://www.youtube.com/@Azami_YT`, bio]], m)
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
		
case 'antilink': {
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
let txt = antilink.text1
await client.sendButton(m.chat, txt, wm, null, [['✅ Activar', `${prefix}antilink on`], ['❌ Desactivar', `${prefix}antilink off`]], null, null, m)
}
if (text === 'on') {
if (db.data.chats[m.chat].antilink) {
return m.reply(antilink.text2)
}
db.data.chats[m.chat].antilink = true
m.reply(antilink.text3)
} else if (text === 'off') {
if (!db.data.chats[m.chat].antilink) {
return m.reply(antilink.text4)
}
db.data.chats[m.chat].antilink = false
m.reply(antilink.text5)
}
}
break

case 'antifake': {
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
let txt = antifake.text1
await client.sendButton(m.chat, txt, wm, null, [['✅ Activar', `${prefix}antifake on`], ['❌ Desactivar', `${prefix}antifake off`]], null, null, m)
}
if (text === 'on') {
if (db.data.chats[m.chat].antifake) {
return m.reply(antifake.text2)
}
db.data.chats[m.chat].antifake = true
m.reply(antifake.text3)
} else if (text === 'off') {
if (!db.data.chats[m.chat].antifake) {
return m.reply(antifake.text4)
}
db.data.chats[m.chat].antilink = false
m.reply(antifake.text5)
}
}
break

case 'play': {
if (!text) return m.reply(play.text1)
try {
m.react('🚩') 
const search = await yts(`${text}`)
const data = search.all
const Ibuff = await getBuffer(data[0].image)
const ytMsg = `\`${play.text2}\`\n\n${play.text3} _${search.all[0].title}_\n${play.text4} _${search.all[0].views}_\n${play.text5} _${search.videos[0].url}_`
await client.sendButton(m.chat, ytMsg, play.text6, null, [['Audio 🔊', `${prefix}play2 ${text}`], ['Video 🎞️', `${prefix}play3 ${text}`], [`${play.text7}`, `${prefix}yts ${text}`]], null, null, m)
} catch (e) {
return m.reply(play.text8 + '\n\n> ' + e)
}
}
break

case 'ytmp3': case 'play2': {
if (!text) return m.reply(play2.text1)
const search = await yts(`${text}`)
const data = await search.all.filter((v) => v.type == 'video')
m.react('🕕') 
try {
var resC = data[0]
} catch {
var resD = data[1]
}
try {
let c = '360' + 'p'
let y = search.videos[0].url
const yt = await youtubedl(y).catch(async _ => await youtubedlv2(y))
const dl_url = await yt.video[c].download()
const ttl = await yt.title
const size = await yt.video[c].fileSizeH
client.sendMessage(m.chat, { audio: {url: dl_url}, mimetype: 'audio/mpeg'}, {quoted: m})
m.react('✅') 
} catch (e) {
return m.reply(play3.text2 + '\n\n> ' + e)
m.react('❎') 
}
}
break

case 'ytmp4': case 'play3': {
if (!text) return m.reply(play3.text1)
const search3 = await yts(`${text}`)
const data2 = await search3.all.filter((v) => v.type == 'video')
m.react('🕕') 
try {
var resC = data2[0]
} catch {
var resD = data2[1]
}
try {
let c = '360' + 'p'
let y = search3.videos[0].url
const yt = await youtubedl(y).catch(async _ => await youtubedlv2(y))
const dl_url = await yt.video[c].download()
const ttl = await yt.title
const size = await yt.video[c].fileSizeH
await client.sendMessage(m.chat, { document: { url: dl_url }, fileName: `${ttl}.mp4`, mimetype: 'video/mp4', caption: `🚩 *Curiosity* © Bot`, thumbnail: await fetch(yt.thumbnail) }, { quoted: m })
m.react('✅') 
} catch (e) {
return m.reply(play3.text2 + '\n\n> ' + e)
m.react('❎') 
}
}
break

case 'gitclone': {
if (!args[0]) return m.reply(clone.text1)
if (!args[0].includes('github.com')) return m.reply(clone.text2)
m.reply('Cargando')
m.react('🕕') 
try {
let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let [, user, repo] = args[0].match(regex1) || []
repo = repo.replace(/.git$/, '')
let urlGit = `https://api.github.com/repos/${user}/${repo}/zipball`
let filename = (await fetch(urlGit, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
client.sendMessage(m.chat, { document: { url: urlGit }, fileName: filename+'.zip', mimetype: 'application/zip' }, { quoted: m }).catch((err) => m.reply('error'))
db.data.users[m.sender].limit -1
m.reply('1 diamante usado')
m.react('✅') 
} catch (e) {
return m.reply(clone.text3 + '\n\n> ' + e)}
m.react('❎') 
}
break

case 'tiktok': {
if (!text) {
return m.reply(tiktok.text1)
}
if (!text.includes('tiktok')) {
return m.reply(tiktok.text2)
}
m.react('🕕') 
try {
const { Tiktok } = require('./lib/tiktok')
Tiktok(q).then(data => {
client.sendMessage(m.chat, { caption: `By: *${data.author}*`, video: { url: data.nowm } }, { quoted: m })
})
m.react('✅')
} catch (e) {
m.reply(tiktok.text3 + '\n\n> ' + e)
m.react('❎') 
}
}
break

case 'facebook': case 'fb': {
const { savefrom, facebookdl, facebookdlv2 } = require('@bochilteam/scraper') 
if (!text) return m.reply(facebook.text1)
if (!text.includes('facebook')) {
return m.reply(facebook.text2)
}
try {
m.react('🕕') 
await m.reply('Cargando') 
const { result } = await facebookdl(text).catch(async () => await facebookdlv2(text)).catch(async () => await savefrom(text))
for (const { url, isVideo } of result.reverse()) await client.sendMessage(m.chat, {video: {url: url}, caption: '🍟 Video de facebook'}, {quoted: m})
} catch (e) {
m.reply(`${facebook.text3}\n\n> ${e}`)
}
}
break

case 'apk': case 'modoapk': case 'apkmod': {
let { search, download } = require('aptoide-scraper')
if (!text) return m.reply(`🎌 *Ingrese el nombre de la apk que esta buscando*`)
try {     
m.react('📤') 
let searchA = await search(text)
let data5 = await download(searchA[0].id)
let response = `╔══〘 MODO APK 〙═══•
║
║❥📌  Name : ${data5.name}
║❥📦 Package : ${data5.package}
║❥🕒  Actualización : ${data5.lastup}
║❥📥 Tamaño : ${data5.size}
╚═══════════════════•` 
await client.sendMessage(m.chat, {image: {url: data5.icon}, caption: response}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}); 
if (data5.size.includes('GB') || data5.size.replace(' MB', '') > 999) { 
return await m.reply(`🚩 *El archivo es demaciado pesado`)}
await client.sendMessage(m.chat, {document: {url: data5.dllink}, mimetype: 'application/vnd.android.package-archive', fileName: data5.name + '.apk', caption: null}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}); 
db.data.users[m.sender].limit -= 2
m.reply('2 diamante usado')
} catch (e) { 
return m.reply(`🚩 *Ocurrió un fallo\n\n` + e)}}
break

case 'twiter': case 'tw': case 'x': {
const fg = require('api-dylux') 
if (!args[0]) return m.reply(`Ejemplo:\n${prefix + command} https://twitter.com/fernandavasro/status/1569741835555291139?t=ADxk8P3Z3prq8USIZUqXCg&s=19`) 
m.react("📤")        
try {
let { SD, HD, desc, thumb, audio } = await fg.twitter(args[0])
 await client.sendMessage(m.chat, {video: {url: HD}, caption: `•─≪ *TWITTER DL* ≫─•\n\n${desc}`}, {quoted: m})
db.data.users[m.sender].limit -= 1
m.reply('1 diamante usado')
} catch (e) {
m.reply("🚩 *Ocurrió un fallo\n\n" + e) 
console.log(e)}}
break

case 'tiktokimg': case 'ttimg': {
if (!text) return m.reply(`Ejemplo:\n${prefix + command} https://vm.tiktok.com/ZMjnPvJuF/`) 
m.react('📥') 
let imagesSent
if (imagesSent) return;
imagesSent = true    
try {   
m.reply("Enviado...") 
let tioShadow = await ttimg(text); 
let result = tioShadow?.data;
for (let d of result) {
await client.sendMessage(m.chat, {image: {url: d}}, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})};
imagesSent = false
} catch (e) {
imagesSent = false    
return m.reply("🚩 *Ocurrió un fallo\n\n" + e) 
}}
break

case 'lyrics': case 'letra': {
const { lyrics, lyricsv2 } = require('@bochilteam/scraper')
if (!text) return m.reply(play.text1)
m.react('🕔') 
try {
const result = await lyricsv2(text).catch(async _ => await lyrics(text))
m.reply(`• TITULO: ${result.title}\n• AUTOR: ${result.author}\n• LINK: ${result.link}\n• LETRAS: ${result.lyrics}`) 
m.react('✅') 
} catch (e) {
console.log(e) 
}}
break

case 'gdrive': {
const fg = require('api-dylux') 
if (!args[0]) return m.reply(`Ejemplo:\n${prefix + command} https://drive.google.com/file/d/1dmHlx1WTbH5yZoNa_ln325q5dxLn1QHU/view*`)
try {
m.react('📥') 
let res = await fg.GDriveDl(args[0])
client.sendMessage(m.chat, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, { quoted: m })
db.data.users[m.sender].limit -= 3
m.reply('3 diamante usado')
} catch (e) {
m.reply("🚩 *Ocurrió un fallo\n\n" + e) 
console.log(e)}}
break

case 'admins': case 'admin': {
if (!m.isGroup) {
return m.reply(mess.group)
}
const pp = await client.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://qu.ax/OEgX.jpg'
const groupAdmins = participants.filter(p => p.admin)
const listaAdmins = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
if (!text) return m.reply(admins.text1)
if (text.length < 10) return m.reply(admins.text2)
let mensaje = args.join` `
let yo = `${admins.text3} ${text}\n`
let texto = `${yo}
${admins.text4}
${listaAdmins}`.trim()
client.sendMessage(m.chat, { image: { url: pp }, caption: texto, mentions: [...groupAdmins.map(v => v.id), owner]}, { quoted: m })
m.react('📛') 
}
break

case 'grupo': case 'group': case 'settings': {
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
if (isClose === undefined) { return m.reply(settings.text1)
}
await client.groupSettingUpdate(m.chat, isClose)
{ m.reply(settings.text2) }
}
break

case 'demote': case 'degradar': case 'quitaradmin': {
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
if (!text && !m.quoted) return m.reply(demote.text1)
if (number.length > 13 || (number.length < 11 && number.length > 0)) return m.reply(demote.text2)
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
m.reply(demote.text3)
}
}
break

case 'fantasmas': {
if (!m.isGroup) {
return m.reply(mess.group)
}
const { areJidsSameUser } = require('@whiskeysockets/baileys')
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
if (total == 0) return m.reply(fantasmas.text1) 
client.sendMessage(m.chat, { text: `${fantasmas.text2}\n${sider.map(v => '@' + v.replace(/@.+/, '')).join('\n')}\n\n*📝 NOTA:*\nEsto no es al 100% acertado, el bot inicia el conteo de mensajes a partir de que se active en este número`, mentions: sider }) 
}
break

case 'hidetag': case 'notificar': case 'tag': {
if (!m.isGroup) {
return m.reply(mess.group)
}
if (!isBotAdmins) {
return m.reply(mess.botAdmin)
}
if (!isAdmins) {
return m.reply(mess.admin)
}
if (!m.quoted && !text) return m.reply(hidetag.text1) 
try { 
client.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: participants.map(a => a.id) })
} catch {  
client.sendMessage(m.chat, { text : text ? text : '' , mentions: participants.map(a => a.id)}, { quoted: null, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}
}
break

case 'infogroup': {
const pp = await client.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://qu.ax/OEgX.jpg'
const groupAdmins = participants.filter(p => p.admin) 
const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
const texto = `${infogroup.text1}
\n${infogroup.text2}
${groupMetadata.id}
\n${infogroup.text3}
${groupMetadata.subject}
\n${infogroup.text4}
${participants.length} ${infogroup.text5}
\n${infogroup.text6}
@${owner.split('@')[0]}
\n${infogroup.text7}
${listAdmin}
\n${infogroup.text8}
${groupMetadata.desc?.toString() || `${infogroup.text9}`}
`.trim()//`
client.sendMessage(m.chat, { image: { url: pp }, caption: texto, mentions: [...groupAdmins.map(v => v.id), owner]}, { quoted: m })
}
break

case 'kick': case 'kill': case 'matar': case 'sacar': {
if (!m.isGroup) return m.reply(mess.group)
if (!isBotAdmins) return m.reply(mess.botAdmin)
if (!isAdmins) return m.reply(mess.admin)
const kicktext = `${kick.text1}`;
if (!m.mentionedJid[0] && !m.quoted) return m.reply(kicktext) 
if (m.mentionedJid.includes(client.user.jid)) return;
const User = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
const owr = m.chat.split`-`[0];
await client.groupParticipantsUpdate(m.chat, [User], 'remove')}
break

case 'link': case 'enlace': {
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

case 'promote': case 'promover': case 'daradmin': {
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
if (!text && !m.quoted) return m.reply(promote.text1)
if (number.length > 13 || (number.length < 11 && number.length > 0)) return m.reply(`🚩 *Número erróneo*`)
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
m.reply(promote.text2)
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
teks += `${tagall.text1} ${q ? q : `${tagall.text2}`}\n\n`
for (let mem of participants) {
teks += `- @${mem.id.split('@')[0]}\n`//`
}
client.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })}
break

case 'traducir': case 'translate': case 'tr': {
const translate = require('@vitalets/google-translate-api') 
if (!args || !args[0]) return m.reply(traducir.text1)
let lang = args[0]
let text = args.slice(1).join(' ')
const defaultLang = 'es'
if ((args[0] || '').length !== 2) {
lang = defaultLang
text = args.join(' ')
}
if (!text && m.quoted && m.quoted.text) text = m.quoted.text
try {
const result = await translate(`${text}`, {to: lang, autoCorrect: true})
await m.reply(`${result.text}`)
} catch {
try {
const lol = await fetch(`https://api.lolhuman.xyz/api/translate/auto/${lang}?apikey=${lolkeysapi}&text=${text}`)
const loll = await lol.json()
const result2 = loll.result.translated
await m.reply(`${result2}`)
} catch {
await m.reply(traducir.text2) 
}}}
break

case 'imagen': case 'image': {
const {googleImage} = require('@bochilteam/scraper') 
if (!text) return m.reply(`${google.text1}\n${prefix + command} Galaxia`)
try {  
image = await fetch(`https://api.akuari.my.id/search/googleimage?query=${text}`)
n = image.result
images = n[Math.floor(Math.random() * n.length)]
client.sendMessage(m.chat, { image: { url: images}, caption: `${text}`}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
} catch {
try {  
const res = await googleImage(text)
const image = res[Math.floor(Math.random() * res.length)]
const link = image
client.sendMessage(m.chat, { image: { url: link}, caption: `${text}`}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
} catch (e) {
console.log(e)
}}}		
break

case 'google': {		
if (!text) return m.reply(`${google.text1}\n${prefix + command} curiosity`)
let googlee = require('google-it')
googlee({'query': text}).then(res => {
let teks = `\`∙ Google Search:\`\n${text}\n\n`
for (let g of res) {
teks += `${google.text2} ${g.title}\n`
teks += `${google.text3} ${g.snippet}\n`
teks += `${google.text4} ${g.link}\n\n⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼\n\n`
}
m.reply(teks)})
}
break
		
case 'yts': case 'ytsearch':
if (!text) return m.reply(`Ejemplo, .yts CuriosityBot-MD`)
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
break

case 'getcase': 
if (!isCreator) return m.reply(`Tu que?`) 
if (!text) return m.reply(`no hay comando a buscar o que?`) 
try { 
bbreak = 'break' 
m.reply('case ' + `'${args[0]}'` + fs.readFileSync('./curiosity.js').toString().split(`case '${args[0]}'`)[1].split(bbreak)[0] + bbreak) 
 } catch (err) { 
console.error(err) 
m.reply(" Error, tal vez no existe el comando")} 
break

case 'addcase':
if (!isCreator) return m.reply(`Tu que?`) 
if (!text) return m.reply('Y EL CASE? ') 
try {
const addcase =[fs.readFileSync('root.js', 'utf8').slice(0, fs.readFileSync('curiosity.js', 'utf8').lastIndexOf('break') + 5), q, fs.readFileSync('root.js', 'utf8').slice(fs.readFileSync('root.js', 'utf8').lastIndexOf('break') + 5)].join('\n');
fs.writeFileSync('root.js', addcase)
m.reply(`✅ Comando:\n${text}\nAgregado con éxito.`) 
} catch (error) {
throw error
}
break

case 'join': case 'unete': {
const linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
const link = m.quoted?.text ?? text
const [_, code] = link.match(linkRegex) || []
if (!code) {
return m.reply(join.text1)
}
if (isCreator || m.fromMe) {
try {
const result = await client.groupAcceptInvite(code)
m.reply(jsonformat(result))
} catch (error) {
m.reply(jsonformat(error))
}
}
}
break

case 'update': case 'actualizar': case 'gitpull':
if (!isCreator) return client.sendMessage(from, { text: mess.owner }, { quoted: m })
try {
const stdout = execSync('git pull' + (m.fromMe && q ? ' ' + q : ''))
let message = stdout.toString()
if (message.includes('Already up to date.')) message = upd.text1
if (message.includes('Updating')) message = upd.text2 + stdout.toString()
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
const errorMessage = `${upd.text3}\n\n${conflictedFiles.join('\n')}`
await m.reply(errorMessage)
}
}
} catch (error) {
console.error(error)
let errorMessage2 = upd.text4
if (error.message) {
errorMessage2 += '\n*- Mensaje de error:* ' + error.message
}
await m.reply(errorMessage2)
}
}
break

case 'reiniciar': case 'restart':
if (!process.send) throw 'Dont: node main.js\nDo: node index.js'
m.reply(restart.text1)
sleep(5000)
process.send('reset')
break

case 'reg': {
let leng = lang === 'es' ? '*Español 🇲🇽*' : '*English 🇺🇲*'
let Reg = /\|?(.*?)([.|])([0-9]+)$/i
if (user.registered === true) {
return m.reply(reg.text1)
}
if (!Reg.test(text)) {
return m.reply(reg.text2)
}
let [, name, , age] = text.match(Reg)
if (!name) {
return m.reply(reg.text3)
}
if (!age) {
return m.reply(reg.text4)
}
age = parseInt(age)
if (age > 80) {
return m.reply(reg.text5)
}
if (age < 10) {
return m.reply(reg.text6)
}
if (name.length >= 100) {
return m.reply(reg.text7)
}
user.name = name.trim()
user.age = age
user.regTime = +new Date()
user.registered = true
m.reply(`${reg.text8}\n\n${reg.text12}\n${reg.text9} *${name}*\n${reg.text10} *${age}*\n${reg.text11} ${leng}\n\n${reg.text13}`)
}
break
    
case 'idioma':
let _idioma = '🚩 *Seleccione su idioma*\n\n> Idiomas disponibles:\nes _(Español)_\nen _(Inglés)_\n\n`Ejemplo:`\n.idioma es'
if (!text) {
return client.sendButton(m.chat, _idioma, '🍟 Seleccione su idioma', null, [['Español 🇲🇽', `.idioma es`], ['Inglés 🇺🇸', `.idioma en`]], null, null, m)
}
let choice = text.includes('es') ? 'es' : text.includes('en') ? 'en' : null
if (!choice) {
return m.reply('Solo puedes seleccionar español o inglés')
}
user.lenguaje = choice
return m.reply(choice === 'es' ? 'Idioma configurado a Español 🇲🇽' : 'Language set to English 🇺🇲')
break

case 'unreg':
user.registered = false
m.reply('🚩 Ya no estas registrado')
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
if ((quoted.msg || quoted).seconds > 20) return m.reply(sticker.text2)  
media = await quoted.download()  
let encmedia = await client.sendVideoAsSticker(m.chat, media, m, { packname: sticker2, author: sticker3, contextInfo: {forwardingScore: 9999999, isForwarded: true, externalAdReply:{ showAdAttribution: false, title: wm, mediaType: 2, sourceUrl: 'https://github.com/AzamiJs', thumbnailUrl: 'https://qu.ax/lFTW.jpeg'}}})
await new Promise((resolve) => setTimeout(resolve, 2000))
await fs.unlinkSync(encmedia)  
} else {
m.reply(sticker.text1)
}
}
break

case 'simi': case 'bot': case 'alexa': case 'cortana': {
if (!text) return m.reply(`*⚠️ INGRESE UN TEXTO PARA HABLAR CONMIGO*\n\n❕ EJEMPLO:\n*${prefix + command}* Hola curiosity`) 
try {
m.react('🗣️') 
await client.sendPresenceUpdate('composing', from)
let gpt = await fetch(`https://delirius-api-oficial.vercel.app/api/simi?text=${text}`)
let res = await gpt.json()
await m.reply(res.data.message)
} catch {
try {
if (text.includes('Hola')) text = text.replace('Hola', 'Hello');
if (text.includes('hola')) text = text.replace('hola', 'Hello');
if (text.includes('HOLA')) text = text.replace('HOLA', 'HELLO');
const reis = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=' + text);
const resu = await reis.json();
const nama = m.pushName || '1';
const api = await fetch('http://api.brainshop.ai/get?bid=153868&key=rcKonOgrUFmn5usX&uid=' + nama + '&msg=' + resu[0][0][0]);
const res = await api.json();
const reis2 = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=es&dt=t&q=' + res.cnt);
const resu2 = await reis2.json();
m.reply(resu2[0][0][0]);
} catch (e) {
return m.reply(`*Api simsimi caida vuelva mas tardes*`)
console.log(e)}}}
break

case 'curiosity': case 'bot':
const _curio = JSON.parse(fs.readFileSync(`./lib/idiomas/${lang}.json`))
const cTxt = _curio.info.curiosity
const testt = generateWAMessageFromContent(from, { viewOnceMessage: { message: { "messageContextInfo": { "deviceListMetadata": {}, "deviceListMetadataVersion": 2 }, interactiveMessage: proto.Message.InteractiveMessage.create({ body: proto.Message.InteractiveMessage.Body.create({ text: '' }), footer: proto.Message.InteractiveMessage.Footer.create({ text: 'By CuriosityBot' }), header: proto.Message.InteractiveMessage.Header.create({ title: cTxt.text1, subtitle: 'Ax es Uke de Zam', hasMediaAttachment: false }), nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ buttons: [ { "name": "cta_url", "buttonParamsJson": "{\"display_text\":\"Git\",\"url\":\"https://github.com/AzamiJs\",\"merchant_url\":\"https://www.google.com\"}" }, { "name": "cta_url", "buttonParamsJson": "{\"display_text\":\"Channel/Canal\",\"url\":\"https://whatsapp.com/channel/0029VaB4w2ZFHWpwgyEe3w2k\",\"merchant_url\":\"https://www.google.com\"}" }, { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Actualizar 🍿","id":".update"}` }, { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Unreg","id":".unreg"}` }, { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Gemini","id":".gemini"}` }, { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Registrarse","id":".Reg Curiosity.23"}` }, {"name": "quick_reply", "buttonParamsJson": `{"display_text":"Ping ","id":".ping"}` }, {"name": "quick_reply", "buttonParamsJson": `{"display_text":"Estado","id":".status"}` } ], })})}}}, {})
client.relayMessage(testt.key.remoteJid, testt.message, { messageId: testt.key.id }, {quoted: m})
client.sendPresenceUpdate('composing', from)
break

m.reply(`🟢 Comando ${command} no existe usa #menu`)

function ucapan() {
const time = moment.tz('America/Mexico_City').format('HH')
if (time >= 17) {
return '🌃 Buenas noches'
} else if (time >= 15) {
return '🌆 Buenas tardes'
} else if (time >= 11) {
return '🏙️ Buenas Tardes'
} else if (time >= 4) {
return '🌇 Buenos Días'
} else {
return '🌉 Buenas madrugadas'
}
}

async function GDriveDl(url) {
  let id;
  if (!(url && url.match(/drive\.google/i))) throw 'Invalid URL';
  id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1];
  if (!id) throw 'ID Not Found';
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
      'x-json-requested': 'true'}});
  const {fileName, sizeBytes, downloadUrl} = JSON.parse((await res.text()).slice(4));
  if (!downloadUrl) throw 'Link Download Limit!';
  const data = await fetch(downloadUrl);
  if (data.status !== 200) throw data.statusText;
  return {downloadUrl, fileName, fileSize: formatSize(sizeBytes), mimetype: data.headers.get('content-type')};
}

async function ttimg(link) {
    try {    
        let url = `https://dlpanda.com/es?url=${link}&token=G7eRpMaa`;    
        let response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        let imgSrc = [];
        $('div.col-md-12 > img').each((index, element) => {
            imgSrc.push($(element).attr('src'));
        });
        if (imgSrc.length === 0) {
            return { data: '*[ ⚠️ ] No se encontraron imágenes en el enlace proporcionado.*' };
        }
        return { data: imgSrc }; 
    } catch (error) {
        console.lo (error);
        return { data: '*[ ⚠️ ] No se obtuvo respuesta de la página, intente más tarde.*'};
    };
};
		
async function remini(imageData, operation) {
return new Promise(async (resolve, reject) => {
const availableOperations = ["enhance", "recolor", "dehaze"];
if (availableOperations.includes(operation)) {
operation = operation;
} else {
operation = availableOperations[0];
}
const baseUrl = "https://inferenceengine.vyro.ai/" + operation + ".vyro";
const formData = new FormData();
formData.append("image", Buffer.from(imageData), {filename: "enhance_image_body.jpg", contentType: "image/jpeg"});
formData.append("model_version", 1, {"Content-Transfer-Encoding": "binary", contentType: "multipart/form-data; charset=utf-8"});
formData.submit({url: baseUrl, host: "inferenceengine.vyro.ai", path: "/" + operation, protocol: "https:", headers: {"User-Agent": "okhttp/4.9.3", Connection: "Keep-Alive", "Accept-Encoding": "gzip"}},
function (err, res) {
if (err) reject(err);
const chunks = [];
res.on("data", function (chunk) {chunks.push(chunk)});
res.on("end", function () {resolve(Buffer.concat(chunks))});
res.on("error", function (err) {
reject(err);
})},)})}
		
default: 
		
//•━━━『 Función del Eva (>) 』━━━━•     
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
return  reply(JSON.stringify(eval(`(async () => { ${budy.slice(3)} })()`), null, '\t'))  //gata.sendMessage(from, JSON.stringify(eval(`(async () => { ${budy.slice(3)} })()`), null, '\t'), text, { quoted: msg })
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
