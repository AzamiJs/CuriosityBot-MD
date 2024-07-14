//Código elaborado por Zam (Azamijs)
require('./store.js')
const { default: makeWASocket,  generateWAMessage,  downloadContentFromMessage,  emitGroupParticipantsUpdate,  emitGroupUpdate,  makeInMemoryStore,  prepareWAMessageMedia, MediaType,  WAMessageStatus, AuthenticationState, GroupMetadata, initInMemoryKeyStore, MiscMessageGenerationOptions,  useMultiFileAuthState, BufferJSON,  WAMessageProto,  MessageOptions,	 WAFlag,  WANode,	 WAMetric,	 ChatModification,  MessageTypeProto,  WALocationMessage, ReconnectMode,  WAContextInfo,  proto,	 WAGroupMetadata,  ProxyAgent,	 waChatKey,  MimetypeMap,  MediaPathMap,  WAContactMessage,  WAContactsArrayMessage,  WAGroupInviteMessage,  WATextMessage,  WAMessageContent,  WAMessage,  BaileysError,  WA_MESSAGE_STATUS_TYPE,  MediaConnInfo,   generateWAMessageContent, URL_REGEX,  Contact, WAUrlInfo,  WA_DEFAULT_EPHEMERAL,  WAMediaUpload,  mentionedJid,  processTime,	 Browser,  MessageType,  Presence,  WA_MESSAGE_STUB_TYPES,  Mimetype,  relayWAMessage,	 Browsers,  GroupSettingChange,  delay,  DisconnectReason,  WASocket,  getStream,  WAProto,  isBaileys,  AnyMessageContent,  generateWAMessageFromContent, fetchLatestBaileysVersion,  processMessage,  processingMutex,  jidDecode,  areJidsSameUser } = require('@whiskeysockets/baileys')
let pino = require('pino')
const fs = require('fs')
const axios = require('axios')
const { exec, spawn, execSync } = require('child_process')
const speed = require('performance-now')
const chalk = require('chalk')
const cfonts = require('cfonts') 
const yargs = require('yargs/yargs')
const _ = require('lodash')
const moment = require('moment')
const gradient = require('gradient-string')
const readline = require('readline')
const { tmpdir } = require('os')
const { join } = require('path')
const PhoneNumber = require('awesome-phonenumber')
const { smsg, sleep } = require('./lib/simple')
const { readdirSync, statSync, unlinkSync } = require('fs')
const { say } = cfonts
const color = (text, color) => {
return !color ? chalk.green(text) : color.startsWith('#') ? chalk.hex(color)(text) : chalk.keyword(color)(text)
}
const question = (text) => {
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout })
return new Promise((resolve) => {
rl.question(text, resolve)
})}
const usePairingCode = true
const girastamp = speed()
const latensi = speed() - girastamp
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
async function connectToWhatsApp() {
const { state, saveCreds } = await useMultiFileAuthState(global.session)
const { version, isLatest } = await fetchLatestBaileysVersion()
const colores = chalk.bold.white
const opcionQR = chalk.blueBright
const opcionTexto = chalk.cyan
const marco = chalk.yellow
const nameb = chalk.blue.bgBlue.bold.cyan
const methodCodeQR = process.argv.includes('qr')
const MethodMobile = process.argv.includes('mobile')
const ini = chalk.green
let opcion
const options = {
font: 'simple3d', // Cambia a la fuente deseada (por ejemplo: console, block, simpleBlock, simple, 3d, simple3d, chrome, huge, shade, slick, grid, pallet, tiny)
align: 'center',
colors: ['magenta', 'yellow'],
}
const custom = cfonts.render('Curiosity Bot MD', options)
console.log(custom.string)
if (!fs.existsSync(`./${session}/creds.json`) && !methodCodeQR) {
while (true) {
opcion = await question(marco('*************************\n') + nameb('CuriosityBot-MD\n') + marco('*************************\n') + colores('Seleccione una opción:\n') + opcionQR('1. Con código QR\n') + opcionTexto('2. Con código de emparejamiento\n'))
if (opcion === '1' || opcion === '2') {
break
} else {
console.log(chalk.redBright('Por favor, seleccione solo 1 o 2.'))
}}
opcion = opcion
}
console.info = () => {}
const client = makeWASocket({
version,  
logger: pino({ level: 'silent'}),
printQRInTerminal: opcion == '1' ? true : false,
qrTimeout: 180000,
browser: ['Ubuntu', 'Edge', '20.0.04'],
auth: state
})
if (opcion === '2') {
if (usePairingCode && !client.authState.creds.registered) {
const phoneNumber = await question(chalk.blueBright('Ingrese su número de WhatsApp todo junto\n') + chalk.greenBright('Ejemplo: 521729999\n'))
const code = await client.requestPairingCode(phoneNumber.trim())
console.log(chalk.bold.cyanBright(`Codigo de emparejamiento:`), chalk.bold.white(`${code}`))
}}
client.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}
client.ev.on('chats.set', () => {
console.log('Estableciendo conversaciones...')
})
client.ev.on('contacts.set', () => {
console.log('Estableciendo contactos...')
})
client.ev.on('creds.update', saveCreds)
client.ev.on('messages.upsert', async ({ messages }) => {
try {
m = messages[0]
if (!m.message) return
m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
if (m.key && m.key.remoteJid === 'status@broadcast') return
if (!client.public && !m.key.fromMe && messages.type === 'notify') return
if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
m = smsg(client, m)
require('./curiosity')(client, m, messages)
} catch (err) {
console.log(err)
}
})
  
