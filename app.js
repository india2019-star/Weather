const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
var path = require('path');

const app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",function(req,res)
{
    
    res.sendFile(__dirname + "/views/weatherhome.html");
});

app.get("/about.html",function(req,res)
{
    res.sendFile(__dirname + "/views/about.html");
});

app.get("/weatherhome.html",function(req,res)
{
    res.sendFile(__dirname +  "/views/weatherhome.html");
});


app.post("/",function(req,res)
{
    const query = req.body.cityname;
    
    const url =   "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=ff1f7b34ba9eadd9ecfa0ff5b67d13c5&units=metric";
    https.get(url,function(response)
    {
        response.on("data",function(data)
        {
            weather_data = JSON.parse(data);
            const temp_val = weather_data.main.temp;
            const weatherdescription = weather_data.weather[0].description;
            const weather_icon = weather_data.weather[0].icon;
            const urlicon = "http://openweathermap.org/img/wn/"+ weather_icon + "@2x.png";
            document.getElementById("resultdisplay").textContent = temp_val;
            res.write("<h1>The temperature of " + query + " is " + temp_val + "</h1>");
            res.write("<h1>The weather is " + weatherdescription + "</h1>");
            res.write("<img src=" + urlicon + ">");
            
            res.send();
        });
    });
});


app.listen(3000,function(req,res)
{
    console.log("Server is running at port 3000");
});