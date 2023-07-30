import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

const apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
let ingredients = [];

app.get("/", async (req, res) => {
    try{
        const response = await axios.get(apiUrl);
        const body = response.data.drinks[0];
        generateIngredients(body);
        res.render("index.ejs", {
            name: body.strDrink,
            category: body.strCategory,
            ingredients: ingredients,
            image: body.strDrinkThumb,
            instruction: body.strInstructions

        });
    } catch (error) {
        console.log(error.message)
    }
})

app.post("/submit", (req, res) => {
    res.redirect("/");
})


const generateIngredients = (data) => {
    ingredients = [];
    for(let i = 1; i <=15; i++){
        let ingredient = eval(`data.strIngredient${i}`);
        let measure = eval(`data.strMeasure${i}`);

        if(ingredient && measure) {
            ingredients.push({
                ingredient: ingredient,
                measure: measure
            })
        }
    }
}

app.listen(port, () => {
    console.log(`listening on ${port}`);
})