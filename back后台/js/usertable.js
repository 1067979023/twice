let box = document.querySelector('#content');
let table = document.querySelector('#table');
let span = document.querySelector('#DataTables_Table_0_paginate span');
let ipage = 1;//第一页数据
let num = 5;//每页显示5条
let order = '';
let total = 0;
//初始化数据渲染
function init() {
    ajax({
        type: 'get',
        url: 'api/usertable.php',
        data: {
            page: ipage,
            num: num,
            order: order
        },
        success: str => {
            // console.log(str);
            let arr = JSON.parse(str);
            //渲染数据到页面
            creat(arr);
        }
    });
}

init();

function creat(arr) {
    let str = arr.data.map(item => {
        return `<tr uid="${item.id}">
        <td><input type="checkbox" /></td>
        <td>${item.id}</td>
        <td contenteditable="true">${item.name}</td>
        <td>${item.password}</td>
        <td class="center">${item.email}</td>
        <td>
            <button type="submit" class="btn btn-success">修改并保存</button>
            <button type="submit" class="btn btn-danger">删除</button>
        </td>
    </tr>`;
    }).join('');
    table.innerHTML = str;//渲染数据

    //页码生成
    total = Math.ceil(arr.total / arr.num);
    let btnstr = '';
    for (let i = 1; i <= total; i++) {
        btnstr += `<a tabindex="0" class="fg-button ui-button ui-state-default">${i}</a>`;
    }
    span.innerHTML = btnstr;
    let n = ipage - 1;
    let aspan = span.querySelectorAll('a');
    let First = document.querySelector('#first');
    let Previous = document.querySelector('#previous');
    let next = document.querySelector('#next');
    let Last = document.querySelector('#last');

    aspan[n].className = 'fg-button ui-button ui-state-default ui-state-disabled';
    for (let i = 0; i < aspan.length; i++) {
        aspan[i].onclick = () => {
            ipage = i + 1;
            init();
        }
    }
    if (ipage == total) {
        next.className = 'next fg-button ui-button ui-state-default ui-state-disabled';
        Last.className = 'last ui-corner-tr ui-corner-br fg-button ui-button ui-state-default ui-state-disabled';
        next.onclick = null;
        Last.onclick = null;
    } else {
        next.className = 'next fg-button ui-button ui-state-default';
        Last.className = 'last ui-corner-tr ui-corner-br fg-button ui-button ui-state-default';
        next.onclick = () => {
            ipage++;
            if (ipage > total) {
                ipage = total;
            }
            init();
        }
        Last.onclick = () => {
            ipage = total;
            init();
        }
    }
    if (ipage == 1) {
        First.className = 'first ui-corner-tl ui-corner-bl fg-button ui-button ui-state-default ui-state-disabled';
        Previous.className = 'previous fg-button ui-button ui-state-default ui-state-disabled';
        First.onclick = null;
        Previous.onclick = null;
    } else {
        First.className = 'first ui-corner-tl ui-corner-bl fg-button ui-button ui-state-default';
        Previous.className = 'previous fg-button ui-button ui-state-default';
        First.onclick = () => {
            ipage = 1;
            init();
        }
        Previous.onclick = () => {
            ipage--;
            if (ipage < 1) {
                ipage = 1;
            }
            init();
        }
    }
    let setname = table.querySelectorAll('.btn-success');
    let del = table.querySelectorAll('.btn-danger');
    for (let i = 0; i < del.length; i++) {
        del[i].onclick = () => {
            let id = (del[i].parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling).innerHTML;
            ajax({
                type: 'get',
                url: "api/delete.php",
                data: {
                    id: id
                },
                success: str => {
                    if (str == 'yes') {
                        init();
                    }
                }
            })
        }
        setname[i].onclick = () => {
            let id = (setname[i].parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling).innerHTML;
            let name = (setname[i].parentNode.previousElementSibling.previousElementSibling.previousElementSibling).innerHTML;
            ajax({
                type: 'get',
                url: "api/setname.php",
                data: {
                    id: id,
                    username: name
                },
                success: str => {
                    if (str == 'yes') {
                        alert('修改成功')
                        init();
                    }
                }
            })
        }
    }
}
// box.onclick = ev => {
//     if (ev.target.className = 'btn-danger') {
        // let id = (ev.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling).innerHTML;
        // ajax({
        //     type: 'get',
        //     url: "api/delete.php",
        //     data: {
        //         id: id
        //     },
        //     success: str => {
        //         if (str == 'yes') {
        //             init();
        //         }
        //     }
        // })
//     }
//     if (ev.target.className = 'btn-success') {
//         let id = (ev.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling).innerHTML;
//         let name = (ev.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling).innerHTML;
//         ajax({
//             type: 'get',
//             url: "api/setname.php",
//             data: {
//                 id: id,
//                 username: name
//             },
//             success: str => {
//                 if (str == 'yes') {
//                     init();
//                 }
//             }
//         })
//     }
// }
    //     }
    // if (ev.target.id = 'DataTables_Table_0_first') {
    //     ipage = 1;
    //     init();
    // }
    // if (ev.target.id = 'DataTables_Table_0_last') {
    //     ipage = total;
    //     init();
    // }
    // if (ev.target.id = 'DataTables_Table_0_next') {
    //     ipage++;
    //     init();
    // }
    //     if (ev.target.id = 'DataTables_Table_0_previous') {
    //         ipage--;
    //         init();

