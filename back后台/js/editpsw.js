let psw1 = document.querySelector('#pwd');
let psw2 = document.querySelector('#pwd2');
let btn = document.querySelector('#btn');
let name = getCookie('username');
let isok;
btn.onclick = () => {
    if (name) {
        let pas1 = psw1.value.trim();
        let pas2 = psw2.value.trim();
        if (pas1 === pas2) {
            ajax({
                type: 'post',
                url: "api/editpsw.php",
                data: {
                    username: name,
                    password: pas1
                },
                success: str => {
                    if (str == 'yes') {
                        alert('密码修改成功，请重新登录')
                        removeCookie('username');
                        window.parent.location.href = '09login.html?' + name;
                    } else {
                        alert('密码修改失败')
                    }
                }
            })
        } else {
            alert('请确定密码一致！')
        }
    } else {
        alert('请先登录！')
    }
}