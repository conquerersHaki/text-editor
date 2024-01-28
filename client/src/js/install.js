const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
let deferredPrompt;

// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default behavior
  event.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = event;
  // Update UI or show install button
  butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const userChoice = await deferredPrompt.userChoice;
    // Check the user's choice
    if (userChoice.outcome === 'accepted') {
      console.log('User accepted the PWA installation');
    } else {
      console.log('User dismissed the PWA installation');
    }
    // Clear the deferredPrompt variable
    deferredPrompt = null;
    // Hide the install button
    butInstall.style.display = 'none';
  }
});

// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA installed successfully');
});