require(['config'], function () {
    require(['index', 'jquery', 'myqure'], function ($jq, obj) {
        //如果上面的子模块都加载完成，就会触发这里的功能
        // console.log('加载完毕');
    });
});