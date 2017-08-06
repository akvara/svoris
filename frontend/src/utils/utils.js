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

var sortArrOfObjectsByParam = function(arrToSort, sortBy, sortDesc) {
    if(!sortDesc) {
        return arrToSort.sort(function (a, b) {
            return a[sortBy] < b[sortBy] ? -1 : 1;
        });
    }
    else {
        return arrToSort.sort(function (a, b) {
            return a[sortBy] > b[sortBy] ? -1 : 1;
        });
    }
}

module.exports = {
    formatDate,
    numToArr,
    sortArrOfObjectsByParam
};