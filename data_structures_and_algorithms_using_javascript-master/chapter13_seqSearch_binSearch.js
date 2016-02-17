/**
 * Created by SunshineLXH on 2016/2/17.
 */
function seqSearch(arr, data){
    for (var i = 0; i < arr.length; i++){
        if (arr[i] == data && i > (arr.length * 0.2)){
            swap(arr, i, 0);
            return true
        }
        else if (arr[i] == data) return true;
    }
    return false;
}

var nums = [];
for (var i = 0; i < 100; i++)
    nums[i] = Math.floor(Math.random() * 101);
console.log(nums);
var num = 5;
if (seqSearch(nums, num))
    console.log(num + "出现在这个数组中。");
else
    console.log(num + "没有出现在这个数组中。");


function findMin(arr){
    var min = arr[0];
    for (var i = 1; i < arr.length; i++)
        if (arr[i] < min) min = arr[i];
    return min;
}

//test findMin
var nums = [];
for (var i = 0; i < 100; i++)
    nums[i] = Math.floor(Math.random() * 101);
var minValue = findMin(nums);
console.log("数组： " + nums + " 中最小的数是： " + minValue);

function findMax(arr){
    var max = arr[0];
    for (var i = 0; i < arr.length; i++)
        if (arr[i] > max) max = arr[i];
    return max;
}

//test findMax
var nums = [];
for (var i = 0; i < 100; i++)
    nums[i] = Math.floor(Math.random() * 101);
var maxValue = findMax(nums);
console.log("数组： " + nums + "中最大的数是： " + maxValue);

function swap(arr, index1, index2){
    temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

function binSearch(arr, data){
    var upperBound = arr.length - 1;
    var lowerBound = 0;
    while (lowerBound <= upperBound){
        var mid = Math.floor((upperBound + lowerBound) / 2);
        if (arr[mid] < data) lowerBound = mid + 1;
        else if (arr[min] > data) upperBound = mid + 1;
        else return mid;
    }
    return -1;
}

function count(arr, data){
    var count = 0;
    var position = binSearch(arr, data);
    if (position > -1){
        count++;
        for (var i = position - 1; i > 0; i--){
            if (arr[i] == data)
                count++;
            else
                break;
        }
        for (var i = position + 1; i < arr.length; i++){
            if (arr[i] == data) count++;
            else break;
        }
    }
    return count;
}
