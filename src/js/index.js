class Index {
    init() {
        $('.header').load('html/header.html');
        $('.information').load('../html/search.html');
        $('.shouhou').load('../html/after.html');
        $('.footer').load('../html/footer.html');
        let cookie = new Cookie({
            key: 'username'
        });
        let username = cookie.getCookie();
        if (username) {
            $('.login_top h3').html(`Hi,${username}`);
            $('.login_top p').html('');
        }
        this.creat();
        this.skip();
        this.result();
        this.lunbo();
    };
    creat() {
        $.ajax({
            type: "get",
            url: "api/index.php",
            success: str => {
                // console.log(str);
                let arr = JSON.parse(str);
                // console.log(arr);
                let str1 = arr.map(item => {
                    return `<div class="shop">
                    <img src="${item.bigurl}" alt="${item.title}">
                    <p class="title">${item.title}</p>
                    <p class="price">${item.price}</p>
                    <p class="buy">立即购买</p>
                </div>`;
                }).join('');
                // console.log(str1);
                $('#lemall .main_list').html(str1);
            }
        });
    };
    skip() {
        $('.login').on('click', function () {
            location.href = '../html/login.html';
        });
        $('.reg').on('click', function () {
            location.href = '../html/reg.html';
        });
    }
    result() {
        $('strong').on('click', function () {
            location.href = '../html/list.html';
        })
        $('.main_list').on('click', function () {
            location.href = '../html/list.html';
        })
    }
    lunbo() {
        // console.log($('.banner').css('width'));
        let iw = $('.banner').css('width');
        $('.carousel p').css('width', iw);
        let lunbo = new Lunbo({
            speed: 2
        });
        lunbo.init();
        // $('.carousel').carousel({
        //     speed: 2
        // })
    }
}

// $.fn.carousel = function (opt) {
class Lunbo {
    constructor(opt) {
        this.defaultOpt = opt
        //     {
        //     iw: 800, //宽
        //     ih: 350, //高
        //     speed: 3, //切换间隔时间 3秒
        //     btnHide: false, //左右按钮是显示的true，隐藏：false    
        // }
        // Object.assign(this.defaultOpt, opt);
    }
    init() {
        this.now = 0;
        // this.box = document.querySelector(this.defaultOpt.node);
        // this.ul = this.box.querySelector('ul');
        // this.page = this.box.querySelector('.page');
        // this.nextbtn = this.box.querySelector('.btn-next');
        // this.prevbtn = this.box.querySelector('.btn-prev');
        // this.creat(); //数据渲染
        this.move(); //自动轮播
        this.stop(); //鼠标移入停止
        this.skip(); //点击跳转
        let that = this;
        $('#next').click(function () {
            that.next();
        });
        $('#prev').click(function () {
            that.prev();
        });
    }
    // creat() { //数据渲染
    //     this.str1 = '';
    //     this.str2 = '';
    //     for (let i = 0; i < this.defaultOpt.imglist.length; i++) {
    //         this.str1 += `<li data-id="${i}"><img src="${this.defaultOpt.imglist[i]}"></li>`;
    //         this.str2 += `<span class="">${i + 1}</span>`;
    //     }
    //     this.ul.innerHTML = this.str1 + `<li data-id="0"><img src="${this.defaultOpt.imglist[0]}"></li>`;
    //     this.page.innerHTML = this.str2;
    //     this.box.style.width = this.defaultOpt.iw + 'px';
    //     this.box.style.height = this.defaultOpt.ih + 'px';
    //     for (let i = 0; i < this.ul.children.length; i++) {
    //         this.ul.children[i].style.width = this.defaultOpt.iw + 'px';
    //         this.ul.children[i].style.height = this.defaultOpt.ih + 'px';
    //     }
    //     this.ul.style.width = this.defaultOpt.iw * this.ul.children.length + 'px';
    //     this.page.children[0].className = 'active';
    // }
    move() { //轮播
        this.timer = setInterval(() => {
            this.next();
        }, this.defaultOpt.speed * 1000);
    }
    tab() { //动画效果
        let iw = $('.banner').css('width').slice(0, -2);
        if (this.now < 0) {
            this.now = $('.carousel p').length - 2;
            $('.carousel').css('left', -(this.now + 1) * iw + 'px');
        }
        // console.log(this.now, iw);
        // console.log(this.now * iw);
        if (this.now > $('.carousel p').length - 1) {
            this.now = 1;
            $('.carousel').css('left', 0);
        }

        $('.carousel').animate({
            left: -this.now * iw + 'px'
        })
        this.follow();
    }
    next() { //下一张图片
        this.now++;
        this.tab();
    }
    prev() { //上一张图片
        this.now--;
        this.tab();
    }
    follow() { //焦点跟随
        let index = $('.carousel p').eq(this.now).data('id');
        $('.follow span').eq(index - 1).addClass('active').siblings().removeClass('active');
    }
    stop() { //移入停止
        let that = this;
        $('.banner').mouseover(function () {
            clearInterval(that.timer);
        })
        $('.banner').mouseout(function () {
            clearInterval(that.timer);
            that.move();
        })

    }
    skip() { //点击跳转
        // console.log(666);
        let that = this;
        $('.follow span').click(function () {
            console.log(666);
            that.now = $(this).data('index');
            that.tab();
        })
        $('.nav li').on('click', function () {
            location.href = '../html/list.html';
        });
        $('.carousel').on('click', function () {
            location.href = '../html/list.html';
        })
    }
}
let index = new Index();
index.init();
class Menu {
    init() {
        $('nav').mouseover(function () {
            $(this).find('.menu2').css('display', 'block');

        })
        $('nav').mouseout(function () {
            $(this).find('.menu2').css('display', 'none');
            $('nav .menu2').mouseout(function () {
                $('.nav li').css('background', 'rgba(6, 30, 41, .1)').find('span').css('font-size', '12px');
            })
        })
        $('.carousel').mouseover(function () {
            $('.nav li').css('background', 'rgba(6, 30, 41, .1)').find('span').css('font-size', '12px');
        })
        $('.nav li').on('mouseover', function () {
            $(this).css('background', '#2884c7').find('span').css('font-size', '22px');
            $(this).siblings().css('background', 'rgba(6, 30, 41, .1)').find('span').css('font-size', '12px');
            $('.menu2 img').eq(0).attr('src', `img/index/${$(this).data('id')}.jpg`)
                .next().attr('src', `img/index/a${$(this).data('id')}.jpg`)
                .next().attr('src', `img/index/z${$(this).data('id')}.jpg`);
        })
    }
};
let menu = new Menu();
menu.init();