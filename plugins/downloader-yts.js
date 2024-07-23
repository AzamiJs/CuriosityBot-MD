const yts = require('yt-search')
const handler = async (m, { conn, command, text, usedPrefix }) => {

if (!text) return m.reply(`🚩 *Ingrese el título de un vídeo*\n\nEjemplo, .yts CuriosityBot-MD`)
let ress = await yts(`${text}`)
let armar = ress.all
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
m.reply(teks2)
.catch((err) => {
m.reply('🚩 *Ocurrió un fallo*')
})
}
handler.help = ['yts']
handler.tags = ['downloader']
handler.command = /^(yts)$/i

module.exports = handler