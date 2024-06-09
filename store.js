const fs = require('fs')
const chalk = require('chalk')

global.owner = [
['5214434703586', true], 
['51929972576'],
['573147616444'], 
['5492266613038']]

global.wm = '© CuriosityBot-MD'
global.prefa = '.'
global.session = 'session'
global.vs = '1.0.0'
global.author = 'zam'

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Actualización '${__filename}'`))
delete require.cache[file]
require(file)
})
