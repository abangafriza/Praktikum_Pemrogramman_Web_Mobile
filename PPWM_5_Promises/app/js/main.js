const app = (() => {
  
  function getImageName(country) {

    // membuat dan mengembalikan promise
    country = country.toLowerCase();
    const promiseOfImageName = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (country === 'spain' || country === 'chile' || country === 'peru') {
          resolve(country + '.png');
        } else {
          reject(Error('Didn\'t receive a valid country name!'));
        }
      }, 1000);
    });
    console.log(promiseOfImageName);
    return promiseOfImageName;
  }

  function isSpain(country) {

    // Optional - create and return a promise that resolves if input is "Spain"
    return new Promise((resolve, reject) => {
      if (country === 'Spain') {
        resolve('It is Spain!');
      } else {
        reject('It is not Spain!');
      }
    });
  }

  function flagChain(country) {

    // menggunakan promise
    return getImageName(country)
      .catch(fallbackName)
      .then(fetchFlag)
      .then(processFlag)
      .then(appendFlag)
      .catch(logError);
  }

  function allFlags(promiseList) {

    // menggunakan promise.all
    return Promise.all(promiseList)
      .catch(returnFalse);

  }

  const promises = [
      getImageName('Spain'),
      getImageName('Chile'),
      getImageName('Peru')
  ];

  // memanggil fungsi 'allFlags'
  allFlags(promises).then(result => {
      console.log(result);
  });

  // menggunakan Promise.race
  const promise1 = new Promise((resolve, reject) => {
      setTimeout(resolve, 500, 'one');
  });

  const promise2 = new Promise((resolve, reject) => {
      setTimeout(reject, 100, 'two');
  });

  Promise.race([promise1, promise2])
      .then(logSuccess)
      .catch(logError);

  /* fungsi-fungsi pembantu */

  function logSuccess(result) {
    console.log('Success!:\n' + result);
  }

  function logError(err) {
    console.log('Oh no!:\n' + err);
  }

  function returnFalse() {
    return false;
  }

  function fetchFlag(imageName) {
    return fetch('flags/' + imageName); // mengambil kembalian dari sebuah promise
  }

  function processFlag(flagResponse) {
    if (!flagResponse.ok) {
      throw Error('Bad response for flag request!'); // This will implicitly reject
    }
    return flagResponse.blob(); // file type blob() mengembalikan sebuah promise
  }

  function appendFlag(flagBlob) {
    const flagImage = document.createElement('img');
    const flagDataURL = URL.createObjectURL(flagBlob);
    flagImage.src = flagDataURL;
    const imgContainer = document.getElementById('img-container');
    imgContainer.appendChild(flagImage);
    imgContainer.style.visibility = 'visible';
  }

  function fallbackName() {
    return 'chile.png';
  }

  // Don't worry if you don't understand this, it's not part of Promises.
  // We are using the JavaScript Module Pattern to enable unit testing of
  // our functions.
  return {
    getImageName: (getImageName),
    flagChain: (flagChain),
    isSpain: (isSpain),
    fetchFlag: (fetchFlag),
    processFlag: (processFlag),
    appendFlag: (appendFlag),
    allFlags: (allFlags)
  };

})();
