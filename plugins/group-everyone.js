let handler = async (m, { conn, text, participants }) => {

const fkontak = {"key":{"participants":"0@s.whatsapp.net","remoteJid":"status@broadcast","fromMe":false,"id":"Halo"},"message":{"contactMessage":{"vcard":`BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}},"participant":"0@s.whatsapp.net"};
let p = `El administrador los invoca`
conn.sendMessage(m.chat,{text:p,mentions:participants.map(a=>a.id)},{quoted:fkontak})

}
handler.help = ['*@everyone*']
handler.tags = ['group']
handler.customPrefix = /^@everyone$/i
handler.command = new RegExp
handler.group = true

module.exports = handler

function getDateTime(){let date = new Date();let day = date.toLocaleDateString('id-ID',{weekday:'long'});let month = date.toLocaleDateString('id-ID',{month:'long'});let dayOfMonth = date.getDate();let year = date.getFullYear();let hours = date.getHours();let minutes = date.getMinutes();let seconds = date.getSeconds();let time = hours+':'+minutes+':'+seconds;let dateTime = day+', '+dayOfMonth+' '+month+' '+year+' '+time;return dateTime;}