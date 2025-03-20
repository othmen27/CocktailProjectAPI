import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", async(req, res) => {
    res.render("index.ejs")
})
app.post("/cocktail", async(req, res) =>{
    const radiovalue = req.body.radio
    
    res.render("index.ejs")
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});  