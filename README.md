# Roblox Best Server Finder
#### Video Demo:  <URL HERE>
#### Description:
A Chrome extension that automatically joins to your preferred server region in Roblox because sometimes Roblox does not put you in the server region that you want, which leads to higher latency thus less satisying gaming experience. This project is greatly helped by the sources at credit section and AI-based software to help me learn many things.

There is actually already a project like this where it lists out server region but unfortunately for paid. If someone is able to make something like this, so too other people such I must be able too 🤔 Because there has to some kind of way to achieve. So i started by looking at the _cryptic code_ that i was able to get from looking at local extension storage thing to see how they did it, checking network activity which i gained lots of insight for future development, and Roblox forum discussion.

## Overview
This extension makes use of two Roblox API and one browser built-in function.
1. By using **`https://games.roblox.com/v1/games/8356562067/servers/Public?cursor=&sortOrder=Desc&excludeFullGames=false`** to get list of server IDs, player slot, ping, etc. `id` is what needed
    - `"id": "63e76d8a-02dc-4c46-a3ed-70b19187f79b"`
    - `"id": "58e4a5e4-f83b-4cce-b006-9e5a93ce2632"`
    ```
    {
    "previousPageCursor": null,
    "nextPageCursor": "eyJzdGFydEluZGV4IjoxMCwiZGlzY3JpbWluYXRvciI6InBsYWNlSWQ6NzM5NTY1NTMwMDEyNDBzZXJ2ZXJUeXBlOlB1YmxpYyIsImNvdW50IjoxMH0KYTJlNGE2MGE4ZDYwODE4YjZkNWU5NmU4NjIyN2NlMThkNTEwZmQ4YTc0ZDMyNWE0NTQ5NDU0MTg1ODA2MzU5NQ==",
    "data": [
            {
            "id": "63e76d8a-02dc-4c46-a3ed-70b19187f79b",
            "maxPlayers": 12,
            "playing": 12,
            "playerTokens": [
                "3A18E8D1C6CEA0D4F9EED200912889C0",
                "8D146F28EA30CA55761C4886E5B9FD71",
                "5CBC9E241D78F90F92CDD761451490F6",
                "911EB8D5765E78FD4CF5A42B65E809DF",
                "9D31ACED164D3DD81F93F4DE0027210E"
            ],
            "players": [],
            "fps": 59.954697,
            "ping": 44
            },
            {
            "id": "58e4a5e4-f83b-4cce-b006-9e5a93ce2632",
            "maxPlayers": 12,
            "playing": 12,
            "playerTokens": [
                "9D503FF18F18B4856E26F8808809A4EA",
                "27E11A95048252AF7EAFA33209569A20",
                "0A1EFDB5FB12AF9A0CFDDF3C7C1F95F1",
                "EA63F2E99BE9407C8FE47D89B83F897D",
                "F46EBA94C0406BF84FB8A613CBDDF21A"
            ],
            "players": [],
            "fps": 59.993492,
            "ping": 59
            },
        ]
    }
    ```
2. After getting the server `id` we can make an HTTP Request with POST method  to this Roblox endpoint **`https://gamejoin.roblox.com/v1/join-game-instance`** with
    - headers 
    ```
    {
    "Content-Type": "application/json", 
    "User-Agent": "Roblox/WinInet"
    }
    ```
    - body
    ```
    {
    "placeId": 8356562067,
    "isTeleport": "False",
    "gameId": "02869742-0850-4f44-b1d6-3092d98458d9",
    "gameJoinAttemptId": "02869742-0850-4f44-b1d6-3092d98458d9"
    }
    ```
    We now get the IP address of the server from it's HTTP respond **`"Address": "10.182.1.17"`**
    ```
    {
        "joinScript": {
            "ClientPort": 0,
            "MachineAddress": "10.182.1.17",
            "ServerPort": 54373,
            "ServerConnections": [
                {
                    "Address": "10.182.1.17",
                    "Port": 54373
                }
            ],
            "UdmuxEndpoints": [
                {
                    "Address": "128.116.97.33",
                    "Port": 54373
                }
            ],
        }
    }
    ```
