let handler = async (m, {conn, groupMetadata }) => {
conn.reply(m.chat, `${await groupMetadata.id}`, m)

}
handler.help = ['getid']
handler.tags = ['group']
handler.command = /^(getid|idgc|gcid)$/i

handler.restrict = false

module.exports = handler