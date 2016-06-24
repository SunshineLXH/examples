/**
 * Created by SunshineLXH on 2016/2/15.
 */
function CArray(numElements){
    this.dataStore = [];
    this.pos = 0;
    this.numElements = numElements;
    this.insert = insert;
    this.toString = toString;
    this.clear = clear;
    this.setData = setData;
    this.swap = swap;

    for (var i = 0; i < numElements; i++)
        this.dataStore[i] = i;

    this.gaps = [5, 3, 1];
    this.shellSort = shellSort;
    this.shellSort1 = shellSort1;
}

function setData(){
    for (var i = 0; i < this.numElements; i++)
        this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 1));
}

function clear(){
    for (var i = 0; i < this.numElements; i++)
        this.dataStore[i] = 0;
}

function insert(element){
    this.dataStore[this.pos++] = element;
}

function toString(){
    var restr = "";
    for (var i = 0; i < this.dataStore.length; i++){
        restr += this.dataStore[i] + " ";
        if (i > 0 & i % 10 ==0)
            restr += "\n";
    }
    return restr;
}

function swap(arr, index1, index2){
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

function shellSort(){
    for (var g = 0; g < this.gaps.length; g++){
        for (var i = this.gaps[g]; i < this.dataStore.length; i++){
            var temp = this.dataStore[i];
            for (var j = i; j >= this.gaps[g] && this.dataStore[j - this.gaps[g]] > temp; j -= this.gaps[g]){
                this.dataStore[j] = this.dataStore[j - this.gaps[g]];
            }
            this.dataStore[j] = temp;
        }
    }
}

//test shellSort()
var nums = new CArray(10);
nums.setData();
console.log("before shellSort: \n" + nums.toString());
nums.shellSort();
console.log("After shellSort: \n" + nums.toString());

function shellSort1(){
    var N = this.dataStore.length;
    var h = 1;
    while (h < N / 3){
        h = 3 * h + 1;
    }
    while (h >= 1){
        for (var i = h; i < N; i++){
            for (var j = i; j >= h && this.dataStore[j] < this.dataStore[j - h]; j -= h)
                swap(this.dataStore, j, j - h);
        }
        h = (h - 1) / 3;
    }
}

//test shellSort1()
var nums = new CArray(100);
nums.setData();
console.log("希尔排序前1：\n" + nums.toString());
nums.shellSort1();
console.log("希尔排序后1：\n" + nums.toString());

function setGaps(arr){
    this.gaps = arr;
}

//比较shellSort()算法
var nums = new CArray(10000);
nums.setData();
var start = new Date().getTime();
nums.shellSort();
var stop = new Date().getTime();
var elaped = stop - start;
console.log("硬编码间隔序列的希尔排序消耗时间为：" + elaped + "毫秒");
nums.clear();
nums.setData();
var start = new Date().getTime();
nums.shellSort1();
var stop = new Date().getTime();
var elaped = stop - start;
console.log("动态编码间隔序列的希尔排序消耗时间为：" + elaped + "毫秒");






