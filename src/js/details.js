class Detauils {
    init() {
        $('.header').load('../html/header.html');
        $('.information').load('../html/search.html');
        $('.shouhou').load('../html/after.html');
        $('.footer').load('../html/footer.html');
        this.ajax();
        this.cell();
        this.control();
    }
    ajax() {
        let mid = location.search.slice(1);
        if (mid) {
            $.ajax({
                type: "get",
                url: "../api/detail.php",
                data: {
                    mid: mid
                },
                success: str => {
                    let arr = JSON.parse(str);
                    // console.log(arr);
                    let arr1 = arr.map(item => {
                        return item.smallurl;
                    });
                    this.creat(arr1);
                    this.text(arr);
                }
            });
        }

    }
    creat(arr) {
        // console.log(arr);
        let magnifying = new Magnifying({
            node: '.magnifying',
            bigImg: arr,
            middleImg: arr,
            smallImg: arr
        });
        magnifying.init();

    }
    text(arr) {
        $('.core_text').html(`<p class="title">
        <span>${arr[0].store}</span>
        <span z—title>${arr[0].name}</span>
        </p>
        <p class="promotion">
            加价一元得32吋超级电视，双十一限量出售</p>
        <p class="price">
            <span class="label">价格</span>
            <span class="z_price">${arr[0].price}</span>
        </p>
        <p class="location">
            <span class="label">配送地区</span>
            <span class="z_location">
                北京 北京市 朝阳区</span>
        </p>
        <p class="repertory">
            <span class="label">${arr[0].repertory}</span>
            <span class="z_repertory">${arr[0].time}</span>
        </p>
        <div class="type">
            <span class="label">型号</span>
            <p class="z_type">
                <span>${arr[0].type}</span>
            </p>
        </div>
        <div class="size">
            <span class="label">尺寸</span>
            <p class="z_size">
                <span>${arr[0].size}</span>
            </p>
        </div>
        <div class="parts">
            <span class="label">配件</span>
            <p class="z_parts">
                <span>标配挂架</span>
            </p>
        </div>
        <p class="total">
            <span class="label">总计：</span>
            <span class="z_total">${arr[0].price}</span>
            <span class="expect" data-id='${arr[0].mid}'>加入购物车</span>
        </p>`)
    }
    cell() {
        $(document).scroll(function () {
            var scroH = $(document).scrollTop(); //滚动高度
            if (scroH < $('.options').offset().top) { //距离顶部大于100px时
                $('.service').css('position', 'static');
            } else {
                $('.service').css('position', 'fixed').css('top', 0);
            }

        });
    }
    control() {
        $('.service li').on('click', function () {
            $(this).addClass('bor').siblings().removeClass('bor');
            $('.options li').eq($(this).data('id')).css('display', 'block').siblings().css('display', 'none');
        });
        let cookie = new Cookie({
            key: 'username'
        });
        $('.core_text').on('click', '.expect', function () {
            let name = cookie.getCookie();
            if (name) {
                let id = $(this).data('id');
                let url = '../api/other.php';
                let url2 = '../api/select1.php';
                let str2 = `select * from list where mid=${id}`;
                let str3 = `select * from commodity where mid=${id} and name='${name}'`;
                getdata(url2, str3, data => {
                    let arr = JSON.parse(data);
                    if (arr.length == 0) {

                        getdata(url2, str2, data => {
                            console.log(data);
                            let arr = JSON.parse(data);

                            let str = `INSERT INTO commodity (num,price,mid,total,store,title,kuc,url,name) VALUES('1','${arr[0].nprice}','${arr[0].mid}','${arr[0].nprice}','${arr[0].store}','${arr[0].title}','10','${arr[0].bigurl}','${name}')`;
                            getdata(url, str);
                        })

                    } else {
                        console.log(arr[0]);
                        let str = `UPDATE commodity SET num ='${arr[0].num * 1 + 1}',total=${(arr[0].num * 1 + 1) * arr[0].price} where mid='${id}' and name='${name}'`;
                        getdata(url, str);
                    }
                });
                alert('成功加入购物')
            } else {
                let r = confirm('您还未登陆，请先登陆');
                if (r) {
                    location.href = '../html/login.html';
                }

            }
        })
    }
}
let details = new Detauils();
details.init();

class Magnifying {
    constructor(opt) {
        this.defaultOpt = {}
        $.extend(this.defaultOpt, opt);
    }
    init() {
        this.creat();
        this.mark();
        this.cut();
        this.fangda();
    }

