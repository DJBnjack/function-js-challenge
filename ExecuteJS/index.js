module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    function b64DecodeUnicode(str) {
        function atob(str) {return new Buffer(str, 'base64').toString('binary');}
        return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    if (req.query.script || (req.body && req.body.script)) {
        var f = new Function(b64DecodeUnicode((req.query.script || req.body.script)));
        var functionResult = f();
        res = {
            // status: 200, /* Defaults to 200 */
            body: functionResult
        };
    }
    else {
        res = {
            status: 400,
            body: "Please pass a script on the query string or in the request body"
        };
    }
    context.done(null, res);
};