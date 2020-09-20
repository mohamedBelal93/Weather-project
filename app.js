const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){

res.sendFile(__dirname + "/index.html")
});
app.post("/",function(req,res) {
 
 const city = req.body.cityName;
   const unit ="metric";
   const userId= "de2a264ed44fd8140b01f9cb0978dc57";
 const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+userId+"&units="+unit;
 https.get(url,function(response){
   console.log(response.statusCode);//to make sure api response is good 200 is great
   response.on("data",function(data) //to log into data in JSON file we recive
    {
     const weatherData= JSON.parse(data);//to convert from hexa decemel to JSON file
     const temp = weatherData.main.temp;//to head to spasifc part in json file
     const desc = weatherData.weather[0].description;
     const icon = weatherData.weather[0].icon;

     res.write("<h1>temp is "+ temp + " </h1>");
     res.write("<p>and the weather is  "+desc+"</p>");
     const url = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
     res.write("<img src="+url+">");
  res.send();
   })
 });

})
/*
*/


app.listen(3000,function() {
  console.log("serever is runnin on port 3000");
})
