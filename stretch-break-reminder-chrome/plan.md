# Plan for the stretch-break-reminder

## Resources

Notifications API: <https://developer.chrome.com/extensions/notifications#method-create>

Maybe helpful: <https://www.pixelstech.net/article/1372562609-Chrome-extension-to-display-desktop-notification>

Getting started: <https://developer.chrome.com/extensions/getstarted>

## Next Steps

- [x] try out update notification when reminding instead of creating a new notification

- [ ] Implement interval time change on the options page (requires storage and transfer between functions)

- [x] disable button from icon in menu

- [x] reorganize the time zero global variable, i don't really like it's implementation

- [ ] unit tests

- [ ] randomized stretch tips (with pictures!) or custom messages

- [x] do something when the user clicks notification, or add a button!, like change settings

- [X] add icon

- [ ] publish to chrome store

- [ ] microsoft edge, windows native apps

## Selling Points

- Use native notifications

- Gives out stretch tips

- Intelligently stops timer when the computer goes to sleep

- only informs you of a break when you close a tab, so no nasty interruptions.

- only needs one permission, keep your data safe!

- notification removes itself after use so that there isn't a huge mess in action centre.
