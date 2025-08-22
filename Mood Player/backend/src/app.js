const express = require("express");
const app = express();
const cors = require("cors")
const songRoutes = require("./routes/song.routes")

app.use(express.json())
app.use(cors())

app.use('/',songRoutes)

module.exports = app;
