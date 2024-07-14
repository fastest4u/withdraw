async function main() {
    await liff.init({ liffId: "2005784883-MqXYJ2vW" });

    if (liff.isLoggedIn()) {
        const profile = await liff.getProfile();
        console.log(profile);

        const pictureUrlElem = document.getElementById("pictureUrl");
        const displayNameElem = document.getElementById("displayName");
        const statusMessageElem = document.getElementById("statusMessage");

        if (pictureUrlElem && displayNameElem && statusMessageElem) {
            pictureUrlElem.src = profile.pictureUrl;
            displayNameElem.append(profile.displayName);
            statusMessageElem.append(profile.statusMessage);
        } else {
            console.error("One or more elements not found in the DOM.");
        }
    } else {
        liff.login();
    }
}

document.addEventListener("DOMContentLoaded", main);
