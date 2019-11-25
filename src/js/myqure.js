    class FormVerify {
        constructor(data) { //属性
            this.str = data;
        }
        init() {

        }
        /*
        电子邮件
            jinrong.xie@qq.com
            123@qq.com
            x_x@163.com
            x-x@a-r.com.cn
            x.x@laoxie.com
            邮箱用户名必须3-30个字符
        */
        email() {
            var reg = /^[\w#$!\-]+@[\w#$!\-]+\.[a-zA-Z]+$/;
            return reg.test(this.str);
        }
        /*
        手机号码
            11位
            158 8888 8888
            1 [34578]
        */
        tel() {
            var reg = /^1[3-9]\d{9}$/;
            return reg.test(this.str);
        }
        /*
        验证账号
            * 不能为空，
            * 不能使用特殊字符（数字、字母、下划线、横杠）开头，
            * 必须以字母开头，
            * 长度6-20
        */
        username() {
            var reg = /^[a-z][\w\-]{5,19}$/;
            return reg.test(this.str);
        }
        //昵称只能输入中文 
        nickname() {
            var reg = /^[\u2E80-\u9FFF]+$/;
            return reg.test(this.str);
        }
        /*
        身份证
            18/15
            445655 19900707 2165
            445655 19900707 211x
        */
        idNum() {
            var reg = /^(\d{17}|\d{14})[\dx]$/;
            return reg.test(this.str);
        }
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
        birthday() {
            var reg = /^\d{4}([\/\-]?)\d{1,2}\1\d{1,2}$/;
            return reg.test(this.str);
        }
        /*
        密码  
            长度6-20 
            不能包含空格
        */
        password() {
            var reg = /^\S{6,20}$/;
            return reg.test(this.str);
        }

    }

    //设置cookie
    class Cookie {
        constructor(opt) { //属性
            let defaults = {
                key: '',
                val: '',
                iday: ''
            }

            //替补方案
            let setting = $.extend({}, defaults, opt); //用默认参数  defaults
            this.key = setting.key;
            this.val = setting.val;
            this.iday = setting.iday;
        }
        //设置
        setCookie() {
            //key 键名，val 键值， iday 多少天后失效
            let time = new Date();
            let today = time.getDate(); //日
            time.setDate(today + this.iday);
            document.cookie = this.key + '=' + this.val + ';expires=' + time + ';path=/';
        }

        //获取
        getCookie() {
            let str = document.cookie;
            // console.log(str); //name=小虎; age=18; adr=广东广州
            let arr = str.split('; ');
            // console.log(arr);
            for (let item of arr) {
                let arr2 = item.split('=');
                if (this.key == arr2[0]) {
                    return arr2[1];
                }
            }
        }

        //删除cookie
        removeCookie() {
            this.setCookie(this.key, '', -1);
        }

    }

    function getdata(url, str, fn) {
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