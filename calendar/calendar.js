/**
 * Created by SunshineLXH on 2016/4/6.
 */
//获取元素
var myDate;
var getCurSeconds;
var getCurMinutes;
var getCurHours;
var getCurYear;
var getCurMonth;
var getCurDate;
var offOn1 = false,
    offOn2 = false,
    offOn3 = false;
var holidayPlan = ['2016节假日安排','元旦','春节','清明节','劳动节','端午节','中秋节','国庆节'];

var timeMonitor = document.getElementsByClassName('time-monitor')[0];
var baseDatesBar = document.getElementsByClassName('base-dates-bar')[0];
var baseDate = baseDatesBar.getElementsByTagName('span')[0];
var baseWeekday = baseDatesBar.getElementsByTagName('span')[1];
var dateShowPanel = document.getElementsByClassName('date-show-panel')[0];
var dateDetail = document.getElementsByClassName('dates-detail')[0];

var yearControl = document.getElementsByClassName('year-control')[0];
var control1 = yearControl.getElementsByClassName('control')[0];

var monthControl = document.getElementsByClassName('month-control')[0];
var control2 = monthControl.getElementsByClassName('control')[0];

var holidayControl = document.getElementsByClassName('holiday-control')[0];
var control3 = holidayControl.getElementsByClassName('control-holiday')[0];

//返回今天
var toToday = document.getElementsByClassName('btn-today')[0];

dropList();


function dropList () {
    var listUl = document.createElement('ul');
    var listUl2 = document.createElement('ul');
    var listUl3 = document.createElement('ul');


    for ( var i = 1900; i < 2101; i++ ) {
        var yli = document.createElement('li');
        yli.innerHTML = i + '年';
        listUl.appendChild(yli);
    }
    listUl.className = "listUl1";
    yearControl.appendChild(listUl);

    for ( var j = 1; j < 13; j++ ) {
        var mli = document.createElement('li');
        mli.innerHTML = j + '月';
        listUl2.appendChild(mli);
    }
    listUl2.className = "listUl2";
    monthControl.appendChild(listUl2);

    for (var k = 0; k < holidayPlan.length; k++ ) {
        var hli = document.createElement('li');
        hli.innerHTML = holidayPlan[k];
        listUl3.appendChild(hli);
    }
    listUl3.className = "listUl3";
    holidayControl.appendChild(listUl3);



}

var listUl1 = document.getElementsByClassName('listUl1')[0];
var listUl2 = document.getElementsByClassName('listUl2')[0];
var listUl3 = document.getElementsByClassName('listUl3')[0];



function showHidden1() {
    if ( offOn1 ) {
        listUl1.style.display = 'block';
        offOn1 = false;
    }
    else {
        listUl1.style.display = 'none';
        offOn1 = true;
    }
}

function showHidden2() {
    if ( offOn2 ) {
        listUl2.style.display = 'block';
        offOn2 = false;
    }
    else {
        listUl2.style.display = 'none';
        offOn2 = true;
    }
}

function showHidden3() {
    if ( offOn3 ) {
        listUl3.style.display = 'block';
        offOn3 = false;
    }
    else {
        listUl3.style.display = 'none';
        offOn3 = true;
    }
}


var yearBtn = control1.getElementsByClassName('year')[0];
var trigger1 = control1.getElementsByClassName('trigger')[0];

var monthBtn = control2.getElementsByClassName('month')[0];
var trigger2 = control2.getElementsByClassName('trigger')[0];

var holidayBtn = control3.getElementsByClassName('holiday')[0];
var trigger3 = control3.getElementsByClassName('trigger')[0];


addEvent( yearBtn, 'click', showHidden1 );
addEvent( trigger1, 'click', showHidden1 );

addEvent( monthBtn, 'click', showHidden2 );
addEvent( trigger2, 'click', showHidden2 );

addEvent( holidayBtn, 'click', showHidden3 );
addEvent( trigger3, 'click', showHidden3 );

