//CORE GARF LOGIC. I stole this from the original garf bot.
// ----- DEPENDENCIES -----

var moment = require('./moment');

// ------ THE SCRIPT ------

var archive = 'http://picayune.uclick.com/comics/ga/'
var start = new Date("1978-06-19"); //Garfield started in June 19, 1978
var formattedStart = moment(start).format("YYMMDD"); //format the date object to yyyy-mm-dd with 'moment'
var today = new Date();
var todayYear = today.getFullYear();
var todayMonth = today.getMonth();
var todayDay = today.getDate();
var formattedToday = moment(today).format("YYMMDD");
var dayLength = 24*60*60*1000;
var comicCount = Math.round(Math.abs((start.getTime() - today.getTime())/(dayLength)));

// ------ PARAMATERS ------

/**
 * @param year
 * @param month
 * @param day
 * @constructor
 */

// --- THE SCRIPT PART 2 ---

function request(year, month, day) {
    // if (year === null || typeof year === 'undefined' || month === null ||
    //     typeof month === 'undefined' || day === null || typeof day === 'undefined') {
    //     return;
    //     return("Returned unexpected response (null/undefined).");
    // }
    // if (year < 1978 && month < 06 && day < 19) {
    //     return("You can't search for comics earlier than 1978-06-19.");
    // }
    // if (month === 4 && day > 30 || month === 6 && day > 30 || month === 9 && day > 30 ||
    //     month === 11 && day > 30 || month === 2 && day > 29 || month === 1 && day > 31 ||
    //     month === 3 && day > 31 || month === 5 && day > 31 || month === 7 && day > 31 ||
    //     month === 8 && day > 31 || month === 10 && day > 31 || month === 12 && day > 31 ||
    //     month > 12) {
    //     return("The date on input is invalid.");
    //
    // }
    // if (isNaN(year) || isNaN (month) || isNaN(day)) {
    //     return("The date input is not a number.");
    // }
    if (day.charAt(0) == "0"){

        day = day.slice(1);
        console.log("Day:" + day)
    }
    if (month.charAt(0) == "0"){
        console.log("Input Month:" + month)
        month = month.slice(1);
        console.log("Month:" + month)
    }
    var mm = (month < 9 ? '0' : '') + month;
    var dd = (day < 9 ? '0' : '') + day;
    var yy = moment(year).format("YY");
    var url = archive + year + '/' + yy + mm + dd + '.gif';
    console.log(url);
    return url;
}

function random() {
    var month = Math.floor(Math.random() * 12) + 1;
    var day;
    if (month === 2) {
        var day = Math.floor(Math.random() * 27) + 1;
    }
    if (month === 4 || month === 6 || month === 9 || month === 11) {
        var day = Math.floor(Math.random() * 29) + 1;
    }
    if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 ||
        month === 10 || month === 12) {
        var day = Math.floor(Math.random() * 30) + 1;
    }
    var randomYear = Math.floor(Math.random() * (todayYear - 1978) + 1978); //get a random year from 1978 to today
    var randomizedMonth = (month < 9 ? '0' : '') + month;
    var randomizedDay = (day < 9 ? '0' : '') + day;
    var url = archive + randomYear + '/' + randomYear + '-' + randomizedMonth + '-' + randomizedDay + '.gif';
    return url;
}

function latest() {
    var url = 'http://picayune.uclick.com/comics/ga/' + todayYear + '/ga' + formattedToday + '.gif';
    return url;
}

var count = comicCount;

exports.request = request;
exports.random = random;
exports.latest = latest;
exports.count = count;
