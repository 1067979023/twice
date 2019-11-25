class Login {
    constructor(data) { //属性
        this.defaults = {

        }
        this.hint = $('.icon')
    }
    init() {
        let username = location.search.slice(1);
        $('#username').val(username);
        this.login();
    }
    login() {
        let that = this;
        $('#btn').on('click', function () {
            let name = $.trim($('#username').val());
            let psw = $.trim($('#password').val());
            console.log(name, psw)
            if (name && psw) {
                $.ajax({
                    type: 'post',
                    url: '../api/login.php',
                    data: {
                        username: name,
                        password: psw
                    },
                    success: str => {
                        if (str == 'yes') {
                            var cookie = new Cookie({
                                key: 'username',
                                val: name,
                                iday: 7
                            });
                            cookie.setCookie();
                            let url = localStorage.url;
                            if (url) {
                                //从注册页过来
                                location.href = '../index.html';
                            } else {
                                history.back(); //跳回上一页
                            }

                        }
                    }
                })
            } else {
                that.hint.html('手机号和密码不能为空').removeClass('ic1').addClass('ic2').next().css('border-color', 'red');
            }
        })

    }
}
let login = new Login();
login.init();