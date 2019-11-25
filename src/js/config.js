require.config({
    //baseUrl 选填的，不写就是默认以requirejs所在文件夹为基础路径
    paths: { //配置短路径：不再基础路径下的文件引入，最好配置短路径
        'jquery': '../lib/jquery-1.10.1.min'
    },
    shim: { //依赖关系的设置
        'index': ['jquery', 'myqure'], //index需要依赖：'jquery', 'myquery', 'tab'三个模块(包==js文件)
        'details': ['jquery', 'myqure'], //index需要依赖：'jquery', 'myquery', 'tab'三个模块(包==js文件)
        'list': ['jquery', 'myqure'], //index需要依赖：'jquery', 'myquery', 'tab'三个模块(包==js文件)
        'reg': ['jquery', 'myqure'], //index需要依赖：'jquery', 'myquery', 'tab'三个模块(包==js文件)
        'login': ['jquery', 'myqure'], //index需要依赖：'jquery', 'myquery', 'tab'三个模块(包==js文件)
        'cart': ['jquery', 'myqure', 'carts'] //tab依赖于jquery
    }
});