const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const exphbs = require("express-handlebars")
const path = require("path")
app.use(express.static(path.join(__dirname, "static")))

app.engine("handlebars", exphbs())
app.set("view engine", "handlebars")


app.get("/", (req, res) => {
    res.render("home")

})

app.listen(port, () => {
    console.log(`app listening on http://localhost:${port}`)
})