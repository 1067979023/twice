class Header {
    constructor(data) { //属性

    }
    init() {
        let cookie = new Cookie({
            key: 'username'
        });
        let username = cookie.getCookie();
        if (username) {
            $('.rank').html(`<a href="###" >${username}</a><a href="###" class="out">退出</a>`);
            $('.out').click(function () {
                let cookie1 = new Cookie({
                    key: 'username'
                });
                cookie1.removeCookie();
                location.reload();
            })
        } else {
            $('.rank .login').click(function () {
                location.href = '../html/login.html';
            })
            $('.rank .reg').click(function () {
                location.href = '../html/reg.html';
            })
            $('.shouye').click(function () {
                location.href = '../index.html';
            })
        }
        this.pull();
        this.toTop();
    }
    pull() {
        $('.self li').on('mouseover', function () {
            $(this).css('color', '#2884c7').css('background', '#fff')
                .find('p').css('display', 'flex')
            $(this).find('span').css('display', 'none');
        });
        $('.self li').on('mouseout', function () {
            $(this).css('color', '#fff').css('background', 'none')
                .find('p').css('display', 'none')
            $(this).find('span').css('display', 'block');
        })
        $('header a').on('mouseover', function () {
            $(this).css('color', '#2884c7')
        });
        $('header a').on('mouseout', function () {
            $(this).css('color', '#fff')
        });
        $('header li a').on('mouseout', function () {
            $(this).css('color', '#333')
        })
    };
    toTop() {
        $(document).scroll(function () {
            var scroH = $(document).scrollTop(); //滚动高度
            if (scroH > 100) { //距离顶部大于100px时
                $('.to_top').css('display', 'block');
            } else {
                $('.to_top').css('display', 'none');
            }
        });
        $('.to_top').click(function () {
            $('html , body').animate({
                scrollTop: 0
            });
        })
    }
}
let header = new Header();
header.init();