var low
try {
low = require('lowdb')
} catch (e) {
low = require('./lib/lowdb')}
const { Low, JSONFile } = low
const mongoDB = require('./lib/mongoDB')
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(
/https?:\/\//.test(opts['db'] || '') ?
new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
new mongoDB(opts['db']) :
new JSONFile('database.json')
)
global.DATABASE = global.db
global.loadDatabase = async function loadDatabase() {
if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
if (global.db.data !== null) return
global.db.READ = true
await global.db.read()
global.db.READ = false 
global.db.data = {
users: {},
chats: {},
...(global.db.data || {})}
global.db.chain = _.chain(global.db.data)}
loadDatabase()
if (global.db) setInterval(async () => {
if (global.db.data) await global.db.write()
}, 1 * 1000)
function clearTmp() {
const tmp = [tmpdir(), join(__dirname, './tmp')]
const filename = []
tmp.forEach((dirname) => readdirSync(dirname).forEach((file) => filename.push(join(dirname, file))))
return filename.map((file) => {
const stats = statSync(file)
if (stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 3)) {
return unlinkSync(file)
}
return false
})}
if (!opts['test']) { 
if (global.db) { 
setInterval(async () => { 
if (global.db.data) await global.db.write() 
if (opts['autocleartmp'] && (global.support || {}).find) (tmp = [os.tmpdir(), 'tmp'], tmp.forEach((filename) => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])))
}, 30 * 1000)
}}
setInterval(async () => {
await clearTmp()
console.log(`\nBasura eliminada\n`)}, 180000)
if (global.db && global.db.data && global.db.data.users && global.db.data.users[anu.participants]) {
var idioma = global.db.data.users[anu.participants]?.lenguaje || 'es'
} else {
var idioma = 'es'
}
try {
var _welcome = JSON.parse(fs.readFileSync(`./lib/idiomas/${idioma}.json`))
} catch (error) {
console.error('Error:', error)
}
  
