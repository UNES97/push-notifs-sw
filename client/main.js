window.addEventListener('load', () => {
    const check = () => {
        if (!("serviceWorker" in navigator)) {
            throw new Error("No Service Worker support!");
        }
        if (!("PushManager" in window)) {
            throw new Error("No Push API Support!");
        }
    };

    const registerServiceWorker = async () => {
        const swRegistration = await navigator.serviceWorker.register("sw.js");
        return swRegistration;
    };

    const requestNotificationPermission = async () => {
        const permission = await window.Notification.requestPermission();
        if (permission !== "granted") {
            throw new Error("Permission not granted for Notification");
        }
    };

    const main = async () => {
        check();
        const permission = await requestNotificationPermission();
        const swRegistration = await registerServiceWorker();
    };

    const permissionBtn = document.getElementById('permission-btn');
    permissionBtn.addEventListener('click', () => {
        main();
    });
});