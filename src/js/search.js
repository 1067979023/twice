class Search {
    init() {
        this.pull();
        this.store();
    }
    pull() {
        $('.search-text input').focus(function () {
            $('.down').css('display', 'block');
            $(this).attr('placeholder', '');
        })
        $('.search-text input').blur(function () {
            let timer = setInterval(function () {
                $('.down').css('display', 'none');
                $(this).attr('placeholder', '乐视TV');
                clearInterval(timer);
            }, 300);
        })
        $('.down p').on('mouseover', function () {
            $(this).css('background', 'rgba(100,100,100,.3)');
            $('.search-text input').val($(this).html());
        });
        $('.down p').on('mouseout', function () {
            $(this).css('background', '#fff');
            $('.search-text input').val($(this).html());
        });
    }
    store() {
        $('.down p').on('click', function () {
            // console.log($(this).html());
            location.href = '../html/list.html?' + $(this).html();
        })
        $('.search_btn').click(function () {
            location.href = '../html/list.html?' + $('.search-text input').val();
        })
        $('.shop-search').on('mouseover', function () {
            $(this).css('color', '#fff').css('background', '#2884c7')
        })
        $('.shop-search').on('mouseout', function () {
            $(this).css('background', '#fff').css('color', '#2884c7')
        })
        $('.shop-search').on('click', function () {
            location.href = '../html/cart.html'
        })
        $('.appdown span').on('click', function () {
            $('.appdown').css('display', 'none');
            $('.shop-search').css('width', '180px').css('margin-left', '86px')
                .html('<span class="icon ic1 f18"></span>购物车');
        })
    }
}
let search = new Search();
search.init();