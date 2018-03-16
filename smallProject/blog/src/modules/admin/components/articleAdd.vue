<template>
    <div class="components-container">
        <el-form ref="form" label-width="80px">
            <el-form-item label="文章标题">
                <el-input v-model="art_title"></el-input>
            </el-form-item>
            <el-form-item label="文章描述">
                <el-input type="textarea" v-model="art_des"></el-input>
            </el-form-item>
            <el-form-item label="所属栏目">
                <el-select v-model="category_id" placeholder="请选择栏目">
                    <el-option v-for="(item, index) in categories" :key="item.category_id" :label="item.category_name"
                               v-model="item.category_id"></el-option>
                </el-select>
            </el-form-item>
            <div class="editor-container">
                <markdown-editor id="contentEditor" ref="contentEditor" v-model="content" :height="300"
                                 :zIndex="20"></markdown-editor>
            </div>

            <el-button @click="saveContent" style="margin-top:80px;" type="primary" icon="el-icon-document">SAVE
            </el-button>
            <!--<div v-html="html"></div>-->
        </el-form>
    </div>
</template>

<script>
    import MarkdownEditor from 'components/MarkdownEditor';
    import axios from 'axios';
    import util from '@util/util';
    import showdown from 'showdown';
    const converter = new showdown.Converter();

    export default {
        name: 'article_info',
        components: {MarkdownEditor},
        data() {
            return {
                content: '',
                art_title: '',
                html: '',
                art_des: '',
                category_id: '',
                categories: [] //所有栏目
            }
        },
        methods: {
            saveContent() {
                this.html = this.content && converter.makeHtml(this.content);
                axios({
                    method: 'post',
                    url: '/api',
                    data: {
                        query:
                            `
                    mutation articleAdd($art_content:String!,$art_title:String!,$art_des:String!){
                        articleAdd (articleInfo:{
                          art_title:$art_title,
                          art_content:$art_content,
                          art_des:$art_des,
                          category_id:1
                        }) {
                          art_id
                        }
                      }

                   `,
                        variables: {
                            "art_content": this.html,
                            "art_title": this.art_title,
                            "art_des": this.art_des,
                        }
                    }
                })
                    .then(function (response) {
                      console.log(response);
                    }.bind(this));
            },
            getCategories() {
                axios({
                    method: 'post',
                    url: '/api',
                    data: {
                        query:
                            `
                           {
                              categories{
                                category_id
                                category_des
                                category_url
                                category_name
                              }
                            }
                    `
                    }
                })
                    .then(function (response) {
                        this.categories = response.data.data.categories;
                        console.log(this.categories)
                    }.bind(this));
            }
        },
        mounted: function () {
            console.log(this.$route);
            console.log(this.$route.params.id);
            this.getCategories();
        },
    }
</script>

<style scoped>

</style>