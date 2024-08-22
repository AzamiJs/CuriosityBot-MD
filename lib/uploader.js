let axios = require('axios')
let BodyForm = require('form-data')
let { fromBuffer } = require('file-type')
let fetch = require('node-fetch')
let fs = require('fs')
let cheerio = require('cheerio')

async function TelegraPh(Path) {
if (!fs.existsSync(Path)) throw new Error('File not Found')
const form = new BodyForm()
form.append('file', fs.createReadStream(Path))
let { data } = await axios.post('https://telegra.ph/upload', form, { headers: form.getHeaders() })
return 'https://telegra.ph' + data[0].src
}

async function UploadFileUgu(input) {
const form = new BodyForm()
form.append('files[]', fs.createReadStream(input))
let { data } = await axios.post('https://uguu.se/upload.php', form, {
headers: {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
...form.getHeaders()
}

})
return data.files[0]
}

async function webp2mp4File(path) {
const form = new BodyForm()
form.append('new-image-url', '')
form.append('new-image', fs.createReadStream(path))
let { data } = await axios.post('https://s6.ezgif.com/webp-to-mp4', form, { headers: { 'Content-Type': `multipart/form-data; boundary=${form._boundary}` } })
const $ = cheerio.load(data)
const file = $('input[name="file"]').attr('value')
let { data: data2 } = await axios.post(`https://ezgif.com/webp-to-mp4/${file}`, form, { headers: { 'Content-Type': `multipart/form-data; boundary=${form._boundary}` } })
const $$ = cheerio.load(data2)
const result = 'https:' + $$('div#output > p.outfile > video > source').attr('src')
return { status: true, message: 'Created By MRHRTZ', result }
}

async function floNime(medianya, options = {}) {
const { ext } = await fromBuffer(medianya) || options.ext
let form = new BodyForm()
form.append('file', medianya, 'tmp.' + ext)
let jsonnya = await fetch('https://flonime.my.id/upload', { method: 'POST', body: form }).then(response => response.json())
return jsonnya
}

module.exports = { TelegraPh, UploadFileUgu, webp2mp4File, floNime }
