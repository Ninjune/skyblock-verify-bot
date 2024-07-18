const { PermissionFlagsBits } = require("discord.js")
const { isStaff, blacklistMap } = require("../../contracts/util")
const { logToFile } = require("../../contracts/log")
const { badResponse, response } = require("../../contracts/commandResponses")
const { getMojangData } = require("../../contracts/api")

module.exports = {
  name: "blacklist",
  description: "(ADMIN) Toggles blacklist for a user, which prevents verifying in the server.",
  options: [
    {
        name: "ign",
        description: "The IGN to blacklist.",
        type: 3,
        required: true
    }
],

  execute: async (interaction, client) => {
    const ign = interaction.options.getString("ign")

    if (isStaff(await interaction.guild.members.fetch(interaction.user), PermissionFlagsBits.ManageRoles)) {
        try {
            const mojangRes = await getMojangData(ign)
            if(mojangRes.code != undefined)
            {
                badResponse(interaction, "Invalid IGN.")
                return
            }

            const guildId = interaction.guild.id.toString()
            let guildBlacklist = blacklistMap.get(guildId)
            if(guildBlacklist == undefined)
                guildBlacklist = []
            if(guildBlacklist.includes(mojangRes.uuid))
            {
                guildBlacklist.splice(guildBlacklist.indexOf(mojangRes.uuid), 1)
                response(interaction, `Removed ${mojangRes.username} from blacklist!`, {title: "Success", color: 0x00ff00})
            }
            else
            {
                guildBlacklist.push(mojangRes.uuid)
                response(interaction, `Added ${mojangRes.username} to blacklist!`, {title: "Success", color: 0x00ff00})
            }

            blacklistMap.set(guildId, guildBlacklist)
            blacklistMap.save()
        } catch(e)
        {
            logToFile(e)
            badResponse(interaction, e)
        }
    }
    else
        badResponse(interaction, "Only users with the Manage Roles permission may use this command.")
}
}