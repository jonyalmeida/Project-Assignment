const express = require("express");

const matchRespondents = require("../matchRespondents");
const projectParams = require("../data/project.json");

const app = express();

app.set("view engine", "pug");

app.get("/", async (req, res) => {
    let results = await matchRespondents(
        "./data/respondents_data_test.csv",
        projectParams
    );

    console.log(results);

    res.render("index", { results });
});

const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));
