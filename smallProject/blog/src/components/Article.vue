<!--单个的文章组件-->
<template>
    <div class="primary-site">
        <article
                class="post type-post status-publish format-standard hentry category-javascript tag-express tag-vue">
            <section class="content">
                <header class="entry-header">
                    <div class="title-heavy"></div>
                    <h2 class="entry-title">
                        <a :href="'article?id='+item.art_id" rel="bookmark"
                           :title=item.art_title>
                            {{item.art_title}}
                        </a>
                    </h2>
                </header>
                <!-- .entry-header -->
                <div class="entry-content">
                    <div class="entry-site">
                        {{item.art_des}}
                        <div class="clear"></div>
                    </div>
                    <div class="clear"></div>
                    <div class="entry-meta">
				<span class="meta-site">
					<span class="date"><i class="icon-date"></i>{{item.art_create_time}}</span>
					<span class="cat"><i class="icon-cat"></i>
                        <a :href="'/category?id=' + item.art_category_id">查看</a>
                    </span>

					<span class="comment"><i class="icon-comment"></i><a
                            href="javascript:;">暂无评论</a></span>
					<i class="icon-zan"></i>喜欢
0					<span class="views"><i
                        class="icon-views"></i>阅读 4 次</span>									</span>
                        <span class="entry-more">
                            <a :href="`post/${item.art_id}`" rel="bookmark" title="共 10881字 阅读全文">阅读全文</a>
                        </span>
                    </div>
                    <!-- .entry-meta -->
                </div>
                <!-- .entry-content -->
            </section>
            <!-- #content -->
        </article>
    </div>
</template>

<script>
    export default {
        // data () {
        //     return {
        //         message: this.message,
        //     }
        // },
        name: "Article",
        props: ['item']
    }
</script>

<style lang="scss">
    .entry-header {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
    }

    .entry-header .title-heavy {
        position: absolute;
        background: #04a4cc;
        top: 0;
        left: -21px;
        width: 5px;
        height: 23px;
    }

    .entry-header h2 {
        font-size: 15px;
        margin: 0 0 5px 0;
    }

    .entry-title {
        width: 90%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .entry-meta, .entry-meta a {
        color: #8b8b8b;
    }

    .entry-more a {
        background: #04a4cc;
        position: absolute;
        bottom: -1px;
        right: 20px;
        color: #fff;
        padding: 2px 8px;
        border: 1px solid #04a4cc;
        _display: none;
    }

    @media screen and (max-width: 1024px) {
        .entry-site {
            height: 110px;
            overflow: hidden;
        }
    }

    .entry-site {
        height: 110px;
        text-justify: inter-ideograph;
        word-wrap: break-word;
        word-break: break-all;
        color: #555;
        line-height: 160%;
    }

    .entry-meta {
        margin: 5px 0 0 0;
    }

</style>