/**
 * Created by SunshineLXH on 2016/1/30。
 */
var canvas = document.getElementById('canvas');
var cxt = canvas.getContext('2d');

cxt.lineWidth = 3;
cxt.strokeStyle = "#000";
var flag = 0,
    startX,
    startY,
    endX,
    endY;

var saveOrRemove = document.getElementById('SaveOrRemove'),
    save = saveOrRemove.getElementsByTagName('li')[0],
    remove = saveOrRemove.getElementsByTagName('li')[1];

var toolsImages = document.getElementById('toolsImages'),
    brush = toolsImages.getElementsByTagName('li')[0],
    eraser = toolsImages.getElementsByTagName('li')[1],
    paint = toolsImages.getElementsByTagName('li')[2],
    straw = toolsImages.getElementsByTagName('li')[3],
    text = toolsImages.getElementsByTagName('li')[4],
    magnifier = toolsImages.getElementsByTagName('li')[5];

var shape = document.getElementById('shape'),
    line = shape.getElementsByTagName('li')[0],
    arc = shape.getElementsByTagName('li')[1],
    rect = shape.getElementsByTagName('li')[2],
    poly = shape.getElementsByTagName('li')[3],
    arcFill = shape.getElementsByTagName('li')[4],
    rectFill = shape.getElementsByTagName('li')[5];

var actions = [save, remove, brush, eraser, paint, straw, text, magnifier, line, arc, rect, poly, arcFill, rectFill];

var LineWidth = document.getElementById('LineWidth'),
    LineWidth_1 = LineWidth.getElementsByTagName('li')[0],
    LineWidth_3 = LineWidth.getElementsByTagName('li')[1],
    LineWidth_5 = LineWidth.getElementsByTagName('li')[2],
    LineWidth_8 = LineWidth.getElementsByTagName('li')[3];

var LineWidths = [LineWidth_1, LineWidth_3, LineWidth_5, LineWidth_8];

var color = document.getElementById('color'),
    red = color.getElementsByTagName('li')[0],
    green = color.getElementsByTagName('li')[1],
    blue = color.getElementsByTagName('li')[2],
    yellow = color.getElementsByTagName('li')[3],
    white = color.getElementsByTagName('li')[4],
    black = color.getElementsByTagName('li')[5],
    orange = color.getElementsByTagName('li')[6],
    brown = color.getElementsByTagName('li')[7],
    cyan = color.getElementsByTagName('li')[8],
    purple = color.getElementsByTagName('li')[9];

var colors = [red, green, blue, yellow, white, black, orange, brown, cyan, purple];

brush(3);

function selectStatus(array, num, style){
    for (var i = 0; i < array.length; i ++){
        if (i == num){
            if (style == 1){
                array[i].style.background = 'yellow';
            } else {
                array[i].style.border = '1px solid #fff';
            }
        } else {
            if (style == 1){
                array[i].style.background = '#ccc';
            } else {
                array[i].style.border = '1px solid #000';
            }
        }

    }
}

function save(num){
    var data = canvas.toDataURL(),
        b64 = data.substring(22),
        imgData = document.getElementById('imgData');
    imgData.value = b64;
    var form = document.getElementById('form');
    form.submit();
}

function clearAll(num){
    selectStatus(actions, num, 1);
    cxt.clearRect(0, 0, 800, 400);
    canvas.onmousedown = null;
    canvas.onmousemove = null;
    canvas.onmouseup = null;
    canvas.onmouseout = null;
}

function brush(num){
    selectStatus(actions, num, 1);
    canvas.onmousedown = function(ev){
        ev = ev ? ev : window.event;
        startX = evt.pageX - this.offsetLeft;
        startY = evt.pageY - this.offsetTop;
        flag = 1;
        cxt.closePath();
        cxt.beginPath();
        cxt.moveTo(startX, startY);
    }

    canvas.onmousemove = function(ev){
        ev = ev ? ev : window.event;
        endX = ev.pageX - this.offsetLeft;
        endY = ev.pageY - this.offsetTop;

        if (flag){
            cxt.lineTo(endX, endY);
            cxt.stroke();
        }
    }

    canvas.onmouseup = function(ev){
        flag = 0;
    }

    canvas.onmouseout = function(ev){
        flag = 0;
    }
}

function eraser(num){
    selectStatus(actions, num, 1);
    canvas.onmousedown = function(ev){
        ev = ev ? ev : window.event;
        startX = ev.pageX - this.offsetLeft;
        startY = ev.pageY - this.offsetTop;
        flag = 1;
        cxt.clearRect(startX - cxt.lineWidth, startY - cxt.lineWidth, cxt.lineWidth);
    }

    canvas.onmousemove = function(ev){
        ev = ev ? ev : window.event;
        endX = ev.pageX - this.offsetLeft;
        endY = ev.pageY - this.offsetTop;

        if(flag){
            cxt.clearRect(endX - cxt.lineWidth, endY - cxt.lineWidth, cxt.lineWidth);
        }
    }

    canvas.onmouseup = function(ev){
        flag = 0;
    }

    canvas.onmouseout = function(ev){
        flag = 0;
    }
}

function paint(num){
    selectStatus(actions, num, 1);
    canvas.onmousedown = function(){
        cxt.fillRect(0, 0, 800, 400);
    }
}

function straw(num){
    selectStatus(actions, num, 1);
    canvas.onmousemove = null;
    canvas.onmouseup = null;
    canvas.onmouseout = null;
    canvas.onmousedown = function(ev){
        ev = ev ? ev : window.event;
        X = ev.pageX - this.offsetLeft;
        Y = ev.pageY - this.offsetTop;
        var imageData = cxt.getImageData(X, Y, 1, 1);
        var pxData = imageData.data;
        var color = 'rgba(' + pxData[0] + ',' + pxData[1] + ',' + pxData[2] + ',' + pxData[3] + ')';
        cxt.strokeStyle = color;
        cxt.fillStyle = color;
    }
}

