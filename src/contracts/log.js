const fs = require("node:fs")
const logFile = `./logs/log-${new Date().toISOString().replace(":","-")}.txt`
fs.writeFileSync(logFile, "");
const util = require("util")
logToFile("Log file created: " + logFile)

function logToFile(message)
{
    const date = new Date()
    const newMessage = `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] ${message}`

    console.log(newMessage)
    fs.appendFileSync(logFile, newMessage + "\r\n")
}

function dirToFile(object, message = "")
{
    const date = new Date()
    const newMessage = `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] Dir below with message: ${message}`

    console.log(newMessage)
    console.dir(object)
    fs.appendFileSync(logFile, newMessage + "\r\n")
    fs.appendFileSync(logFile, util.inspect(object) + "\r\n")
}

module.exports = { logToFile, dirToFile }