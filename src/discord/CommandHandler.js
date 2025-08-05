/*
Updated by Ninjune on 10/30/22
- Updated applications command.
Written by DuckySoLucky or Senither on ?/?/??
*/
const { Routes } = require("discord-api-types/v9")
const config = require("../../config.json")
const { REST } = require("@discordjs/rest")
const fs = require("fs")

class CommandHandler {
    constructor(discord) {
        this.discord = discord

        const commands = []
        const _commandFiles = fs.readdirSync("src/discord/commands").filter(file => file.endsWith(".js"))

        for (const file of _commandFiles) {
            const command = require(`./commands/${file}`)
            commands.push(command)
        }
        const rest = new REST({ version: "10" }).setToken(config.discord.token)

        rest.put(Routes.applicationCommands(config.discord.clientID), { body: commands }).catch(console.error)
    }
}

module.exports = CommandHandler