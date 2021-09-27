const dob = document.querySelector("#input-date");
const btnCheck = document.querySelector("#btn");
const message = document.querySelector("#show-msg")

btnCheck.addEventListener("click", clickHandler);

function dateToStr(date) {
    var dateStr = {
        day:'', month:'', year:''
    };

    if (date.day < 10){
        dateStr.day = '0' + date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

function reverseDate(str) {
    return str.split('').reverse().join('');
}
//console.log(reverseDate('hiii-hdh'))

function isPalindrome(str){
    if(str === reverseDate(str))
    return true;
}

function allDateFormats(date) {
    var dateStr = dateToStr(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var yymmdd =  dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, mmddyy, ddmmyy, yymmdd];
}

function checkForAllFormats(date){
    var allPalindromes = allDateFormats(date);

    var flag = false;

    for(var i=0; i< allPalindromes.length; i++){
        if (isPalindrome(allPalindromes[i])){
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year){
    if (year%400 === 0){
        return true
    }
    if (year%100 === 0){
        return false;
    }
    if (year%4 === 0){
        return true;
    }
    return false
}

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month ;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    if (month === 2){
        if(isLeapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
        }
        else{
            if(day > 28){
                day = 1;
                month++;
            }
        }
    }
    else{
        if (day > daysInMonth[month-1]){
            day = 1;
            month++;
        }
    }
    if (month > 12){
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year: year
    };
}

function nextPalindrome(date){
    var counter = 0;
    var nextDate = getNextDate(date);

    while(1){
        counter++;
        var isPalindrome = checkForAllFormats(nextDate);
        if (isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [counter, nextDate];
}

function clickHandler(e){
    var bdayDate = dob.value;

    if (bdayDate !== ''){
        var listOfDate = bdayDate.split('-');
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };
        var isPalindrome = checkForAllFormats(date);

        if (isPalindrome){
            message.innerText = "YAYAYYYY IT'S A PALINDROME!🎉🎊";
        }
        else{

            var [counter, nextDate] = nextPalindrome(date);

            message.innerText =  `The next Palindrome is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${counter} 😢`;
        }
    }
}