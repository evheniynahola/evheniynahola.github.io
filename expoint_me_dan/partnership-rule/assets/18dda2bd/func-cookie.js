 /**
  * 
  * @param {string} name 
  * @returns 
  */
 function getCookie(name) {
     var cookie = " " + document.cookie;
     var search = " " + name + "=";
     var setStr = '';
     var offset = 0;
     var end = 0;
     if (cookie.length > 0) {
         offset = cookie.indexOf(search);
         if (offset != -1) {
             offset += search.length;
             end = cookie.indexOf(";", offset);
             if (end == -1) {
                 end = cookie.length;
             };
             setStr = unescape(cookie.substring(offset, end));
         }
     };
     return (setStr);
 }
 /**
  * 
  * @param {*} name 
  * @param {*} value 
  * @param {*} expires 
  * @param {*} path 
  * @param {*} domain 
  * @param {*} secure 
  */
 function setCookie(name, value, expires, path, domain, secure) {
     document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) +
         ((undefined !== expires) ? "; expires=" + expires : "") +
         ((undefined !== path) ? "; path=" + path : "; path=/") +
         ((undefined !== domain) ? "; domain=" + domain : "") +
         ((undefined !== secure) ? "; secure" : "");

 }