//绑定事件函数
function addEvent( obj, type, handle ) {
    try {
        obj.addEventListener( type, handle, false );
    }
    catch(e) {
        try {
            obj.attachEvent( 'on' + type, handle );
        }
        catch(e) {
            obj['on' + type] = handle;
        }
    }
    return false;
}



/*下面的左边部分*/
//首先根据获取的当前日期，计算当月有多少天，当月第一天是周几
//循环生成42个方块
for ( var i = 0; i < 42; i++ ) {
    var oLi = document.createElement('li');

    if (i != 0 && (i + 1) % 7 == 0) oLi.className = "oLi oLi-last";
    else oLi.className = 'oLi';

    if (i == 35 || i == 36 || i == 37 || i == 38 || i == 39 || i == 40) oLi.className = "oLi oLi-lastRow";

    if (i == 41) oLi.className = "oLi oLi-last oLi-lastRow";

    var oSpan1 = document.createElement('span');
    oSpan1.className = 'holidayInfo';
    var oDiv = document.createElement('div');
    oDiv.className = 'solarDay';
    var oSpan2 = document.createElement('span');
    oSpan2.className = 'lunarDay';

    oLi.appendChild(oSpan1);
    oLi.appendChild(oDiv);
    oLi.appendChild(oSpan2);

    dateDetail.appendChild(oLi);
}

var aLi = dateDetail.getElementsByTagName('li');
var solarDay = dateDetail.getElementsByClassName('solarDay');

for ( var i = 0; i < solarDay.length; i++ ) {

}

showDate();

function showDate(year, month, day) {
    var selectDate = new Date();
    year = year ? year : selectDate.getFullYear();
    month = month ? month : (selectDate.getMonth() + 1);
    day = day ? day : selectDate.getDate();

    var dayNum = 0;

    dayNum = getMonthNum(month);

    selectDate.setFullYear(year);
    selectDate.setMonth(month - 1);
    selectDate.setDate(1);

    switch ( selectDate.getDay() ) {
        case 0:
            for ( var i = 0; i < dayNum; i++ ) {
                solarDay[i + 6].innerHTML = i + 1;
            }
            break;
        case 1:
            for ( var i = 0; i < dayNum; i++ ) {
                solarDay[i].innerHTML = i + 1;
            }
            break;
        case 2:
            for ( var i = 0; i < dayNum; i++ ) {
                solarDay[i + 1].innerHTML = i + 1;
            }
            break;
        case 3:
            for ( var i = 0; i < dayNum; i++ ) {
                solarDay[i + 2].innerHTML = i + 1;
            }
            break;
        case 4:
            for ( var i = 0; i < dayNum; i++ ) {
                solarDay[i + 3].innerHTML = i + 1;
            }
            break;
        case 5:
            for ( var i = 0; i < dayNum; i++ ) {
                solarDay[i + 4].innerHTML = i + 1;
            }
            break;
        case 6:
            for ( var i = 0; i < dayNum; i++ ) {
                solarDay[i + 5].innerHTML = i + 1;
            }
            break;

    }

    var preMonthNum = getMonthNum(month - 1);

    for ( var m = 3; m >= 0; m-- ) {
        for ( var j = preMonthNum.length; j > 0; j--) {
            console.log(1)
            solarDay[m].innerHTML = j;
        }
    }


    var nextMonthNum = getMonthNum(month + 1);



}

//获取某月month的阳历天数
function getMonthNum (month) {
    var dayNum = 0;
    if ( month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12 ) {
        dayNum = 31;
    }
    else if ( month == 4 || month == 6 || month == 9 || month == 11 ) {
        dayNum = 30;
    }
    else if ( month == 2 && isLeapYear(year) ) {
        dayNum = 29;
    }
    else {
        dayNum = 28;
    }
    return dayNum;
}

//判断某年year是否是闰年
function isLeapYear( year ) {
    if ( year % 4 == 0 && year % 100 != 0 ) {
        return true;
    }
    else {
        if ( year % 400 == 0 ) {
            return true;
        }
        else {
            return false;
        }
    }
}





