var ret = "";
var sign = "#";

for (var i = 0; i < 10; i++) {
    for (var j = 0; j < i; j++) {
        ret += sign;
    }
    ret += "\n";
}

return ret;