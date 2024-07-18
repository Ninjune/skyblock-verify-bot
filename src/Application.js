// Written by DuckySoLucky or Senither
const DiscordManager = require("./discord/DiscordManager")

class Application {
    async register() {
        this.discord = new DiscordManager(this)
    }

    async connect() {
        this.discord.connect()
    }
}

function startDiscord()
{
    const app = new Application()

    app.register().then(() => {
        app.connect()
    }).catch(error => {
        console.error(error)
    })
}

module.exports = { startDiscord }