let reminderToggle = document.getElementById('reminderToggle');
let changeInterval = document.getElementById('change');
let openOptions = document.getElementById('options');
let bkgd = chrome.extension.getBackgroundPage();

reminderToggle.onclick = function() {
    bkgd.console.log("toggle clicked");

    // get the current state: paused or resumed
    chrome.storage.sync.get('on', function(data) {
        bkgd.console.log(data.on);
        // if on, turn it off
        if (data.on == 1) {
            chrome.storage.sync.set({'on': 0});
            var notification = {
                type: "basic",
                title: "Pausing stretch-break reminders.",
                message: `To turn on again, click the extension icon`,
                iconUrl: "img/extension_icon128.png"
            }
            var asdf = chrome.notifications.create("pause", notification);
            bkgd.console.log("pause reminders"); // debug

            setTimeout(
                // no user interaction required, make this a choice!
                function() { chrome.notifications.clear("pause") },
                5000
            );
        } else if (data.on == 0) { // if off, turn it on
            chrome.storage.sync.set({'on': 1});
            var notification = {
                type: "basic",
                title: "Resuming stretch-break reminders.",
                message: `To turn off, click the extension icon`,
                iconUrl: "img/extension_icon128.png"
            }
            var asdf = chrome.notifications.create("resume", notification);
            bkgd.console.log("resume reminders");  // debug

            setTimeout(
                // clear notification automatically
                function() { chrome.notifications.clear("resume") },
                5000
            );
        }
    });
    
};

changeInterval.onclick = function() {

};

openOptions.onclick = function() {
    chrome.runtime.openOptionsPage(function() {
        bkgd.console.log("open options page");
    })
};
