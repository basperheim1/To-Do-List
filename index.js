import express from "express";
import bodyParser from "body-parser";
import $ from "jquery";

var app = express();
const port = 3000;
var t_day = [];
var t_week = []

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

function determineWeek(){
    var d = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var dateIndex = d.getDay()
    var sunday = new Date();
    var saturday = new Date();
    sunday.setDate(d.getDate()-dateIndex)
    saturday.setDate(d.getDate() + (6-dateIndex))
    var returned_week = `${months[sunday.getMonth()]} ${sunday.getDate()}, ${sunday.getFullYear()} - ${months[saturday.getMonth()]} ${saturday.getDate()}, ${saturday.getFullYear()}`;
    return returned_week;
}

function determineDate(){
    var d = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var returned_date = `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getFullYear()}`;
    return returned_date;
}


app.get("/", (req, res)=>{
    console.log(t_day)
    var d = determineDate();
    console.log(d)
    res.render("day.ejs", {date: d, tasks: t_day});
})

app.get("/week", (req, res)=>{
    var d = determineWeek();
    res.render("week.ejs", {date: d, tasks: t_week});
})

app.post("/", (req, res)=>{
    var d = determineDate()
    t_day.push(req.body["task"])
    t_week.push(req.body["task"])
    res.render("day.ejs", {date: d, tasks: t_day});
})

app.post("/week", (req, res)=>{
    var d = determineDate();
    t_week.push(req.body["task"]);
    res.render("week.ejs", {date: d, tasks: t_week})
})

app.listen(port, ()=>{
    console.log(`Listening on {port}`)
})


