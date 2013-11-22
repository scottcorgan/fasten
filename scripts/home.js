(function () {
  var action = getParameterByName('action');
  
  // if (Userbin.user()) return window.location = '/hooks';
  if (action === 'login') Userbin.auth();
  if (action === 'logout') alert('You\'ve successfully been logged out.');
  
  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);
    
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
}());