function text(num){
    selectStatus(actions, num, 1);

    canvas.onmousemove = null;
    canvas.onmouseup = null;
    canvas.onmouseout = null;
    canvas.onmousedown = function(ev){
        ev = ev ? ev : window.event;
        startX = ev.pageX - this.offsetLeft;
        startY = ev.pageY - this.offsetTop;
        var content = window.prompt('', '');
        if (content){
            cxt.filltext(content, startX, startY);
        }
    }
}

function magnifier(num){
    selectStatus(actions, num, 1);
    var scale = window.prompt('','');
    var scaleX = 780 * scale / 100;
    var scaleY = 380 * scale / 100;
    canvas.style.width = parseInt(scaleX) + 'px';
    canvas.style.height = parseInt(scaleY) + 'px';
}

function line(num){
    selectStatus(actions, num, 1);
    canvas.onmousedown = function(ev){
        startX = ev.pageX - this.offsetLeft;
        startY = ev.pageY - this.offsetTop;
        cxt.closePath();
        cxt.beginPath();
        cxt.moveTo(startX, startY);
    }
    canvas.onmouseup = function(ev){
        ev = ev ? ev : window.event;
        endX = ev.pageX - this.offsetLeft;
        endY = ev.pageY - this.offsetTop;
        cxt.lineTo(endX, endY);
        cxt.stroke();
    }
    canvas.onmousemove = null;
    canvas.onmouseout = null;
}

function arc(num){
    selectStatus(actions, num, 1);
    canvas.onmousedown = function(ev){
        ev = ev ? ev : window.event;
        startX = ev.pageX - this.offsetLeft;
        startY = ev.pageY - this.offsetTop;
        cxt.closePath();
        cxt.beginPath();
    }

    canvas.onmouseup = function(ev){
        ev = ev ? ev : window.event;
        endX = ev.pageX - this.offsetLeft;
        endY = ev.pageY - this.offsetTop;
        cxt.arc(startX, startY, Math.sqrt(Math.pow((endX - startX), 2) + Math.pow((endY - startY), 2)), 0, 360, false);
        cxt.stroke();
    }
    canvas.onmousemove = null;
    canvas.onmouseout = null;
}

function rect(num){
    selectStatus(actions, num, 1);
    canvas.onmousedown = function(ev){
        ev = ev ? ev : window.event;
        startX = ev.pageX - this.offsetLeft;
        startY = ev.pageY - this.offsetTop;
    }

    canvas.onmouseup = function(ev){
        ev = ev ? ev : window.event;
        endX = ev.pageX - this.offsetLeft;
        endY = ev.pageY - this.offsetTop;
        cxt.strokeRect(startX, startY, endX - startX, endY - startY);
    }

    canvas.onmousemove = null;
    canvas.onmouseout = null;
}

function poly(num){
    selectStatus(actions, num, 1);
    canvas.onmousedown = function(ev){
        ev = ev ? ev : window.event;
        startX = ev.pageX - this.offsetLeft;
        startY = ev.pageY - this.offsetTop;

        cxt.beginPath();
    }

    canvas.onmouseup = function(ev){
        ev = ev ? ev : window.event;
        endX = ev.pageX - this.offsetLeft;
        endY = ev.pageY - this.offsetTop;
        cxt.moveTo(endX, endY);
        cxt.lineTo(startX - (endX - startX), endY);
        cxt.lineTo(startX, startY - Math.sqrt(Math.sqrt(endX - startX, 2) + Math.sqrt(endY - startY, 2)));
        cxt.closePath();
        cxt.stroke();
    }
    canvas.onmousemove = null;
    canvas.onmouseout = null;
}

function arcFill(null){
    selectStatus(actions, null, 1);
    canvas.onmousedown = function(ev){
        ev = ev ? ev : window.event;
        startX = ev.pageX - this.offsetLeft;
        startY = ev.pageY - this.offsetTop;
        cxt.closePath();
        cxt.beginPath();
    }

    canvas.onmouseup = function(ev){
        ev = ev ? ev : window.event;
        endX = ev.pageX - this.offsetLeft;
        endY = ev.pageY - this.offsetTop;
        cxt.arc(startX, startY, Math.sqrt(Math.pow((endX - startX), 2) + Math.pow((endY - startY),2)), 0, 360, false);
        cxt.fill();
    }
    canvas.onmousemove = null;
    canvas.onmouseout = null;
}

function rectFill(num){
    selectStatus(actions, num, 1);
    canvas.onmousedown = function(ev){
        ev = ev ? ev : window.event;
        startX = ev.pageX - this.offsetLeft;
        startY = ev.pageY - this.offsetTop;
    }

    canvas.onmouseup = function(ev){
        ev = ev ? ev : window.event;
        endX = ev.pageX - this.offsetLeft;
        endY = ev.pageY - this.offsetTop;
        cxt.fillRect(startX, startY, endX - startX, endY - startY);
    }
    canvas.onmousemove = null;
    canvas.onmouseout = null;
}

function setWidth(num){
    selectStatus(lineWidths, num, 1);
    switch(num){
        case 0:
            cxt.lineWidth = 1;
            break;
        case 1:
            cxt.lineWidth = 3;
            break;
        case 2:
            cxt.lineWidth = 5;
            break;
        case 3:
            cxt.lineWidth = 8;
            break;
        default:
            alert('');
    }
}

function setColor(obj,num){
    selectStatus(colors, num);
    cxt.strokeStyle = obj.id;
    cxt.fillStyle = obj.id;
}