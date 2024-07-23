const express = require('express')
const os = require('os')
const { spawn } = require('child_process')
const path = require('path')
const fs = require('fs')
const CFonts = require('cfonts')
const chalk = require('chalk')

const app = express()
const port = 3009
const namebot = 'Curiosity\nBot'
const nameowner = 'Zam'
function displayHeader() {
    
CFonts.say(namebot, {
font: 'simple',
align: 'center',
colors: ['green'],
background: 'transparent',
letterSpacing: '0'
})
CFonts.say('Made by Zam', {
font: 'console',
align: 'center',
colors: ['white'],
background: 'transparent',
letterSpacing: '0'
})
console.log(chalk.white.bold(`
- 📱 Plataforma: ${os.platform()}
- 🏛️ Arquitectura: ${os.arch()}
- 💻 Memoria total: ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB
- 🚀 Memoria: ${(os.freemem() / 1024 / 1024).toFixed(2)} MB
`))
}

displayHeader()
console.clear()
app.get('/', (req, res) => {
res.setHeader('Content-Type', 'application/json')
const data = {
status: 'true',
message: `${namebot} ahora esta corriendo`,
author: nameowner
}

const result = {
response: data
}
res.send(JSON.stringify(result, null, 2))
})

app.listen(port, () => {
console.log(`El servidor se está ejecutando en el puerto ${port}`)
})

let isRunning = false

function start(file) {
if (isRunning) return
isRunning = true

const args = [path.join(__dirname, file), ...process.argv.slice(2)]
const p = spawn(process.argv[0], args, {
stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
})

p.on('message', (data) => {
console.log(`[ ${namebot} ]${data}`);
switch (data) {
case 'reset':
p.kill()
isRunning = false
start.apply(this, arguments)
break
case 'uptime':
p.send(process.uptime())
break
}
})
p.on('exit', (code) => {
isRunning = false;
console.error(`❌ El sistema del bot se detuvo con código: ${code}`)

if (code === 0) return

fs.watchFile(args[0], () => {
fs.unwatchFile(args[0])
start('start.js')
})
})

p.on('error', (err) => {
console.error('\x1b[31m%s\x1b[0m', `Error: ${err}`)
p.kill()
isRunning = false
start('start.js')
})

const pluginsFolder = path.join(__dirname, 'plugins');
fs.readdir(pluginsFolder, (err, files) => {
if (err) {
console.error(`Error al leer la carpeta plugins: ${err}`)
return
}
displayHeader()
})

setInterval(() => {}, 1000)
}

start('start.js')

process.on('unhandledRejection', () => {
console.error('\x1b[31m%s\x1b[0m', 'Unhandled promise rejection. Script will restart...')
start('start.js')
})

process.on('exit', (code) => {
console.error(`Salió con código: ${code}`)
console.error('El index se reiniciará...')
start('start.js')
})