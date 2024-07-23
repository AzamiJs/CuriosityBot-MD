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
const ytMsg = `\`YouTube - Curiosity\`\n\nTítulo del video: _${search.all[0].title}_\nCantidad de visualizaciones: _${search.all[0].views}_\nEnlace del video: ${search.videos[0].url}\n> Enviando audio`
m.reply(ytMsg)
await conn.sendMessage(m.chat, { audio: {url: dl_url}, mimetype: 'audio/mpeg'}, {quoted: m})
} catch (e) {
return m.reply('🚩 *Ocurrió un fallo' + '\n\n> ' + e)
}

}
handler.help = ['play']
handler.tags = ['downloader']
handler.command = /^(play)$/i

module.exports = handler
