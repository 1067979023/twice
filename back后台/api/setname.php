<?php
    header("Content-type:text/html;charset=utf-8");
    include 'conn.php';//连接数据库
    //接收前端数据
    $username = isset($_REQUEST['username']) ? $_REQUEST['username'] : '';
    $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
    $sql="UPDATE mydata SET name='$username' where id='$id'";
    $res = $conn->query($sql);
    // echo $username;
    if($res){
        echo 'yes';
    }else{
        echo 'no';
    };
    $conn->close();//关闭数据库
?>