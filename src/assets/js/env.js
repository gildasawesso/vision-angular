(function (window) {
  window.env = window.env || {};
  window.env.apiUrl = `http://${location.hostname}:3020`;
  console.log('server url: ', window.env.apiUrl);
}(this));
