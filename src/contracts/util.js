const { PermissionFlagsBits } = require("discord.js")
const fs = require("node:fs")

/**
 * Escapes any pesky underscores used in names so they don't italicize the name.
 * @param {string} string 
 * @returns 
 */
function discordMarkdownFix(string) {
    if(string == undefined) return string
    for(let j = 0; j < string.length; j++)
    {
        if(string[j] == "_")
        {
            string = string.slice(0, j) + "\\" + string.slice(j)
            j++
        }
    }

    return string
}

/**
 * Checks if a user has the Manage Servers permission. To get user: await interaction.guild.members.fetch(interaction.user))
 * @param {user} user 
 * @param {PermissionFlagsBits?} permission
 * @returns 
 */
function isStaff(user, permission)
{
    return user.permissions.has(permission ?? PermissionFlagsBits.ManageGuild)
}

/**
 * Map that will save.
 */
class SaveMap
{
    constructor(path)
    {
        // If map file doesn't exist, create it.
        try
        {
            fs.readFileSync(path)
        }
        catch 
        {
            fs.writeFileSync(path, "{}")
        }

        this.map = JSON.parse(fs.readFileSync(path, "utf8"))
        this.path = path
    }

    get(key)
    {
        return this.map[key]
    }

    set(key, value)
    {
        this.map[key] = value
    }

    save()
    {
        fs.writeFileSync(this.path, JSON.stringify(this.map))
    }
}
const verifyRolesMap = new SaveMap("./data/verifyRoles.json")
const blacklistMap = new SaveMap("./data/blacklist.json")

module.exports = { discordMarkdownFix, isStaff, verifyRolesMap, blacklistMap }