/*下面的右边部分*/
//给小于10的数字前加0
function addZero(time) {
    return time = time < 10 ? '0' + time : time;
}

//获取当前时间：时分秒
function currentTime() {
    myDate = new Date();

    getCurSeconds = addZero(myDate.getSeconds());
    getCurMinutes = addZero(myDate.getMinutes());
    getCurHours = addZero(myDate.getHours());

    timeMonitor.innerHTML = getCurHours + ':' + getCurMinutes + ':' + getCurSeconds;
}

//获取当前日期：年月日，星期几
function currentDate() {
    myDate = new Date();

    getCurYear = addZero(myDate.getFullYear());
    getCurMonth = addZero(myDate.getMonth() + 1);
    getCurDate = addZero(myDate.getDate());

    switch(myDate.getDay()) {
        case 1:
            getCurWeekDay = '星期一';
            break;
        case 2:
            getCurWeekDay = '星期二';
            break;
        case 3:
            getCurWeekDay = '星期三';
            break;
        case 4:
            getCurWeekDay = '星期四';
            break;
        case 5:
            getCurWeekDay = '星期五';
            break;
        case 6:
            getCurWeekDay = '星期六';
            break;
        default:
            getCurWeekDay = '星期日';
    }

    baseDate.innerHTML = getCurYear + '-' + getCurMonth + '-' + getCurDate;
    baseWeekday.innerHTML = getCurWeekDay;
    dateShowPanel.innerHTML = myDate.getDate();

}

currentTime();
currentDate();

//给当前时间函数开个定时器，让时分秒走起来
setInterval(currentTime, 1000);

//农历1900-2100的润大小信息表

var lunarInfo=[0x4bd8,0x4ae0,0xa570,0x54d5,0xd260,0xd950,0x5554,0x56af,0x9ad0,0x55d2,0x4ae0,0xa5b6,0xa4d0,0xd250,0xd255,0xb54f,0xd6a0,0xada2,0x95b0,0x4977,0x497f,0xa4b0,0xb4b5,0x6a50,0x6d40,0xab54,0x2b6f,0x9570,0x52f2,0x4970,0x6566,0xd4a0,0xea50,0x6a95,0x5adf,0x2b60,0x86e3,0x92ef,0xc8d7,0xc95f,0xd4a0,0xd8a6,0xb55f,0x56a0,0xa5b4,0x25df,0x92d0,0xd2b2,0xa950,0xb557,0x6ca0,0xb550,0x5355,0x4daf,0xa5b0,0x4573,0x52bf,0xa9a8,0xe950,0x6aa0,0xaea6,0xab50,0x4b60,0xaae4,0xa570,0x5260,0xf263,0xd950,0x5b57,0x56a0,0x96d0,0x4dd5,0x4ad0,0xa4d0,0xd4d4,0xd250,0xd558,0xb540,0xb6a0,0x95a6,0x95bf,0x49b0,0xa974,0xa4b0,0xb27a,0x6a50,0x6d40,0xaf46,0xab60,0x9570,0x4af5,0x4970,0x64b0,0x74a3,0xea50,0x6b58,0x5ac0,0xab60,0x96d5,0x92e0,0xc960,0xd954,0xd4a0,0xda50,0x7552,0x56a0,0xabb7,0x25d0,0x92d0,0xcab5,0xa950,0xb4a0,0xbaa4,0xad50,0x55d9,0x4ba0,0xa5b0,0x5176,0x52bf,0xa930,0x7954,0x6aa0,0xad50,0x5b52,0x4b60,0xa6e6,0xa4e0,0xd260,0xea65,0xd530,0x5aa0,0x76a3,0x96d0,0x4afb,0x4ad0,0xa4d0,0xd0b6,0xd25f,0xd520,0xdd45,0xb5a0,0x56d0,0x55b2,0x49b0,0xa577,0xa4b0,0xaa50,0xb255,0x6d2f,0xada0,0x4b63,0x937f,0x49f8,0x4970,0x64b0,0x68a6,0xea5f,0x6b20,0xa6c4,0xaaef,0x92e0,0xd2e3,0xc960,0xd557,0xd4a0,0xda50,0x5d55,0x56a0,0xa6d0,0x55d4,0x52d0,0xa9b8,0xa950,0xb4a0,0xb6a6,0xad50,0x55a0,0xaba4,0xa5b0,0x52b0,0xb273,0x6930,0x7337,0x6aa0,0xad50,0x4b55,0x4b6f,0xa570,0x54e4,0xd260,0xe968,0xd520,0xdaa0,0x6aa6,0x56df,0x4ae0,0xa9d4,0xa4d0,0xd150,0xf252,0xd520];

