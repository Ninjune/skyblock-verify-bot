<<<<<<< HEAD
const { EmbedBuilder } = require("discord.js")




/**
 * Responds to an interaction.
 * @param {BaseInteraction} interaction 
 * @param {string} message 
 * @param {object} options 
 */
async function response(interaction, message = "Undefined", { title="Undefined", ephemeral=false, color = 0x000000, editReply=false })
{
    const embed = new EmbedBuilder()
    .setColor(color)
    .setTitle(title)
    .setDescription(`${message}`)
    .setFooter({ text: "Made by Ninjune" })
    if(editReply)
        interaction.editReply({ embeds: [embed], ephemeral })
    else
        interaction.followUp({ embeds: [embed], ephemeral })
}


/**
 * Error response w/ red color.
 * @param {BaseInteraction} interaction 
 * @param {string} message 
 * @param {object} options 
 */
async function badResponse(interaction, message = "Unknown", { ephemeral=true, editReply=false } = {})
{
    response(interaction, message, { ephemeral, title: "Error", color: 0x990000, editReply })
}


module.exports = { response, badResponse }
=======
const { EmbedBuilder } = require("discord.js")


/**
 * Responds to an interaction.
 * @param {BaseInteraction} interaction 
 * @param {string} message 
 * @param {object} options 
 */
async function response(interaction, message = "Undefined", { title="Undefined", ephemeral=false, color = 0x000000, editReply=false })
{
    const embed = new EmbedBuilder()
    .setColor(color)
    .setTitle(title)
    .setDescription(`${message}`)
    .setFooter({ text: "Made by Ninjune" })
    if(editReply)
        interaction.editReply({ embeds: [embed], ephemeral })
    else
        interaction.followUp({ embeds: [embed], ephemeral })
}


/**
 * Error response w/ red color.
 * @param {BaseInteraction} interaction 
 * @param {string} message 
 * @param {object} options 
 */
async function badResponse(interaction, message = "Unknown", { ephemeral=true, editReply=false } = {})
{
    response(interaction, message, { ephemeral, title: "Error", color: 0x990000, editReply })
}


module.exports = { response, badResponse }
>>>>>>> d4f40af248713a775e10c957be5dc450826b0916
