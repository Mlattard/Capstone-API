import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;
const API_URL = "https://www.dnd5eapi.co/api";

let generatedCharacter = {};

// Use the public folder for static files.
app.use(express.static("public"));

// When the user goes to the home page it should render the index.ejs file.
app.get("/", async (req, res) => {
    res.render("index.ejs");
});    

app.post("/submit", async (req, res) => {
    try {
        let result = await axios.get(API_URL + "/races");
        let characterRace = result.data.results[Math.floor(Math.random()*result.data.count)].name;

        result = await axios.get(API_URL + "/classes");
        let characterClass = result.data.results[Math.floor(Math.random()*result.data.count)].name;

        generatedCharacter = {
            race: characterRace,
            class: characterClass,
        };

        res.render("index.ejs", { character: generatedCharacter });
    } catch (error) {
        console.log(error);
        res.render("index.ejs");
    }
});    


// Listen on the predefined port and start the server.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});