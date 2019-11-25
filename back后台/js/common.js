/*1.获取实参中的最大值*/
function max() {
    var res = arguments[0]; //获取第一个值
    for (i = 0; i < arguments.length; i++) { //逐个比较，得较大值
        res = res < arguments[i] ? arguments[i] : res;
    }
    return res; //返回res值
}


/*2.随机生成验证码
 *生成长度为n的验证码
 */
function authCode(n) {
    var res = ''; //验证码容器
    for (i = 0; i < n; i++) { //循环n次
        res += parseInt(Math.random() * 10); //生成0-9的随机数
    }
    return res; //返回验证码
}

/*
 *3、获取任意范围的随机数
 *获取min-max之间的随机数
 */
function ranNum(min, max) {
    var res = 0;
    res = parseInt(Math.random() * (max - min + 1)) + min;
    return res;
}
//4、4位随机验证码
function ramVerify() {
    var str = '0123456789zxcvbnmasdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP'
    var res = '';
    for (i = 0; i < 4; i++) {
        var num = parseInt(Math.random() * str.length);
        res += str[num];
    }
    return res;
}

/*5、
 *去掉数组中的重复项;
 *返回一个新的数组
 */
function norepeat(arr) {
    var newarr = [];
    for (var i = 0; i < arr.length; i++) {
        if (newarr.indexOf(arr[i] == -1)) {
            newarr.push(arr[i])
        }
    }
}

//6、字符串转对象
function str_obj(str) {
    var arr = str.split('&'); //拆分字符串
    var obj = {};
    arr.forEach(function (item) { //遍历新数组
        var arr2 = item.split('='); //拆分
        obj[arr2[0]] = arr2[1]; //存进对象
    })
    return obj;
}

//7、对象转字符串
function obj_str(obj) {
    var arr = [];
    for (var key in obj) { //遍历
        var num = [key + '=' + obj[key]]; //用'='拼接
        arr.push(num); //生成新数组
    }
    return arr.join('&'); //用‘&’号拼接
}

//8、16进制随机背景色
function ranColor() {
    var str = '0123456789abcdef';
    var res = '#';
    for (var i = 0; i < 6; i++) {
        var num = parseInt(Math.random() * str.length); //生成字符串长度范围内的整数
        res += str[num]; //拼接
    }
    return res; //返回值
}

//9、统计字符串中每个字符个数的函数并去重
//返回去重后的新字符串
//统计的字符个数打印在控制台
function norepeat(str) { //定义函数
    var newstr = '';
    var obj = {};
    for (var i = 0; i < str.length; i++) {
        if (obj[str[i]]) {
            obj[str[i]]++;
        } else {
            obj[str[i]] = 1;
        }
        if (newstr.indexOf(str[i]) == -1) { //判断是否存在
            newstr += str[i];

        }
    }
    console.log(obj);
    return newstr; //返回去重后的字符串

}

//10、获取网址中的属性并转为对象
//调用函数后，获取返回值是需要的对象
function getObj() {
    var str = decodeURI(location.search.slice(1));
    var data = str_obj(str);
    return data;
}

//11、点击跳转并上传属性
/*
    a为点击的按钮
    b为数据对象所在的集合
*/
function setObj(a, b) {
    for (var i = 0; i < a.length; i++) {
        a[i].index = i;
        a[i].onclick = function () {
            var str = obj_str(b[this.index]);
            window.open('taobao详情页.html?' + str);
        }
    }
}

//12、小图换大图，点击小图，变换大图的图片
/*
    asmall为小图img元素集合
    bigUrl为大图所在的img元素
    color为点击小图高亮的颜色
*/
function smallTobig(asmall, bigUrl, color) {
    for (var i = 0; i < asmall.length; i++) {
        asmall[i].index = i;
        asmall[i].onclick = function () {
            bigUrl.src = this.src;
            for (var j = 0; j < asmall.length; j++) {
                asmall[j].style = 'border-color:#fff';
            }
            this.style = 'border-color:' + color;
        }
    }
}

//13、窗口向下滚动一段距离后元素显示
/*
    a为需要显示的元素
    num为向下滚动的距离
*/
function goXian(a, num) {
    window.onscroll = function () {
        var star = window.scrollY;
        if (star >= num) {
            a.style.display = 'block';
        } else {
            a.style.display = 'none';
        }
    }
}

//14、回到顶部变速
//a为置顶按钮
function toTopB(a) {
    a.onclick = function () {
        var top = window.scrollY;
        var timer = setInterval(function () {
            var num = parseInt(top / 6);
            top -= num;
            if (num <= 0) {
                clearInterval(timer);
            }
            window.scrollTo(0, num);
        }, 30);
    }
}

//15、回到顶部急速
//a为置顶按钮
function toTopJ(a) {
    a.onclick = function () {
        window.scrollTo(0, 0);
    }
}

