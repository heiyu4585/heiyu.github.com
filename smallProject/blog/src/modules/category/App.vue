<template>
    <el-container id="app">
        <el-header>
            <Header></Header>
        </el-header>
        <Nav></Nav>
        <el-container>
            <el-main>
                <Article v-for="(item, index) in artList" :item="item" :key="item.id"></Article>
                <el-pagination
                        layout="prev, pager, next"
                        :page-size="page_items"
                        :total="total_items"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                >
                </el-pagination>
            </el-main>
            <el-aside width="240px">
                <Aside></Aside>
            </el-aside>
        </el-container>
        <el-footer>
            <Foot></Foot>
        </el-footer>
    </el-container>
</template>

<script>
    import 'common/common.scss';
    import Header from 'components/Header';
    import Nav from 'components/Nav';
    import Aside from 'components/Aside';
    import Foot from 'components/Foot';
    import Article from 'components/Article';
    import axios from 'axios';
    const util = require("../../../util/util");

    export default {
        name: 'app',
        data() {
            return {
                message: 'Welcome to Your Vue.js App',
                artList: [],
                total_items:0,
                currentPage: 1, //当前页
                page_items:1,  //每页显示的数目
                category_id:null
            }
        },
        methods: {
            handleSizeChange(val) {
                 this.page_items = val;
            },
            handleCurrentChange(val) {
                this.currentPage =val;
                this.getArticle({currentPage:this.currentPage,page_items:this.page_items,category_id:this.category_id});
            },
            getArticle({currentPage,page_items,category_id}){
                axios({
                    method: 'post',
                    url: '/api',
                    data: {
                        query:
                            `
                        {
                         articles(page_no:${currentPage},page_items:${page_items},category_id:${category_id}){
                          page_items
                          page_no
                          total_items
                          rows{
                         art_id
                        art_title
                        art_content
                        art_des
                        art_create_time
                        category_name
                        category_url
  }
}
}
                    `
                    }
                })
                    .then(function (response) {
                        console.log(response);
                        this.artList = response.data.data.articles.rows;
                        this.total_items = response.data.data.articles.total_items;
                        this.page_no = response.data.data.articles.page_no;
                    }.bind(this));
            }
        },
        components: {
            Header,
            Nav,
            Aside,
            Foot,
            Article
        },
        mounted: function () {
            // GET request for remote image
            this.category_id=util.getUrlKey("id");
            this.getArticle({currentPage:this.currentPage,page_items:this.page_items,category_id:this.category_id});
        },
    }
</script>

<style lang="scss">
    .el-aside, .el-main {
        overflow: inherit;
    }

    #app {
        max-width: 1080px;
        margin: 0 auto;
    }

    .content {
        position: relative;
        background: #fff;
        margin: 0 0 10px 0;
        padding: 10px 20px;
        border: 1px solid #ccc;
    }

    .content:hover {
        position: relative;
        background: #fff;
        color: #000;
        margin: 0 0 10px 0;
        padding: 10px 20px;
        border: 1px solid #04a4cc;
        transition: all 0.5s ease-in 0s;
    }
</style>
