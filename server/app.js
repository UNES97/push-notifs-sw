//exact copy of full example code from (https://medium.com/izettle-engineering/beginners-guide-to-web-push-notifications-using-service-workers-cb3474a17679)
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const webpush = require('web-push')
const app = express()
app.use(cors())
app.use(bodyParser.json())
const port = 4000

const dummyDb = { subscription: null } //dummy in memory store

const saveToDatabase = async subscription => {
    // Since this is a demo app, I am going to save this in a dummy in memory store. Do not do this in your apps.
    // Here you should be writing your db logic to save it.
    dummyDb.subscription = subscription
}
// The new /save-subscription endpoint
app.post('/save-subscription', async (req, res) => {
    const subscription = req.body
    await saveToDatabase(subscription) //Method to save the subscription to Database
    res.json({ message: 'success' })
})
const vapidKeys = {
    publicKey:
        'BJhoEPKWyZK29AS51-xxJ9HMWOHc27t9ueZs1MNRO4nlqspUWS54LarUGyPonZDZojFBgVnE3CNLIwWbQSftKw8',
    privateKey: 'ZZh4cbfLvU7e7Wwul5cypivjjoxusN-4NgGjPQKphvA',
}

//setting our previously generated VAPID keys
webpush.setVapidDetails(
    'mailto:younesaj20@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
//function to send the notification to the subscribed device
const sendNotification = (subscription, dataToSend) => {
    webpush.sendNotification(subscription, dataToSend)
}
//route to test send notification
app.get('/send-notification', (req, res) => {
    console.log(dummyDb);
    const subscription = dummyDb.subscription //get subscription from your databse here.
    const message = 'Hello World'
    sendNotification(subscription, message)
    res.json({ message: 'message sent' })
})

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
