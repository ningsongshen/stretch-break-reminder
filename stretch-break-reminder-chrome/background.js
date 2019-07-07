chrome.runtime.onInstalled.addListener(function() {
    var notification = {
        type: "basic",
        title: "Take a break!",
        message: "Stand up!",
        iconUrl: "icon.png"
    }
    var asdf = chrome.notifications.create("Take a break!", notification);

  });
  