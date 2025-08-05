const { isStaff, verifyRolesMap } = require("../../contracts/util")
const { logToFile } = require("../../contracts/log")
const { badResponse, response } = require("../../contracts/commandResponses")


module.exports = {
  name: "setverifyrole",
  description: "(ADMIN) Sets the verified role.",
  options: [
    {
        name: "role",
        description: "The role that should be given to users once they have verified.",
        type: 8,
        required: true
    }
],

  execute: async (interaction, client) => {
    const role = interaction.options.getRole("role")

    if (isStaff(await interaction.guild.members.fetch(interaction.user))) {
        try {
            const guildId = interaction.guild.id.toString()
            verifyRolesMap.set(guildId, role.id)
            verifyRolesMap.save()

            response(interaction, `Set verified role to <@&${role.id}>.`, {title: "Success", color: 0x00ff00})
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