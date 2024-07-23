async function isUrl(url) {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

let handler = async (m, {conn, text, args, usedPrefix, command }) => {
if (!text) throw `🚩 *Ingrese el enlace de un repositorio de GitHub*\n\nEjemplo, ${usedPrefix + command} ${giturl}`
if (!text.includes('github.com')) return m.reply('🚩 *Enlace incorrecto*')
m.reply(wait)
try {
let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let [, user, repo] = args[0].match(regex1) || []
repo = repo.replace(/.git$/, '')
let urlGit = `https://api.github.com/repos/${user}/${repo}/zipball`
let filename = (await fetch(urlGit, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
conn.sendMessage(m.chat, { document: { url: urlGit }, fileName: filename+'.zip', mimetype: 'application/zip' }, { quoted: m }).catch((err) => m.reply('error'))
db.data.users[m.sender].limit -1
m.reply('💎 Un límite usado')
} catch (e) {
return m.reply('🚩 *Ocurrió un fallo*' + '\n\n> ' + e)}

}
handler.help = ['gitclone']
handler.tags = ['downloader']
handler.command = /gitclone/i

handler.limit = true
handler.register = false

module.exports = handler