const moment = require('moment-timezone')
const PhoneNumber = require('awesome-phonenumber')
const fs = require('fs')
const fetch = require('node-fetch')

let menulist = async (m, { conn, text, usedPrefix, command, args }) => {

let who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat

const perintah = args[0] || 'tags'
const tagCount = {}
const tagHelpMapping = {}
  
Object.keys(global.features).filter(plugin => !plugin.disabled).forEach(plugin => {
const tagsArray = Array.isArray(global.features[plugin].tags)
? global.features[plugin].tags
: []

if (tagsArray.length > 0) {
const helpArray = Array.isArray(global.features[plugin].help)
? global.features[plugin].help
: [global.features[plugin].help]

tagsArray.forEach(tag => {
if (tag) {
if (tagCount[tag]) {
tagCount[tag]++;
tagHelpMapping[tag].push(...helpArray)
} else {
tagCount[tag] = 1
tagHelpMapping[tag] = [...helpArray]
}
}
})
}
})

let help = Object.values(global.features).filter(plugin => !plugin.disabled).map(plugin => {
return {
help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
prefix: 'customPrefix' in plugin,
limit: plugin.limit,
premium: plugin.premium,
enabled: !plugin.disabled,
}
})

if (perintah === 'tags') {
const daftarTag = Object.keys(tagCount).sort().join('\n ✎ ' + usedPrefix + command + '  ')
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001);
let _mpt
if (process.send) {
process.send('uptime')
_mpt = await new Promise(resolve => {
process.once('message', resolve)
setTimeout(resolve, 1000)
}) * 1000
}
let mpt = clockString(_mpt)
let name = m.pushName || conn.getName(m.sender)
let list = `Hola @${m.sender.split("@")[0]} 👋️ *Soy Curiosity*
¿En qué puedo ayudarte?

*✧ Lista de menús ✧*
 ✎ ${usedPrefix + command} all
 ✎ ${usedPrefix + command} ${daftarTag}
`
const pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => 'https://telegra.ph/file/1ecdb5a0aee62ef17d7fc.jpg')

conn.sendMessage(m.chat, { text: list, contextInfo: { mentionedJid: [m.sender], externalAdReply: { title: namebot, body: wm, thumbnailUrl: thumb, sourceUrl: sourceurl, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
    
} else if (tagCount[perintah]) {
const daftarHelp = tagHelpMapping[perintah].map((helpItem, index) => {
return `.${helpItem}`
}).join('\n ✎ '  + '')
const list2 =  `✧ *MENU ${perintah.toUpperCase()}* ✧\n\n ✎ ${daftarHelp}`
const pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => 'https://telegra.ph/file/1ecdb5a0aee62ef17d7fc.jpg')

conn.sendMessage(m.chat, { text: list2, contextInfo: { mentionedJid: [m.sender], externalAdReply: { title: namebot, body: wm, thumbnailUrl: thumb, sourceUrl: sourceurl, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (perintah === 'all') {
let name = m.pushName || conn.getName(m.sender)
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);
const allTagsAndHelp = Object.keys(tagCount).map(tag => {
const daftarHelp = tagHelpMapping[tag].map((helpItem, index) => {
return ` ✎ .${helpItem}`
}).join('\n '  + '')
return `✧ *MENU ${tag.toUpperCase()}* ✧\n\n ${daftarHelp}`
}).join('\n\n')

let all = `
➤ *Nombre*: ${namebot}  
➤ *Version*: ${version} 
➤ *Estado*: ${global.opts['self'] ? 'Self' : 'Public'}  
➤ *Reloj*: ${await DateNow(new Date)}
➤ *Usuarios*: ${Object.keys(db.data.users).length}  
➤ *Menu*: ${Object.keys(tagCount).length}  

_I am Curiosity, How can I assist you today?_\n\n`
    + allTagsAndHelp

const pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => 'https://telegra.ph/file/1ecdb5a0aee62ef17d7fc.jpg')

conn.sendMessage(m.chat, { text: all, contextInfo: { mentionedJid: [m.sender], externalAdReply: { title: namebot, body: wm, thumbnailUrl: thumb, sourceUrl: sourceurl, mediaType: 1, renderLargerThumbnail: true },}}, { quoted: m })
} else {
    await conn.reply(m.chat, `🚩 *El menú tiene un error*`, m)
  }
}

menulist.help = ['menu']
menulist.tags = ['main']
menulist.command = ['menu']

module.exports = menulist

function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function DateNow(date) {
let offset = 7
let utc = date.getTime() + (date.getTimezoneOffset() * 60000)
let Time = new Date(utc + (3600000 * offset))
let month = Time.getMonth() + 1
let day = Time.getDate()
let year = Time.getFullYear()
let hours = Time.getHours() < 10 ? '0' + Time.getHours() : Time.getHours()
let minutes = Time.getMinutes() < 10 ? '0' + Time.getMinutes() : Time.getMinutes()
let seconds = Time.getSeconds() < 10 ? '0' + Time.getSeconds() : Time.getSeconds()

return `*${hours}:${minutes}:${seconds}*`
}