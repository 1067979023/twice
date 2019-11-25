class Reg {
    constructor(data) { //属性
        this.defaults = {

        }
        this.hint = $('.nameInf');
        this.isok = true;
        $('#getV').data('isok', true);
        $('#btn').data('isok', true);
        $('#phoneV').data('isok', true);

    }
    init() {
        this.seekname();
        this.password();
        this.imageVerify();
        this.agree();
        this.duanxin();

    }
    seekname() {
        let that = this;
        $('#username').on('blur', function () {
            let $val = $.trim($(this).val());
            let $reg = new FormVerify($val);
            if ($val) {
                if ($reg.tel()) {
                    $.ajax({
                        type: 'post',
                        url: "../api/seekname.php",
                        data: {
                            username: $val
                        },
                        success: str => {
                            if (str == 'yes') {
                                that.hint.html('该手机号已经被注册，请换一个！').removeClass('ic1').addClass('ic2').next().css('border-color', 'red');
                                $(this).data('isok', false);
                            } else {
                                that.hint.html('该手机号可用').removeClass('ic2').addClass('ic1').next().css('border-color', '#58bc58');
                                $(this).data('isok', true);
                            }
                        }
                    });
                } else {
                    that.hint.html('请输入正确的手机号码').removeClass('ic1').addClass('ic2').next().css('border-color', 'red');
                    $(this).data('isok', false);
                }
            } else {
                that.hint.html('手机号不能为空').removeClass('ic1').addClass('ic2').next().css('border-color', 'red');
                $(this).data('isok', false);
            }
            that.reg();
        });
    }
    password() {
        let that = this;
        $('#password').on('blur', function () {
            let $val = $.trim($(this).val());
            let $reg = new FormVerify($val);
            if ($val) {
                if ($reg.password()) {
                    that.hint.next().next().css('border-color', '#58bc58');
                    $(this).data('isok', true);
                } else {
                    that.hint.html('密码的长度为6-20，且不能包含空格').removeClass('ic1').addClass('ic2').next().next().css('border-color', 'red');
                    $(this).data('isok', false);
                }
            } else {
                that.hint.html('密码不能为空').removeClass('ic1').addClass('ic2').next().next().css('border-color', 'red');
                $(this).data('isok', false);
            }
            that.reg();
        })
    }
    imageVerify() {
        let that = this;
        $("#getcode_char").click(function () {
            $(this).attr("src", '../lib/ImageVerify/code_char.php?' + Math.random());
        });
        $("#photoV").blur(function () {
            let code_char = $.trim($(this).val());
            if (code_char) {
                // console.log(code_char);
                $.post("../lib/ImageVerify/chk_code.php?act=char", {
                    code: code_char
                }, function (msg) {
                    if (msg == 1) {
                        that.hint.next().next().next().css('border-color', '#58bc58');
                        $("#photoV").data('isok', true);
                    } else {
                        that.hint.html('验证码错误').removeClass('ic1').addClass('ic2').next().next().next().css('border-color', 'red');
                        $("#photoV").data('isok', false);
                    }
                });
            } else {
                that.hint.html('验证码不能为空').removeClass('ic1').addClass('ic2').next().next().next().css('border-color', 'red');
                $(this).data('isok', false);
            }
            that.reg();
        });
    };
    duanxin() {
        let that = this;
        $('#getV').on('click', function () {
            let val = $('#username').val();
            if (val) {
                $.ajax({
                    type: 'post',
                    url: '../api/duanxin.php',
                    data: {
                        userphone: val
                    },
                    success: function (str) {
                        console.log(str);
                        let arr = JSON.parse(str);
                        that.phonev(arr);
                        that.impose();
                    }
                });
            } else {
                that.hint.html('手机号不能为空').removeClass('ic1').addClass('ic2').next().css('border-color', 'red');
            }
        })
    }
    impose() {
        let that = this;
        let tim = 60;
        this.timer = setInterval(function () {
            tim--;
            $('#getV').val(`${tim}秒后可重发`).off('click').css('color', 'red').css('border-color', 'red');
            if (tim <= 0) {
                $('#getV').val('获取手机验证码').css('color', '#419ce3').css('border-color', '#419ce3');
                clearInterval(that.timer);
                that.duanxin();
            }
        }, 1000)
    }
    phonev(arr) {
        let that = this;
        let verifi = arr.phonecode;
        $('#phoneV').blur(function () {
            let num = $(this).val();
            // console.log(num);
            if (num) {
                if (num == verifi) {
                    that.hint.html('手机验证通过').removeClass('ic2').addClass('ic1');
                    $(this).data('isok', true).css('border-color', '#58bc58');
                } else {
                    that.hint.html('验证码错误').removeClass('ic1').addClass('ic2');
                    $(this).data('isok', false).css('border-color', 'red');
                }
            } else {
                that.hint.html('手机验证码不能为空').removeClass('ic1').addClass('ic2');
                $(this).css('border-color', 'red').data('isok', false);
            }
            that.reg();
        })
    }
    agree() {
        let that = this;
        $('#checkbox').on('click', function () {
            if ($('#checkbox').is(':checked')) {
                $('#checkbox').data('isok', true);
                that.reg();
            } else {
                $('#checkbox').data('isok', false);
            }

        })
    }
    reg() {
        let that = this;
        $('.login_text input').each(function (index, $item) { //遍历节点
            // console.log($(this).data('isok'));
            if (!$(this).data('isok')) {
                that.isok = false;
                return false;
            } else {
                that.isok = true;
            }
        });
        console.log(this.isok);
        if (this.isok) {
            let username = $('#username').val();
            let password = $('#password').val();
            console.log($('#btn'));
            $('#btn').on('click', function () {
                $.ajax({
                    type: "post",
                    url: "../api/adduser.php",
                    data: {
                        username: username,
                        password: password
                    },
                    success: str => {
                        if (str == 'yes') {
                            alert('注册成功');
                            location.href = 'login.html?' + username;
                            localStorage.url = 'reg';
                        }
                    }
                })
            })
        }
    }
}

let reg = new Reg();
reg.init();