// Finding server location by IP address and handling user agent switching for Chrome
// BTRoblox
const IS_BACKGROUND_PAGE = !self.window || chrome.extension?.getBackgroundPage?.() === self.window
const IS_FIREFOX = !!chrome.runtime.getManifest().browser_specific_settings?.gecko
const IS_CHROME = !IS_FIREFOX
if (IS_BACKGROUND_PAGE) {
  const serverRegionsByIp = {
    "128.116.0.0": { city: "Hong Kong", country: { name: "Hong Kong", code: "HK" } },
    "128.116.1.0": { city: "Los Angeles", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.2.0": { city: "Warsaw", country: { name: "Poland", code: "PL" }, region: { name: "Mazowieckie", code: "14" } },
    "128.116.3.0": { city: "Warsaw", country: { name: "Poland", code: "PL" }, region: { name: "Mazowieckie", code: "14" } },
    "128.116.4.0": { city: "Paris", country: { name: "France", code: "FR" }, region: { name: "Île-de-France", code: "IDF" } },
    "128.116.5.0": { city: "Frankfurt am Main", country: { name: "Germany", code: "DE" }, region: { name: "Hessen", code: "HE" } },
    "128.116.6.0": { city: "Tokyo", country: { name: "Japan", code: "JP" }, region: { name: "Tokyo", code: "13" } },
    "128.116.7.0": { city: "Mumbai", country: { name: "India", code: "IN" }, region: { name: "Mahārāshtra", code: "MH" } },
    "128.116.8.0": { city: "Frankfurt am Main", country: { name: "Germany", code: "DE" }, region: { name: "Hessen", code: "HE" } },
    "128.116.9.0": { city: "Mumbai", country: { name: "India", code: "IN" }, region: { name: "Mahārāshtra", code: "MH" } },
    "128.116.10.0": { city: "Ashburn", country: { name: "United States", code: "US" }, region: { name: "Virginia", code: "VA" } },
    "128.116.11.0": { city: "Ashburn", country: { name: "United States", code: "US" }, region: { name: "Virginia", code: "VA" } },
    "128.116.12.0": { city: "San Mateo", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.13.0": { city: "Amsterdam", country: { name: "Netherlands", code: "NL" }, region: { name: "Noord-Holland", code: "NH" } },
    "128.116.14.0": { city: "Hong Kong", country: { name: "Hong Kong", code: "HK" } },
    "128.116.15.0": { city: "Secaucus", country: { name: "United States", code: "US" }, region: { name: "New Jersey", code: "NJ" } },
    "128.116.16.0": { city: "Secaucus", country: { name: "United States", code: "US" }, region: { name: "New Jersey", code: "NJ" } },
    "128.116.17.0": { city: "Secaucus", country: { name: "United States", code: "US" }, region: { name: "New Jersey", code: "NJ" } },
    "128.116.18.0": { city: "Miami", country: { name: "United States", code: "US" }, region: { name: "Florida", code: "FL" } },
    "128.116.19.0": { city: "Paris", country: { name: "France", code: "FR" }, region: { name: "Île-de-France", code: "IDF" } },
    "128.116.20.0": { city: "Paris", country: { name: "France", code: "FR" }, region: { name: "Île-de-France", code: "IDF" } },
    "128.116.21.0": { city: "Amsterdam", country: { name: "Netherlands", code: "NL" }, region: { name: "Noord-Holland", code: "NH" } },
    "128.116.22.0": { city: "Atlanta", country: { name: "United States", code: "US" }, region: { name: "Georgia", code: "GA" } },
    "128.116.23.0": { city: "Secaucus", country: { name: "United States", code: "US" }, region: { name: "New Jersey", code: "NJ" } },
    "128.116.24.0": { city: "Atlanta", country: { name: "United States", code: "US" }, region: { name: "Georgia", code: "GA" } },
    "128.116.25.0": { city: "Atlanta", country: { name: "United States", code: "US" }, region: { name: "Georgia", code: "GA" } },
    "128.116.26.0": { city: "Paris", country: { name: "France", code: "FR" }, region: { name: "Île-de-France", code: "IDF" } },
    "128.116.27.0": { city: "Chicago", country: { name: "United States", code: "US" }, region: { name: "Illinois", code: "IL" } },
    "128.116.28.0": { city: "Chicago", country: { name: "United States", code: "US" }, region: { name: "Illinois", code: "IL" } },
    "128.116.29.0": { city: "Chicago", country: { name: "United States", code: "US" }, region: { name: "Illinois", code: "IL" } },
    "128.116.30.0": { city: "Hong Kong", country: { name: "Hong Kong", code: "HK" } },
    "128.116.31.0": { city: "Warsaw", country: { name: "Poland", code: "PL" }, region: { name: "Mazowieckie", code: "14" } },
    "128.116.32.0": { city: "Secaucus", country: { name: "United States", code: "US" }, region: { name: "New Jersey", code: "NJ" } },
    "128.116.33.0": { city: "Slough", country: { name: "United Kingdom", code: "GB" }, region: { name: "England", code: "ENG" } },
    "128.116.34.0": { city: "Chicago", country: { name: "United States", code: "US" }, region: { name: "Illinois", code: "IL" } },
    "128.116.35.0": { city: "Slough", country: { name: "United Kingdom", code: "GB" }, region: { name: "England", code: "ENG" } },
    "128.116.36.0": { city: "Slough", country: { name: "United Kingdom", code: "GB" }, region: { name: "England", code: "ENG" } },
    "128.116.37.0": { city: "Miami", country: { name: "United States", code: "US" }, region: { name: "Florida", code: "FL" } },
    "128.116.38.0": { city: "Miami", country: { name: "United States", code: "US" }, region: { name: "Florida", code: "FL" } },
    "128.116.39.0": { city: "Frankfurt am Main", country: { name: "Germany", code: "DE" }, region: { name: "Hessen", code: "HE" } },
    "128.116.40.0": { city: "Frankfurt am Main", country: { name: "Germany", code: "DE" }, region: { name: "Hessen", code: "HE" } },
    "128.116.41.0": { city: "Frankfurt am Main", country: { name: "Germany", code: "DE" }, region: { name: "Hessen", code: "HE" } },
    "128.116.42.0": { city: "Frankfurt am Main", country: { name: "Germany", code: "DE" }, region: { name: "Hessen", code: "HE" } },
    "128.116.43.0": { city: "Frankfurt am Main", country: { name: "Germany", code: "DE" }, region: { name: "Hessen", code: "HE" } },
    "128.116.44.0": { city: "Frankfurt am Main", country: { name: "Germany", code: "DE" }, region: { name: "Hessen", code: "HE" } },
    "128.116.45.0": { city: "Miami", country: { name: "United States", code: "US" }, region: { name: "Florida", code: "FL" } },
    "128.116.46.0": { city: "Chicago", country: { name: "United States", code: "US" }, region: { name: "Illinois", code: "IL" } },
    "128.116.47.0": { city: "Chicago", country: { name: "United States", code: "US" }, region: { name: "Illinois", code: "IL" } },
    "128.116.48.0": { city: "Chicago", country: { name: "United States", code: "US" }, region: { name: "Illinois", code: "IL" } },
    "128.116.49.0": { city: "Los Angeles", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.50.0": { city: "Singapore", country: { name: "Singapore", code: "SG" } },
    "128.116.51.0": { city: "Sydney", country: { name: "Australia", code: "AU" }, region: { name: "New South Wales", code: "NSW" } },
    "128.116.52.0": { city: "Ashburn", country: { name: "United States", code: "US" }, region: { name: "Virginia", code: "VA" } },
    "128.116.53.0": { city: "Ashburn", country: { name: "United States", code: "US" }, region: { name: "Virginia", code: "VA" } },
    "128.116.54.0": { city: "Amsterdam", country: { name: "Netherlands", code: "NL" }, region: { name: "Noord-Holland", code: "NH" } },
    "128.116.55.0": { city: "Tokyo", country: { name: "Japan", code: "JP" }, region: { name: "Tokyo", code: "13" } },
    "128.116.56.0": { city: "Ashburn", country: { name: "United States", code: "US" }, region: { name: "Virginia", code: "VA" } },
    "128.116.57.0": { city: "San Jose", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.58.0": { city: "Tokyo", country: { name: "Japan", code: "JP" }, region: { name: "Tokyo", code: "13" } },
    "128.116.59.0": { city: "Tokyo", country: { name: "Japan", code: "JP" }, region: { name: "Tokyo", code: "13" } },
    "128.116.60.0": { city: "Tokyo", country: { name: "Japan", code: "JP" }, region: { name: "Tokyo", code: "13" } },
    "128.116.61.0": { city: "San Mateo", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.62.0": { city: "Seattle", country: { name: "United States", code: "US" }, region: { name: "Washington", code: "WA" } },
    "128.116.63.0": { city: "Los Angeles", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.64.0": { city: "San Mateo", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.65.0": { city: "Secaucus", country: { name: "United States", code: "US" }, region: { name: "New Jersey", code: "NJ" } },
    "128.116.66.0": { city: "Secaucus", country: { name: "United States", code: "US" }, region: { name: "New Jersey", code: "NJ" } },
    "128.116.67.0": { city: "San Jose", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.68.0": { city: "Santa Clara", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.69.0": { city: "Santa Clara", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.70.0": { city: "Ashburn", country: { name: "United States", code: "US" }, region: { name: "Virginia", code: "VA" } },
    "128.116.71.0": { city: "Ashburn", country: { name: "United States", code: "US" }, region: { name: "Virginia", code: "VA" } },
    "128.116.72.0": { city: "Slough", country: { name: "United Kingdom", code: "GB" }, region: { name: "England", code: "ENG" } },
    "128.116.73.0": { city: "Slough", country: { name: "United Kingdom", code: "GB" }, region: { name: "England", code: "ENG" } },
    "128.116.74.0": { city: "Ashburn", country: { name: "United States", code: "US" }, region: { name: "Virginia", code: "VA" } },
    "128.116.75.0": { city: "Ashburn", country: { name: "United States", code: "US" }, region: { name: "Virginia", code: "VA" } },
    "128.116.76.0": { city: "Ashburn", country: { name: "United States", code: "US" }, region: { name: "Virginia", code: "VA" } },
    "128.116.77.0": { city: "Ashburn", country: { name: "United States", code: "US" }, region: { name: "Virginia", code: "VA" } },
    "128.116.78.0": { city: "Ashburn", country: { name: "United States", code: "US" }, region: { name: "Virginia", code: "VA" } },
    "128.116.79.0": { city: "Singapore", country: { name: "Singapore", code: "SG" } },
    "128.116.80.0": { city: "Ashburn", country: { name: "United States", code: "US" }, region: { name: "Virginia", code: "VA" } },
    "128.116.81.0": { city: "Santa Clara", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.82.0": { city: "Tokyo", country: { name: "Japan", code: "JP" }, region: { name: "Tokyo", code: "13" } },
    "128.116.83.0": { city: "Tokyo", country: { name: "Japan", code: "JP" }, region: { name: "Tokyo", code: "13" } },
    "128.116.84.0": { city: "Elk Grove Village", country: { name: "United States", code: "US" }, region: { name: "Illinois", code: "IL" } },
    "128.116.85.0": { city: "Miami", country: { name: "United States", code: "US" }, region: { name: "Florida", code: "FL" } },
    "128.116.86.0": { city: "San Mateo", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.87.0": { city: "Ashburn", country: { name: "United States", code: "US" }, region: { name: "Virginia", code: "VA" } },
    "128.116.88.0": { city: "Elk Grove Village", country: { name: "United States", code: "US" }, region: { name: "Illinois", code: "IL" } },
    "128.116.89.0": { city: "Slough", country: { name: "United Kingdom", code: "GB" }, region: { name: "England", code: "ENG" } },
    "128.116.90.0": { city: "San Mateo", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.91.0": { city: "San Mateo", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.92.0": { city: "San Mateo", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.93.0": { city: "San Mateo", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.94.0": { city: "San Mateo", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.95.0": { city: "Dallas", country: { name: "United States", code: "US" }, region: { name: "Texas", code: "TX" } },
    "128.116.96.0": { city: "Ashburn", country: { name: "United States", code: "US" }, region: { name: "Virginia", code: "VA" } },
    "128.116.97.0": { city: "Singapore", country: { name: "Singapore", code: "SG" } },
    "128.116.98.0": { city: "San Mateo", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.99.0": { city: "Atlanta", country: { name: "United States", code: "US" }, region: { name: "Georgia", code: "GA" } },
    "128.116.100.0": { city: "San Mateo", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.101.0": { city: "Chicago", country: { name: "United States", code: "US" }, region: { name: "Illinois", code: "IL" } },
    "128.116.102.0": { city: "Ashburn", country: { name: "United States", code: "US" }, region: { name: "Virginia", code: "VA" } },
    "128.116.103.0": { city: "San Mateo", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.104.0": { city: "Mumbai", country: { name: "India", code: "IN" }, region: { name: "Mahārāshtra", code: "MH" } },
    "128.116.105.0": { city: "Santa Clara", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.106.0": { city: "San Mateo", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.107.0": { city: "San Mateo", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.108.0": { city: "San Mateo", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.109.0": { city: "San Mateo", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.110.0": { city: "San Mateo", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.111.0": { city: "San Mateo", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.112.0": { city: "Chicago", country: { name: "United States", code: "US" }, region: { name: "Illinois", code: "IL" } },
    "128.116.113.0": { city: "Chicago", country: { name: "United States", code: "US" }, region: { name: "Illinois", code: "IL" } },
    "128.116.114.0": { city: "Ashburn", country: { name: "United States", code: "US" }, region: { name: "Virginia", code: "VA" } },
    "128.116.115.0": { city: "Seattle", country: { name: "United States", code: "US" }, region: { name: "Washington", code: "WA" } },
    "128.116.116.0": { city: "Los Angeles", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.117.0": { city: "San Jose", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.118.0": { city: "Hong Kong", country: { name: "Hong Kong", code: "HK" } },
    "128.116.119.0": { city: "Slough", country: { name: "United Kingdom", code: "GB" }, region: { name: "England", code: "ENG" } },
    "128.116.120.0": { city: "Tokyo", country: { name: "Japan", code: "JP" }, region: { name: "Tokyo", code: "13" } },
    "128.116.121.0": { city: "Amsterdam", country: { name: "Netherlands", code: "NL" }, region: { name: "Noord-Holland", code: "NH" } },
    "128.116.122.0": { city: "Paris", country: { name: "France", code: "FR" }, region: { name: "Île-de-France", code: "IDF" } },
    "128.116.123.0": { city: "Frankfurt am Main", country: { name: "Germany", code: "DE" }, region: { name: "Hessen", code: "HE" } },
    "128.116.124.0": { city: "Warsaw", country: { name: "Poland", code: "PL" }, region: { name: "Mazowieckie", code: "14" } },
    "128.116.125.0": { city: "San Mateo", country: { name: "United States", code: "US" }, region: { name: "California", code: "CA" } },
    "128.116.126.0": { city: "Secaucus", country: { name: "United States", code: "US" }, region: { name: "New Jersey", code: "NJ" } },
    "128.116.127.0": { city: "Miami", country: { name: "United States", code: "US" }, region: { name: "Florida", code: "FL" } },
  }
  let userAgentSwitcherEnabled = false;
  let userAgentSwitcherTimeout;

  if (IS_CHROME) {
    chrome.declarativeNetRequest.updateSessionRules({
      removeRuleIds: [9010]
    });
  }

  // AI generated code to handle messages from content script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "getServerDetails") {
      const info = message.info;

      // Handle user agent switcher for Chrome
      if (typeof chrome !== "undefined" && chrome.declarativeNetRequest) {
        if (!userAgentSwitcherEnabled) {
          userAgentSwitcherEnabled = true;

          chrome.declarativeNetRequest.updateSessionRules({
            removeRuleIds: [9010],
            addRules: [{
              id: 9010,
              action: {
                type: "modifyHeaders",
                requestHeaders: [{
                  header: "User-Agent",
                  operation: "set",
                  value: "Roblox/WinInet"
                }]
              },
              condition: {
                requestMethods: ["post"],
                urlFilter: "https://gamejoin.roblox.com/v1/join-game-instance"
              }
            }]
          });
        }

        clearTimeout(userAgentSwitcherTimeout);
        userAgentSwitcherTimeout = setTimeout(() => {
          userAgentSwitcherEnabled = false;
          chrome.declarativeNetRequest.updateSessionRules({
            removeRuleIds: [9010]
          });
        }, 5000);
      }

      // Async logic, so we return true to keep the message channel open
      (async () => {
        let res;
        try {
          res = await fetch("https://gamejoin.roblox.com/v1/join-game-instance", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "User-Agent": "Roblox/WinInet"
            },
            body: JSON.stringify({
              placeId: info.placeId,
              gameId: info.jobId
            })
          });
        } catch (err) {
          sendResponse({
            success: false,
            statusText: "NetworkError",
            statusTextLong: "Failed to contact join-game-instance endpoint"
          });
          return;
        }

        const json = await res.json();
        const address = json?.joinScript?.UdmuxEndpoints?.[0]?.Address || json?.joinScript?.MachineAddress;

        if (!address) {
          let reason = "Unknown";
          if (json?.status === 22) {
            reason = "Full";
          } else if (json?.status === 12) {
            reason = "AccessDenied";
          }

          sendResponse({
            success: false,
            statusText: reason,
            statusTextLong: `Unable to fetch server location: ${reason === "Full"
                ? "Server is full"
                : reason === "AccessDenied"
                  ? "You do not have access to this place"
                  : "Unknown status " + json.status
              }`
          });
          return;
        }

        const maskedIp = address.replace(/^(128\.116\.\d+)\.\d+$/, "$1.0");
        const location = serverRegionsByIp[maskedIp];

        if (!location) {
          sendResponse({
            success: false,
            statusText: "UnknownRegion",
            statusTextLong: `Unknown server address ${address}`
          });
          return;
        }

        sendResponse({
          success: true,
          location,
          address
        });
      })();

      return true; // Keeps the message channel open for async response
    }
  });

}
