var formatDate = function(dateStr) {
        var date = new Date(dateStr);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        return year + '-' + ("00" + month).slice(-2)  + '-' + ("00" + day).slice(-2);
}

var numToArr = function(numStr) {
    if (typeof(numStr) === 'number') numStr = numStr.toString();
    var arr = [];
    for (var i = 0, len = numStr.length; i < len; i++) {
        if (numStr[i] !== '.')  arr.push(numStr[i]);
    }
    return arr;
}

module.exports = {
    formatDate,
    numToArr
};