const fs = require('fs')
const chalk = require('chalk')

global.owner = [
['5214434703586', true]
]

global.wm = '© CuriosityBot-MD'
global.prefa = '.'
global.session = 'session'
global.vs = '2.0.0'
global.author = 'zam'
global.lolkey = 'GataDiosV2'

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Actualización '${__filename}'`))
delete require.cache[file]
require(file)
})
