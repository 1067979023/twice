<?php
    header("Content-type:text/html;charset=utf-8");
    include 'conn.php';//连接数据库
    //接收前端数据
    $email = isset($_REQUEST['email']) ? $_REQUEST['email'] : 'yang';
    $sql="SELECT * FROM mydata WHERE email='$email'";
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