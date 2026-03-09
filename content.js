// content.js - Anti-Algo Functions

// 1. Intent Filter (Achtsamkeits-Popup)
function checkIntentFilter() {
    if (window.location.pathname === "/" && window.location.search === "") {
        if (!document.getElementById("anti-algo-dialog")) {
            createIntentFilter();
        } else {
            const dialog = document.getElementById("anti-algo-dialog");
            if (!dialog.open) dialog.showModal();
            const input = document.getElementById("anti-algo-search-input");
            if (input) input.focus();
        }
    } else {
        const dialog = document.getElementById("anti-algo-dialog");
        if (dialog && dialog.open) {
            dialog.close();
        }
    }
}

function createIntentFilter() {
    // Utilize native HTML5 Dialog for maximum focus trapping and isolation
    const dialog = document.createElement("dialog");
    dialog.id = "anti-algo-dialog";

    // Reset native dialog styles to match our full-screen overlay
    Object.assign(dialog.style, {
        position: "fixed", top: "0", left: "0", width: "100%", height: "100%",
        maxWidth: "100%", maxHeight: "100%", margin: "0", padding: "0",
        border: "none", backgroundColor: "rgba(15, 15, 15, 0.98)", zIndex: "2147483647",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        color: "white", fontFamily: "Roboto, Arial, sans-serif"
    });

    const style = document.createElement("style");
    style.textContent = `
        #anti-algo-dialog::backdrop {
            background-color: rgba(15, 15, 15, 0.98);
        }
        /* Override display:none when open since we use flex */
        #anti-algo-dialog[open] {
            display: flex;
        }
        #anti-algo-dialog:not([open]) {
            display: none;
        }
    `;
    document.head.appendChild(style);

    const title = document.createElement("h1");
    title.innerText = "Was möchtest du heute hier tun?";
    Object.assign(title.style, {
        fontSize: "32px", marginBottom: "40px", fontWeight: "bold", textAlign: "center"
    });

    const searchContainer = document.createElement("form");
    Object.assign(searchContainer.style, { display: "flex", width: "100%", maxWidth: "600px" });

    const input = document.createElement("input");
    input.id = "anti-algo-search-input";
    input.type = "text";
    input.autocomplete = "off";
    input.placeholder = "Bewusst suchen...";
    Object.assign(input.style, {
        flex: "1", padding: "18px 24px", fontSize: "20px", borderRadius: "28px 0 0 28px",
        border: "1px solid #303030", backgroundColor: "#121212", color: "white", outline: "none"
    });

    const performSearch = () => {
        const query = input.value.trim();
        if (query) {
            window.location.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
        }
    };

    searchContainer.addEventListener("submit", (e) => {
        e.preventDefault();
        performSearch();
    });

    const button = document.createElement("button");
    button.type = "submit";
    button.innerText = "Suchen";
    Object.assign(button.style, {
        padding: "0 30px", fontSize: "20px", borderRadius: "0 28px 28px 0",
        border: "1px solid #303030", borderLeft: "none", backgroundColor: "#333333", color: "white", cursor: "pointer", fontWeight: "bold"
    });

    button.onmouseover = () => button.style.backgroundColor = "#444444";
    button.onmouseout = () => button.style.backgroundColor = "#333333";

    searchContainer.appendChild(input);
    searchContainer.appendChild(button);
    dialog.appendChild(title);
    dialog.appendChild(searchContainer);

    // Stop events from bubbling out of the dialog to YouTube's body listeners
    const stopGlobalLeak = (e) => e.stopPropagation();
    dialog.addEventListener("keydown", stopGlobalLeak);
    dialog.addEventListener("keyup", stopGlobalLeak);
    dialog.addEventListener("keypress", stopGlobalLeak);
    dialog.addEventListener("click", stopGlobalLeak);

    // Click on dialog background refocuses the input
    dialog.addEventListener("click", (e) => {
        if (e.target === dialog) {
            input.focus();
        }
    });

    // We must wait for the body to be completely available before appending a dialog
    const initDialog = () => {
        if (!document.getElementById("anti-algo-dialog")) {
            document.body.appendChild(dialog);
            dialog.showModal();
            setTimeout(() => input.focus(), 100);
        }
    };

    if (document.body) {
        initDialog();
    } else {
        document.addEventListener("DOMContentLoaded", initDialog);
    }
}

// 2. Disable Autoplay
function disableAutoplay() {
    if (!window.location.pathname.startsWith("/watch")) return;

    const autoplayToggle = document.querySelector(".ytp-autonav-toggle-button");
    if (autoplayToggle) {
        const isAutoplayOn = autoplayToggle.getAttribute("aria-checked") === "true";
        if (isAutoplayOn) {
            autoplayToggle.click();
            console.log("Anti-Algo: Autoplay disabled.");
        }
    }

    const cancelBtn = document.querySelector('.ytp-autonav-endscreen-upnext-cancel-button');
    if (cancelBtn) {
        cancelBtn.click();
        console.log("Anti-Algo: Canceled next video screen.");
    }
}

// -------- Initialization & Event Listeners --------
document.addEventListener("yt-navigate-finish", () => {
    checkIntentFilter();
    setTimeout(disableAutoplay, 1000);
    setTimeout(disableAutoplay, 3000);
});

setInterval(() => {
    checkIntentFilter();
    disableAutoplay();
}, 2000);

checkIntentFilter();
