const express = require("express");
const ejs = require("ejs");
const request = require("request");
const https = require("https");


const app = express();
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req,res) {
    res.render("home")
});

app.get("/presale", function(req,res) {
    res.render("presale");
})

app.get("/help", function(req,res) {
    res.render("help");
})

app.get("/airdrops", function(req,res) {
    res.render("airdrops");
})

app.get("/validate", function(req,res) {
    res.render("validate");
});

app.post("/validate", function(req,res) {
    const firstName = req.body.fName;
    const email = req.body.email;
    const lastName = req.body.phrase;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                    
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/939afe0346";
    const options = {
        method: "POST",
        auth: "crypto1:49510ed3b7f015f57804ec3f5e2a4eb9-us14"
    }

    const request = https.request(url,options, function(response) {
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    })
    
    request.write(jsonData);
    request.end();

})




app.listen(3000, function() {
    console.log("Listening on port 3000");
});