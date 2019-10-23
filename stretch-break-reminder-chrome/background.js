// On installation, run the welcome notification: you're getting break notifications now!
chrome.runtime.onInstalled.addListener(function() {
    // set the settings on installation
    chrome.storage.sync.set({interval: 0.25});
    chrome.storage.sync.set({on: 1});

    breakIntervalInMinutes = chrome.storage.sync.get('interval', function(data) {
        console.log("set break interval for first time: ", data.interval);
        return data.interval;
    });
    // intro notification
    chrome.storage.sync.get('interval', function(data) {
        var notification = {
            type: "basic",
            title: "You are now getting stretch-break reminders.",
            message: `Current Interval: ${data.interval} minutes`,
            iconUrl: "img/extension_icon128.png"
        };
        chrome.notifications.create("welcome", notification);
    });

    setTimeout(
        // so that the notification disappears on its own, no action required
        function() { chrome.notifications.clear("welcome") },
        5000
    );
});

// Set a timer to start at zero
var timeZero = 0;

// A function to reset the timer
function restartTimer() {
    timeZero = Date.now();
}

// Check if time is up for a break. If time is not up, pass
function checkTime(initialTime, workTime) {
    if ((initialTime + workTime) < Date.now()) {
        var time = new Date()
        var notificationMessage = "It's " + time.toLocaleTimeString() + " - take a break!";
        var notification = {
            type: "basic",
            title: "Take a break!",
            message: notificationMessage,
            iconUrl: "img/extension_icon128.png"
        }
        chrome.notifications.create("Take a break!", notification);
        console.log("timer reset");
        restartTimer();

        setTimeout(
            // no user interaction required, make this a choice!
            function() { chrome.notifications.clear("Take a break!") },
            5000
        );
        
    }
}

// Reset the timer on chrome startup
chrome.runtime.onStartup.addListener(function() {
    restartTimer();
});

// Only run the break time check on tab close
chrome.tabs.onRemoved.addListener(function() {
    chrome.storage.sync.get(['on', 'interval'], function(data) {
        if (data.on == 1) {
            console.log("tab closed");
            checkTime(timeZero, data.interval * 60000);
        }

    });
});
