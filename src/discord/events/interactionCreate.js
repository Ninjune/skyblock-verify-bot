const { EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require("discord.js")
const { logToFile } = require("../../contracts/log")
const { response, badResponse } = require("../../contracts/commandResponses")
const { verify } = require("../../contracts/verify")

module.exports = {
	name: "interactionCreate",
	async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            await interaction.deferReply({ ephemeral: false }).catch(() => { })

            const command = interaction.client.commands.get(interaction.commandName)
            if (!command) return

            try {
                await command.execute(interaction, interaction.client)
            } catch (error) {
                logToFile(error)
                await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true })
            }
        }
        else if (interaction.isButton())
        {
            if(interaction.customId == "verifyButton")
            {
                const modal = new ModalBuilder()
                    .setCustomId("verifyModal")
                    .setTitle("Verify")

                const IGNInput = new TextInputBuilder()
                    .setCustomId("IGNInput")
                    .setLabel("Enter your Minecraft username (IGN)")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true)
                
                const firstActionRow = new ActionRowBuilder().addComponents(IGNInput)

                modal.addComponents(firstActionRow)

                await interaction.showModal(modal)
            }
        }
        else if(interaction.isModalSubmit())
        {
            interaction.deferReply({ephemeral: true})
            
            const verifyResponse = await verify(interaction.guild, interaction.fields.getTextInputValue("IGNInput"), interaction.member) 
            if(verifyResponse.code === 200)
                response(interaction, "Successfully verified.", {title: "Success", ephemeral: true, color: 0x00ff00, editReply: true})
            else
                response(interaction, verifyResponse.message, { title: "Error", color: 0xff0000, editReply: true })

        }
    }
}