var solarMonth=[31,28,31,30,31,30,31,31,30,31,30,31];

//天干
var Gan=["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];

//地支
var Zhi=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];

//生肖
var Animals=["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"];

//24节气
var solarTerm = ["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"];


var sTermInfo = [0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758];

//数字转中文
var nStr1 = ['日','一','二','三','四','五','六','七','八','九','十'];

//日期转农历称呼
var nStr2 = ['初','十','廿','卅'];

//月份转农历称呼
var nStr3 = ['正','一','二','三','四','五','六','七','八','九','十','十一','腊'];

var monthName = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];

//存公历节日的数组
var solarFestival = [
    "0101 元旦",
    "0214 情人节",
    "0308 妇女节",
    "0312 植树节",
    "0315 消费者权益日",
    "0401 愚人节",
    "0501 劳动节",
    "0504 青年节",
    "0512 护士节",
    "0601 儿童节",
    "0701 建党节",
    "0801 建军节",
    "0910 教师节",
    "0928 孔子诞辰",
    "1001 国庆节",
    "1006 老人节",
    "1024 联合国日",
    "1224 平安夜",
    "1225 圣诞节"];

//存农历节日的数组
var lunarFestival = [
    "0101 春节",
    "0115 元宵节",
    "0505 端午节",
    "0707 七夕情人节",
    "0715 中元节",
    "0815 中秋节",
    "0909 重阳节",
    "1208 腊八节",
    "1224 小年"];

//返回农历某年year的总天数
function lunarYearDays(year) {
    var i, sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) sum += (lunarInfo[year - 1900] & i) ? 1 : 0;
    return (sum + leapDays(year));
}


//返回农历某年year闰月的天数，若year年没有闰月，则返回0
function leapDays(year) {
    if ( leapMonth(year) ) {
        return ((lunarInfo[year - 1900] & 0x10000) ? 30 : 29);
    }
    else{
        return (0);
    }
}

//判断某年农历中那个月是闰月,若没有闰月，则返回0
function leapMonth(year) {//闰字编码\u95f0
    return (lunarInfo[year - 1900] & 0xf);
}

//返回农历某年（year）某月（month，非闰月）的总天数
function monthDays(year, month) {
    return ((lunarInfo[year - 1900] & (0x10000 >> month)) ? 30 : 29);
}

//算出当前月第一天的农历日期和当前农历日期下一个月农历的第一天日期
function Dianaday(objDate) {
    var i, leap = 0, temp = 0;
    var baseDate = new Date(1900, 0, 31);
    var offset = (objDate - baseDate) / 86400000;
    this.dayCyl = offset + 40;
    this.monCyl = 14;
    for (i = 1900; i < 2050 && offset > 0; i++) {
        temp = lunarYearDays(i)
        offset -= temp;
        this.monCyl += 12;
    }
    if (offset < 0) {
        offset += temp;
        i--;
        this.monCyl -= 12;
    }
    this.year = i;
    this.yearCyl = i - 1864;
    leap = leapMonth(i); //闰哪个月
    this.isLeap = false;
    for (i = 1; i < 13 && offset > 0; i++) {
        if (leap > 0 && i == (leap + 1) && this.isLeap == false) {    //闰月
            --i; this.isLeap = true; temp = leapDays(this.year);
        }
        else {
            temp = monthDays(this.year, i);
        }
        if (this.isLeap == true && i == (leap + 1)) this.isLeap = false;    //解除闰月
        offset -= temp;
        if (this.isLeap == false) this.monCyl++;
    }
    if (offset == 0 && leap > 0 && i == leap + 1)
        if (this.isLeap) { this.isLeap = false; }
        else { this.isLeap = true; --i; --this.monCyl; }
    if (offset < 0) { offset += temp; --i; --this.monCyl; }
    this.month = i;
    this.day = offset + 1;
}

