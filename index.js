import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?"
app.get("/", async(req, res) => {
    res.render("index.ejs",{name:null})
})
app.post("/cocktail", async(req, res) =>{
    const radiovalue = req.body.radio
    let span = req.body.cname
    let string = ""
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
      }
    if (radiovalue=="rcname"){
        span = req.body.cname
        string = "s="
    }else if(radiovalue=="rfname"){
        span = req.body.f
        string = "f="
    }else{
        span = req.body.iname
        string = "i="
    }
    try{
        const result = await axios.get(API_URL + string + span)
        let ing = new Array()
        let nb = getRndInteger(0,result.data.drinks.length)
        for (let i = 1; i < 16; i++) {
            if(result.data.drinks[nb][`strIngredient${i}`] != null){
                ing[i-1]=result.data.drinks[nb][`strIngredient${i}`]
            }
        }
        res.render("index.ejs",{name: JSON.stringify(result.data.drinks[nb].strDrink),ingredients : ing})
    }catch(error){
        res.render("index.ejs",{name: error.message})
    }
    
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});  