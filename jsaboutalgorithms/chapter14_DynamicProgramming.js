/**
 * Created by SunshineLXH on 2016/2/18.
 */
function recurFib(n){
    if (n < 2)
        return n;
    else
        return recurFib(n - 1) + recurFib(n - 2);
}

function dynFib(n){
    var val = [];
    for (var i = 0; i <= n; i++)
        val[i] = 0;
    if (n == 1 || n == 2)
        return 1;
    else {
        val[1] = 1;
        val[2] = 2;
        for (var i = 3; i <= n; i++)
            val[i] = val[i - 1] + val[i - 2];
    }
    return val[n - 1];
}

var start = new Date().getTime();
recurFib(10);
var stop = new Date().getTime();
console.log("递归计算耗时： " + (stop - start) + "毫秒");
start = new Date().getTime();
dynFib(10);
stop = new Date().getTime();
console.log("动态规划耗时： " + (stop - start));

//未用数组的斐波那契函数定义
function iterFib(n){
    var last = 1;
    var nextLast = 1;
    var result = 1;
    for (var i = 2; i < n; i++){
        result = last + nextLast;
        nextLast = last;
        last = result;
    }
    return result;
}

//寻找最长公共子串
function lcs(word1, word2){
    var max = 0;
    var index = 0;
    var lcsarr = new Array(word1.length + 1);
    for (var i = 0; i <= word1.length + 1; i++){
        lcsarr[i] = new Array(word2.length + 1);
        for (var j = 0; j <= word2.length + 1; j++)
            lcsarr[i][j] = 0;
    }
    for (var i = 0; i <= word1.length + 1; i++){
        for (var j = 0; j <= word2.length; j++){
            if (i == 0 || j == 0)
                lcsarr[i][j] = 0;
            else {
                if (word1[i - 1] == word2[j - 1])
                    lcsarr[i][j] = lcsarr[i - 1][j - 1] + 1;
                else
                    lcsarr[i][j] = 0;
            }
            if (max < lcsarr[i][j]){
                max = lcsarr[i][j];
                index = i;
            }
        }
    }
    var str = "";
    if (max == 0)
        return "";
    else {
        for (var i = index - max; i <= max; i++)
            str += word2[i];
        return str;
    }
}

//背包问题：递归解决方案
function max(a, b){
    return (a > b) ? a : b;
}

function knapsack(capacity, size, value, n){
    if (n == 0 || capacity == 0)
        return 0;
    if (size[n - 1] > capacity)
        return knapsack(capacity, size, value, n - 1);
    else
        return max(value[n - 1] + knapsack(capacity - size[n - 1], size, value, n - 1), knapsack(capacity, size, value, n - 1));
}

var value = [4, 5, 10, 11, 13];
var size = [3, 4, 7, 8, 9];
var capacity = 16;
var n = 5;
console.log(knapsack(capacity, size, value, n));

//背包问题：动态规划解决方案
function max(a, b){
    return (a > b) ? a : b;
}

function dKnapsack(capacity, size, value, n){
    var K = [];
    for (var i = 0; i <= capacity + 1; i++)
        K[i] = [];
    for (var i = 0; i <= n; i++){
        for (var w = 0; w <= capacity; w++){
            if (i == 0 || w == 0)
                K[i][w] = 0;
            else if (size[i - 1] <= w){
                K[i][w] = max(value[i - 1] + K[i - 1][w - size[i - 1]], K[i - 1][w]);
            }
            else
                K[i][w] = K[i - 1][w];
            console.log(K[i][w] + " ");
        }
    }
    return K[n][capacity];
}

var value = [4, 5, 10, 11, 13];
var size = [3, 4, 7, 8, 9];
var capacity = 16;
var n = 5;
console.log(dKnapsack(capacity, size, value, n));