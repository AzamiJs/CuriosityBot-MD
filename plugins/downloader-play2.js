const yts = require('yt-search')
const { youtubedl, youtubedlv2 } = require('@bochilteam/scraper')
const handler = async (m, { conn, command, text, usedPrefix }) => {

if (!text) return m.reply('🚩 *Ingrese el título de un vídeo*\n\nEjemplo, !play Those Eyes')
m.reply(wait)
const search = await yts(`${text}`)
const data = await search.all.filter((v) => v.type == 'video')
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
conn.sendMessage(m.chat, { audio: {url: dl_url}, mimetype: 'audio/mpeg'}, {quoted: m})
} catch (e) {
return m.reply('🚩 *Ocurrió un fallo*' + '\n\n> ' + e)
}

}
handler.help = ['play2']
handler.tags = ['downloader']
handler.command = /^(play2)$/i

module.exports = handler
