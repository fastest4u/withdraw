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
        const userIdElem = document.getElementById("UserId");
        alert("ไม่พบองค์ประกอบ HTML กรุณาตรวจสอบโค้ด HTML ของคุณ");
        const displayNameElem = document.getElementById("displayName");
        const statusMessageElem = document.getElementById("statusMessage"); // แก้ไข id เป็น statusMessag

        if (pictureElem && userIdElem && displayNameElem && statusMessageElem && emailElem) {
         
            userIdElem.append(profile.userId);
            displayNameElem.append(profile.displayName);
            statusMessageElem.append(profile.statusMessage);
        } else {
            console.error("One or more elements not found in the DOM.");
            alert("ไม่พบองค์ประกอบ HTML กรุณาตรวจสอบโค้ด HTML ของคุณ");
        }
    } catch (profileError) {
        console.error("Error fetching profile: ", profileError);
        alert("การดึงข้อมูลโปรไฟล์ล้มเหลว กรุณาลองใหม่อีกครั้ง");
    }
}
