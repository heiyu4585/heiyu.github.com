<template>
    <el-container id="app">
        <el-header>
            <Header></Header>
        </el-header>
        <Nav></Nav>
        <el-container>
            <el-main>
                <article id="post-3227" class="post-3227 post type-post status-publish format-standard hentry category-javascript tag-express tag-vue">
                    <header class="single-header">
                        <h1 class="single-title">{{articleContent.art_title}}</h1>
                        <div class="single-meta">
                            <span class="date"><i class="icon-date"></i>{{articleContent.art_create_time}}</span>
                            <span class="cat"><i class="icon-cat"></i><a :href=`/category?id=${articleContent.id}` rel="category tag">{{articleContent.category_name}}</a></span>
                            <span class="comment"><i class="icon-comment"></i><a href="http://www.siyuweb.com/javascript/3227.html#respond">暂无评论</a></span>
                            <span class="views"><i class="icon-views"></i>阅读 9 次</span>					</div>
                        <!-- .entry-meta -->
                    </header>
                    <!-- .single-header -->

                    <div class="single-main">
                        <div class="content-main" v-html="articleContent.art_content">
                        </div>
                        <div class="clear"></div>
                    </div>
                    <!-- .single-content -->
                </article>
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
    const util = require("@util/util");
    export default {
        name: 'artilce',
        data() {
            return {
                articleContent:{}
            }
        },
        methods: {
            getArticle(){
                axios({
                    method: 'post',
                    url: '/api',
                    data: {
                        query:
                            `
{
  article(id:${this.articleId}){
    art_id
    art_title
    art_content
    art_create_time
    category_url
    category_name
  }
}
                    `
                    }
                })
                    .then(function (response) {
                       this.articleContent =response.data.data.article[0];
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
            this.articleId=util.getUrlKey("id");
            this.getArticle();
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
    /*文章内容*/
       /*标题*/
    .single-header {
        margin: 10px 0 5px 0;
    }
    .single-header h1 {
        font-size: 18px;
    }
    .single-meta, .single-meta a {
        color: #8b8b8b;
    }
      /*正文*/
    .single-content p, .single-content ul, .single-content ol, .single-content dd, .single-content pre, .single-contenthr {
        margin: 0 0 5px 0;
        text-align: justify;
        text-justify: inter-ideograph;
        word-wrap: break-word;
        word-break: break-all;
    }
    .single-content p {
        text-indent: 2em;
        font-size: 16px;
        line-height: 160%;
    }
</style>
