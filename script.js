// Function to populate the table with data
function populateTable(data) {
  const tableBody = document.getElementById("resultTableBody");

  // Clear the existing table rows
  tableBody.innerHTML = "";

  // Create a new table row for the retrieved data
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${data.date}</td>
    <td>${data.route}</td>
    <td>${data.barcode}</td>
    <td>${data.company}</td>
    <td>${data.driver}</td>
    <td>${data.phone}</td>
    <td>
      <div class="mb-3">
        <select class="form-select" name="cartype">
          <option value="6W7.2">6W7.2</option>
          <option value="4W">4W</option>
          <option value="4WJ">4WJ</option>
          <option value="6W5.5">6W5.5</option>
          
        </select>
      </div>
    </td>
    <td>
      <select class="form-select" name="Email">
        <option value="Pathwaylogistics2022@gmail.com">Pathwaylogistics2022@gmail.com</option>
      </select>
    </td>
  `;

  // Append the row to the table body
  tableBody.appendChild(row);
}

// Function to search for a barcode
async function searchBarcode() {
  const barcode = document.getElementById("barcodeInput").value.trim();
  let barcodes = await checkbarcode(barcode);
  if (barcodes != null ) {
    displayNotification("ใบงาน " + barcode + "\n บักทึกไปแล้ว", "error");
    autoRefresh();
    return   
  }
  if (!barcode) {
    displayNotification("Please enter a valid barcode", "error");
    autoRefresh();
    return;
  }

  try {
    // Fetch data from the API
    const response = await fetch(`https://fleet-vip.vercel.app/api/decode/${barcode}`);
    const data = await response.json();

    // Check if the response is successful
    if (response.ok) {
     
      if (data.actual_departure_time.length === 0 && data.actual_arrival_time.length === 0 ) {
        displayNotification("ไม่ได้วิ้งงาน", "error");
        autoRefresh();
        return;
      }
      populateTable(data);
  
      // Show the result container
      document.getElementById("resultContainer").style.display = "block";
    } else {
    
      // Handle error cases here
      displayNotification("บาร์โค้ดประจำตัวรถใช้งานไม่ได้", "error");
      autoRefresh();
      return;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Error fetching data. Please try again.");
  }
}

// Function to save all rows to Sheety
async function logData() {
  const tableRows = document.getElementById("resultTableBody").querySelectorAll("tr");
  const dataToLog = [];

  // Loop through each table row
  for (const row of tableRows) {
    const rowData = {
      date: row.cells[0].textContent,
      route: row.cells[1].textContent,
      barcode: row.cells[2].textContent,
      company: row.cells[3].textContent,
      driver: row.cells[4].textContent,
      phone: row.cells[5].textContent,
      cartype: row.cells[6].querySelector("select").value,
      email: row.cells[7].querySelector("select").value,
      jobType : document.getElementById("jobTypeSelect").value,
      withdraw : document.getElementById("withdrawInput").value
    };

    dataToLog.push(rowData);
  }

    try {
        postDataToServer(dataToLog[0]);
        return;
      } catch (error) {
        console.error("Error:", error);
      }
   
 
}

// Function to post data to the server
async function postDataToServer(data) {
  const urls = [
    "https://sheet.best/api/sheets/8cca094e-0682-44bb-9eda-a40c5ad1301a/tabs/DB",
    "https://sheet.best/api/sheets/cab34f47-ddcf-4fcd-8aad-59a3bd946108/tabs/DB"
  ];

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify(data);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    // แสดงข้อความ "กำลังบันทึกข้อมูล"
    displayNotification("กำลังบันทึกข้อมูล", "warning");

    for (const url of urls) {
      const response = await fetch(url, requestOptions);
      if (response.status === 200) {
        // สุดท้ายที่เสร็จสมบูรณ์ ให้แสดงข้อความ "success"
        if (urls.indexOf(url) === urls.length - 1) {
          displayNotification("success", "success");
          autoRefresh()
          return;
        }
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }
    // Call postDataToGoogleSheet after all requests are successful

  } catch (error) {
    console.error("Error:", error);
  }
}



// Function to display Bootstrap modal notification
async function displayNotification(message, alertClass) {
  Swal.fire({
    icon: alertClass, 
    title: message,
    showConfirmButton: false,
    timerProgressBar: true,
    onClose: () => {
      const notificationBody = document.getElementById("notificationBody");
      notificationBody.innerHTML = "";
    },
    didOpen: () => {
      if (alertClass === "warning") {
        Swal.showLoading();
      }
    }
  });
}



// Function to check barcode
async function checkbarcode(barcode) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
    cache: "no-cache" // เพิ่ม cache-control เป็น no-cache
  };

  try {
    const url = `https://sheet.best/api/sheets/cab34f47-ddcf-4fcd-8aad-59a3bd946108/tabs/DB/barcode/${barcode}`;
    const response = await fetch(url, requestOptions);

    // เพิ่มการตรวจสอบสถานะการเรียก API
    if (response.ok) {
      const result = await response.json();

      if (result && result.length > 0 && result[0].barcode !== undefined) {
        // console.log(result[0].barcode);
        return result[0].barcode;
      } else {
        return null;
      }
    } else {
      console.error("Error:", response.statusText);
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}


// Function for automatic page refresh
function autoRefresh() {
  setTimeout(function() {
    location.reload();
  }, 1000);
}



