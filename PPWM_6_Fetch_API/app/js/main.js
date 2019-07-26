function logResult(result) {
  console.log(result);
}

function logError(error) {
  console.log('Sepertinya ada kesalahan : ', error);
}

function validateResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function readResponseAsJSON(response) {
  return response.json();
}

function readResponseAsBlob(response) {
  return response.blob();
}

function readResponseAsText(response) {
  return response.text();
}

function showImage(responseAsBlob) {
  const container = document.getElementById('img-container');
  const imgElem = document.createElement('img');
  container.appendChild(imgElem);
  const imgUrl = URL.createObjectURL(responseAsBlob);
  imgElem.src = imgUrl;
}

function showText(responseAsText) {
  const message = document.getElementById('message');
  message.textContent = responseAsText;
}

function logSize(response) {
  const url = response.url;
  const size = response.headers.get('content-length');
  console.log(`${url} is ${size} bytes`);
}


// mengambil data JSON ----------

function fetchJSON() {
  fetch('examples/animals.json')
    .then(validateResponse)
    .then(readResponseAsJSON)
    .then(logResult)
    .catch(logError);
}
const jsonButton = document.getElementById('json-btn');
jsonButton.addEventListener('click', fetchJSON);


// mengambil data gambar ----------

function fetchImage() {
  fetch('examples/fetching.jpg')
    .then(validateResponse)
    .then(readResponseAsBlob)
    .then(showImage)
    .catch(logError);
}
const imgButton = document.getElementById('img-btn');
imgButton.addEventListener('click', fetchImage);


// mengambil data teks ----------

function fetchText() {
  fetch('examples/words.txt')
    .then(validateResponse)
    .then(readResponseAsText)
    .then(showText)
    .catch(logError);
}
const textButton = document.getElementById('text-btn');
textButton.addEventListener('click', fetchText);


// head request ----------

function headRequest() {
  fetch('examples/words.txt', {
    method: 'HEAD'
  })
    .then(validateResponse)
    .then(logSize)
    .catch(logError);
}
const headButton = document.getElementById('head-btn');
headButton.addEventListener('click', headRequest);


// POST request / SIMPAN ----------

function postRequest() {
  const formData = new FormData(document.getElementById('msg-form'));
  const messageHeaders = new Headers({
    'Content-Type': 'application/json',
    'X-Custom': 'hello world',
  })
  fetch('http://localhost:5000/', {
    method: 'POST',
    // body: formData,
    body: JSON.stringify({ lab: 'fetch', status: 'fun' }),
    headers: messageHeaders
  })
    .then(validateResponse)
    .then(readResponseAsText)
    .then(showText)
    .catch(logError);
}
const postButton = document.getElementById('post-btn');
postButton.addEventListener('click', postRequest);

