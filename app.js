const express = require("express");
const bodyParser = require("body-parser");
const  date = require(__dirname +"/date.js");
const app = express();

const items = ["Buy Food", "Cook Food", "Drink Water"];
const workItems = ["Read a Novel"]
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res)=>{
    let day = date.getDate();
    res.render("list", { listTitle: day, newListItems : items});
});


app.post("/", (req, res)=>{
    console.log(req.body)
   
    let item = req.body.newItem

    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/")
    }
});

app.get("/work", (req, res)=>{

    res.render("list", {listTitle: "Work List", newListItems: workItems})
})

app.get("/about", (req, res)=>{
    res.render("about", {aboutTitle: "About Me"})
})


app.listen(3000, () =>{
    console.log("Server started on port 3000")
})