//返回公历y年m月的天数
function solarDays(year, month) {
    if ( month > 12 || month < 1 ) return -1;
    var ms = m - 1;
    if (ms == 1)
        return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
    else
        return (solarMonth[ms]);
}

//传入offset偏移量返回干支
function toGanZhi(offset) {
    return Gan[offset % 10] + Zhi[offset % 12];
}

//传入公历year年获得该年第th个节气的公历日期
function getTerm(year, th) {
    if ( year < 1900 || year > 2100 ) return -1;
    if ( th < 1 || th > 24 ) return -1;
    var _table = solarTerm[year - 1900];
    var _info = [
        parseInt('0x' + _table.substr(0,5)).toString(),
        parseInt('0x' + _table.substr(5,5)).toString(),
        parseInt('0x' + _table.substr(10,5)).toString(),
        parseInt('0x' + _table.substr(15,5)).toString(),
        parseInt('0x' + _table.substr(20,5)).toString(),
        parseInt('0x' + _table.substr(25,5)).toString(),
    ];
    var _calday = [
        _info[0].substr(0,1),
        _info[0].substr(1,2),
        _info[0].substr(3,1),
        _info[0].substr(4,2),

        _info[0].substr(0,1),
        _info[0].substr(1,2),
        _info[0].substr(3,1),
        _info[0].substr(4,2),

        _info[1].substr(0,1),
        _info[1].substr(1,2),
        _info[1].substr(3,1),
        _info[1].substr(4,2),

        _info[2].substr(0,1),
        _info[2].substr(1,2),
        _info[2].substr(3,1),
        _info[2].substr(4,2),

        _info[3].substr(0,1),
        _info[3].substr(1,2),
        _info[3].substr(3,1),
        _info[3].substr(4,2),

        _info[4].substr(0,1),
        _info[4].substr(1,2),
        _info[4].substr(3,1),
        _info[4].substr(4,2),

    ];
    return parseInt(_calday[th - 1]);
}

//传入农历数字月份返回汉语通俗表示法
function toChinaMonth(month) {
    if ( month > 12 || m < 1 ) return -1;
    var s = nStr3[month - 1];
    s += '\u6708';
    return s;
}

//传入农历日期数字返回汉字表示法
function toChinaDay(day) {
    var s;
    switch (day) {
        case 10:
            s = '\u521d\u5341';
            break;
        case 20:
            s = '\u4e8c\u5341';
            break;
        case 30:
            s = '\u4e09\u5341';
            break;
        default:
            s = nStr2[Math.floor(day/10)];
            s += nStr1[day % 10];
    }
    return s;
}

//年份转生肖
function getAnimal(year) {
    return Animals[(year - 4) % 12];
}

