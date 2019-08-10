// Set the interval between breaks
var breakIntervalInMinutes = 1;


// Run the welcome notification: you're getting break notifications now!
chrome.runtime.onInstalled.addListener(function() {
    var notification = {
        type: "basic",
        title: "You are now getting stretch-break reminders.",
        message: `Current Interval: ${breakIntervalInMinutes} minutes`,
        iconUrl: "img/extension_icon128.png"
    }
    var asdf = chrome.notifications.create("welcome", notification);
    setTimeout(
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
        console.log("Timer reset");
        restartTimer();
        setTimeout(
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
    console.log("tab closed");
    checkTime(timeZero, breakIntervalInMinutes*60000);
});
