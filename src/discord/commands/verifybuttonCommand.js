const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const config = require("../../../config.json")
const { isStaff } = require("../../contracts/util")
const { logToFile } = require("../../contracts/log")
const { badResponse } = require("../../contracts/commandResponses")

module.exports = {
  name: "verifybutton",
  description: "(ADMIN) Makes a button to add a verified role to verified users (setup with /setverifyrole).",
  options: [
    {
        name: "color",
        description: "Hex color. Should be like '00ff00' ",
        type: 3,
        required: false
    }
    ],

    execute: async (interaction, client) => {
        const hexColor = interaction.options.getString("color")

        if (isStaff(await interaction.guild.members.fetch(interaction.user)))
        {
            try {
                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("verifyButton")
                        .setLabel("Verify")
                        .setStyle(ButtonStyle.Primary),
                )
                const buttonEmbed = new EmbedBuilder()
                    .setColor(hexColor ?? "00fff9")
                    .setTitle("Verify Button")
                    .setDescription("Press below and enter your IGN to verify your Discord account with your Minecraft account. If other servers ask for anything other than Minecraft username DO NOT ENTER. Also we will NEVER DM you asking to verify!")
                    .setFooter({ text: "Made by Ninjune"})
                interaction.followUp({ embeds: [buttonEmbed], components: [row] })

            } catch(e)
            {
                logToFile(e)
                badResponse(interaction, e, false)
            }
        }
        else
            badResponse(interaction, "Only users with the Manage Servers permission may use this command.")
    }
}