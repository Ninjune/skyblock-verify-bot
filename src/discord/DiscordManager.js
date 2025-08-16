// Written by DuckySoLucky or Senither
const { Client, Collection, GatewayIntentBits } = require("discord.js")
const StateHandler = require("./handlers/StateHandler")
const CommandHandler = require("./CommandHandler")
const config = require("../../config.json")
const path = require("node:path")
const fs = require("fs")
const { logToFile } = require("../contracts/log")


class DiscordManager {
    constructor(app) {
        this.app = app

        this.stateHandler = new StateHandler(this)
        this.commandHandler = new CommandHandler(this)
    }

    async connect() {
        global.client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })
        this.client = client
        this.client.on("ready", () => this.stateHandler.onReady())

        this.client.login(config.discord.token).catch(error => {logToFile("Error logging into disc (check token): " + error)})

        client.commands = new Collection()
        const commandFiles = fs.readdirSync("src/discord/commands").filter(file => file.endsWith(".js"))

        for (const file of commandFiles) {
            const command = require(`./commands/${file}`)
            client.commands.set(command.name, command)
        }

        const eventsPath = path.join(__dirname, "events")
        const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"))

        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file)
            const event = require(filePath)
            if (event.once) {client.once(event.name, (...args) => event.execute(...args))}
            else {client.on(event.name, (...args) => event.execute(...args))}
        }

        process.on("SIGINT", () => { process.exit() })
    }
}

module.exports = DiscordManager
