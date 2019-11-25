<?php
    header("Content-type:text/html;charset=utf-8");
    include 'conn.php';//连接数据库
    //接收前端数据
    $username = isset($_REQUEST['username']) ? $_REQUEST['username'] : '';
    $sql="SELECT * FROM mydata WHERE phone='$username'";
    $res = $conn->query($sql);
    // echo $username;
    if($res->num_rows){
        echo 'yes';
    }else{
        echo 'no';
    };
    $res->close();//关闭结果集
    $conn->close();//关闭数据库
?>