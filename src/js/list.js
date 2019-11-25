class List {
    constructor() {
        this.num = 45;
        this.ipage = 1;
        this.total = 0;
    }
    init() {
        $('.header').load('../html/header.html');
        $('.information').load('../html/search.html');
        $('.shouhou').load('../html/after.html');
        $('.footer').load('../html/footer.html');
        this.search();
        this.skip();
        this.formfeed();
        this.sort();
    }
    creat() {
        $.ajax({
            type: "get",
            url: "../api/list.php",
            data: {
                page: this.ipage,
                num: this.num
            },
            success: str => {
                // console.log(str);
                this.promises(str);
            }
        });
    }
    promises(str) {
        let arr = JSON.parse(str);
        let str1 = arr.data.map(item => {
            return `<div class="shop">
                <img src="${item.bigurl}" alt="${item.title}">
                <p class="title">${item.title}</p>
                <p class="price">${item.price}</p>
                <P class="evaluate">
                    <span>*****</span>
                    <span>${item.appraise}</span>
                </P>
                <p class="buy" data-id='${item.mid}'>立即购买</p>
            </div>`;
        }).join('');
        // console.log(str1);
        $('#list .main_list .content').html(str1);
        this.total = Math.ceil(arr.total / arr.num);
        let btnstr = '';
        for (let i = 1; i <= this.total; i++) {
            btnstr += `<a>${i}</a>`;
        }
        $('#list .data_paging').html(btnstr);
        $('.data_paging').find('a').eq(this.ipage - 1).addClass('active')
            .siblings().removeClass('active');
    }
    search() {
        let sear = decodeURI(location.search.slice(1));
        if (sear) {
            $('.result .content').html(`<span>首页</span>
            <span class="icon ic3"></span>
            <span>搜索全部结果</span><span class="icon ic3"></span>
            <span>${sear}</span>`);
            $('.search input').val(sear);
            $.ajax({
                type: 'post',
                url: '../api/select.php',
                data: {
                    name: sear,
                    page: this.ipage,
                    num: this.num
                },
                success: str => {
                    this.promises(str);
                }
            });
        } else {
            this.creat();
        }
    }
    sort() {
        let that = this;
        this.isok = true;
        $('.sort li').on('click', function () {
            $(this).addClass('col').siblings().removeClass('col');
            $.ajax({
                type: "post",
                url: "../api/sort.php",
                data: {
                    page: that.ipage,
                    sort: that.isok,
                    num: that.num
                },
                success: str => {
                    // console.log(str);
                    that.promises(str);
                }
            });
            that.isok = !that.isok;
            console.log(that.isok);
        });

    }
    skip() {
        $('.main_list').on('click', '.buy', function () {
            location.href = 'details.html?' + $(this).data('id');
        })
    }
    formfeed() {
        let that = this;
        $('.data_paging ').on('click', 'a', function () {
            that.ipage = $(this).html();
            that.creat();
        })
        $('.prev').click(function () {
            that.ipage--;
            if (that.ipage < 1) {
                that.ipage = 1;

            } else if (that.ipage == 1) {
                that.creat();
                $(this).css('cursor', 'no-drop').css('color', '#666');
            } else {
                that.creat();
                $('.next').css('cursor', 'pointer').css('color', '#000');
            }

        });
        $('.next').click(function () {
            that.ipage++;
            if (that.ipage > that.total) {
                that.ipage = that.total;
            } else if (that.ipage == that.total) {
                that.creat();
                $(this).css('cursor', 'no-drop').css('color', '#666');
            } else {
                that.creat();
                $('.prev').css('cursor', 'no-dropointer').css('color', '#000');
            }
        })
    }
};
let list = new List();
list.init();