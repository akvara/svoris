var formatDate = function(dateStr) {
        var date = new Date(dateStr);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        return year + '-' + ("00" + month).slice(-2)  + '-' + ("00" + day).slice(-2);
}

module.exports = {
    formatDate
};