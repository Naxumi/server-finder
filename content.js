function injectJoinBestServerButton() {
  const playBtn = document.querySelector('button[data-testid="play-button"]');
  if (!playBtn || document.getElementById('join-best-server-button')) return;

  // Inject the script into the page context (once)
  const existingScript = document.getElementById("join-server-injector");
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("injector.js");
    script.id = "join-server-injector";
    document.documentElement.appendChild(script);
  }

  const bestServerBtn = document.createElement('button');
  bestServerBtn.id = 'join-best-server-button';
  bestServerBtn.className = playBtn.className;
  bestServerBtn.style.marginBottom = '10px';
  bestServerBtn.textContent = 'Join Best Server';

  bestServerBtn.addEventListener('click', async () => {
    const placeId = window.location.pathname.split('/')[2];
    const serverListUrl = `https://games.roblox.com/v1/games/${placeId}/servers/Public?excludeFullGames=true&limit=100`;

    try {
      const serverResp = await fetch(serverListUrl, { credentials: "include" });
      const serverData = await serverResp.json();

      if (!serverData.data || serverData.data.length === 0) {
        console.error("No servers found.");
        return;
      }
      console.log("Server list retrieved:", serverData.data);

      for (const server of serverData.data) {
        try {
          // AI generated code to get server details 
          const response = await chrome.runtime.sendMessage({
            type: "getServerDetails",
            info: {
              placeId: parseInt(placeId),
              jobId: server.id
            }
          });

          // if (!response.success) {
          //   console.warn(`Failed to get server details for ${server.id}:`, response.statusTextLong);
          //   continue;
          // }

          // console.log(`Server ${server.id} is in region:`, response.location);
          console.log(`Server ${server.id} is in region:`, response.location.country.code);

          if (response.location.country.code === "SG") {
            console.log(`Joining server ${server.id} (SG region)...`);
            window.postMessage({
              type: "JOIN_BEST_SERVER",
              placeId: placeId,
              serverId: server.id
            }, "*");
            console.log(`Server ${server.id} joined successfully.`);
            console.log(`Server ${placeId} joined successfully.`);
            break; // Stop after first Singapore server found
          }
        } catch (err) {
          console.warn(`Error contacting background for server ${server.id}`, err);
        }
      }
    } catch (error) {
      console.error("Failed to fetch server list:", error);
    }
  });


  playBtn.parentNode.insertBefore(bestServerBtn, playBtn);
}

// AI generated code to observe DOM changes and inject the button when needed
const observer = new MutationObserver(() => {
  injectJoinBestServerButton();
});
observer.observe(document.body, { childList: true, subtree: true });
