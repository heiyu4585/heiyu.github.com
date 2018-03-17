<template>
    <div class="components-container">
            <el-table
                    :data="artList"
                    style="width: 100%"
                    border>
                <el-table-column
                        prop="art_title"
                        label="标题"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="art_des"
                        label="描述"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="art_create_time"
                        label="创建时间"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="art_des"
                        label="描述">
                    <template  slot-scope="scope">
                        <a :href="'/admin#/article/edit?id=' + scope.row.art_id">编辑</a>
                        <a :href="'/article?id=' + scope.row.art_id">查看</a>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    layout="prev, pager, next"
                    :page-size="page_items"
                    :total="total_items"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
            >
            </el-pagination>
    </div>
</template>

<script>
    import 'common/common.scss';
    import axios from 'axios';
    const util = require("@util/util");
    export default {
        name: 'app',
        data() {
            return {
                artList: [],
                total_items:0,
                currentPage: 1, //当前页
                page_items:10,  //每页显示的数目
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

        },
        mounted: function () {
            console.log(111111)
            this.getArticle({currentPage:this.currentPage,page_items:this.page_items,category_id:this.category_id});
        },
    }
</script>

<style scoped>

</style>