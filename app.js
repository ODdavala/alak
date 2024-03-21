const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", function(req,res){
  res.sendFile(__dirname+ "/signup.html");
});
app.post("/", function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const data = {
    members : [
      {
        email_address:email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
    }
  ]
  }
  const jsonData = JSON.stringify(data);
  const url = "https://us13.api.mailchimp.com/3.0/lists/66073c3624";
  const options = {
    method: "POST",
    auth: "omiddavala:2c14122e0cc94c3608331af50c6c8fd7-us13"
  }
  const request = https.request(url,options, function(response){
    if (response.statusCode === 200){
      res.send("Success")
    }else{
      res.send("You fked up!")
    };
    response.on("data", function(data){
      
    })
  })
  request.write(jsonData);
  request.end();
});

app.listen(3000, function(){
  console.log("Server is running on port 3000")
});