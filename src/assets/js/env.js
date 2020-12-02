(function (window) {
  window.env = window.env || {};
  if (location.hostname === 'agora.awessome.fr') {
    window.env.apiUrl = `https://api.agora.awessome.fr`
  } else {
    window.env.apiUrl = `http://${location.hostname}:3020`;
  }
  console.log('server url: ', window.env.apiUrl);
}(this));
