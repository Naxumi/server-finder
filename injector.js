// AI generated code to inject the button into the DOM
window.addEventListener("message", function (event) {
    if (event.source !== window) return;
    if (event.data.type === "JOIN_BEST_SERVER") {
        console.log("Joining server:", event.data);
        const { placeId, serverId } = event.data;
        if (window.Roblox && Roblox.GameLauncher && typeof Roblox.GameLauncher.joinGameInstance === 'function') {
            Roblox.GameLauncher.joinGameInstance(placeId, serverId);
        } else {
            console.warn("Roblox.GameLauncher.joinGameInstance not available.");
        }
    }
});
