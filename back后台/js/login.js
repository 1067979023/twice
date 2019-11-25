(function () {
    let name1 = document.querySelector('#username1');
    let psw1 = document.querySelector('#password1');
    let name2 = document.querySelector('#username2');
    let psw2 = document.querySelector('#re_password');
    let psw3 = document.querySelector('#re_confirmpassword');
    let usname = location.search.slice(1);
    console.log(usname);
    let loginform = document.querySelector('#loginform');
    let recoverform = document.querySelector('#recoverform');
    let isok1;
    let isok2;
    name1.value = usname;
    let exist = getCookie('username');
    if (exist) {
        location.href = 'index.html?';
    }
    document.onclick = ev => {
        if (ev.target.id == 'recover') {
            loginform.style.display = 'none';
            recoverform.style.display = 'block';
        }
        if (ev.target.id == 'to-login') {
            loginform.style.display = 'block';
            recoverform.style.display = 'none';
        }
        if (ev.target.id == 'checkBtn') {
            let val = name1.value.trim();
            let pas = psw1.value.trim();
            if (val && pas) {
                if (exist) {
                    alert('您已登录，请退出后重登')
                } else {

                    ajax({
                        type: 'post',
                        url: "api/login.php",
                        data: {
                            username: val,
                            password: pas
                        },
                        success: str => {
                            if (str == 'yes') {
                                setCookie('username', val, 5);
                                location.href = 'index.html?' + val;

                            } else {
                                alert('登录失败')
                            }
                        }
                    })
                }
            } else {
                alert('请输入登录账号和密码');
            }
        }
        if (ev.target.id == 'changePwd') {
            let val = name2.value.trim();
            let pas2 = psw2.value.trim();
            if (isok1 && isok2) {
                ajax({
                    type: 'post',
                    url: "api/recover.password.php",
                    data: {
                        username: val,
                        password: pas2
                    },
                    success: str => {
                        if (str == 'yes') {
                            alert('密码重置成功')
                            loginform.style.display = 'block';
                            recoverform.style.display = 'none';
                            name1.value = val;
                            psw1.value = pas2;
                            name2.style.border = '';
                            psw2.style.border = '';
                            psw3.style.border = '';
                            psw2.value = '';
                            psw3.value = '';
                            name2.value = '';
                        } else {
                            alert('密码重置失败')
                        }
                    }
                })
            }

        }
    }
    name2.onblur = () => {
        let val = name2.value.trim();
        if (val) {
            ajax({
                type: 'post',
                url: "api/recover.php",
                data: {
                    username: val
                },
                success: str => {
                    if (str == 'yes') {
                        isok1 = true;
                        name2.style.border = '2px solid #58bc58';
                    } else {
                        isok1 = false;
                        name2.style.border = '2px solid red';
                        alert('登录账号不存在')
                    }
                }
            })
        } else {
            alert('请输入登录账号')
        }
    }
    psw3.onblur = () => {
        let pas2 = psw2.value.trim();
        let pas3 = psw3.value.trim();
        if (pas2 === pas3) {
            isok2 = true;
            psw2.style.border = '2px solid #58bc58';
            psw3.style.border = '2px solid #58bc58';
        } else {
            isok2 = false;
            psw2.style.border = '2px solid red';
            psw3.style.border = '2px solid red';
        }
    }

})()