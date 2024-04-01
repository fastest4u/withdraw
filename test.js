var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "date": "",
  "route": "",
  "barcode": "",
  "cartype": "aaaa",
  "company": "",
  "driver": "",
  "phone": "",
  "jobType": "",
  "email": ""
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://sheet.best/api/sheets/df2691c3-e93f-4de2-85df-b3fa37f4acff/tabs/DB", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));