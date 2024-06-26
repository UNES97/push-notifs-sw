const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3000;

const dummyDb = [];
const vapidKeys = {
    publicKey:
        'BJhoEPKWyZK29AS51-xxJ9HMWOHc27t9ueZs1MNRO4nlqspUWS54LarUGyPonZDZojFBgVnE3CNLIwWbQSftKw8',
    privateKey: 'ZZh4cbfLvU7e7Wwul5cypivjjoxusN-4NgGjPQKphvA',
}

const saveToDatabase = async subscription => {
    dummyDb.push(subscription) 
}

app.post('/save-subscription', async (req, res) => {
    const subscription = req.body
    await saveToDatabase(subscription)
    res.json({ message: 'Subscribed successfully' });
})

webpush.setVapidDetails(
    'mailto:younesaj20@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const sendNotification = async (subscription, payload) => {
    try {
        await webpush.sendNotification(subscription, payload);
    } catch (error) {
        if (error.statusCode === 410) {
            console.error("Push subscription has unsubscribed or expired:", error.body);
        } else {
            console.error("Error sending push notification:", error);
        }
    }
};

app.get('/send-notification', (req, res) => {
    const message = 'BAKA mo ichigei';
    console.log(dummyDb);
    dummyDb.forEach(subscription => {
        sendNotification(subscription, message);
    });

    res.json({ message: 'Message sent' });
})

app.get('/', (req, res) => res.send('Hello Unes 1997'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