//传入公历年月日获得详细的公历、农历object信息
function solar2lunar(year, month, day) {
    //年份限定上下限
    if ( year < 1900 || year > 2100 ) return -1;
    //下限
    if ( year == 1900 && month == 1 && day < 31 ) return -1;
    if ( !year ) {
        var objDate = new Date();
    }
    else {
        var objDate = new Date( year, parseInt(month) - 1, day )
    }
    var i, leap = 0, temp = 0;
    //修正year,month,day参数
    var year = objDate.getFullYear(),
        month = objDate.getMonth(),
        day = objDate.getDate();
    var offset = (Date.UTC(objDate.getFullYear(),objDate.getMonth(),objDate.getDate()) - Date.UTC(1900,0,31))/86400000;
    for ( i = 1900; i < 2101 && offset > 0; i++ ) {
        temp = lunarYearDays(i);
        offset -= temp;
    }
    if ( offset < 0 ) {
        offset += temp;
        i--;
    }

    //是否今天
    var isTodayObj = new Date(),
        isToday = false;
    if ( isTodyObj.getFullYear() == year && isTodayObj.getMonth() + 1 == month && isTodayObj.getDate() == 0 ) {
        isToday = true;
    }

    //星期几
    var thWeek = objDate.getDay(),
        sWeek = nStr1[thWeek];
    if ( thWeek == 0 ) thWeek = 7;

    //农历年
    var year = i;

    var leap = leapMonth(i);
    var isLeap = false;

    //效验闰月
    for ( var i = 0; i < 13 && offset > 0; i++ ){
        //闰月
        if ( leap > 0 && i == (leap + 1) && isLeap == false ) {
            --i;
            isLeap = true;
            temp = leapDays(year);
        }
        else {
            temp = monthDays(year, i);//计算农历普通月天数
        }

        //解除闰月
        if(isLeap==true && i==(leap+1)) { isLeap = false; }
        offset -= temp;
    }

    if(offset==0 && leap>0 && i==leap+1)
        if(isLeap){
            isLeap = false;
        }else{
            isLeap = true; --i;
        }
    if(offset<0){ offset += temp; --i; }
    //农历月
    var month = i;
    //农历日
    var day = offset + 1;

    //天干地支处理
    var sm = m-1;
    var term3 = calendar.getTerm(year,3); //该农历年立春日期
    var gzY = calendar.toGanZhi(year-4);//普通按年份计算，下方尚需按立春节气来修正

    //依据立春日进行修正gzY
    if(sm<2 && d<term3) {
        gzY = calendar.toGanZhi(year-5);
    }else {
        gzY = calendar.toGanZhi(year-4);
    }

    //月柱 1900年1月小寒以前为 丙子月(60进制12)
    var firstNode = calendar.getTerm(y,(m*2-1));//返回当月「节」为几日开始
    var secondNode = calendar.getTerm(y,(m*2));//返回当月「节」为几日开始

    //依据12节气修正干支月
    var gzM = calendar.toGanZhi((y-1900)*12+m+11);
    if(d>=firstNode) {
        gzM = calendar.toGanZhi((y-1900)*12+m+12);
    }

    //传入的日期的节气与否
    var isTerm = false;
    var Term = null;
    if(firstNode==d) {
        isTerm = true;
        Term = calendar.solarTerm[m*2-2];
    }
    if(secondNode==d) {
        isTerm = true;
        Term = calendar.solarTerm[m*2-1];
    }
    //日柱 当月一日与 1900/1/1 相差天数
    var dayCyclical = Date.UTC(y,sm,1,0,0,0,0)/86400000+25567+10;
    var gzD = calendar.toGanZhi(dayCyclical+d-1);

    return {'lYear':year,'lMonth':month,'lDay':day,'Animal':calendar.getAnimal(year),'IMonthCn':(isLeap?"\u95f0":'')+calendar.toChinaMonth(month),'IDayCn':calendar.toChinaDay(day),'cYear':y,'cMonth':m,'cDay':d,'gzYear':gzY,'gzMonth':gzM,'gzDay':gzD,'isToday':isToday,'isLeap':isLeap,'nWeek':nWeek,'ncWeek':"\u661f\u671f"+cWeek,'isTerm':isTerm,'Term':Term};
}
function lunar2solar(y,m,d,isLeapMonth) {	//参数区间1900.1.31~2100.12.1
    var leapOffset = 0;
    var leapMonth = calendar.leapMonth(y);
    var leapDay = calendar.leapDays(y);
    if(isLeapMonth&&(leapMonth!=m)) {return -1;}//传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
    if(y==2100&&m==12&&d>1 || y==1900&&m==1&&d<31) {return -1;}//超出了最大极限值
    var day = calendar.monthDays(y,m);
    if(y<1900 || y>2100 || d>day) {return -1;}//参数合法性效验

    //计算农历的时间差
    var offset = 0;
    for(var i=1900;i<y;i++) {
        offset+=calendar.lYearDays(i);
    }
    var leap = 0,isAdd= false;
    for(var i=1;i<m;i++) {
        leap = calendar.leapMonth(y);
        if(!isAdd) {//处理闰月
            if(leap<=i && leap>0) {
                offset+=calendar.leapDays(y);isAdd = true;
            }
        }
        offset+=calendar.monthDays(y,i);
    }
    //转换闰月农历 需补充该年闰月的前一个月的时差
    if(isLeapMonth) {offset+=day;}
    //1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
    var stmap = Date.UTC(1900,1,30,0,0,0);
    var calObj = new Date((offset+d-31)*86400000+stmap);
    var cY = calObj.getUTCFullYear();
    var cM = calObj.getUTCMonth()+1;
    var cD = calObj.getUTCDate();

    return calendar.solar2lunar(cY,cM,cD);
}


































