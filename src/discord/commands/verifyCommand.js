const { EmbedBuilder } = require("discord.js")
const config = require("../../../config.json")
const axios = require("axios")
const fs = require("node:fs")
const { getMojangData } = require("../../contracts/api")
const { badResponse, response } = require("../../contracts/commandResponses")
const { logToFile } = require("../../contracts/log")
const { verify } = require("../../contracts/verify")

module.exports = {
    name: "verify",
    description: "Verifies that Hypixel Discord social and current Discord user are the same.",
    options: [
    {
        name: "name",
        description: "Minecraft Username",
        type: 3,
        required: true
    }
    ],

    execute: async (interaction, client) => {
        const name = interaction.options.getString("name")

        const verifyResponse = await verify(interaction.guild, name, interaction.member) 
        if(verifyResponse.code === 200)
            response(interaction, "Successfully verified.", {title: "Success", ephemeral: true, color: 0x00ff00})
        else
            response(interaction, verifyResponse.message, { title: "Error", color: 0xff0000 })
    }
}