/**
 * Created by SunshineLXH on 2016/2/10.
 */
function Node(data, left, right){
    this.data = data;
    this.count = 1;
    this.left = left;
    this.right = right;
    this.show = show;
}

function show(){
    return this.data;
}

function BST(){
    this.root = null;
    this.insert = insert;
    this.inOrder = inOrder;
    this.getMin = getMin;
    this.getMax = getMax;
    this.updata = updata;
}

function insert(data){
    var n = new Node(data, null, null);
    if (this.root == null)
        this.root = n;
    else {
        var current = this.root;
        var parent;
        while (true){
            parent = current;
            if (data < current.data){
                current = current.left;
                if (current == null){
                    parent.left = n;
                    break;
                }
            }
            else {
                current = current.right;
                if (current == null){
                    parent.right = n;
                    break;
                }
            }
        }
    }
}

function updata(data){
    var grade = this.find(data);
    grade.count++;
    return grade;
}

//中序
function inOrder(node){
    if (!(node == null)){
        inOrder(node.left);
        console.log(node.show() + " ");
        inOrder(node.right);
    }
}

////先序
//function preOrder(node){
//    if (!(node == null)){
//        console.log(node.show() + " ");
//        preOrder(node.left);
//        preOrder(node.right);
//    }
//}
//
////后序
//function postOrder(node){
//    if (!(node == null)){
//        postOrder(node.left);
//        postOrder(node.right);
//        console.log(node.show() + " ");
//    }
//}

//测试中序
var nums = new BST();
nums.insert(23);
nums.insert(45);
nums.insert(16);
nums.insert(37);
nums.insert(3);
nums.insert(99);
nums.insert(22);
console.log("Inorder traversal: ");
inOrder(nums.root);

function getMin(){
    var current = this.root;
    while (!(current.left == null))
        current = current.left;
    return current.data;
}

function getMax(){
    var current = this.root;
    while (!(current.right == null))
        current = current.right;
    return current.data;
}

//test getMin() and getMax()
var nums = new BST();
nums.insert(23);
nums.insert(45);
nums.insert(16);
nums.insert(37);
nums.insert(3);
nums.insert(99);
nums.insert(22);
var min = nums.getMin();
console.log("The minimum value of the BST is: " + min);
var max = nums.getMax();
console.log("The maximum value of the BSt is: " + max);

function find(data){
    var current = this.root;
    while (current != null){
        if (current.data == data)
            return current;
        else if (data < current.data)
            current = current.left;
        else
            current = current.right;
    }
    return null;
}

//test find()
inOrder(nums.root);
console.log("Enter a value to search for: ");
var value = parseInt(readline());
var found = nums.find(value);
if (found != null)
    console.log("Found" + value + " in the BST.");
else
    console.log(value + " was not found in the BST.");

function remove(data){
    root = removeNode(this.root, data);
}

function removeNode(node, data){
    if (node == null)
        return null;
    if (data == node.data){
        //没有子节点的节点
        if (node.left == null && node.right == null)
            return null;
        //没有左子节点的节点
        if (node.left == null)
            return node.right;
        //没有右子节点的节点
        if (node.right == null)
            return node.left;
        //有两个子节点的节点
        var tempNode = getSmallest(node.right);
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
    }
    else if (data < node.data){
        node.left = removeNode(node.left, data);
        return node;
    }
    else {
        node.right = removeNode(node.right, data);
        return node;
    }
}

function prArray(arr){
    console.log(arr[0].toString() + ' ');
    for (var i = 1; i < arr.length; ++i){
        console.log(arr[i].toString() + ' ');
        if (i % 10 == 0)
            console.log("\n");
    }
}

function genArray(length){
    var arr = [];
    for (var i = 0; i < length; ++i)
        arr[i] = Math.floor(Math.random() * 101);
    return arr;
}

function prArray(arr){
    console.log(arr[0].toString() + ' ');
    for (var i = 1; i < arr.length; ++i){
        console.log(arr[i].toString() + '');
        if (i % 10 == 0)
            console.log("\n");
    }
}

function genArray(length){
    var arr = [];
    for (var i = 0; i < length; ++i)
        arr[i] = Math.floor(Math.random() * 101);
    return arr;
}

var grades = genArray(100);
prArray(grades);
var gradedistro = new BST();
for (var i = 0; i < grades.length; i++){
    var g = grades[i];
    var grade = gradedistro.find(g);
    if (grade == null)
        gradedistro.insert(g);
    else
        gradedistro.updata(g);
}
var cont = "y";

while (cont == "y"){
    console.log("\n\nEnter a grade: ");
    var g = parseInt(readline());
    var aGrade = gradedistro.find(g);
    if (aGrade == null)
        console.log("No occurrences of " + g);
    else
        console.log("Occurrences of " + g + ": " + aGrade.count);
    console.log("Look at another grade (y/n)? ");
    cont = readline();
}