client.ev.on('groups.update', async (json) => {
console.log(color(json, '#009FFF'))
const res = json[0]
if (res.announce == true) {
await sleep(2000)
try {
ppgroup = await client.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppgroup = 'https://qu.ax/OEgX.jpg'
}
const ac = _welcome.index.actions
let text = ac.text1
client.sendContextInfoIndex(res.id, text, fkontak)
} else if (res.announce == false) {
await sleep(2000)
try {
ppgroup = await client.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppgroup = 'https://qu.ax/OEgX.jpg'
}
let text = ac.text2
client.sendContextInfoIndex(res.id, text, fkontak)
} else if (res.restrict == true) {
await sleep(2000)
try {
ppgroup = await client.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppgroup = 'https://qu.ax/OEgX.jpg'
}
let text = ac.text3
client.sendContextInfoIndex(res.id, text, fkontak)
} else if (res.restrict == false) {
await sleep(2000)
try {
ppgroup = await client.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppgroup = 'https://qu.ax/OEgX.jpg'
}
let text = ac.text4
client.sendContextInfoIndex(res.id, text, fkontak)
} else if(!res.desc == ''){
await sleep(2000)
try {
ppgroup = await client.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppgroup = 'https://qu.ax/OEgX.jpg'
}
let text = `${ac.text5}\n${res.desc}`
client.sendContextInfoIndex(res.id, text, fkontak)
} else {
await sleep(2000)
try {
ppgroup = await client.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppgroup = 'https://qu.ax/OEgX.jpg'
}
let text = `${ac.text6}\n${res.subject}`
client.sendContextInfoIndex(res.id, text, fkontak)
}})
client.ev.on('group-participants.update', async (anu) => {
const wel = _welcome.index.welcome
const bye = _welcome.index.bye
const pd = _welcome.index.actions
try {
let metadata = await client.groupMetadata(anu.id)
let participants = anu.participants
for (let num of participants) {
try {
ppuser = await client.profilePictureUrl(num, 'image')
} catch {
ppuser = 'https://qu.ax/OEgX.jpg'
}
try {
ppgroup = await client.profilePictureUrl(anu.id, 'image')
} catch {
ppgroup = 'https://qu.ax/OEgX.jpg'
}
if (anu.action == 'add') {
client.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `${wel.text1} *@${num.split('@')[0]}* ${wel.text1} *${metadata.subject}*`})
} else if (anu.action == 'remove') {
client.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `🍟 *@${num.split('@')[0]}* ${bye.text1}`})
} else if (anu.action == 'promote') {
let usuario = anu.author
client.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num, usuario], caption: `🚩 *@${num.split('@')[0]}* ${pd.text7}\n\n> Acción hecha por @${usuario.split("@")[0]}`})
} else if (anu.action == 'demote') {
let usuario = anu.author
client.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num, usuario], caption: `🚩 *@${num.split('@')[0]}* ${pd.text8}\n\n> Acción hecha por @${usuario.split("@")[0]}`})
}
}
} catch (err) {
console.log(err)
}
})
client.sendText = (jid, text, quoted = '', options) => client.sendMessage(jid, { text: text, ...options }, { quoted })
client.sendContactArray = (jid, data, quoted, options) => client.sendMessage(jid, { contacts: { displayName: (Array.isArray(data[0]) ? data[0][1] : data.length > 1 ? '2013 kontak' : data[0].displayName) || null, contacts: (Array.isArray(data[0]) ? data : [data]).map(([number, name, isi, isi1, isi2, isi3, isi4, isi5]) => ({ vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:${name.replace(/\n/g, '\\n')}\nitem.ORG:${isi}\nitem1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}\nitem1.X-ABLabel:${isi1}\nitem2.EMAIL;type=INTERNET:${isi2}\nitem2.X-ABLabel:📧 Email\nitem3.ADR:;;${isi3};;;;\nitem3.X-ABADR:ac\nitem3.X-ABLabel:📍 Region\nitem4.URL:${isi4}\nitem4.X-ABLabel:Website\nitem5.X-ABLabel:${isi5}\nEND:VCARD`.trim(), displayName: name })) }}, { quoted, ...options })
client.ev.on('connection.update', (update) => {
const { connection, lastDisconnect, receivedPendingNotifications, isNewLogin} = update
console.log(receivedPendingNotifications)
if (connection == 'connecting') {
console.log('🚀 Iniciando...')
}
 
if (update.isNewLogin) {
console.log(ini(`Conexion exitosa`))
}
})
client.public = true
store.bind(client.ev)
client.ev.on('creds.update', saveCreds)
process.on('uncaughtException', console.log)
process.on('unhandledRejection', console.log)
process.on('RefenceError', console.log)
}
connectToWhatsApp()
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})