3. Check whether the server IP network that i get matches with the desired region from server regions by IP list data that i get from [BTRoblox's code](https://github.com/AntiBoomz/BTRoblox/blob/master/js/shared/serverdetails.js).
4. If the server IP Address of that server ID is indeed from the desired region then execute this roblox function `Roblox.GameLauncher.joinGameInstance(placeId, serverId);` which will join the player to that specific server from the game.

## File Descriptions

### `manifest.json`
This file defines the Chrome extension's metadata and permissions. It specifies:
- **Manifest Version**: Uses Manifest V3, the latest standard for Chrome extensions.
- **Permissions**: Includes `scripting`, `activeTab`, and `declarativeNetRequestWithHostAccess` to enable script injection and network request modifications.
- **Host Permissions**: Grants access to Roblox-related domains (`roblox.com`, `games.roblox.com`, and `gamejoin.roblox.com`).
- **Background Service Worker**: Points to `background.js` for handling background tasks.
- **Content Scripts**: Specifies `content.js` to run on Roblox game pages.
- **Web Accessible Resources**: Allows `injector.js` to be injected into the page context.
### `content.js`
The `content.js` file is a content script that runs on Roblox game pages. Its primary responsibilities include:
1. **Injecting the "Join Best Server" Button**: It dynamically adds a button below the "Play" button on the game page.
2. **Fetching Server Data**: When the button is clicked, it fetches a list of public servers for the current game using Roblox's API.
3. **Communicating with the Background Script**: It sends messages to the background script to retrieve server details, including region information.
4. **Joining the Best Server**: If a server in the preferred region (e.g., Singapore) is found, it sends a message to the page context to initiate the server join process.

This script uses a `MutationObserver` to ensure the button is re-injected if the page content changes dynamically.

### `injector.js`
The `injector.js` file is injected into the page context to interact directly with Roblox's internal JavaScript objects. It listens for messages from the content script and uses Roblox's `GameLauncher.joinGameInstance` function to join a specific server. Key features include:
- **Message Listener**: Listens for `JOIN_BEST_SERVER` messages from the content script.
- **Server Joining Logic**: Calls `Roblox.GameLauncher.joinGameInstance` with the provided `placeId` and `serverId`.

This file bridges the gap between the extension and Roblox's internal game-launching functionality.

### `background.js`
The `background.js` file is the service worker for the extension. It handles:
1. **Server Region Mapping**: Maintains a mapping of IP address ranges to server regions (e.g., Singapore, United States, etc.).
2. **User-Agent Modification**: Temporarily modifies the User-Agent header for requests to Roblox's `join-game-instance` API to mimic a Roblox client.
3. **Server Details Retrieval**: Processes messages from the content script to fetch server details, including IP addresses and region information.
4. **Asynchronous Communication**: Uses Chrome's messaging system to send responses back to the content script.

## Design Choices

### 1. **Server Region Mapping**
Instead of relying on external geolocation APIs, the extension uses a hardcoded mapping of IP ranges to regions. This approach minimizes latency and avoids dependency on third-party services. The mapping was sourced from publicly available data and tailored for Roblox's server infrastructure.

### 2. **User-Agent Modification**
To interact with Roblox's `join-game-instance` API, the extension temporarily modifies the User-Agent header to mimic a Roblox client. This ensures compatibility with Roblox's API while adhering to Chrome's declarative network request rules.





## Credit
Without the help of all these credits, this Roblox chrome extension project would not be possible.
- The **first code inspiration** that leads to every other references from **Oqarshi** which available at [Greasyfor Fork](https://greasyfork.org/en/scripts/523727-rolocate/code) and [GitHub](https://github.com/Oqarshi/Roblox-Server-Regions) :D
- **Server Regions by IP list and temporarily changes chrome User-Agent implementation**. Special thanks to the **BTRoblox Team** for their valuable open-source extension, available on [GitHub](https://github.com/AntiBoomz/BTRoblox). ❤️ Without BTRoblox's code that available publicly i might had to use some geolocation information API to determine the server location information based on it's IP Address and also manually change my Chrome User-Agent everytime i wanna fetch this Roblox API https://gamejoin.roblox.com/v1/join-game-instance 
- **Finding a server location**. Based on a guide made by Roblox username **Duduble** which available on [Roblox Developer Forum](https://devforum.roblox.com/t/how-to-find-the-server-region-from-the-website/2862705)
- **Code Inspiration**. Roblox username IsDatYoMama10 or AKA Exilon24 GitHub for giving overall inspiration on how my extension workflow works [GitHub](https://github.com/Exilon24/RobloxServerFinder)
- Nexumi at Discord for giving direction on what i should look up and helping with debugging!!! great insights that i would not think about before