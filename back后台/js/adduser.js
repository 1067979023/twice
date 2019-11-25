let name = document.querySelector('#required');
let nameInf = document.querySelector('#req-inf');
let email = document.querySelector('#email');
let emailInf = document.querySelector('#email-inf');
let psw = document.querySelector('#date');
let pswInf = document.querySelector('#date-inf');
let btn = document.querySelector('.btn');
name.onblur = () => {
    let val = name.value.trim();
    if (val) {
        ajax({
            type: 'post',
            url: "api/recover.php",
            data: {
                username: val
            },
            success: str => {
                if (str == 'yes') {
                    nameInf.innerHTML = '该用户名太受欢迎了，请换一个！';
                    nameInf.style.color = 'red';
                    isok1 = false;
                } else {
                    nameInf.innerHTML = '该用户名可用'
                    nameInf.style.color = '#58bc58';
                    isok1 = true;
                }
            }
        });
    } else {
        nameInf.innerHTML = '用户名不能为空';
        nameInf.style.color = 'red';
        isok1 = false;
    }

}
email.onblur = () => {
    let val = email.value.trim();
    if (val) {
        if (formVerify.email(val)) {
            ajax({
                type: 'post',
                url: "api/email.php",
                data: {
                    email: val
                },
                success: str => {
                    if (str == 'yes') {
                        emailInf.innerHTML = '该邮箱已注册，请换一个！';
                        emailInf.style.color = 'red';
                        isok2 = false;
                    } else {
                        emailInf.innerHTML = '该邮箱可用';
                        emailInf.style.color = '#58bc58';
                        isok2 = true;
                    }
                }
            });
        } else {
            emailInf.innerHTML = '请输入正确的邮箱地址';
            emailInf.style.color = 'red';
            isok2 = false;
        }
    } else {
        emailInf.innerHTML = '邮箱不能为空';
        emailInf.style.color = 'red';
        isok2 = false;
    }
}
btn.onclick = () => {
    let val = name.value.trim();
    let emai = email.value.trim();
    let pas = psw.value.trim();
    if (isok1 && isok2) {
        if (val && email && pas) {
            ajax({
                type: 'post',
                url: "api/adduser.php",
                data: {
                    username: val,
                    email: emai,
                    password: pas
                },
                success: str => {
                    if (str == 'yes') {
                        alert('保存成功');
                    } else {
                        alert('保存失败');
                    }
                }
            });
        } else {
            alert('内容不能为空');
        }
    }
}