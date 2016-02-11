/**
 * Created by SunshineLXH on 2016/2/11.
 */
function Graph(v){
    this.vertices = v;
    this.vertexList = [];
    this.edges = 0;
    this.adj = [];
    for (var i = 0; i < this.vertices; i++){
        this.adj[i] = [];
        this.adj[i].push("");
    }
    this.marked = [];
    for (var i = 0; i < this.vertices; i++)
        this.marked[i] = false;
    this.edgeTo = [];
    this.hasPathTo = hasPathTo;
    this.topSortHelper = topSortHelper;
    this.topSort = topSort;
    this.addEdge = addEdge;
    this.toString = toString;
    this.showGraph = showGraph;
    this.pathTo = pathTo;
    this.hasPathTo = hasPathTo;
    this.dfs = dfs;
    this.bfs = bfs;
}

function addEdge(v, w){
    this.adj[v].push(w);
    this.adj[w].push(v);
    this.edges++;
}

//function showGraph(){
//    for (var i = 0; i < this.vertices; i++){
//        console.log(i + '->');
//        for (var j = 0; j < this.vertices; j++){
//            if (this.adj[i][j] != undefined)
//                console.log(this.adj[i][j] + ' ');
//        }
//        print();
//    }
//}

function showGraph(){
    var visited = [];
    for (var i = 0; i < this.vertices; i++){
        console.log(this.vertexList[i] + "->");
        visited.push(this.vertexList[i]);
        for (var j = 0; j < this.vertices; j++){
            if (this.adj[i][j] != undefined){
                if (visited.indexOf(this.vertexList[j]) < 0)
                    console.log(this.vertexList[j] + ' ');
            }
        }
        visited.pop();
    }
}

function dfs(v){
    this.marked[v] = true;
    //用于输出的if语句在这里还是必须的
    if (this.adj[v] != undefined)
        console.log("Visited vertex: " + v);
    for (var w in this.adj[v]){
        if (!this.marked[w])
            this.dfs(w);
    }
}

function bfs(s){
    var queue = [];
    this.marked[s] = true;
    queue.unshift(s);
    while (queue.length > 0){
        var v = queue.shift();
        if (typeof(v) != 'string')
            console.log("Visited vertex: " + v);
        for (var w in this.adj[v]){
            if (!this.marked[w]){
                this.edgeTo[w] = v;
                this.marked[w] = true;
                queue.unshift(w);
            }
        }
    }
}

function pathTo(v){
    var source = 0;
    if (!this.hasPathTo(v))
        return undefined;
    var path = [];
    for (var i = v; i != source; i = this.edgeTo[i])
        path.push(i);
    path.push(s);
    return path;
}

function hasPathTo(v){
    return this.marked[v];
}

function topSort(){
    var stack = [];
    var visited = [];
    for (var i = 0; i < this.vertices; i++)
        visited[i] = false;
    for (var i = 0; i < stack.length; i++){
        if (visited[i] == false)
            this.topSortHelper(i, visited, stack);
    }
    for (var i = 0; i < stack.length; i++){
        if (stack[i] != undefined && stack[i] != false)
            console.log(this.vertexList[stack[i]]);
    }
}

function topSortHelper(v, visited, stack){
    visited[v] = true;
    for(var w in this.adj[v]){
        if (!visited[w])
            this.topSortHelper(visited[w], visited, stack);
    }
    stack.push(v);
}

//test Graph
g = new Graph(5);
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 3);
g.addEdge(2, 4);
g.showGraph();

//test dfs()
g.dfs(0);

//test bfs()
g.bfs(0);

//展示指定顶点的最短路径
//var vertex = 4;
//var paths = g.pathTo(vertex);
//while (paths.length > 0){
//    if (paths.length > 1)
//        console.log(paths.pop() + '-');
//    else
//        console.log(paths.pop());
//}

//拓扑排序
g = new Graph(6);
g.addEdge(1, 2);
g.addEdge(2, 5);
g.addEdge(1, 3);
g.addEdge(1, 4);
g.addEdge(0, 1);
g.vertexList = ["CS1", "CS2", "Data Structures", "Assembly Language", "Operating Systems", "Algorithms"];
g.showGraph();
g.topSort();

