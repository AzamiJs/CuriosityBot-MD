const simple = require('./function/simple')
const util = require('util')
const { color } = require('./function/color')
const moment = require('moment-timezone')
const fs = require('fs')
const fetch = require('node-fetch')


const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(resolve, ms))

module.exports = {
async handler(chatUpdate) {
if (global.db.data == null) await loadDatabase()
this.msgqueque = this.msgqueque || []
    
if (!chatUpdate) return
this.pushMessage(chatUpdate.messages).catch(console.error)
   
let m = chatUpdate.messages[chatUpdate.messages.length - 1]
global.settings = global.db.data.settings
global.fkontak = global.fkontak
if (!m) return
     
try {
m = simple.smsg(this, m) || m
if (!m) return
        
m.exp = 0
m.limit = false
try {
let user = global.db.data.users[m.sender]
if (typeof user !== 'object') global.db.data.users[m.sender] = {}
if (user) {
if (!isNumber(user.exp)) user.exp = 0
if (!isNumber(user.limit)) user.limit = 500
if (!isNumber(user.lastclaim)) user.lastclaim = 0

if (!('registered' in user)) user.registered = false
if (!user.registered) {
if (!('name' in user)) user.name = m.name
if (!isNumber(user.age)) user.age = -1
if (!isNumber(user.regTime)) user.regTime = -1
}

if (!isNumber(user.afk)) user.afk = -1
if (!('afkReason' in user)) user.afkReason = ''
if (!('banned' in user)) user.banned = false                     
if (!('premium' in user)) user.premium = false
if (!('moderator' in user)) user.moderator = false
if (!isNumber(user.bannedDate)) user.bannedDate = 0
if (!isNumber(user.warn)) user.warn = 0
if (!isNumber(user.level)) user.level = 0
if (!('role' in user)) user.role = 'Principiante'
if (!('autolevelup' in user)) user.autolevelup = true

} else global.db.data.users[m.sender] = {
exp: 0,
limit: 100,
lastclaim: 0,
registered: false,
name: m.name,
age: -1,
regTime: -1,
afk: -1,
afkReason: '',
banned: false,
moderator: false,
warn: 0,
level: 0,
role: 'Principiante',
autolevelup: true,
}
let chat = global.db.data.chats[m.chat]
if (typeof chat !== 'object') global.db.data.chats[m.chat] = {}
if (chat) {
if (!('isBanned' in chat)) chat.isBanned = false
if (!('welcome' in chat)) chat.welcome = true
if (!('autoread' in chat)) chat.autoread = true
if (!('detect' in chat)) chat.detect = false
if (!('sWelcome' in chat)) chat.sWelcome = 'BIENVENIDO @user!'
if (!('sBye' in chat)) chat.sBye = ''
if (!('sPromote' in chat)) chat.sPromote = '@user ha sido ascendido'
if (!('sDemote' in chat)) chat.sDemote = '@user ha sido degradado'
if (!('delete' in chat)) chat.delete = true
if (!('antiVirtex' in chat)) chat.antiVirtex = false
if (!('antiLink' in chat)) chat.antiLink = false
if (!('badword' in chat)) chat.badword = false
if (!('antiSpam' in chat)) chat.antiSpam = false
if (!('freply' in chat)) chat.freply = false
if (!('antiSticker' in chat)) chat.antiSticker = false
if (!('anticall' in chat)) chat.antiCall = true
if (!('stiker' in chat)) chat.stiker = false
if (!('viewonce' in chat)) chat.viewonce = false
if (!('useDocument' in chat)) chat.useDocument = false
if (!('antiToxic' in chat)) chat.antiToxic = false
if (!isNumber(chat.expired)) chat.expired = 0
} else global.db.data.chats[m.chat] = {
isBanned: false, welcome: true,
autoread: true, detect: false,
sWelcome: '',sBye: '', 
sPromote: '*nuevo administrador ascendido:* @user', sDemote: '*degradado de administrador:* @user',
delete: true, antiLink: true,
stiker: false, antiSticker: true,
antiCall: true, antiSpam: true,
freply: false, viewonce: false,
useDocument: true, antiToxic: true,
expired: 0,
}

let settings = global.db.data.settings[this.user.jid]
if (typeof settings !== 'object') global.db.data.settings[this.user.jid] = {}
if (settings) {
if (!('self' in settings)) settings.self = true 
if (!('autoread' in settings)) settings.autoread = true
if (!('restrict' in settings)) settings.restrict = true
if (!('autorestart' in settings)) settings.autorestart = true
if (!('restartDB' in settings)) settings.restartDB = 0
if (!isNumber(settings.status)) settings.status = 0 // ini buat data set Status, tambah disini
if (!('anticall' in settings)) settings.anticall = true
if (!('clear' in settings)) settings.clear = true
if (!isNumber(settings.clearTime)) settings.clearTime = 0
if (!('freply' in settings)) settings.freply = true
if (!('akinator' in settings)) settings.akinator = {}
} else global.db.data.settings[this.user.jid] = {
self: true, autoread: true,
restrict: true, autorestart: true,
restartDB: 0, status: 0,
anticall: true, clear: true,
clearTime: 0, freply: true,
}
} catch (e) {
console.error(e)
}
if (typeof m.text !== 'string') m.text = ''

const isROwner = [conn.decodeJid(global.conn.user.id), ...global.owner.map(([number, isCreator, isDeveloper]) => number)].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isOwner = isROwner || m.fromMe
const isMods = global.db.data.users[m.sender].moderator
const isPrems = global.db.data.users[m.sender].premium
const isBans = global.db.data.users[m.sender].banned
const isSeller = global.db.data.users[m.sender].seller
if (isROwner) {
db.data.users[m.sender].premium = true
db.data.users[m.sender].premiumDate = 'infinity'
db.data.users[m.sender].limit = 'infinity'
db.data.users[m.sender].moderator = true
}
if (!isROwner && isBans) return 
            
if (opts['autoread']) await this.readMessages([m.key])
if (opts['nyimak']) return
if (!m.fromMe && !global.db.data.users[m.sender].moderator && opts['self']) return 
  
if (opts['pconly'] && !isPrems && m.chat.endsWith('g.us')) return
if (opts['gconly'] && !m.fromMe && !isPrems && !m.chat.endsWith('g.us')) return conn.reply(m.chat,"🔴 UPGRADE TO PREMIUM FOR USE IN PRIVATE CHAT\n\n```Sorry You Can't use this feature in private, because yor'e not premium. Go buying premium on my owner```")
if (opts['swonly'] && m.chat !== 'status@broadcast') return
if (opts['queque'] && m.text && !(isMods || isPrems)) {
let queque = this.msgqueque, time = 1000 * 5
                
const previousID = queque[queque.length - 1]
queque.push(m.id || m.key.id)
setInterval(async function () {
if (queque.indexOf(previousID) === -1) clearInterval(this)
else await delay(time)
}, time)
}

m.exp += Math.ceil(Math.random() * 10)

let usedPrefix
let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]

const groupMetadata = (m.isGroup ? (conn.chats[m.chat] || {}).metadata : {}) || {}
const participants = (m.isGroup ? groupMetadata.participants : []) || []
const user = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {} // User Data
const bot = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) == this.user.jid) : {}) || {} // Your Data
const isRAdmin = user && user.admin == 'superadmin' || false
const isAdmin = isRAdmin || user && user.admin == 'admin' || false // Is User Admin?
const isBotAdmin = bot && bot.admin || false // Are you Admin?
for (let name in global.features) {
let plugin = global.features[name]
if (!plugin) continue
if (plugin.disabled) continue
if (typeof plugin.all === 'function') {
try {
await plugin.all.call(this, m, chatUpdate)
} catch (e) {
console.error(e)
}
}
const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
let match = (_prefix instanceof RegExp ?
[[_prefix.exec(m.text), _prefix]] :
Array.isArray(_prefix) ?
_prefix.map(p => {
let re = p instanceof RegExp ?
p :
new RegExp(str2Regex(p))
return [re.exec(m.text), re]
}) :
typeof _prefix === 'string' ?
[[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
[[[], new RegExp]]
).find(p => p[1])
if (typeof plugin.before === 'function') if (await plugin.before.call(this, m, { match, conn: this, participants, groupMetadata, user, bot, isROwner, isOwner, isRAdmin, isAdmin, isBotAdmin, isPrems, isBans, chatUpdate })) continue
if (typeof plugin !== 'function') continue
if ((usedPrefix = (match[0] || '')[0])) {
let noPrefix = m.text.replace(usedPrefix, '')
let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
args = args || []
let _args = noPrefix.trim().split` `.slice(1)
let text = _args.join` `
command = (command || '').toLowerCase()
let fail = plugin.fail || global.dfail
let isAccept = plugin.command instanceof RegExp ?
plugin.command.test(command) :
Array.isArray(plugin.command) ?
plugin.command.some(cmd => cmd instanceof RegExp ?
cmd.test(command) :
cmd === command
) :
typeof plugin.command === 'string' ?
plugin.command === command :
false

if (!isAccept) continue
m.plugin = name
if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
let chat = global.db.data.chats[m.chat]
let user = global.db.data.users[m.sender]
if (name != 'unbanchat.js' && chat && chat.isBanned && !isOwner) return
}
if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) {
fail('owner', m, this)
continue
}
if (plugin.rowner && !isROwner) {
fail('rowner', m, this)
continue
}
if (plugin.restrict) {
fail('restrict', m, this)
continue
}
if (plugin.owner && !isOwner) {
fail('owner', m, this)
continue
}
if (plugin.mods && !isMods) {
fail('mods', m, this)
continue
}
if (plugin.premium && !isPrems) {
fail('premium', m, this)
continue
}
if (plugin.banned && !isBans) {
fail('banned', m, this)
continue
}
if (plugin.group && !m.isGroup) {
fail('group', m, this)
continue
} else if (plugin.botAdmin && !isBotAdmin) {
fail('botAdmin', m, this)
continue
} else if (plugin.admin && !isAdmin) {
fail('admin', m, this)
continue
}
if (plugin.private && m.isGroup) {
fail('private', m, this)
continue
}
if (plugin.register == true && _user.registered == false) {
fail('unreg', m, this)
continue
}
m.isCommand = true
let xp = 'exp' in plugin ? parseInt(plugin.exp) : 17
if (xp > 9999999999999999999999) m.reply('Chirriador -_-')
else m.exp += xp
if (!isPrems && plugin.limit && global.db.data.users[m.sender].limit < plugin.limit * 1) {
let limit = `\`Acceso Denegado\`\nTus limites se han agotado`
conn.reply(m.chat, limit, m, adReply)
continue
}
if (plugin.level > _user.level) {
let level = `\`Acceso Denegado\`\n\nRequieres el nivel ${plugin.level}. Tu nivel es ${_user.level}`
conn.reply(m.chat, level, m, adReply)
continue
}
let extra = { match, usedPrefix, noPrefix, _args, args, command, text, conn: this, participants, groupMetadata, user, bot, isROwner, isOwner, isRAdmin, isAdmin, isBotAdmin, isPrems, isBans, chatUpdate }
try {
await plugin.call(this, m, extra)
if (!isPrems) m.limit = m.limit || plugin.limit || true
} catch (e) {
m.error = e
console.error(e)
if (e) {
let text = util.format(e)
if (e.name) for (let [jid] of global.owner.filter(([numbe]) =>   number)) {
let data = (await conn.onWhatsApp(jid))[0] || {}
if (data.exists) m.reply(`━━━━━ *「 Fallo en el Sistema 」*━━━━━━━
•> *Plugin:*  ${m.plugin}
•> *Remitente:* @${m.sender.split("@")[0]} *(wa.me/${m.sender.split("@")[0]})*
•> *Chat:* ${m.chat} 
•> *Comando:* ${usedPrefix + command}

*[!] Registro del error*

${text}

━━━━━ *「 Fallo en el Sistema 」*━━━━━━━`.trim(), data.jid)
}
m.reply(text)
}
} finally {
if (typeof plugin.after === 'function') {
try {
await plugin.after.call(this, m, extra)
} catch (e) {
console.error(e)
}
}
}
break
}
}
} catch (e) {
console.error(e)
} finally {
if (opts['queque'] && m.text) {
const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
if (quequeIndex !== -1) this.msgqueque.splice(quequeIndex, 1)
}
let user, stats = global.db.data.stats
if (m) {
if (m.sender && (user = global.db.data.users[m.sender])) {
user.exp += m.exp
user.limit -= m.limit * 1
}

let stat
if (m.plugin) {
let now = + new Date
if (m.plugin in stats) {
stat = stats[m.plugin]
if (!isNumber(stat.total)) stat.total = 1
if (!isNumber(stat.success)) stat.success = m.error != null ? 0 : 1
if (!isNumber(stat.last)) stat.last = now
if (!isNumber(stat.lastSuccess)) stat.lastSuccess = m.error != null ? 0 : now
} else stat = stats[m.plugin] = {
total: 1,
success: m.error != null ? 0 : 1,
last: now,
lastSuccess: m.error != null ? 0 : now
}
stat.total += 1
stat.last = now
if (m.error == null) {
stat.success += 1
stat.lastSuccess = now
}
}
}

try {
require('./function/print')(m, this)
} catch (e) {
console.log(m, m.quoted, e)
}
if (opts['autoread']) await this.chatRead(m.chat, m.isGroup ? m.sender : undefined, m.id || m.key.id).catch(() => { })
}
},
async participantsUpdate({ id, participants, action }) {
if (opts['self']) return

if (global.isInit) return
let chat = global.db.data.chats[id] || {}
let text = ''
switch (action) {
case 'add':
case 'remove':
if (chat.welcome) {
let groupMetadata = await this.groupMetadata(id) || (conn.chats[id] || {}).metadata
for (let user of participants) {
let pp = 'https://telegra.ph/file/24fa902ead26340f3df2c.png'
let name = await this.getName(user)
let gpname = await this.getName(id)
let member = groupMetadata.participants.length
pp: pp
try {
pp = await this.profilePictureUrl(user, 'image')
} catch (e) {
} finally {
text = (action === 'add' ? (`BIENVENIDO @user a ${gpname}\n\n${groupMetadata.desc}` || this.welcome || conn.welcome || 'Welcome, @user!').replace('@subject', await this.getName(id)).replace('@desc', groupMetadata.desc ? String.fromCharCode(8206).repeat(4001) + groupMetadata.desc : '') :
(chat.sBye || this.bye || conn.bye || 'Adios, @user!')).replace('@user', "@" + user.split("@")[0])
let wel = pp
let lea = pp                   
this.sendMessage(id, {
text: text,
contextInfo: {
mentionedJid: [user],
groupMentions: [],
isForwarded: true,
orwardedNewsletterMessageInfo: {
newsletterJid: '120363167110224268@newsletter',
newsletterName: wm,
serverMessageId: -1
},
forwardingScore: 256,
externalAdReply: {
title: action === 'add' ? `🔴 Bienvenido nuevo miembro <⁠(⁠￣⁠︶⁠￣⁠)⁠>\n• Nombre del grupo: ${gpname}` : `Se fue un miembro\n• Nombre del grupo: ${gpname}`,
body: `• Miembros totales: ${member}`,
thumbnailUrl: `https://api.popcat.xyz/welcomecard?background=https://telegra.ph/file/7b89441fc6b361b9a85c1.jpg&text1=Bienvenido&text2=%20&text3=Miembro&avatar=https://telegra.ph/file/24fa902ead26340f3df2c.png`,
sourceUrl: '',
mediaType: 1,
renderLargerThumbnail: true
}
}
})
}
}
}
break                          
case 'promote':
text = (chat.sPromote || this.spromote || conn.spromote || '@user ```ahora es administrador```')
case 'demote':
if (!text)
text = (chat.sDemote || this.sdemote || conn.sdemote || '@user ```ya no es administrador```')
text = text.replace('@user', '@' + participants[0].split('@')[0])
if (chat.detect)
this.sendMessage(id, {text: text})
break
}
},
async  delete(m) {
let chat = global.db.data.chats[m.chat]
if (chat.delete) return this.reply(m.chat, `
@${m.sender.split`@`[0]} eliminaste un mensaje`.trim(), m)
this.copyNForward(m.quoted, m.chat)
.catch(e => {
console.log(e, m)
})
},
async GroupUpdate({ jid, desc, descId, descTime, descOwner, announce, m }) {
if (!db.data.chats[jid].desc) return
if (!desc) return
let caption = `@${descOwner.split`@`[0]} ha cambiado la descripción del grupo.
${desc}`.trim()
this.sendMessage(jid, caption, { quoted: m })
}
},