//16、回到顶部缓速
//a为置顶按钮
//num为速度
function toTopH(a, num) {
    a.onclick = function () {

        var timer = setInterval(function () {
            var top = window.scrollY;
            if (top <= 0) {
                clearInterval(timer);
            }
            window.scrollTo(0, top - num);
        }, 30);
    }
}
//需求：给秒数==>xx年月日 时分秒
function setTime(secs) {
    let time = new Date(secs * 1000);
    var date = time.toLocaleDateString();
    var hours = time.toLocaleTimeString();
    return '' + date + hours;
}

function toDo(n) { //补零函数
    if (n < 10) {
        n = '0' + n;
    }
    return n;
}
//需求：给秒数==>xx年月日 时分秒
function setTime2(secs) {
    let time = new Date(secs * 1000);
    var year = time.getFullYear(); //年
    var month = time.getMonth() + 1; //月
    var date = time.getDate(); //日
    var hours = time.getHours(); //时
    var mins = time.getMinutes(); //分
    var secs = time.getSeconds();
    var times = year + '/' + toDo(month) + '/' + toDo(date) + ' ' + toDo(hours) + ':' + toDo(mins) + ':' + toDo(secs);
    return times;
}

function scrollBy(a, b, type, fn) {

    if (type == 'x') {
        var num = a.offsetWidth - b.offsetWidth;
        b.onmousedown = function (ev) {
            var ih = ev.offsetX;
            console.log(ih);
            document.onmousemove = function (ev) {
                var newTop = ev.pageX - ih - a.offsetLeft;
                if (newTop <= 0) {
                    newTop = 0;
                } else if (newTop >= num) {
                    newTop = num;
                }
                b.style.top = newTop + 'px';
                var op = b.offsetLeft / num;
                fn(op);
            }
            document.onmouseup = function () {
                document.onmousemove = null;
            }
        }
    } else if (type == 'y') {
        var num = a.offsetHeight - b.offsetHeight;
        b.onmousedown = function (ev) {
            var ih = ev.offsetY;
            console.log(ih);
            document.onmousemove = function (ev) {
                var newTop = ev.pageY - ih - a.offsetTop;
                if (newTop <= 0) {
                    newTop = 0;
                } else if (newTop >= num) {
                    newTop = num;
                }
                b.style.top = newTop + 'px';
                var op = b.offsetTop / (num);
                fn(op);
            }
            document.onmouseup = function () {
                document.onmousemove = null;
            }

        }
    }
}


//自定义滚动条
function scrollPosi(ele, type, fnup, fndown) {
    if (type == 'bind') {
        //绑定滚动事件
        //ele:作用的节点  fnup：向上滚执行的回调  fndown：向下滚执行的回调
        ele.onmousewheel = fn; //针对ie和谷歌
        if (ele.addEventListener) { //火狐
            ele.addEventListener('DOMMouseScroll', fn, false);
        }

        function fn(ev) {
            var ev = ev || window.event;
            var b = true; //判断向上或向下 ： true:向上滚，false:向下滚

            if (ev.wheelDelta) { //ie 谷歌
                b = ev.wheelDelta > 0 ? true : false; //大于0就是向上滚
            } else { //火狐
                b = ev.detail < 0 ? true : false; //小于0是向上滚
            }

            if (b) { //向上滚了：
                // this.style.height = this.offsetHeight - 10 + 'px';
                fnup();
            } else { //向下滚了：
                // this.style.height = this.offsetHeight + 10 + 'px';
                fndown();
            }

            if (ev.preventDefault) {
                ev.preventDefault();
            }
            return false;
        }

        if (document.attachEvent) {
            document.attachEvent('oncontextmenu', function () {
                return false;
            });
        } else {
            document.addEventListener('contextmenu', function (ev) {
                ev.preventDefault();
                //return false;
            });
        }
    }
    if (type == 'unbind') {
        //解除绑定
        ele.onmousewheel = null;
        if (ele.addEventListener) { //火狐
            ele.removeEventListener('DOMMouseScroll', fn, false);
        }
    }
}

