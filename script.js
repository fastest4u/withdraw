

document.addEventListener("DOMContentLoaded", () => {
    main();
  
  
  });
  function logOut() {
    liff.logout();
    window.location.reload();
  }
  
  function logIn() {
    liff.login({ redirectUri: window.location.href });
  }
  
  async function main() {
    try {
      await liff.init({ liffId: "2005907641-EANbbGV1" });
      if (liff.isLoggedIn()) {
        const profile = await liff.getProfile();
        const profileData = {
          userId: profile.userId,
          pictureUrl: profile.pictureUrl,
          displayName: profile.displayName,
        };
        const userId = await  getuser(profileData.userId);
        console.log(userId);
        if (userId) {
         
  
        } else {
         
          
          
        }
  
  
      } else {
        console.log("Not logged in");
      }
    } catch (error) {
      console.error('LIFF initialization failed', error);
    }
  }
  

  

  
  
  
  
  
  async function displayNotification(message, alertClass) {
    Swal.fire({
      icon: alertClass,
      title: message,
      showConfirmButton: false,
      timerProgressBar: true,
      didOpen: () => {
        if (alertClass === "warning") {
          Swal.showLoading();
          setTimeout(() => {
            Swal.close();
          }, 3000);
        }
      }
    });
  }
  
  
  
  
  
  

  
  
  
  
  
  
  
