// content.js - Anti-Algo Functions

// 1. Intent Filter (Achtsamkeits-Popup)
function checkIntentFilter() {
    // Only show on root homepage, not on search or video pages
    if (window.location.pathname === "/" && window.location.search === "") {
        if (!document.getElementById("anti-algo-intent-filter")) {
            createIntentFilter();
        } else {
            document.getElementById("anti-algo-intent-filter").style.display = "flex";
        }
    } else {
        if (document.getElementById("anti-algo-intent-filter")) {
            document.getElementById("anti-algo-intent-filter").style.display = "none";
        }
    }
}

function createIntentFilter() {
    const overlay = document.createElement("div");
    overlay.id = "anti-algo-intent-filter";
    Object.assign(overlay.style, {
        position: "fixed", top: "0", left: "0", width: "100%", height: "100%",
        backgroundColor: "rgba(15, 15, 15, 0.98)", zIndex: "9999999",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        color: "white", fontFamily: "Roboto, Arial, sans-serif"
    });

    const title = document.createElement("h1");
    title.innerText = "Was möchtest du heute hier tun?";
    Object.assign(title.style, { 
        fontSize: "32px", marginBottom: "40px", fontWeight: "bold", textAlign: "center"
    });

    const form = document.createElement("form");
    form.onsubmit = (e) => {
        e.preventDefault();
        const query = input.value.trim();
        if (query) {
            window.location.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
        }
    };
    Object.assign(form.style, { display: "flex", width: "100%", maxWidth: "600px" });

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Bewusst suchen...";
    Object.assign(input.style, {
        flex: "1", padding: "18px 24px", fontSize: "20px", borderRadius: "28px 0 0 28px",
        border: "1px solid #303030", backgroundColor: "#121212", color: "white", outline: "none"
    });

    const button = document.createElement("button");
    button.type = "submit";
    button.innerText = "Suchen";
    Object.assign(button.style, {
        padding: "0 30px", fontSize: "20px", borderRadius: "0 28px 28px 0",
        border: "1px solid #303030", borderLeft: "none", backgroundColor: "#333333", color: "white", cursor: "pointer", fontWeight: "bold"
    });
    
    // Hover effect for button
    button.onmouseover = () => button.style.backgroundColor = "#444444";
    button.onmouseout = () => button.style.backgroundColor = "#333333";

    form.appendChild(input);
    form.appendChild(button);
    overlay.appendChild(title);
    overlay.appendChild(form);
    
    // Append to body as soon as possible
    if (document.body) {
        document.body.appendChild(overlay);
        input.focus();
    } else {
        document.addEventListener("DOMContentLoaded", () => {
            document.body.appendChild(overlay);
            input.focus();
        });
    }
}

// 2. Disable Autoplay
function disableAutoplay() {
    // Standard Autoplay Toggle switch
    const autoplayToggle = document.querySelector(".ytp-autonav-toggle-button");
    if (autoplayToggle) {
        const isAutoplayOn = autoplayToggle.getAttribute("aria-checked") === "true";
        if (isAutoplayOn) {
            autoplayToggle.click();
            console.log("Anti-Algo: Autoplay disabled.");
        }
    }
    
    // Up-Next overlay cancel button (the countdown circle)
    const cancelBtn = document.querySelector('.ytp-autonav-endscreen-upnext-cancel-button');
    if (cancelBtn) {
        cancelBtn.click();
        console.log("Anti-Algo: Canceled next video screen.");
    }
}

// -------- Initialization & Event Listeners --------

// YouTube uses an internal router (SPF / Polymer), so we must listen for its custom navigation events
document.addEventListener("yt-navigate-finish", () => {
    checkIntentFilter();
    setTimeout(disableAutoplay, 1000); // Check quickly after load
    setTimeout(disableAutoplay, 3000); // Check again to be safe
});

// Run immediately via interval just to be absolutely sure it stays active 
// (e.g. if you toggle Autoplay manually, it turns it right back off)
setInterval(() => {
    checkIntentFilter();
    disableAutoplay();
}, 2000);

// Try to run right away on script load
checkIntentFilter();
