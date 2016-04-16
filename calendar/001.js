/**
 * Created by SunshineLXH on 2016/4/14.
 */
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

//给小于10的数字前加0
function addZero(num) {
    return num = num < 10 ? '0' + num : num;
}

//日历对象
calendar = {

    //农历1900-2100的润大小信息表
    lunarInfo:[
        0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,//1900-1909
        0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,//1910-1919
        0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,//1920-1929
        0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,//1930-1939
        0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,//1940-1949
        0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,//1950-1959
        0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,//1960-1969
        0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,//1970-1979
        0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,//1980-1989
        0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,//1990-1999
        0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,//2000-2009
        0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,//2010-2019
        0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,//2020-2029
        0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,//2030-2039
        0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,//2040-2049
        0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50, 0x06b20,0x1a6c4,0x0aae0,//2050-2059
        0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,//2060-2069
        0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,//2070-2079
        0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,//2080-2089
        0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,//2090-2099
        0x0d520],//2100


    //阳历每月天数，2月份需再判断
    //solarMonth:[31,28,31,30,31,30,31,31,30,31,30,31],
    //天干
    gan:["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],
    //地支
    zhi:["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],
    //生肖
    animals:["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"],
    //24节气
    solarTerm:["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"],


    //1900-2100各年的24节气日期速查表
    sTermInfo:[	'9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf97c3598082c95f8c965cc920f',
        '97bd0b06bdb0722c965ce1cfcc920f','b027097bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
        '97bcf97c359801ec95f8c965cc920f','97bd0b06bdb0722c965ce1cfcc920f','b027097bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f',	'97bd0b06bdb0722c965ce1cfcc920f',
        'b027097bd097c36b0b6fc9274c91aa','9778397bd19801ec9210c965cc920e','97b6b97bd19801ec95f8c965cc920f',
        '97bd09801d98082c95f8e1cfcc920f','97bd097bd097c36b0b6fc9210c8dc2','9778397bd197c36c9210c9274c91aa',
        '97b6b97bd19801ec95f8c965cc920e','97bd09801d98082c95f8e1cfcc920f',	'97bd097bd097c36b0b6fc9210c8dc2',
        '9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec95f8c965cc920e','97bcf97c3598082c95f8e1cfcc920f',
        '97bd097bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec9210c965cc920e',
        '97bcf97c3598082c95f8c965cc920f','97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e','97bcf97c3598082c95f8c965cc920f',	'97bd097bd097c35b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f',
        '97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
        '97bcf97c359801ec95f8c965cc920f','97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f',	'97bd097bd07f595b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9210c8dc2','9778397bd19801ec9210c9274c920e','97b6b97bd19801ec95f8c965cc920f',
        '97bd07f5307f595b0b0bc920fb0722','7f0e397bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c920e',
        '97b6b97bd19801ec95f8c965cc920f','97bd07f5307f595b0b0bc920fb0722','7f0e397bd097c36b0b6fc9210c8dc2',
        '9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec9210c965cc920e','97bd07f1487f595b0b0bc920fb0722',
        '7f0e397bd097c36b0b6fc9210c8dc2','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
        '97bcf7f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',	'9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e','97bcf7f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf7f1487f531b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
        '97bcf7f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b6fc920fb0722',	'9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c9274c920e','97bcf7f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
        '9778397bd097c36b0b6fc9210c91aa','97b6b97bd197c36c9210c9274c920e','97bcf7f0e47f531b0b0bb0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722','9778397bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c920e',
        '97b6b7f0e47f531b0723b0b6fb0722','7f0e37f5307f595b0b0bc920fb0722',	'7f0e397bd097c36b0b6fc9210c8dc2',
        '9778397bd097c36b0b70c9274c91aa','97b6b7f0e47f531b0723b0b6fb0721','7f0e37f1487f595b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc9210c8dc2','9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',	'9778397bd097c36b0b6fc9274c91aa',
        '97b6b7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',	'9778397bd097c36b0b6fc9274c91aa',
        '97b6b7f0e47f531b0723b0787b0721','7f0e27f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
        '9778397bd097c36b0b6fc9210c91aa','97b6b7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722','9778397bd097c36b0b6fc9210c8dc2','977837f0e37f149b0723b0787b0721',
        '7f07e7f0e47f531b0723b0b6fb0722','7f0e37f5307f595b0b0bc920fb0722','7f0e397bd097c35b0b6fc9210c8dc2',
        '977837f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0721','7f0e37f1487f595b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc9210c8dc2','977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722','977837f0e37f14998082b0787b06bd',
        '7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
        '977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722','977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',	'977837f0e37f14998082b0787b06bd',
        '7f07e7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
        '977837f0e37f14998082b0723b06bd','7f07e7f0e37f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722','977837f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b0721',
        '7f07e7f0e47f531b0723b0b6fb0722','7f0e37f1487f595b0b0bb0b6fb0722','7f0e37f0e37f14898082b0723b02d5',
        '7ec967f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0722','7f0e37f1487f531b0b0bb0b6fb0722',
        '7f0e37f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e37f1487f531b0b0bb0b6fb0722','7f0e37f0e37f14898082b072297c35','7ec967f0e37f14998082b0787b06bd',
        '7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e37f0e37f14898082b072297c35',
        '7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',	'7f0e27f1487f531b0b0bb0b6fb0722',
        '7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f149b0723b0787b0721',
        '7f0e27f1487f531b0b0bb0b6fb0722','7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14998082b0723b06bd',
        '7f07e7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722','7f0e37f0e366aa89801eb072297c35',
        '7ec967f0e37f14998082b0723b06bd','7f07e7f0e37f14998083b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
        '7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14898082b0723b02d5','7f07e7f0e37f14998082b0787b0721',
        '7f07e7f0e47f531b0723b0b6fb0722','7f0e36665b66aa89801e9808297c35',	'665f67f0e37f14898082b0723b02d5',
        '7ec967f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0722',	'7f0e36665b66a449801e9808297c35',
        '665f67f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e36665b66a449801e9808297c35','665f67f0e37f14898082b072297c35',	'7ec967f0e37f14998082b0787b06bd',
        '7f07e7f0e47f531b0723b0b6fb0721','7f0e26665b66a449801e9808297c35',	'665f67f0e37f1489801eb072297c35',
        '7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',	'7f0e27f1487f531b0b0bb0b6fb0722'],
    //数字转汉字
    nStr1:['日','一','二','三','四','五','六','七','八','九','十'],
    //日期转中文说法
    nStr2:['初','十','廿','卅'],
    //月份转中文说法
    nStr3:['正','一','二','三','四','五','六','七','八','九','十','冬','腊'],

    //阳历国际节日
    solarFestival : [
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
        "1225 圣诞节"],

    //农历节日
    lunarFestival : [
        "0101 春节",
        "0115 元宵节",
        "0505 端午节",
        "0707 七夕情人节",
        "0715 中元节",
        "0815 中秋节",
        "0909 重阳节",
        "1208 腊八节",
        "1224 小年"],

    //返回农历一年的总天数，农历每月最少29天，29*12=348，看每月是大月还是小月，大月加1，小月不加，最后返回总天数
    lYearDays : function( y ) {
        var i, sum = 348;
        for ( i=0x8000; i>0x8; i>>=1 ) {
            sum += ( calendar.lunarInfo[y-1900] & i ) ? 1: 0;
        }
        return ( sum + calendar.leapDays(y) );
    },

    //查看农历y年哪个月是闰月，如果这一年没有闰月返回0
    leapMonth : function( y ) {
        return ( calendar.lunarInfo[y-1900] & 0xf );
    },

    //查看农历y年闰月的天数（30或29），如果这一年没有闰月则返回0
    leapDays : function( y ) {
        if ( calendar.leapMonth(y) )  {
            return ( (calendar.lunarInfo[y-1900] & 0x10000)? 30: 29 );
        }
        return ( 0 );
    },

    //查看非闰月阴历某月总天数
    lunarDays : function ( y, m ) {
        if ( m > 12 || m < 1 ) return -1;
        return( (calendar.lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
    },

    ////查看阳历某月的总天数
    //solarDays : function ( y, m ) {
    //    if ( m > 12 || m < 1 ) return -1;
    //    var ms = m - 1;
    //    if ( ms == 1 ) {
    //        return calendar.isLeapYear(y) ? 29 : 28;
    //    }
    //    else {
    //        return ( calendar.solarMonth[ms] );
    //    }
    //},

    //根据偏移量返回干支
    toGanZhi : function ( offset ) {
        return ( calendar.gan[offset%10] + calendar.zhi[offset%12] );
    },

    //查看阳历某年返回这一年第n个节气的阳历日期
    getTerm : function ( y, n ) {
        if ( y < 1900 || y > 2100 ) return -1;
        if ( n < 1 || n > 24 ) return -1;
        var tTable = calendar.sTermInfo[y-1900];
        //var arr = [
        //    parseInt('0x'+tTable.substr(0,5)).toString(),
        //    parseInt('0x'+tTable.substr(5,5)).toString(),
        //    parseInt('0x'+tTable.substr(10,5)).toString(),
        //    parseInt('0x'+tTable.substr(15,5)).toString(),
        //    parseInt('0x'+tTable.substr(20,5)).toString(),
        //    parseInt('0x'+tTable.substr(25,5)).toString()
        //];
        //var cDay = [
        //    arr[0].substr(0,1),
        //    arr[0].substr(1,2),
        //    arr[0].substr(3,1),
        //    arr[0].substr(4,2),
        //
        //    arr[1].substr(0,1),
        //    arr[1].substr(1,2),
        //    arr[1].substr(3,1),
        //    arr[1].substr(4,2),
        //
        //    arr[2].substr(0,1),
        //    arr[2].substr(1,2),
        //    arr[2].substr(3,1),
        //    arr[2].substr(4,2),
        //
        //    arr[3].substr(0,1),
        //    arr[3].substr(1,2),
        //    arr[3].substr(3,1),
        //    arr[3].substr(4,2),
        //
        //    arr[4].substr(0,1),
        //    arr[4].substr(1,2),
        //    arr[4].substr(3,1),
        //    arr[4].substr(4,2),
        //
        //    arr[5].substr(0,1),
        //    arr[5].substr(1,2),
        //    arr[5].substr(3,1),
        //    arr[5].substr(4,2)
        //];
        //return parseInt( cDay[n-1] );
    },


    //将阴历月份用汉语表示
    toChinaMonth : function ( m ) {
        if ( m > 12 || m < 1 ) return -1;
        var lm = calendar.nStr3[m - 1];
        lm += "月";
        return lm;
    },

    //将阴历日期转化为汉语
    toChinaDay : function ( d ){
        var ld;
        switch ( d ) {
            case 10:
                ld = '初十';
                break;
            case 20:
                ld = '二十';
                break;
            case 30:
                ld = '三十';
                break;
            default :
                ld = calendar.nStr2[Math.floor(d/10)];
                ld += calendar.nStr1[d%10];
        }
        return ( ld );
    },


    //将年转为生肖
    getAnimal : function ( y ) {
        return calendar.animals[(y - 4) % 12]
    },

    //获取某月的阳历天数
    getSmNum : function ( y, m ) {
        var dNum = 0;
        if ( m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12 ) {
            dNum = 31;
        }
        else if ( m == 4 || m == 6 || m == 9 || m == 11 ) {
            dNum = 30;
        }
        else if ( m == 2 && calendar.isLeapYear(y) ) {
            dNum = 29;
        }
        else {
            dNum = 28;
        }
        return dNum;
    },

    //判断某年是否是闰年
    isLeapYear : function ( y ) {
        if ( y % 4 == 0 && y % 100 != 0 ) {
            return true;
        }
        else {
            if ( y % 400 == 0 ) {
                return true;
            }
            else {
                return false;
            }
        }
    },

    //将阳历日期转阴历日期，返回一个json对象，可根据需要提取
    solarToLunar : function ( y, m, d ) {
        if ( y < 1900 || y > 2100 ) return -1;
        if ( y == 1900 && m == 1 && d < 31 ) return -1;
        if(!y) {
            var oDate = new Date();
        }
        else {
            var oDate = new Date( y, parseInt(m)-1 , d);
        }
        var i, leap=0, temp=0;

        //修正ymd参数
        var y = oDate.getFullYear(),
            m = addZero(oDate.getMonth()+1),
            d = addZero(oDate.getDate());
        var offset = ( Date.UTC(oDate.getFullYear(),oDate.getMonth(),oDate.getDate()) - Date.UTC(1900,0,31) ) / 86400000;
        for ( i=1900; i<2101 && offset > 0; i++ ) {
            temp = calendar.lYearDays(i);
            offset -= temp;
        }
        if ( offset < 0 ) {
            offset+=temp;
            i--;
        }

        //判断是否是今天
        var isTObj = new Date(),
            isToday = false;
        if( isTObj.getFullYear() == y && isTObj.getMonth() + 1 == m && isTObj.getDate() == d ) {
            isToday = true;
        }

        //星期几
        var thWeek = oDate.getDay(),
            chWeek = calendar.nStr1[thWeek];

        //农历年
        var year = i,
            leap = calendar.leapMonth(i);

        //是否是闰月
        var isLeap = false;

        //看是否是闰月
        for ( i = 1; i < 13 && offset > 0; i++ ) {
            //如果是闰月，计算闰月天数
            if ( leap > 0 && i == (leap+1) && isLeap == false){
                --i;
                isLeap = true;
                temp = calendar.leapDays(year);
            }
            else{ //如果不是闰月，计算农历普通月的天数
                temp = calendar.lunarDays(year, i);
            }
            //将isLeap变为false
            if( isLeap == true && i == (leap+1) ) isLeap = false;
            offset -= temp;
        }

        if ( offset == 0 && leap > 0 && i == leap+1){
            if ( isLeap ){
                isLeap = false;
            }
            else{
                isLeap = true;
                --i;
            }
        }

        if ( offset < 0 ){
            offset += temp;
            --i;
        }

        //农历月
        var month 	= addZero(i);

        //农历日
        var day 	= addZero(offset + 1);

        //天干地支处理
        var sm 	  = m - 1;
        var term3 = calendar.getTerm(year,3); //该农历年立春日期
        var gzY   = calendar.toGanZhi(year-4);//普通按年份计算，下方尚需按立春节气来修正

        //依据立春日进行修正gzY
        if( sm < 2 && d < term3 ) {
            gzY = calendar.toGanZhi(year - 5);
        }else {
            gzY = calendar.toGanZhi(year - 4);
        }

        //月柱 1900年1月小寒以前为 丙子月(60进制12)
        var firstNode 	= calendar.getTerm(y, (m*2-1));//返回当月「节」为几日开始
        var secondNode = calendar.getTerm(y, (m*2));//返回当月「节」为几日开始

        //依据12节气修正干支月
        var gzM 	= 	calendar.toGanZhi((y - 1900) * 12 + m + 11);
        if ( d >= firstNode ) {
            gzM 	= 	calendar.toGanZhi((y - 1900) * 12 + m + 12);
        }

        //传入的日期的节气与否
        var isTerm = false;
        var Term = null;
        if ( firstNode == d ) {
            isTerm 	= true;
            Term 	= calendar.solarTerm[m * 2 - 2];
        }
        if ( secondNode==d ) {
            isTerm 	= true;
            Term 	= calendar.solarTerm[m * 2 - 1];
        }


        var isHolidayFestival = false;

        var isSolarFestival = false;
        var sFestival = null;
        for ( var i = 0; i < calendar.solarFestival.length; i++ ) {
            if ( calendar.solarFestival[i].substr(0,4) == m + d  ) {
                isSolarFestival = true;
                sFestival = calendar.solarFestival[i].substr(5);
                if ( m + d == "0101" || m + d == "0501" || m + d == "1001") {
                    isHolidayFestival = true;
                }
            }
        }

        var isLunarFestival = false;
        var lFestival = null;
        for ( var i = 0; i < calendar.lunarFestival.length; i++ ) {
            if ( calendar.lunarFestival[i].substr(0, 4) == month + day ) {
                isLunarFestival = true;
                lFestival = calendar.lunarFestival[i].substr(5);
                if ( month + day == "0101" || month + day == "0505" || month + day == "0815" ) {
                    isHolidayFestival = true;
                }
            }
        }

        //日柱 当月一日与1900年1月1日相差的天数
        var dayCyclical = Date.UTC( y, sm, 1, 0, 0, 0, 0 ) / 86400000 + 25567 + 10;
        var gzD = calendar.toGanZhi(dayCyclical+d-1);

        return {
            'lYear' : year,
            'lMonth' : month,
            'lDay' : day,
            'animal' : calendar.getAnimal(year),
            'IMonthCn' : ( isLeap ? "闰" : '') + calendar.toChinaMonth(month),
            'IDayCn' : calendar.toChinaDay(day),
            'cYear' : y,
            'cMonth' : m,
            'cDay' : d,
            'gzYear' : gzY,
            'gzMonth' : gzM,
            'gzDay' : gzD,
            'isToday' : isToday,
            'isLeap' : isLeap,
            'thWeek' : thWeek,
            'chWeek' : "星期"+chWeek,
            'isTerm' : isTerm,
            'Term' : Term,
            'isSolarFestival' : isSolarFestival,
            'solarFestival' : sFestival,
            'isLunarFestival' : isLunarFestival,
            'lunarFestival' : lFestival,
            'isHolidayFestival' : isHolidayFestival
        };
    },

    //传入阴历年月日及传入月份是否是闰月转详细阴历信息，json对象形式
    lunarToSolar : function( y, m, d, isLeapMonth ) {
        var leapMonth  = calendar.leapMonth( y ),
            leapDay    = calendar.leapDays( y );
        //如果该年得出的闰月与传参的月份不同返回-1
        if( isLeapMonth && ( leapMonth != m )) {
            return -1;
        }
        //2100年12月1日以后及1900年1月31日之前，返回-1
        if( y == 2100 && m == 12 && d > 1 || y == 1900 && m == 1 && d < 31 ) {
            return -1;
        }
        var day = calendar.lunarDays( y, m );
        if( y < 1900 || y > 2100 || d > day ) return -1;

        //计算农历的时间差
        var offset = 0;
        for( var i = 1900; i < y; i++ ) {
            offset += calendar.lYearDays(i);
        }
        var leap = 0, isAdd = false;
        for( var i = 1; i < m; i++ ) {
            leap = calendar.leapMonth( y );
            //处理闰月
            if ( !isAdd ) {
                if ( leap <= i && leap > 0 ) {
                    offset += calendar.leapDays( y );
                    isAdd = true;
                }
            }
            offset += calendar.lunarDays(y, i);
        }
        //转换闰月农历 需补充该年闰月的前一个月的时差
        if ( isLeapMonth ) {
            offset += day;
        }
        //1900年农历正月一日的阴历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
        var stmap 	= 	Date.UTC(1900, 1, 30, 0, 0, 0);
        var calObj 	= 	new Date( ( offset + d - 31 ) * 86400000 + stmap );
        var cY 		= 	calObj.getUTCFullYear();
        var cM 		=	calObj.getUTCMonth()+1;
        var cD 		=	calObj.getUTCDate();

        return calendar.solarToLunar( cY, cM, cD );
    }
};



var myDate;

//确定选择的年、月、日
var selectYear, selectMonth, selectDay, selectWeekDay;

//生成的方块，休息、阳历、阴历
var aLi, holidayInfo, solarDay, lunarDay;

//日历对象
var calendar;

//存左边42个方块每个方块的位置及日期
var blocks = [];

//日历上方三个按钮初始化状态
var offOn1 = true, offOn2 = true, offOn3 = true;

//节假日安排数组
var holidayPlan = ['2016节假日安排','元旦','春节','清明节','劳动节','端午节','中秋节','国庆节'];

//获取元素
var tMonitor   = document.getElementsByClassName('time-monitor')[0],
    bDatesBar  = document.getElementsByClassName('base-dates-bar')[0],
    bDate      = bDatesBar.getElementsByTagName('span')[0],
    bWeekday   = bDatesBar.getElementsByTagName('span')[1],
    dShowPanel = document.getElementsByClassName('date-show-panel')[0],
    lunar      = document.getElementsByClassName('lunar')[0],
    lGanzhi    = document.getElementsByClassName('lunar-ganzi')[0],
    animal     = document.getElementsByClassName('animal')[0],
    astro      = document.getElementsByClassName('astro')[0],
    dDetail = document.getElementsByClassName('dates-detail')[0];

var yControl     = document.getElementsByClassName('year-control')[0],
    ct1          = yControl.getElementsByClassName('control')[0],
    mControl = document.getElementsByClassName('month-control')[0],
    ct2          = mControl.getElementsByClassName('control')[0],
    hControl = document.getElementsByClassName('holiday-control')[0],
    ct3          = hControl.getElementsByClassName('control-holiday')[0];

var yearBtn    = ct1.getElementsByClassName('year')[0],
    trigger1   = ct1.getElementsByClassName('trigger')[0],
    monthBtn   = ct2.getElementsByClassName('month')[0],
    trigger2   = ct2.getElementsByClassName('trigger')[0],
    holidayBtn = ct3.getElementsByClassName('holiday')[0],
    trigger3   = ct3.getElementsByClassName('trigger')[0];

//上一年、下一年按钮， 上一月、下一月按钮
var prevYBtn = document.getElementsByClassName('prev')[0],
    nextYBtn = document.getElementsByClassName('next')[0],
    prevMBtn = document.getElementsByClassName('prev')[1],
    nextMBtn = document.getElementsByClassName('next')[1];

//返回今天
var toToday = document.getElementsByClassName('btn-today')[0];

/*
 * 右上角的时钟
 * */
function currentTime() {
    myDate = new Date();

    var getCurSeconds = addZero(myDate.getSeconds()),
        getCurMinutes = addZero(myDate.getMinutes()),
        getCurHours = addZero(myDate.getHours());

    tMonitor.innerHTML = getCurHours + ':' + getCurMinutes + ':' + getCurSeconds;
}

//先让它运行一次，再给它开个定时器，让时分秒走起来
currentTime();
setInterval(currentTime, 1000);

/*
* 初始化
* */
dropList();

/*
* 生成下拉框
* */
function dropList () {
    var listUl1 = document.createElement('ul');
    var listUl2 = document.createElement('ul');
    var listUl3 = document.createElement('ul');

    //生成年下拉框
    for ( var i = 1900; i < 2101; i++ ) {
        var yli = document.createElement('li');
        yli.innerHTML = i + '年';
        listUl1.appendChild(yli);
    }
    listUl1.className = "listUl1";
    yControl.appendChild(listUl1);

    //生成月下拉框
    for ( var j = 1; j < 13; j++ ) {
        var mli = document.createElement('li');
        mli.innerHTML = j + '月';
        listUl2.appendChild(mli);
    }
    listUl2.className = "listUl2";
    mControl.appendChild(listUl2);

    //生成节假日下拉框
    for (var k = 0; k < holidayPlan.length; k++ ) {
        var hli = document.createElement('li');
        hli.innerHTML = holidayPlan[k];
        listUl3.appendChild(hli);
    }
    listUl3.className = "listUl3";
    hControl.appendChild(listUl3);
}

/*
* 上一年，下一年，上一月，下一月，选择节假日，返回今天
* */
var yLi = document.getElementsByClassName('listUl1')[0].getElementsByTagName('li'),
    mLi = document.getElementsByClassName('listUl2')[0].getElementsByTagName('li'),
    hLi = document.getElementsByClassName('listUl3')[0].getElementsByTagName('li');

//选择年
for ( var i = 0; i < yLi.length; i++ ) {
    addEvent( yLi[i], 'click', showHidden1 );
    yLi[i].onclick = function () {
        selectYear = parseInt(this.innerHTML.substr(0, 4));
        yearBtn.innerHTML = selectYear + '年';
        drawCalendar( selectYear, selectMonth, selectDay );
    };
}

//上一年
prevYBtn.onclick = function () {
    if ( parseInt(yearBtn.innerHTML.substr(0,4)) > 1900 ) {
        selectYear = parseInt(yearBtn.innerHTML.substr(0,4)) - 1;
        yearBtn.innerHTML = selectYear + '年';
        drawCalendar( selectYear, selectMonth, selectDay );
    }
};

//下一年
nextYBtn.onclick = function () {
    if ( parseInt(yearBtn.innerHTML.substr(0,4)) < 2100 ) {
        selectYear = parseInt(yearBtn.innerHTML.substr(0,4)) + 1;
        yearBtn.innerHTML = selectYear + '年';
        drawCalendar(selectYear, selectMonth, selectDay);
    }
};

//选择月
for ( var i = 0; i < mLi.length; i++) {
    addEvent(mLi[i], 'click', showHidden2);
    mLi[i].onclick = function () {
        if ( this.innerHTML.length == 2 ) {
            selectMonth = parseInt( this.innerHTML.substr(0,1) );
            monthBtn.innerHTML = selectMonth + '月';
        }
        else {
            selectMonth = parseInt(this.innerHTML.substr(0,2));
            monthBtn.innerHTML = selectMonth + '月';
        }
        drawCalendar( selectYear, selectMonth, selectDay );
    };
}

//上一月
prevMBtn.onclick = function () {
    if ( monthBtn.innerHTML.length < 3 ) {
        if ( parseInt(monthBtn.innerHTML.substr(0, 1) ) > 1 ) {
            selectMonth = parseInt( monthBtn.innerHTML.substr(0, 1) ) - 1;
            monthBtn.innerHTML = selectMonth + '月';
        }
        else {
            selectMonth = 12;
            monthBtn.innerHTML = selectMonth + '月';
            selectYear = parseInt( yearBtn.innerHTML.substr(0, 4) ) - 1;
            yearBtn.innerHTML = selectYear + '年';
        }
    }
    else {
        selectMonth = parseInt( monthBtn.innerHTML.substr(0, 2) ) - 1;
        monthBtn.innerHTML = selectMonth + '月';
    }
    drawCalendar( selectYear, selectMonth, selectDay );
};

//下一月
nextMBtn.onclick = function () {
    if ( monthBtn.innerHTML.length < 3 ) {
        selectMonth = parseInt( monthBtn.innerHTML.substr(0, 1) ) + 1;
        monthBtn.innerHTML = selectMonth + '月';
    }
    else {
        if ( parseInt( monthBtn.innerHTML.substr(0, 2) ) < 12 ) {
            selectMonth = parseInt( monthBtn.innerHTML.substr(0, 2) ) + 1
            monthBtn.innerHTML = selectMonth + '月';
        }
        else {
            selectMonth = 1;
            monthBtn.innerHTML = selectMonth + '月';
            selectYear = parseInt( yearBtn.innerHTML.substr(0,4) ) + 1
            yearBtn.innerHTML = selectYear + '年';
        }
    }
    drawCalendar( selectYear, selectMonth, selectDay );
};

//2016年节假日选择
for ( var i = 0; i < hLi.length; i++ ) {
    addEvent( hLi[i], 'click', showHidden3 );

    hLi[i].onclick = function () {
        holidayBtn.innerHTML = this.innerHTML;
        holidayBtn.style.textAlign = 'center';

        switch ( this.innerHTML ) {
            case '元旦':
                drawCalendar(2016, 1, 1);
                break;
            case '春节':
                drawCalendar(2016, 2, 8);
                break;
            case '清明节':
                drawCalendar(2016, 4, 4);
                break;
            case '劳动节':
                drawCalendar(2016, 5, 1);
                break;
            case '端午节':
                drawCalendar(2016, 6, 9);
                break;
            case '中秋节':
                drawCalendar(2016, 9, 15);
                break;
            case '国庆节':
                drawCalendar(2016, 10, 1);
                break;
        }
    };
}

/*
* 年选择、月选择、节假日选择的显示与隐藏
* */
var lUl1 = document.getElementsByClassName('listUl1')[0],
    lUl2 = document.getElementsByClassName('listUl2')[0],
    lUl3 = document.getElementsByClassName('listUl3')[0];

//年按钮显示与隐藏
function showHidden1() {
    if ( offOn1 ) {
        lUl1.style.display = 'block';
        offOn1 = false;
    }
    else {
        lUl1.style.display = 'none';
        offOn1 = true;
    }
}

//月按钮显示与隐藏
function showHidden2() {
    if ( offOn2 ) {
        lUl2.style.display = 'block';
        offOn2 = false;
    }
    else {
        lUl2.style.display = 'none';
        offOn2 = true;
    }
}

//节假日显示与隐藏
function showHidden3() {
    if ( offOn3 ) {
        lUl3.style.display = 'block';
        offOn3 = false;
    }
    else {
        lUl3.style.display = 'none';
        offOn3 = true;
    }
}

//分别给年按钮、月按钮、节假日按钮绑定事件
addEvent( yearBtn, 'click', showHidden1 );
addEvent( trigger1, 'click', showHidden1 );

addEvent( monthBtn, 'click', showHidden2 );
addEvent( trigger2, 'click', showHidden2 );

addEvent( holidayBtn, 'click', showHidden3 );
addEvent( trigger3, 'click', showHidden3 );

addEvent( toToday, 'click', drawCalendar );


/*
* 日历左边部分的初始化渲染
* */

initial();

function initial() {
    //循环生成42个方块
    for ( var i = 0; i < 42; i++ ) {
        var oLi = document.createElement('li');
        //对末列样式进行处理
        if (i != 0 && (i + 1) % 7 == 0) oLi.className = "oLi oLi-last";
        else oLi.className = 'oLi';
        //对第六列和第七列的字体加红色
        if ( (i!=0 && (i + 1) % 7 == 0) || (i + 2) % 7 == 0) {
            oLi.style.color = "#B04343";
        }
        //对末行样式进行微调
        if (i == 35 || i == 36 || i == 37 || i == 38 || i == 39 || i == 40) oLi.className = "oLi oLi-lastRow";
        if (i == 41) oLi.className = "oLi oLi-last oLi-lastRow";

        //每个方块由span，div,span三个子元素组成
        var oSpan1 = document.createElement('span');
        oSpan1.className = 'holidayInfo';
        var oDiv = document.createElement('div');
        oDiv.className = 'solarDay';
        var oSpan2 = document.createElement('span');
        oSpan2.className = 'lunarDay';

        oLi.appendChild( oSpan1 );
        oLi.appendChild( oDiv );
        oLi.appendChild( oSpan2 );

        dDetail.appendChild( oLi );
    }
    //获取42个方块
     aLi         = dDetail.getElementsByTagName('li');
     holidayInfo = dDetail.getElementsByClassName('holidayInfo');
     solarDay    = dDetail.getElementsByClassName('solarDay');
     lunarDay    = dDetail.getElementsByClassName('lunarDay');

////将周六和周日字体颜色为红色
//    for ( var i = 5; i < 6; i++ ) {
//        for ( var j = 0; j < 6; j++ ) {
//            aLi[i + 7 * j].style.color = '#B04343';
//            aLi[(i + 1) + 7 * j ].style.color = '#B04343';
//        }
//    }

    //myDate = new Date();
    //showDate(myDate.getFullYear(), myDate.getMonth() + 1, myDate.getDate());

}

function showDate(y, m, d) {
    var sDate = new Date();
    y = y ? y : sDate.getFullYear();
    m = m ? m : (sDate.getMonth() + 1);
    d = d ? d : sDate.getDate();

    var dayNum = 0,
        preMonthNum = 0,
        nextMonthNum = 0;

    dayNum = calendar.getSmNum(y, m);

    if ( m == 1 ) {
        preMonthNum = calendar.getSmNum(y - 1, 12);
    }
    else {
        preMonthNum = calendar.getSmNum(y, m - 1);
    }

    if ( m == 12 ) {
        nextMonthNum = calendar.getSmNum( y + 1, 1 );
    }
    else {
        nextMonthNum = calendar.getSmNum( y, m + 1 );
    }

    sDate.setFullYear(y);
    sDate.setMonth(m - 1);
    sDate.setDate(1);

    switch ( sDate.getDay() ) {
        case 0:
            ab( y, m, 6, d, dayNum, preMonthNum );
            break;
        case 1:
            ab( y, m, 0, d, dayNum, preMonthNum );
            break;
        case 2:
            ab( y, m, 1, d, dayNum, preMonthNum );
            break;
        case 3:
            ab( y, m, 2, d, dayNum, preMonthNum );
            break;
        case 4:
            ab( y, m, 3, d, dayNum, preMonthNum );
            break;
        case 5:
            ab( y, m, 4, d, dayNum, preMonthNum );
            break;
        case 6:
            ab( y, m, 5, d, dayNum, preMonthNum );
            break;
    }
}

function ab( y, m, num, d, dayNum, preMonthNum ) {
    var blocks = [];
    //当月
    for ( var i = 0; i < dayNum; i++ ) {
        solarDay[i + num].innerHTML = i + 1;
        if ( i == d ) {
            var div = document.createElement('div');
            div.className = 'td';
            solarDay[i + num - 1].parentNode.appendChild(div);
        }
        blocks[i + num] = y + m + (i + 1);
    }
    //前一月
    for ( var i = num + dayNum, j = 1; i < 42, j <= 42 - num - dayNum; i++, j++ ) {
        solarDay[i].innerHTML = j;
        solarDay[i].parentNode.style.opacity = 0.5;
        solarDay[i].parentNode.style.background = '#F7F5F3';
        addEvent(solarDay[i], 'click', drawCalendar(y, m - 1));
        blocks[j] = y + (m - 1) + i;
    }
    //后一月
    for ( var i = 0, j = preMonthNum - num + 1; i < num, j <= preMonthNum; i++, j++ ) {
        solarDay[i].innerHTML = j;
        solarDay[i].parentNode.style.opacity = 0.5;
        solarDay[i].parentNode.style.background = '#F7F5F3';
        addEvent(solarDay[i], 'click', drawCalendar(y, m + 1));
        blocks[j] = y + (m + 1) + (i + 1);
    }
}

drawCalendar();

/*
* 根据传入的年、月、日来渲染页面,若未传则以当前的年/月/日代替
* 全部未传表示页面以当前日期重新渲染
* */
 function drawCalendar(selectYear, selectMonth, selectDay) {
    myDate = new Date();
    var sYear = selectYear ? selectYear : myDate.getFullYear(),
        sMonth = selectMonth ? selectMonth : myDate.getMonth() + 1,
        sDay = selectDay ? selectDay : myDate.getDate();

     yearBtn.innerHTML = sYear + '年';
     monthBtn.innerHTML = sMonth + '月';

     var cs = calendar.solarToLunar(sYear,sMonth,sDay)

     switch(cs.thWeek) {
         case 1:
             selectWeekDay = '星期一';
             break;
         case 2:
             selectWeekDay = '星期二';
             break;
         case 3:
             selectWeekDay = '星期三';
             break;
         case 4:
             selectWeekDay = '星期四';
             break;
         case 5:
             selectWeekDay = '星期五';
             break;
         case 6:
             selectWeekDay = '星期六';
             break;
         default:
             selectWeekDay = '星期日';
    }

     bDate.innerHTML = sYear + '-' + sMonth + '-' + sDay;
     bWeekday.innerHTML = selectWeekDay;
     dShowPanel.innerHTML = sDay;

     lunar.innerHTML = calendar.toChinaMonth(cs.lMonth) + calendar.toChinaDay(cs.lDay);

     animal.innerHTML = cs.Animal;
     astro.innerHTML = cs.gzYear + '年';

     lGanzhi.innerHTML = cs.gzMonth + '月    ' + cs.gzDay + '日';

     showDate(sYear, sMonth, sDay);
}





