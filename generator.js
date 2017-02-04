var fs = require('fs');

function b64DecodeUnicode(str) {
    function atob(str) {return new Buffer(str, 'base64').toString('binary');}
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function b64EncodeUnicode(str) {
    function btoa(str) {return new Buffer(str.toString(), 'binary').toString('base64');}
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

var text = fs.readFileSync('script.js','utf8')
var b64function = (b64EncodeUnicode(text));
console.log(b64function);

var f = new Function(b64DecodeUnicode(b64function));
console.log(f());