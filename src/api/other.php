<?php
    //接口整理方案二：准备两个接口：update insert delete
    include 'conn.php';

    $sql = isset($_REQUEST['sql']) ? $_REQUEST['sql'] : '';//sql语句是传过来

    $res = $conn->query($sql);//执行后得到的是布尔值

    echo $res;

    $conn->close();//关闭数据库
?>