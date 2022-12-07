//handler that handles error for promises
const handlePromise = (promise) => {
    return promise
      .then(data => ([true, data,]))
      .catch(error => {
          console.log(error);
          return Promise.resolve([false, error])
      });
  }
  
  module.exports = handlePromise