const express = require("express");
const app = express();
const webpush = require('web-push');
const cors = require("cors")

const port = 3000;

const apiKeys = {
    publicKey: "BDsTJig55Ze0gFEwI-hBudmWoWRMdh8CRiKVNtXX5lwJvr6nww4vaMvNX5HYnkUr2ucx0sM9vQSzAxFNAyMcsi8",
    privateKey: "n0BDfJ5AQ4o4MAKYYv3qeqz6EgpmAXqUcqDJu6CJVog"
}

webpush.setVapidDetails(
    'mailto:younesaj20@gmail.com',
    apiKeys.publicKey,
    apiKeys.privateKey
)

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
})

const subDatabse = [];


app.post("/save-subscription", (req, res) => {
    subDatabse.push(req.body);
    res.json({ status: "Success", message: "Subscription saved!" })
})

app.get("/send-notification", (req, res) => {
    webpush.sendNotification(subDatabse[0], "Hello world");
    res.json({ "statue": "Success", "message": "Message sent to push service" });
})

app.listen(port, () => {
    console.log("Server running on port 3000!");
})