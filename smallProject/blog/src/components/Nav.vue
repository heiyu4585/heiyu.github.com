<template>
    <nav id="site-nav" class="main-nav">
        <div class="">
            <ul class="menu">
                <li>
                    <a href="/">博客</a>
                </li>
                <li>
                    <a href="/project">项目</a>
                </li>
            </ul>
        </div>
        <ul><li class="fill"></li></ul>
    </nav>
</template>

<script type="text/ecmascript-6">
    import 'common/common.scss';
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
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    #site-nav {
        background: #04a4cc;
        height: 40px;
        font-size: 14px;
    }
    #site-nav li {
        float: left;
        height: 40px;
        border-right: 1px solid #82c1e5;
        border-left: 1px solid #008eb2;
    }
    #site-nav li a, #site-nav li a:link, #site-nav li a:visited {
        display: block;
        padding: 0 20px 0 20px;
        line-height: 40px;
        color: #fff;
    }
    .fill {
        width: 2px;
        border-right: none !important;
        border-left: 1px solid #82c1e5;
    }
</style>
