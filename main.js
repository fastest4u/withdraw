async function main() {
    await liff.init({ liffId: "2005784883-MqXYJ2vW" });

    if (liff.isLoggedIn()) {
        const profile = await liff.getProfile();
        console.log(profile);
        document.getElementById("pictureUrl").src = profile.pictureUrl;
        document.getElementById("displayName").append(profile.displayName);
        document.getElementById("statusMessage").append(profile.statusMessage); // Corrected typo here
    } else {
        liff.login();
    }
}

main();
