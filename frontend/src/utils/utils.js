var formatDate = function(dateStr) {
        var date = new Date(dateStr);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        return year + '-' + ("00" + month).slice(-2)  + '-' + ("00" + day).slice(-2);
}

var numToArr = function(numStr) {
    if (typeof(numStr) === 'number') numStr = numStr.toString();
    let arr = [];
    for (var i = 0, len = numStr.length; i < len; i++) {
        if (numStr[i] !== '.')  arr.push(numStr[i]);
    }
    return arr;
}

var arrToNum = function(arr, divider = 1) {
    let res = 0
    arr.forEach(function (digit) {
        res = res * 10 + parseInt(digit, 10)
    })

    return res / divider
}

var sortByDate = function(arrToSort, sortDesc) {
    if(!sortDesc) {
        return arrToSort.sort(function (a, b) {
            return a.date <  b.date ? -1 : 1;
        })
    } else {
        return arrToSort.sort(function (a, b) {
            return a.date >  b.date ? -1 : 1;
        })
    }
}

var sortArrOfObjectsByParam = function(arrToSort, sortBy, sortDesc) {
    if(!sortDesc) {
        return arrToSort.sort(function (a, b) {
            return parseFloat(a[sortBy]) < parseFloat(b[sortBy]) ? -1 : 1;
        });
    }
    else {
        return arrToSort.sort(function (a, b) {
            return parseFloat(a[sortBy]) > parseFloat(b[sortBy]) ? -1 : 1;
        });
    }
}

module.exports = {
    formatDate,
    numToArr,
    arrToNum,
    sortByDate,
    sortArrOfObjectsByParam
};