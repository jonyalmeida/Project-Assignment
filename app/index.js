const express = require("express");

// const match = require("../matchRespondents");

const app = express();

app.set("view engine", "pug");

app.get("/", async (req, res) => {
    let results = await match();
    results = results.filter(
        (item) => item.numberIndustriesMatch.numberOfMatches >= 2
    );
    res.render("index", { results });
});

const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));
