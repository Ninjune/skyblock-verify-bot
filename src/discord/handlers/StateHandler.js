// Written by DuckySoLucky or Senither on ?/?/??
const config = require("../../../config.json")
const { logToFile } = require("../../contracts/log")
const { ActivityType } = require("discord.js")

class StateHandler {
    constructor(discord) {
        this.discord = discord
    }

    async onReady() {
        logToFile("Client ready, logged in as " + this.discord.client.user.tag)
        this.discord.client.user.setStatus("online")
        global.uptime = new Date().getTime()
    }
}

module.exports = StateHandler
