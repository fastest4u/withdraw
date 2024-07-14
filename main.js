async function main() {
    try {
        await liff.init({ liffId: "2005784883-MqXYJ2vW", withLoginOnExternalBrowser: true });
    } catch (initError) {
        console.error("LIFF Initialization failed: ", initError);
        alert("การเริ่มต้น LIFF ล้มเหลว กรุณาลองใหม่อีกครั้ง");
        return;
    }

    if (liff.isLoggedIn()) {
        getprofile();
    } else {
        liff.login();
    }
}

main();

async function getprofile() {
    try {
        const profile = await liff.getProfile();
        console.log(profile);
        alert(profile.displayName);
     

        
    } catch (profileError) {
        console.error("Error fetching profile: ", profileError);
        alert("การดึงข้อมูลโปรไฟล์ล้มเหลว กรุณาลองใหม่อีกครั้ง");
    }
}
