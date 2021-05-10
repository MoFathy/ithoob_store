export function getCookie(cname, kvalue) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      if (
        c.substring(name.length, c.length) &&
        c.substring(name.length, c.length) != ""
      ) {
        var x = JSON.parse(c.substring(name.length, c.length));
        return kvalue ? x[kvalue] : x;
      } else {
        return "";
      }
    }
  }
  return "";
}

export function getNewsCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  // return decodedCookie;
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      if (
        c.substring(name.length, c.length) &&
        c.substring(name.length, c.length) != ""
      ) {
        var x = c.substring(name.length, c.length);
        return x;
      } else {
        return "";
      }
    }
  }
  // return "";
}
export function deleteCookie(cname) {
  var d = new Date(); //Create an date object
  d.setTime(d.getTime() - 1000 * 60 * 60 * 24); //Set the time to the past. 1000 milliseonds = 1 second
  var expires = "expires=" + d.toGMTString(); //Compose the expirartion date
  window.document.cookie = cname + "=" + "; " + expires + ";path=/"; //Set the cookie with name and the expiration date
}