//表单验证
var formVerify = {
    /*
    电子邮件
        jinrong.xie@qq.com
        123@qq.com
        x_x@163.com
        x-x@a-r.com.cn
        x.x@laoxie.com
        邮箱用户名必须3-30个字符
    */
    email: function (str) {
        var reg = /^[\w#$!\-]+@[\w#$!\-]+\.[a-zA-Z]+$/;
        return reg.test(str);
    },
    /*
    手机号码
        11位
        158 8888 8888
        1 [34578]
    */
    tel: function (str) {
        var reg = /^1[3-9]\d{9}$/;
        return reg.test(str);
    },
    /*
    验证账号
        * 不能为空，
        * 不能使用特殊字符（数字、字母、下划线、横杠）开头，
        * 必须以字母开头，
        * 长度6-20
    */
    username: function (str) {
        var reg = /^[a-z][\w\-]{5,19}$/;
        return reg.test(str);
    },
    //昵称只能输入中文 
    nickname: function (str) {
        var reg = /^[\u2E80-\u9FFF]+$/;
        return reg.test(str);
    },
    /*
    身份证
        18/15
        445655 19900707 2165
        445655 19900707 211x
    */
    idNum: function (str) {
        var reg = /^(\d{17}|\d{14})[\dx]$/;
        return reg.test(str);
    },
    /*
    生日 
        1999/05/08
        1999-5-8
        19990508
        1999-05/08	不合法
        199905

        引用分组
            * 正则内：\n
            * 正则外:$n
        分组顺序：以左括号出现的顺序为分组顺序
    */
    birthday: function (str) {
        var reg = /^\d{4}([\/\-]?)\d{1,2}\1\d{1,2}$/;
        return reg.test(str);
    },
    /*
    密码  
        长度6-20 
        不能包含空格
    */
    password: function (str) {
        var reg = /^\S{6,20}$/;
        return reg.test(str);
    },
}
/*
	运动框架封装：startMove()过渡    jq animate() 因为后期有animate可以用，所以不做要求
	最终版：多对象，多属性，链式运动框架(运动队列)
	参数一：对象名
	参数二：属性，目标值  键名：属性名，键值：目标值    {'width':200,'heigth':400}  实现：宽度和高度一起改变，宽度变成200，高度变成400
	参数三：回调函数(可选参数)
 */

function startMove(obj, json, fn) {
    clearInterval(obj.timer); //防止定时器的叠加
    obj.timer = setInterval(() => {
        let isok = false;
        for (let key in json) {
            //1.获取初始值
            let cur = 0;
            if (key == 'opacity') {
                //要改变透明度
                cur = css(obj, key) * 100; //获取透明度扩大100倍方便后期计算
            } else {
                //要的是以px为单位
                cur = parseInt(css(obj, key));
            }
            //2.准备缓冲运动的 步长==距离/比例系数==终点-起点/比例系数
            let speed = (json[key] - cur) / 6;
            //防止晃动
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if (cur != json[key]) {
                //只要有一个属性未到达终点，动画就还不算完成，不能开始下个运动
                isok = false;
            } else {
                isok = true;
            }
            //3.开始运动
            let val = cur + speed;
            if (key == 'opacity') {
                css(obj, key, val / 100); //btn.style.opacity=20/100
            } else {
                //以px为单位
                css(obj, key, val + 'px');
            }

            //4.判断属性是否都已经到达临界点，全部到达了就是运动完成了，如果有下一个运动，继续开始
            if (isok) {
                //真：已经完成
                if (fn) { //fn可选参数
                    fn();
                }
            }
        }
    }, 30);
}

//封装一个方法：css() jq的方法：2个参数获取样式，3个参数设置样式
function css() {
    if (arguments.length == 2) {
        //获取样式
        var attr = arguments[1];
        if (getComputedStyle(arguments[0], false)) {
            //标准浏览器

            return getComputedStyle(arguments[0], false)[attr];
        } else {
            //ie678
            arguments[0].currentStyle[attr];
        }
    } else if (arguments.length == 3) {
        //设置样式 box.style.border = '1px solid #ccc';
        var attr = arguments[1];
        var val = arguments[2];
        arguments[0].style[attr] = val;
    }
}


function ajax(opt) {
    //默认参数
    let defaultOpt = {
        asyn: true, //默认是异步
        data: '', //默认没有数据传输
        failure: null
    }

    //替补方案
    Object.assign(defaultOpt, opt); //用默认参数

    //创建对象
    let xhr = new XMLHttpRequest();

    //open()设置参数
    if (defaultOpt.type.toLowerCase() == 'get') {
        //get方式发送请求
        if (defaultOpt.data) {
            //判断是否有数据，有就拼接在url后面
            let str = obj_str(defaultOpt.data);
            defaultOpt.url += '?' + str;
        }
        xhr.open('get', defaultOpt.url, defaultOpt.asyn);
        xhr.send(null);
    } else if (defaultOpt.type.toLowerCase() == 'post') {
        //post方式发送请求
        xhr.open('post', defaultOpt.url, defaultOpt.asyn);
        let str = '';
        if (defaultOpt.data) {
            str = obj_str(defaultOpt.data);
        }
        xhr.setRequestHeader('content-type', "application/x-www-form-urlencoded"); //设置请求头
        xhr.send(str);
    }

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) { //完成
            if (xhr.status == 200 || xhr.status == 304) {
                //成功了
                defaultOpt.success(xhr.responseText); //把数据返回
            } else {
                if (defaultOpt.failure) {
                    defaultOpt.failure(xhr.status); //失败的回调：接收http状态码
                }
            }
        }
    }
}
//设置/修改
function setCookie(key, val, iday) {
    //key 键名，val 键值， iday 多少天后失效
    let time = new Date();
    let today = time.getDate(); //日
    time.setDate(today + iday);
    document.cookie = key + '=' + val + ';expires=' + time + ';path=/';
}

//获取
function getCookie(key) {
    let str = document.cookie;
    console.log(str); //name=小虎; age=18; adr=广东广州
    let arr = str.split('; ');
    console.log(arr);
    for (let item of arr) {
        let arr2 = item.split('=');
        if (key == arr2[0]) {
            return arr2[1];
        }
    }
}

//删除cookie
function removeCookie(key) {
    setCookie(key, '', -1);
}