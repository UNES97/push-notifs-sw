// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
const urlB64ToUint8Array = base64String => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

const saveSubscription = async subscription => {
    const SERVER_URL = "http://localhost:3000/save-subscription";
    const response = await fetch(SERVER_URL, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(subscription)
    });
    return response.json();
};

self.addEventListener("activate", async () => {
    try {
        const applicationServerKey = urlB64ToUint8Array(
            "BJhoEPKWyZK29AS51-xxJ9HMWOHc27t9ueZs1MNRO4nlqspUWS54LarUGyPonZDZojFBgVnE3CNLIwWbQSftKw8"
        );
        const options = { applicationServerKey, userVisibleOnly: true };
        console.log('Activating...');
        const subscription = await self.registration.pushManager.subscribe(options);
        const response = await saveSubscription(subscription);
        console.log(response);
    } catch (err) {
        console.log("Error", err);
    }
});

self.addEventListener("push", function (event) {
    if (event.data) {
        self.registration.showNotification("DAMN BOI!", { body: event.data.text() })
    } else {
        console.log("Push event but no data");
    }
});