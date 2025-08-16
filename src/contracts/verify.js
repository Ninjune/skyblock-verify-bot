<<<<<<< HEAD
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
        return { code: hypixelResponse.code, message: "Unable to fetch Hypixel data associated with IGN. Code: " + hypixelResponse.code }

    const linkedDiscord = hypixelResponse.player?.socialMedia?.links?.DISCORD

    if(linkedDiscord?.toLowerCase() !== discordUsername)
        return {code: 400, message: "IGN is not linked to Discord user."}

    if(verifyRolesMap.get(guild.id) == undefined)
        return {code: 400, message: "Verified role is not setup. Admin should setup with /setverifyrole." }
    const verifyRole = guild.roles.cache.get(verifyRolesMap.get(guild.id));
    discordMember.roles.add(verifyRole).then((member) => member.setNickname(mojangResponse.username))
    return { code: 200 }
}

module.exports = {verify}
=======
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
        return { code: hypixelResponse.code, message: "Unable to fetch Hypixel data associated with IGN. Code: " + hypixelResponse.code }

    const linkedDiscord = hypixelResponse.player?.socialMedia?.links?.DISCORD

    if(linkedDiscord?.toLowerCase() !== discordUsername)
        return {code: 400, message: "IGN is not linked to Discord user."}

    if(verifyRolesMap.get(guild.id) == undefined)
        return {code: 400, message: "Verified role is not setup. Admin should setup with /setverifyrole." }
    const verifyRole = guild.roles.cache.get(verifyRolesMap.get(guild.id));
    discordMember.roles.add(verifyRole).then((member) => member.setNickname(mojangResponse.username))
    return { code: 200 }
}

module.exports = {verify}
>>>>>>> d4f40af248713a775e10c957be5dc450826b0916
