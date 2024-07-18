const { reqHypixelApi, getMojangData } = require("./api");
const { verifyRolesMap, blacklistMap } = require("./util")
const config = require("../../config.json")


async function verify(guild, ign, discordMember)
{
    const discordUsername = discordMember.user.username

    const mojangResponse = await getMojangData(ign)
    if(mojangResponse.code != undefined)
        return { code: mojangResponse.code, message: "Invalid Minecraft IGN."}

    const isBlacklisted = blacklistMap.get(guild.id)?.includes(mojangResponse.uuid) ?? false
    if(isBlacklisted)
        return { code: 401, message: "IGN is blacklisted." }

    const hypixelResponse = await reqHypixelApi(`/v2/player?uuid=${mojangResponse.uuid}`, config.api.hypixelAPIkey)
    if(hypixelResponse.code != undefined)
        return { code: hypixelResponse.code, message: "Unable to fetch Hypixel data associated with IGN."}

    const linkedDiscord = hypixelResponse.player.socialMedia.links.DISCORD

    if(linkedDiscord !== discordUsername)
        return {code: 400, message: "IGN is not linked to Discord user."}

    const verifyRole = guild.roles.cache.get(verifyRolesMap.get(guild.id));
    discordMember.roles.add(verifyRole)
    return { code: 200 }
}

module.exports = {verify}