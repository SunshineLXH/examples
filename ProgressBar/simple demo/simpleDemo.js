/**
 * Created by SunshineLXH on 2016/5/7.
 */
var btn = document.getElementsByClassName('btn')[0],
    mask = document.getElementsByClassName('mask')[0];

function bind(target, type, listener, useCapture) {
    if (target.addEventListener) return target.addEventListener(type, listener, useCapture);
    else if (target.attachEvent) return target.attachEvent('on' + type, listener);
    else target['on' + type] = listener;
}

bind(btn, 'click', function() {
    mask.style.display = 'block';
    console.log(1, mask)
});