let formatDate = function(dateStr) {
        let date = new Date(dateStr);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        return year + '-' + ("00" + month).slice(-2)  + '-' + ("00" + day).slice(-2);
};

let numToArr = function(numStr, requiredLen) {
    if (typeof(numStr) === 'number') numStr = numStr.toString();
    let arr = [];
    for (let i = 0, len = numStr.length; i < len; i++) {
        if (numStr[i] !== '.')  arr.push(numStr[i]);
    }
    for (let i = numStr.length; i < requiredLen; i++) {
        arr.push('0');
    }
    return arr;
};

let arrToNum = function(arr, divider = 1) {
    let res = 0
    arr.forEach(function (digit) {
        res = res * 10 + parseInt(digit, 10)
    });

    return res / divider
};

let sortByDate = function(arrToSort, sortDesc) {
    if(!sortDesc) {
        return arrToSort.sort(function (a, b) {
            return a.date <  b.date ? -1 : 1;
        })
    } else {
        return arrToSort.sort(function (a, b) {
            return a.date >  b.date ? -1 : 1;
        })
    }
};

let sortArrOfObjectsByParam = function(arrToSort, sortBy, sortDesc) {
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
};

module.exports = {
    formatDate,
    numToArr,
    arrToNum,
    sortByDate,
    sortArrOfObjectsByParam
};