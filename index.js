
var oLi = document.getElementsByTagName('li');
var page = 1;
//加锁，图片全部加载完成后才有下一次请求
var flag = true;
function ajaxFun() {
    if (flag) {
        flag = false;
        ajax('get', 'getPics.php', getData, 'cpage=' + page, true);
        page++;
    }
}
ajaxFun();


function getData(data) {
    var value = JSON.parse(data);
    console.log(value);
    value.forEach(function (ele, index) {
        var index = minListIndex(oLi);
        var oDiv = document.createElement('div');
        var oP = document.createElement('p');
        var oImg = new Image();

        oImg.src = ele.preview;
        oP.innerHTML = ele.title;
        oDiv.className = 'item';

        oImg.style.height = ele.height / ele.width * 200 + 'px';

        oDiv.appendChild(oImg);
        oDiv.appendChild(oP);
        oLi[index].appendChild(oDiv);
        // 处理暂时加载失败的图片
        oImg.onerror = function (){
            oImg.style.margin = '-1px';
            oImg.style.width = '202px';
        }
    });
    flag = true;
}


// 寻找最短li
function minListIndex(dom) {
    var minListHeight = dom[0].offsetHeight,
        index = 0,
        len = dom.length;
    for (var i = 1; i < len; i++) {
        if (minListHeight > dom[i].offsetHeight) {
            min = dom[i].offsetHeight;
            index = i;
        }
    }
    return index;
}

window.onscroll = function () {
    var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var minHeight = oLi[minListIndex(oLi)].offsetHeight;

    if (scrollHeight + clientHeight >= minHeight) {
        ajaxFun();
    }
}