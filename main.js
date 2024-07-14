async function main() {
    await liff.init({ liffId: "2005784883-MqXYJ2vW",withloginOnexternalBrowser: true });

    if (liff.isLoggedIn()) {
        getprofile();
        
        
    } else {
        liff.login();
    }
}

main();
async function getprofile() {
    const profile = await liff.getProfile();
    console.log(profile);
    document.getElementById("picture").src = profile.pictureUrl;
    document.getElementById("UserId").append(profile.userId);
    document.getElementById("displayName").append(profile.displayName);
    document.getElementById("stausMessage").append(profile.statusMessage);
    document.getElementById("email").append(profile.email);
}
