//初始化相关元素高度
function init() {
    $("body").height($(window).height() - 80);
    $("#iframe-main").height($(window).height() - 90);
    $("#sidebar").height($(window).height() - 50);
}

$(function () {
    init();
    $(window).resize(function () {
        init();
    });
});

// This function is called from the pop-up menus to transfer to
// a different page. Ignore if the value returned is a null string:
function goPage(newURL) {
    // if url is empty, skip the menu dividers and reset the menu selection to default
    if (newURL != "") {
        // if url is "-", it is this page -- reset the menu:
        if (newURL == "-") {
            resetMenu();
        }
        // else, send page to designated URL            
        else {
            document.location.href = newURL;
        }
    }
}

// resets the menu selection upon entry to this page:
function resetMenu() {
    document.gomenu.selector.selectedIndex = 2;
}

// uniform使用示例：
// $.uniform.update($(this).attr("checked", true));
let iframe = document.querySelector('#iframeMain');
let out = document.querySelector('#out');
let exit = document.querySelector('.dip');
let text = document.querySelector('.dropdown .text');
out.onclick = () => {
    removeCookie('username');
}
let name = getCookie('username');
if (name) {
    exit.style.display = 'block';
    text.innerHTML = `欢迎您，${name}`;
} else {
    exit.style.display = 'none';
    text.innerHTML = '<a href="">请登录</a>';
    location.href = '09login.html';
}
text.onclick = ev => {
    if (ev.target.tagName == 'A') {
        location.href = '09login.html?';
    }
}