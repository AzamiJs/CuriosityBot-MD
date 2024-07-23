(async() => { 
require('./settings')
const { useMultiFileAuthState, DisconnectReason, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeCacheableSignalKeyStore, makeInMemoryStore, jidDecode, PHONENUMBER_MCC, fetchLatestBaileysVersion, proto } = require('@whiskeysockets/baileys')
const WebSocket = require('ws')
const path = require('path')
const pino = require('pino')
const fs = require('fs')
const yargs = require('yargs/yargs')
const cp = require('child_process')
let { promisify } = require('util')
let exec = promisify(cp.exec).bind(cp)
const _ = require('lodash')
const syntaxerror = require('syntax-error')
const os = require('os')
const moment = require('moment-timezone')
const time = moment.tz('Asia/Jakarta').format("HH:mm:ss")
const chalk = require('chalk')
const readline = require('readline')
const { color } = require('./function/color')
let simple = require('./function/simple')
var low
try {
low = require('lowdb')
} catch (e) {
low = require('./function/lowdb')
}
const { Low, JSONFile } = low
const mongoDB = require('./function/mongoDB')

const useStore = !process.argv.includes('--store')
const usePairingCode = process.argv.includes('--code') || process.argv.includes('--pairing')
const useMobile = process.argv.includes('--mobile')
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))

API = (name, path = '/', query = {}, apikeyqueryname) => (name in APIs ? APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: APIKeys[name in APIs ? APIs[name] : name] } : {}) })) : '')

timestamp = {
start: new Date
}

const PORT = process.env.PORT || 3000

opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
prefix = new RegExp('^[' + (opts['prefix'] || 'â€ŽxzXZ/i!#$%+Â£Â¢â‚¬Â¥^Â°=Â¶âˆ†Ã—Ã·Ï€âˆšâœ“Â©Â®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

db = new Low(
/https?:\/\//.test(opts['db'] || '') ?
new cloudDBAdapter(opts['db']) : /mongodb/i.test(opts['db']) ?
new mongoDB(opts['db']) :
new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`)
)

DATABASE = db
loadDatabase = async function loadDatabase() {
if (db.READ) return new Promise((resolve) => setInterval(function () { (!db.READ ? (clearInterval(this), resolve(db.data == null ? loadDatabase() : db.data)) : null) }, 1 * 1000))
if (db.data !== null) return
db.READ = true
await db.read()
db.READ = false
db.data = { users: {}, chats: {}, stats: {}, msgs: {}, sticker: {}, settings: {}, respon : {}, ...(db.data || {})  }
db.chain = _.chain(db.data)
}
loadDatabase()

const authFile = `session`
global.isInit = !fs.existsSync(authFile)
const { state, saveState, saveCreds } = await useMultiFileAuthState(authFile)
const { version, isLatest } = await fetchLatestBaileysVersion()

const connectionOptions = { printQRInTerminal: !isPairing, syncFullHistory: true, markOnlineOnConnect: true, connectTimeoutMs: 60000, defaultQueryTimeoutMs: 0,	keepAliveIntervalMs: 10000,	generateHighQualityLinkPreview: true,	patchMessageBeforeSending: (message) => {
const requiresPatch = !!(
message.buttonsMessage || message.templateMessage || message.listMessage	)
if (requiresPatch) { message = { viewOnceMessage: { message: { messageContextInfo: { deviceListMetadataVersion: 2, deviceListMetadata: {},}, ...message, },},}}
return message
},
version: (await (await fetch('https://raw.githubusercontent.com/WhiskeySockets/Baileys/master/src/Defaults/baileys-version.json')).json()).version,
browser: ['Ubuntu', 'Chrome', '20.0.04'],
logger: pino({ level: 'fatal' }),
auth: { 
creds: state.creds, 
keys: makeCacheableSignalKeyStore(state.keys, pino().child({ 
level: 'silent', 
stream: 'store' 
})), 
},
}

const getMessage = async key => {
const messageData = await store.loadMessage(key.remoteJid, key.id);
return messageData?.message || undefined;
}

global.conn = simple.makeWASocket(connectionOptions)
conn.isInit = false

if (!opts['test']) {
if (global.db) setInterval(async () => {
if (global.db.data) await global.db.write()
if (!opts['tmp'] && (global.support || {}).find) (tmp = [os.tmpdir(), 'tmp'], tmp.forEach(filename => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])))
}, 30 * 1000)
}

async function connectionUpdate(update) {
const { connection, lastDisconnect } = update
global.timestamp.connect = new Date
if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut && conn.ws.readyState !== WebSocket.CONNECTING) {
console.log(global.reloadHandler(true))
}
if (global.db.data == null) await loadDatabase()
}
if ((usePairingCode || useMobile) && fs.existsSync('./konek/creds.json') && !conn.authState.creds.registered) {
console.log(chalk.yellow('-- WARNING: creds.json is broken, please delete it first --'))
process.exit(0)
}
if (isPairing && !conn.authState.creds.registered) {
if (useMobile) throw new Error('No se puede utilizar la API de emparejamiento de Baileys!')
const { registration } = { registration: {} }
let phoneNumber = ''
do {
phoneNumber = await question(chalk.yellowBright('Ingrese un número válido, con Región: 62xxx:\nEjemplo: 6285888777444\n'))
} while (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v)))
rl.close()
phoneNumber = phoneNumber.replace(/\D/g,'')
console.log(chalk.bgWhite(chalk.blue('Espera un momento...')))
setTimeout(async () => {
let code = await conn.requestPairingCode(phoneNumber)
code = code?.match(/.{1,4}/g)?.join('-') || code
console.log(chalk.black(chalk.bgGreen(`Tu código de emparejamiento: `)), chalk.black(chalk.white(code)))
}, 3000)
}

process.on('uncaughtException', console.error)

let isInit = true, handler = require('./handler')
reloadHandler = function (restatConn) {
let Handler = require('./handler')
if (Object.keys(Handler || {}).length) handler = Handler
if (restatConn) {
try { conn.ws.close() } catch { }
conn = {
...conn, ...simple.makeWASocket(connectionOptions)
}
}
if (!isInit) {
conn.ev.off('messages.upsert', conn.handler)
conn.ev.off('group-participants.update', conn.onParticipantsUpdate)
conn.ev.off('message.delete', conn.onDelete)
conn.ev.off('connection.update', conn.connectionUpdate)
conn.ev.off('creds.update', conn.credsUpdate)
}

conn.welcome = 'BIENVENIDO @user 👋' 
conn.bye = 'Adiós @user 👋'
conn.spromote = '@user ahora es administrador!'
conn.sdemote = '@user ahora no es administrador!'
conn.handler = handler.handler.bind(conn)
conn.onParticipantsUpdate = handler.participantsUpdate.bind(conn)
conn.onDelete = handler.delete.bind(conn)
conn.connectionUpdate = connectionUpdate.bind(conn)
conn.credsUpdate = saveCreds.bind(conn)

conn.ev.on('messages.upsert', conn.handler)
conn.ev.on('group-participants.update', conn.onParticipantsUpdate)
conn.ev.on('message.delete', conn.onDelete)
conn.ev.on('connection.update', conn.connectionUpdate)
conn.ev.on('creds.update', conn.credsUpdate)
isInit = false
return true
}

let pluginFolder = path.join(__dirname, 'plugins')
let pluginFilter = filename => /\.js$/.test(filename)
features = {}
for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
try {
features[filename] = require(path.join(pluginFolder, filename))
} catch (e) {
conn.logger.error(e)
delete features[filename]
}
}
console.log(Object.keys(features))
reload = (_ev, filename) => {
if (pluginFilter(filename)) {
let dir = path.join(pluginFolder, filename)
if (dir in require.cache) {
delete require.cache[dir]
if (fs.existsSync(dir)) conn.logger.info(`re - require plugin '${filename}'`)
else {
conn.logger.warn(`deleted plugin '${filename}'`)
return delete features[filename]
}
} else conn.logger.info(`requiring new plugin '${filename}'`)
let err = syntaxerror(fs.readFileSync(dir), filename)
if (err) conn.logger.error(`syntax error while loading '${filename}'\n${err}`)
else try {
features[filename] = require(dir)
} catch (e) {
conn.logger.error(`error require plugin '${filename}\n${e}'`)
} finally {
features = Object.fromEntries(Object.entries(features).sort(([a], [b]) => a.localeCompare(b)))
}
}
}
Object.freeze(reload)
fs.watch(path.join(__dirname, 'plugins'), reload)
reloadHandler()

async function _quickTest() {
let test = await Promise.all([
cp.spawn('ffmpeg'),
cp.spawn('ffprobe'),
cp.spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
cp.spawn('convert'),
cp.spawn('magick'),
cp.spawn('gm'),
cp.spawn('find', ['--version'])
].map(p => {
return Promise.race([
new Promise(resolve => {
p.on('close', code => {
resolve(code !== 127)
})
}),
new Promise(resolve => {
p.on('error', _ => resolve(false))
})
])
}))
let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
console.log(test)
let s = support = {
ffmpeg, ffprobe,
ffmpegWebp, convert,
magick, gm, find
}
Object.freeze(support)

if (!s.ffmpeg) conn.logger.warn('Please install ffmpeg for sending videos (pkg install ffmpeg)')
if (s.ffmpeg && !s.ffmpegWebp) conn.logger.warn('Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)')
if (!s.convert && !s.magick && !s.gm) conn.logger.warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)')
}

_quickTest()
.then(() => conn.logger.info('Prueba rápida realizada'))
.catch(console.error)
  
console.log(color(time,"white"),color("Connecting...","aqua"))
})()