global.dfail = (type, m, conn) => {
let fkontak = {"key": {"participants": "0@s.whatsapp.net","remoteJid": "status@broadcast","fromMe": false,"id": "Halo"},"message": {"contactMessage": {"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}},"participant": "0@s.whatsapp.net"}

    
  
    
let msg = {
rowner: `*• Modo propietario:* Esta función es solo para propietarios`,
owner: `*• Modo propietario:* Esta función es solo para propietarios`,
mods: `*• Modo moderador:* Esta función es solo para moderadores`,
group: `*• Modo grupo:* Esta función es solo para grupos`,
banned: `*• Modo prohibido:* Esta función es solo para usuarios prohibidos`,
private: `*• Modo de chat privado:* Esta función es solo para chat privado`,
admin: `*• Modo administrador:* Esta función es solo para administradores`,
botAdmin: `*• Modo de administrador de bot:* El bot debe ser administrador para utilizar esta función`,
restrict: `*• Modo restringido:* Esta función ha sido deshabilitada`
}[type]
if (msg) return conn.reply(m.chat, msg, fkontak, global.danied)
let msgg = {
unreg: '*• Se requiere registro:* No puede acceder antes de registrarse. Regístrese aquí utilizando el siguiente método.\n\n*[ MÉTODO DE REGISTRO ]*\n• .register Zam.17'
}[type]
if (msgg) return conn.reply(m.chat, msgg, fkontak, global.danied)
let msg2 = {
premium: `*• Modo Premium:* Esta función es sólo para usuarios premium.`
}[type]
if (msg2) return conn.reply(m.chat, msg2, fkontak, global.danied)
}
    

let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright("El archivo 'handler.js' fue modificado"))
delete require.cache[file]
if (global.reloadHandler) console.log(global.reloadHandler())
})