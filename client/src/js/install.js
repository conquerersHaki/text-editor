const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('Before Install Prompt Event Triggered');
    console.log("Event Details: ", event);
    event.preventDefault();
    window.deferredInstallPrompt = event;
    installButton.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredInstallPrompt;
    if (!promptEvent) {
        return;
    }
    promptEvent.prompt();
    window.deferredInstallPrompt = null;
    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('Success!');
    window.deferredInstallPrompt = null;
});