/**
 * Created by SunshineLXH on 2016/2/16.
 */
function CArray(numElements){
    this.dataStore = [];
    this.pos = 0;
    this.gaps = [5,3,1];
    this.numElements = numElements;
    //this.insert = insert;
    this.toString = toString;
    //this.clear = clear;
    this.setData = setData;
    //this.setGaps = setGaps;
    //this.shellSort = shellSort;
    this.mergeSort = mergeSort;
    this.mergeArray = mergeArray;
    for (var i = 0; i < numElements; i++)
        this.dataStore[i] = 0;
}

function mergeSort(){
    if (this.dataStore.length < 2) return;
    var step = 1;
    var left, right;
    while (step < this.dataStore.length){
        left = 0;
        right = step;
        while (right + step <= this.dataStore.length){
            mergeArray(this.dataStore, left, left + step, right, right + step);
            left = right + step;
            right = left + step;
        }
        if (right < this.dataStore.length)
            mergeArray(this.dataStore, left, left + step, right, this.dataStore.length);
        step *= 2;
    }
}

function setData(){
    for (var i = 0; i < this.numElements; i++)
        this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 1));
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

function mergeArray(arr, startLeft, stopLeft, startRight, stopRight){
    var rightArr = new Array(stopRight - startRight + 1);
    var leftArr = new Array(stopLeft - startLeft + 1);
    k = startRight;
    for (var i = 0; i < (rightArr.length -1); i++){
        rightArr[i] = arr[k];
        k++;
    }

    k = startLeft;
    for (var i = 0; i < (leftArr.length - 1); i++){
        leftArr[i] = arr[k];
        k++;
    }

    rightArr[rightArr.length - 1] = Infinity;
    leftArr[leftArr.length - 1] = Infinity;
    var m = 0;
    var n = 0;
    for (var k = startLeft; k < stopRight; k++){
        if (leftArr[m] <= rightArr[n]){
            arr[k] = leftArr[m];
            m++;
        }
        else {
            arr[k] = rightArr[n];
            n++;
        }
    }
    console.log("left array -", leftArr);
    console.log("right array -", rightArr);
}

//test mergeSort()
var nums = new CArray(10);
nums.setData();
console.log(nums.toString());
nums.mergeSort(nums);
console.log(nums.toString());

function qSort(arr){
    if (arr.length == 0) return [];
    var lesser = [];
    var greater = [];
    var  pivot = arr[0];
    for (var i = 1; i < arr.length; i++){
        if (arr[i] < pivot)
            lesser.push(arr[i]);
        else
            greater.push(arr[i]);
    }
    return qSort(lesser).concat(pivot, qSort(greater));
}

//test qSort()
var a = [];
for (var i = 0; i < 10; i++)
    a[i] = Math.floor((Math.random() * 100) +1);
console.log(a);
console.log(qSort(a));