    creat() {
        // console.log(this.defaultOpt.bigImg)
        //1.渲染数据
        // let arr = ["images/banner1.jpg", "images/banner2.jpg", "images/banner3.jpg", "images/banner4.jpg", "images/banner5.jpg", "images/banner1.jpg", "images/banner2.jpg", "images/banner1.jpg", "images/banner2.jpg"];
        let str1 = `<img src="${this.defaultOpt.bigImg[0]}" alt="">`;
        // biger.innerHTML = str;//右边的大图里面的图片：一开始是隐藏

        let str2 = `<img src="${this.defaultOpt.middleImg[0]}" alt=""><div class="mask"></div>`;
        // main.innerHTML = str2;
        let str3 = this.defaultOpt.smallImg.map(function (item, index) {
            return `<li><img src="${item}" data-id="${index}" alt=""></li>`;
        }).join('');
        // smaller.innerHTML = str3;
        // smaller.children[0].className = 'active';
        // console.log(box);
        $('.magnifying').html(`<div class="biger">
                <!-- 右边大图:放大的图 -->
                ${str1}
                    </div>
                    <div class="imgs">
                        <!-- 左边原图 -->
                        <div class="main">
                            ${str2}
                        </div>
                        <div class="bottom">
                            <p class="prev">&lt;</p>
                            <div class="box">
                                <ul class="smaller">
                                    <!-- 小图 -->
                                    ${str3}
                                </ul>
                            </div>
                            <p class="next">&gt;</p>
                        </div>
                    </div>`);
    }
    mark() {
        //2.鼠标移入main；mark和bigpic显示；
        // let mask = box.querySelector('.mask');

        $('.main').mouseover(function () {
            $('.biger').css('display', 'block');
            $('.mask').css('display', 'block');
        })

        //3.鼠标移出main；mark和bigpic就隐藏；
        $('.main').mouseout(function () {
            $('.biger').css('display', 'none');
            $('.mask').css('display', 'none');
        })
    }
    cut() {
        let that = this;
        $('.smaller li').eq(0).addClass('current');
        $('.smaller img').on('click', function () {
            $(this).parent().addClass('current').siblings().removeClass('current');
            $('.main img').attr('src', that.defaultOpt.middleImg[$(this).data('id')]);
            $('.biger img').attr('src', that.defaultOpt.bigImg[$(this).data('id')]);
        })
        $('.magnifying .next').click(function () {
            let newLeft = $('.smaller').css('left').slice(0, -2) - 70;
            $('.prev').css('color', '#777');
            if (newLeft <= $('.smaller').css('width').slice(0, -2) - $('.magnifying .box').css('width').slice(0, -2)) {
                newLeft = $('.magnifying .box').css('width').slice(0, -2) - $('.smaller').css('width').slice(0, -2);
                $(this).css('cursor', 'no-drop').css('background', '#eee');
                $('.prev').css('cursor', 'pointer').css('background', '#aaa');
            }
            console.log(newLeft)
            $('.smaller').css('left', newLeft + 'px');
        })
        $('.magnifying .prev').click(function () {
            let newLeft = $('.smaller').css('left').slice(0, -2) * 1 + 70;
            $('.prev').css('color', '#777');
            if (newLeft >= 0) {
                newLeft = 0;
                $(this).css('cursor', 'no-drop').css('background', '#eee');
                $('.next').css('cursor', 'pointer').css('background', '#aaa');
            }
            console.log($('.smaller').css('left'))
            $('.smaller').css('left', newLeft + 'px');
        })
    }
    fangda() {
        $('.main').on('mousemove', function (ev) {

            let newLeft = ev.pageX - $('.magnifying').offset().left - ($('.mask').css('width').slice(0, -2) / 2);
            let newTop = ev.pageY - $('.magnifying').offset().top - ($('.mask').css('height').slice(0, -2) / 2);
            if (newLeft <= 0) {
                newLeft = 0;
            }
            if (newLeft >= $('.magnifying').css('width').slice(0, -2) - $('.mask').css('width').slice(0, -2)) {
                newLeft = $('.magnifying').css('width').slice(0, -2) - $('.mask').css('width').slice(0, -2);
            }
            if (newTop <= 0) {
                newTop = 0;
            }
            if (newTop >= $('.magnifying').css('width').slice(0, -2) - $('.mask').css('width').slice(0, -2)) {
                newTop = $('.magnifying').css('width').slice(0, -2) - $('.mask').css('width').slice(0, -2);
            }
            $('.mask').css('left', newLeft + 'px');
            $('.mask').css('top', newTop + 'px');
            let op1 = (-$('.mask').offset().left + $('.magnifying').offset().left) / ($('.mask').css('width').slice(0, -2) - $('.magnifying').css('width').slice(0, -2));
            let op2 = (-$('.mask').offset().top + $('.magnifying').offset().top) / ($('.mask').css('height').slice(0, -2) - $('.magnifying').css('height').slice(0, -2));
            $('.biger img').css('left', op1 * ($('.biger').css('width').slice(0, -2) - $('.biger img').css('width').slice(0, -2)) + 'px');
            $('.biger img').css('top', op2 * ($('.biger').css('height').slice(0, -2) - $('.biger img').css('height').slice(0, -2)) + 'px');
        })
    }
}