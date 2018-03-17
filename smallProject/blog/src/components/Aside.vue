<template>
    <!--分类栏目-->
    <div id="sidebar" class="widget-area">
        <aside id="search-2" class="widget widget_search">
            <div id="searchbar">
                <form method="get" id="searchform" action="http://www.siyuweb.com/">
                    <div><input type="text" value="" name="s" id="s" placeholder="输入搜索内容" required="required"> <input
                            type="submit" id="searchsubmit" value="搜索"></div>
                </form>
            </div>
            <div class="clear"></div>
        </aside>
        <aside id="categories-3" class="widget widget_categories clearfix">
            <h3 class="widget-title"><p><i class="icon-st"></i></p>分类目录</h3>
            <ul>

                <li
                        class="cat-item"
                        v-for="nav in NavList"
                        :key="nav.id"
                >
                    <!--https://segmentfault.com/q/1010000009175454/a-1020000009175738-->
                    <a :href="'category?id='+nav.category_id">
                        {{ nav.category_name }}
                    </a>
                </li>
            </ul>
            <div class="clear"></div>
        </aside>
        <!--<aside id="hot_post-2" class="widget widget_hot_post">-->
            <!--<h3 class="widget-title"><p><i class="icon-st"></i></p>热门文章</h3>-->
            <!--<div id="hot_post_widget">-->
                <!--<ul>-->
                    <!--<li><span class="li-icon li-icon-1">1</span><a href="http://www.siyuweb.com/javascript/3227.html">Vue2-->
                        <!--+ webpack + express4构建单...</a></li>-->
                    <!--<li><span class="li-icon li-icon-2">2</span><a href="http://www.siyuweb.com/tool/3230.html">webstrom-->
                        <!--排除 文件夹</a></li>-->
                <!--</ul>-->
            <!--</div>-->
        <!--</aside>-->
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios';
    export default {
        name: 'Nav',
        data () {
            return {
                NavList:{}
            }
        },
        components: {
        },
        mounted: function () {
            var _this= this;
            // GET request for remote image
            axios({
                method:'post',
                url:'/api',
                data: {
                    query:
                        `
                    {
                    categories{
                      category_id
                      category_name
                      category_des
                      category_url
                    }
                    }
                    `
                }
                ,
            })
                .then(function(response) {
                    _this.NavList=response.data.data.categories;
                });
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss">

    #sidebar {
        padding-top: 20px;
        overflow: hidden;
        float: right;
    }
    #sidebar h3 {
        height: 35px;
        line-height: 35px;
        border-bottom: 1px solid #ccc;
    }

    .widget {
        background: #fff;
        margin: 0 0 10px 0;
        border: 1px solid #ccc;
    }


    /*分类栏目*/
    .widget ul, #sidebar #searchform, #calendar_wrap, .tagcloud {
        padding: 5px 10px 10px 10px;
    }

    .widget_categories, .widget_archive, .widget_links {
        padding: 0 0 10px 0;
    }
    .widget-title p {
        float: left;
        width: 34px;
        height: 34px;
        text-align: center;
        margin: 0 8px 0 0;
        padding: 1px 0;
        border-right: 1px solid #ccc;
    }
    .icon-st {
        font-size: 24px;
        color: #888;
        line-height: 35px;
    }
    .icon-st:before {
        content: "\e609";
    }

    .widget ul li {
        width: 99%;
        line-height: 180%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .widget_categories li, .widget_archive li, .widget_links li {
        float: left;
        width: 49.5% !important;
        text-align: center;
        margin: 8px -1px 0 0;
        border: 1px solid #ccc;
    }

    .widget_categories a, .widget_archive a, .widget_links a {
        padding: 0 20px;
    }

    /*搜索框*/
    .widget #searchbar {
        margin: 5px 0;
    }
    #sidebar #searchform, #calendar_wrap, .tagcloud {
        padding: 5px 10px 10px 10px;
    }

    #s, .swap_value {
        width: 65%;
        height: 31px;
        padding: 0 5px;
        border: 1px solid #ccc;
        -webkit-appearance: none;
    }

    #searchform #searchsubmit, #searchsubmit {
        background: #04a4cc;
        width: 60px;
        height: 31px;
        color: #fff;
        margin: 1px 0 0 0;
        border: none;
        vertical-align: top;
        -webkit-appearance: none;
    }

    .li-icon {
        background: #ccc;
        font-size: 12px;
        color: #fff;
        line-height: 180%;
        margin: 0 5px 0 0;
        padding: 0 5px;
        border-radius: 2px;
    }
    /*热门文章*/
    .li-icon-1, .li-icon-2, .li-icon-3 {
        background: #e50000;
    }


    /*foot*/
    .site-info {
        text-align: center;
        padding: 15px 0;
    }

</style>
