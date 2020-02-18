const Express = require("express");
const BodyParser = require("body-parser");
const Speakeasy = require("speakeasy");

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var secret = Speakeasy.generateSecret({ length: 20 });

app.post("/totp-secret", (request, response, next) => { 
    response.send({ "secret": secret.base32 });
});
app.post("/totp-generate", (request, response, next) => { 
    response.send({
        "token": Speakeasy.totp({
            secret: secret.base32,
            encoding: "base32"
        }),
        "remaining": (30 - Math.floor((new Date()).getTime() / 1000.0 % 30))
    });
});
app.post("/totp-validate", (request, response, next) => {

    console.log("Request Body ==>", request.body)
    response.send({
        "valid": Speakeasy.totp.verify({
            secret: secret.base32,
            encoding: "base32",
            token: request.body.token,
            window: 0
        })
    });
 });

app.listen(3000, () => {
    console.log("Listening at :3000...");
});