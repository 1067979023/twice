class Cart {
    init() {
        $('.header').load('../html/header.html');
        $('.shouhou').load('../html/after.html');
        $('.footer').load('../html/footer.html');
        this.find();
    }
    find() {
        let cookie = new Cookie({
            key: 'username'
        })
        let name = cookie.getCookie();
        let url = '../api/select1.php'
        let str = `SELECT * FROM commodity where name='${name}'`;
        this.getdata(url, str, data => {
            let arr = JSON.parse(data);
            // console.log(arr)
            this.creat(arr, name);
        })
    }
    creat(arr, name) {
        let that = this;
        let arr1 = [];
        arr.forEach(function (item) {
            if (arr1.indexOf(item.store) == -1) {
                arr1.push(item.store);
            }
        })
        // console.log(arr1)
        arr1.forEach(function (item, index) {
            let astr = 'abcdefghijklmn'
            let url = '../api/select1.php'
            let str = `SELECT * FROM commodity where name='${name}' and store='${item}'`;
            that.str1 = '';
            let index1 = index;
            that.getdata(url, str, data => {
                let arr = JSON.parse(data);
                // console.log(arr)
                that.str2 = '';
                arr.forEach(function (item, index) {
                    that.str2 += `<ul class="order_lists">
                    <li class="list_chk">
                        <input type="checkbox" id="checkbox_${index1+''+index}" class="son_check">
                        <label for="checkbox_${index1+''+index}"></label>
                    </li>
                    <li class="list_con">
                        <div class="list_img"><a href="javascript:;"><img src="${item.url}" alt=""></a></div>
                        <div class="list_text"><a href="javascript:;">${item.title}</a></div>
                    </li>
                    <li class="list_info">
                        <p>规格：默认</p>
                        <p>尺寸：16*16*3(cm)</p>
                    </li>
                    <li class="list_price">
                        <p class="price">￥${item.price}</p>
                    </li>
                    <li class="list_amount">
                        <div class="amount_box">
                            <a href="javascript:;" class="reduce reSty">-</a>
                            <input type="text" data-id="${item.id}" value="${item.num}" class="sum">
                            <a href="javascript:;" class="plus">+</a>
                        </div>
                    </li>
                    <li class="list_sum">
                        <p class="sum_price">￥${item.num*item.price}</p>
                    </li>
                    <li class="list_op">
                        <p class="del"><a href="javascript:;" class="delBtn" data-id="${item.id}">删除</a></p>
                    </li>
                </ul>`;
                })
                that.str1 += `<div class="cartBox">
                <div class="shop_info">
                    <div class="all_check">
                        <!--店铺全选-->
                        <input type="checkbox" id="shop_${astr[index]}" class="shopChoice">
                        <label for="shop_${astr[index]}" class="shop"></label>
                    </div>
                    <div class="shop_name">
                        店铺：<a href="javascript:;">${item}</a>
                    </div>
                </div>
                <div class="order_content">${that.str2}
                </div>
                </div>`;
                // console.log(that.str1)
                that.creat2(that.str1)
            })
        })


    }
    creat2(arr) {
        let str = `<div class="cartMain_hd">
            <ul class="order_lists cartTop">
                <li class="list_chk">
                    <!--所有商品全选-->
                    <input type="checkbox" id="all" class="whole_check">
                    <label for="all"></label>
                    全选
                </li>
                <li class="list_con">商品信息</li>
                <li class="list_info">商品参数</li>
                <li class="list_price">单价</li>
                <li class="list_amount">数量</li>
                <li class="list_sum">金额</li>
                <li class="list_op">操作</li>
            </ul>
            </div>
            ${arr}
            <div class="bar-wrapper">
            <div class="bar-right">
                <div class="piece">已选商品<strong class="piece_num">0</strong>件</div>
                <div class="totalMoney">共计: <strong class="total_text">0.00</strong></div>
                <div class="calBtn"><a href="javascript:;">结算</a></div>
            </div>
        </div>`;
        $('.cartMain').html(str);
        aa();
    }

    getdata(url, str, fn) {
        //url:接口路径  str：sql语句  fn：成功获取数据后执行的回调,在这里做DOM操作
        // console.log('发送请求了');
        let p = new Promise(resolve => {
            $.ajax({
                type: 'get',
                url: url,
                data: {
                    sql: str
                },
                success: str => {
                    // console.log(str);
                    resolve(str); //把DOM操作放到外面进行
                    // fn(str);
                }
            });
        });

        p.then(data => {
            if (fn) { //选填
                fn(data);
            }
        });
    }
};
let cart = new Cart();
cart.init();