const axios = require("axios")
const { logToFile, dirToFile } = require("./log")


async function reqMojangApis(name) {
    try {
        if (name.length >= 32) {
            try {
                let mojangData = (await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${name}`)).data
                return { error: false, username: mojangData.name, uuid: mojangData.id }
            }
            catch (mojangDataError) {
                if(mojangDataError.response?.status == 429)
                    return { error: true, code: 429 }
                else
                    logToFile(`Mojang Data (UUID ${name}): ` + mojangDataError)
                    return { error: true, code: mojangDataError.response?.status }
                }
        }
        else {
            try {
                let mojangData = (await axios.get(`https://api.mojang.com/users/profiles/minecraft/${name}`)).data
                return { error: false, username: mojangData.name, uuid: mojangData.id }
            }
            catch (mojangDataError) {
                logToFile(`Mojang Data 2 (name ${name}): ` + mojangDataError)
                return { error: true, code: mojangDataError.response?.status }
            }
        }
    }
    catch (error) {
        logToFile("MOJANG APIS: ")
        catchError(error)
        return { error: true, code: 500 }
    }
}

async function getMojangData(name)
{
    return await reqMojangApis(name)
}

/**
 * gets hypixel data with a certain sublink
 * @param {string} sublink eg. "/skyblock/profiles?uuid=${uuid}"
 * @param {string | undefined} key hypixel api key
 * @returns
 */
async function reqHypixelApi(sublink, key)
{
    let hypixelData, char

    try
    {
        if(key == undefined || key == "")
            char = ""
        else if(sublink.includes("?"))
            char = "&"
        else
            char = "?"

        hypixelData = (await axios.get("https://api.hypixel.net" + sublink + char + "key=" + key)).data
        logToFile("Successfully requested hypixel api with sublink: " + sublink);
        return hypixelData
    }
    catch(err)
    {
        if(err.response?.status == 429) return { code: 429, error: "The bot is currently rate limited." } // rate limit
        else if(err.response?.status == 502) return { code: 502, error: "The bot was unable to fetch a reply from Hypixel API. Please try again later." } // bad gateway
        else // unkown error
        {
            logToFile("HYPIXEL: ")
            catchError(err)
            return {code: 500, error: "Unknown error."}
        }
    }
}


function catchError(error)
{
    if(error == undefined)
        return logToFile("Undefined error line 116 api.js")
    logToFile(error.stack)
    if(error.response)
    {
        logToFile(error.response?.data)
        logToFile(error.response?.status)
        logToFile(error.response?.headers)
        dirToFile(error.response?.data, "error.response.data")
        dirToFile(error.response?.status, "error.response?.headers")
        dirToFile(error.response?.headers, "error.response?.headers")
    }
    else if (error.request)
    {
        dirToFile(error.request, "error.request")
    }
    else
    {
        logToFile("(catch last else) Error " + error.message)
    }
    logToFile(error.config)
    dirToFile(error.config, "error.config")
}


module.exports = { getMojangData, reqHypixelApi }
