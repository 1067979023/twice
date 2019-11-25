<?php
    header("Content-type:text/html;charset=utf-8");
    include 'conn.php';//连接数据库
    //接收前端数据
    $email = isset($_REQUEST['email']) ? $_REQUEST['email'] : 'yang';
    $password = isset($_REQUEST['password']) ? $_REQUEST['password'] : 'yang';
    $username = isset($_REQUEST['username']) ? $_REQUEST['username'] : 'yang';
    $sql="INSERT INTO mydata (name,password,email,manage) VALUES('$username','$password','$email','1')";
    $res = $conn->query($sql);
    // echo $username;
    if($res){
        echo 'yes';
    }else{
        echo 'no';
    };
    $conn->close();//关闭数据库
?>