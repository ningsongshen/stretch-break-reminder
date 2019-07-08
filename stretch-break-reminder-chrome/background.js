chrome.runtime.onInstalled.addListener(function() {
    var notification = {
        type: "basic",
        title: "You are now getting stretch-break reminders.",
        message: "Current Interval: 30 minutes",
        iconUrl: "icon.png"
    }
    var asdf = chrome.notifications.create("Take a break!", notification);

});

var timeZero = 0;
function restartTimer() {
    timeZero = Date.now();
}

function checkTime(initialTime, workTime) {
    if ((initialTime + workTime) < Date.now()) {
        var time = new Date()
        var notificationMessage = "It's " + time.toLocaleTimeString() + " - take a break!";
        var notification = {
            type: "basic",
            title: "Take a break!",
            message: notificationMessage,
            iconUrl: "icon.png"
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
chrome.runtime.onStartup.addListener(function() {
    restartTimer();
});

chrome.tabs.onRemoved.addListener(function() {
    console.log("tab closed");
    checkTime(timeZero, 1800000);
});