//记录公历和农历某天的日期
function calElement(sYear, sMonth, sDay, week, lYear, lMonth, lDay, isLeap) {
    this.isToday = false;
    //公历
    this.sYear = sYear;
    this.sMonth = sMonth;
    this.sDay = sDay;
    this.week = week;
    //农历
    this.lYear = lYear;
    this.lMonth = lMonth;
    this.lDay = lDay;
    this.isLeap = isLeap;
    //节日记录
    this.lunarFestival = ''; //农历节日
    this.solarFestival = ''; //公历节日
    this.solarTerms = ''; //节气
}

//返回某年的第n个节气为几日(从0小寒起算)
function sTerm(y, n) {
    var offDate = new Date((31556925974.7 * (y - 1900) + sTermInfo[n] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
    return (offDate.getUTCDate())
}

//保存y年m+1月的相关信息
var fat = mat = 9;
var eve = 0;
function calendar(y, m) {
    fat = mat = 0;
    var sDObj, lDObj, lY, lM, lD = 1, lL, lX = 0, tmp1, tmp2;
    var lDPOS = new Array(3);
    var n = 0;
    var firstLM = 0;
    sDObj = new Date(y, m, 1);    //当月第一天的日期
    this.length = solarDays(y, m);    //公历当月天数
    this.firstWeek = sDObj.getDay();    //公历当月1日星期几
    if ((m + 1) == 5) { fat = sDObj.getDay() }
    if ((m + 1) == 6) { mat = sDObj.getDay() }
    for (var i = 0; i < this.length; i++) {
        if (lD > lX) {
            sDObj = new Date(y, m, i + 1);    //当月第一天的日期
            lDObj = new Dianaday(sDObj);     //农历
            lY = lDObj.year;           //农历年
            lM = lDObj.month;          //农历月
            lD = lDObj.day;            //农历日
            lL = lDObj.isLeap;         //农历是否闰月
            lX = lL ? leapDays(lY) : monthDays(lY, lM); //农历当月最後一天
            if (lM == 12) { eve = lX }
            if (n == 0) firstLM = lM;
            lDPOS[n++] = i - lD + 1;
        }
        this[i] = new calElement(y, m + 1, i + 1, nStr1[(i + this.firstWeek) % 7], lY, lM, lD++, lL);
        if ((i + this.firstWeek) % 7 == 0) {
            this[i].color = 'red';  //周日颜色
        }
    }
    //节气
    tmp1 = sTerm(y, m * 2) - 1;
    tmp2 = sTerm(y, m * 2 + 1) - 1;
    this[tmp1].solarTerms = solarTerm[m * 2];
    this[tmp2].solarTerms = solarTerm[m * 2 + 1];
    if ((this.firstWeek + 12) % 7 == 5)    //黑色星期五
        this[12].solarFestival += '黑色星期五';
    if (y == tY && m == tM) this[tD - 1].isToday = true;    //今日
}

//用中文显示农历的日期
function cDay(d) {
    var s;
    switch (d) {
        case 10:
            s = '初十'; break;
        case 20:
            s = '二十'; break;
            break;
        case 30:
            s = '三十'; break;
            break;
        default:
            s = nStr2[Math.floor(d / 10)];
            s += nStr1[d % 10];
    }
    return (s);
}





