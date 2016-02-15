/**
 * Created by SunshineLXH on 2016/2/12.
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

    this.bubbleSort = bubbleSort;
    this.selectionSort = selectionSort;
    this.insertionSort = insertionSort;
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

//test CArray
var numElements = 100;
var myNums = new CArray(numElements);
myNums.setData();
console.log(myNums.toString());

//冒泡排序
function bubbleSort(){
    var numElements = this.dataStore.length;
    var temp;
    for (var outer = numElements; outer >= 2; --outer){
        for (var inner = 0; inner <= outer - 1; ++inner){
            if (this.dataStore[inner] > this.dataStore[inner + 1])
                swap(this.dataStore, inner, inner + 1);
        }
        console.log(this.toString());
    }
}

//test bubbleSort()
var numElements = 8;
var myNums = new CArray(numElements);
myNums.setData();
console.log(myNums.toString());
myNums.bubbleSort();


//选择排序
function selectionSort(){
    var min, temp;
    for (var outer = 0; outer <= this.dataStore.length - 2; outer++){
        min = outer;
        for (var inner = outer + 1; inner <= this.dataStore.length - 1; inner++){
            if (this.dataStore[min] > this.dataStore[inner])
                min = inner;
        }
        swap(this.dataStore, outer, min);
    }
}

//test selectSort()
var numElements = 10;
var myNums = new CArray(numElements);
myNums.setData();
console.log(myNums.toString());
myNums.selectionSort();
console.log(myNums.toString());

//插入排序
function insertionSort(){
    var temp, inner;
    for (var outer = 1; outer <= this.dataStore.length - 1; ++outer){
        temp = this.dataStore[outer];
        inner = outer;
        while (inner > 0 && (this.dataStore[inner - 1] >= temp)){
            this.dataStore[inner] = this.dataStore[inner - 1];
            --inner;
        }
        this.dataStore[inner] = temp;
    }
}

//test insertionSort()
var numElements = 8;
var myNums = new CArray(numElements);
myNums.setData();
console.log(myNums.toString());
myNums.insertionSort();
console.log(myNums.toString());

//排序算法消耗时间比较
var numElements = 1000;
var nums = new CArray(numElements);
nums.setData();
var start = new Date().getTime();
nums.bubbleSort();
var stop = new Date().getTime();
var elapsed = stop - start;
console.log("对" + numElements + "个元素执行冒泡排序消耗的时间为： " + elapsed + "毫秒");

start = new Date().getTime();
nums.selectionSort();
stop = new Date().getTime();
elapsed = stop - start;
console.log("对" + numElements + "个元素执行选择排序消耗的时间为： " + elapsed + "毫秒");

start = new Date().getTime();
nums.insertionSort();
stop = new Date().getTime();
elapsed = stop - start;
console.log("对" + numElements + "个元素执行插入排序消耗的时间为： " + elapsed + "毫秒");