async function main() {
    try {
        await liff.init({ liffId: "2005784883-MqXYJ2vW", withLoginOnExternalBrowser: true });
    } catch (initError) {
        console.error("การเริ่มต้น LIFF ล้มเหลว: ", initError);
        alert("การเริ่มต้น LIFF ล้มเหลว กรุณาลองใหม่อีกครั้ง");
        return;
    }

    if (liff.isLoggedIn()) {
        getProfile();
    } else {
        liff.login();
    }
}

async function getProfile() {
    try {
        const profile = await liff.getProfile();
        console.log(profile);
        alert(profile.displayName);
    } catch (profileError) {
        console.error("การดึงข้อมูลโปรไฟล์ล้มเหลว: ", profileError);
        alert("การดึงข้อมูลโปรไฟล์ล้มเหลว กรุณาลองใหม่อีกครั้ง");
    }
}

main();
