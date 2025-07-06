/*
Updated by Ninjune on 10/?/22
- Added more processes to run.
Written by DuckySoLucky or Senither on ?/?/??
*/
process.on("uncaughtException", function (error) {console.log(error)})
const app = require("./src/Application")

process.title = "Skyblock Verify Bot | by Ninjune (template by DuckySoLucky/Senither)"

app.startDiscord()
