const {
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLEnumType,
    GraphQLNonNull,
    GraphQLInputObjectType
} = require('graphql');

var moment = require('moment');

// const _ = require("underscore");

// const AddressList = require("../../data/address");
const $articleSql = require('./articleSqlMapping');
const util = require("../../util/util");
const Article = new GraphQLObjectType({
    name: "Article",
    description: "一个文章",
    fields: () => ({
        art_id: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        art_title: {
            type: new GraphQLNonNull(GraphQLString)
        },
        art_content: {
            type: GraphQLString
        },
        art_des: {
            type: GraphQLString
        },
        art_category_id:{
            type:GraphQLInt
        },
        art_create_time: {
            type: GraphQLString,
            resolve: function (course) {
                return moment(course.art_create_time).format("YYYY/MM HH:MM");
            }
        },
        category_name: {
            type: GraphQLString
        },
        category_url: {
            type: GraphQLString
        }
    })
});
//添加文章对象
const  ArticleInfo=new GraphQLInputObjectType({
    name:'ArticleInfo',
    description:"添加文章对象",
    fields:()=>({
        art_id:{type:GraphQLInt},
        art_title:{type:new GraphQLNonNull(GraphQLString)},
        art_content:{type:new GraphQLNonNull(GraphQLString)},
        art_des:{type:new GraphQLNonNull(GraphQLString)},
        category_id:{type:new GraphQLNonNull(GraphQLInt)}
    }),
});

//添加文章返回的对象
const ArticleAddInfo = new GraphQLObjectType({
    name: "ArticleAddInfo",
    description: "添加文章返回的对象",
    fields: () => ({
        art_id: {
            type:  GraphQLInt
        },
        relationshipInsertId:{
            type:  GraphQLInt
        }
    })
});

//带有分页数据的文章列表
const ArticlePagination = new GraphQLObjectType({
    name: "ArticlePagination",
    description: "ArticlePagination",
    fields: () => ({
        //          # 总共有多少条数据
        total_items: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        //   # 总共有多少页
        pages: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        //   # 当前页号
        page_no: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        //   # 每页显示多少条数据
        page_items: {
            type: new GraphQLNonNull(GraphQLInt)

        },
        rows:{
            type: new GraphQLList(Article)
        }
    })
});
const Category = new GraphQLObjectType({
    name: "Category",
    description: "栏目列表",
    fields: () => ({
        category_id: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        category_name: {
            type: GraphQLString
        },
        category_des: {
            type: GraphQLString
        },
        category_url: {
            type: GraphQLString
        }
    })
});
//
// const AddressContent = new GraphQLObjectType({
//     name:"AddressContent",
//     description:"地址子信息",
//     fields:()=>({
//         Id:{
//             type:GraphQLInt
//         },
//         Code:{
//             type:GraphQLString
//         },
//         Name:{
//             type:GraphQLString
//         },
//         FirstStr:{
//             type:GraphQLString
//         },
//     })
// });
//
// const Address = new GraphQLObjectType({
//     name:"Address",
//     description:"地址信息",
//     fields:()=>({
//         ShortKey:{
//             type:GraphQLString
//         },
//         Content:{
//             type:new GraphQLList(AddressContent),
//             args:{
//                 limit:{type:GraphQLInt}
//             },
//             resolve:(source,{limit})=>{
//                 // console.log(source);
//                 if(limit){
//                     return _.first(source.Content,limit);
//                 }
//                 else{
//                     return source.Content;
//                 }
//             }
//         },
//     })
// });

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    description: "增删改数据",
    fields: () => ({
        createAddress: {
            type: AddressContent,
            args: {
                Id: {
                    type: new GraphQLNonNull(GraphQLInt)
                },
                Code: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                Name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                FirstStr: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (source, args) => {
                let address = Object.assign({}, args);//获取数据

                //改为大写
                address.FirstStr = address.FirstStr.toUpperCase();

                let queryData = _.find(AddressList, item => item.ShortKey === address.FirstStr);//查找的数据

                //检测是否存在FirstStr开头的
                if (queryData) {
                    // 有这个数据
                    //存储数据
                    queryData.Content.push(address);
                    // console.log(address)
                    return address;//返回新存储的数据
                }
                else {
                    return null;
                }
            }
        }
    })
});
module.exports = {
    query: {
        article: {
            type: new GraphQLList(Article),
            args: {
                art_id: {type: GraphQLInt}
            },
            resolve: async(source, args) => {
                console.log(args)
                return await util.searchSql($articleSql.articleById,[args.art_id]);
            }
        },
        articles: {
            type: ArticlePagination,
            args: {
                //page_no: Int!, page_items: Int!
                page_no: {type: new GraphQLNonNull(GraphQLInt)},
                page_items:{type: new GraphQLNonNull(GraphQLInt)},
                category_id:{type:GraphQLInt}
            },
            resolve: async (source,args) => {
                console.log(args)
                let limitLeft = (args.page_no-1)*args.page_items;
                console.log("========")
                console.log("limitleft"+limitLeft)
                // let limitRight =args.page_no*args.page_items;
                //          # 总共有多少条数据
                // total_items: {
                //     type: new GraphQLNonNull(GraphQLInt)
                // },
                // //   # 总共有多少页
                // pages: {
                //     type: new GraphQLNonNull(GraphQLString)
                // },
                // //   # 当前页号
                // page_no: {
                //     type: new GraphQLNonNull(GraphQLString)
                // },
                // //   # 每页显示多少条数据
                // page_items: {
                //     type: new GraphQLNonNull(GraphQLString)
                //
                // },
                // rows:{
                //     type: new GraphQLList(Article)
                // }
                let result ={
                    page_no:args.page_no,
                    page_items:args.page_items
                };
                //总共多少页
                result.pages = parseInt(result.total_items/args.page_items);
                //如果传递了category_id,则sql语句涉及栏目id
                if(args.category_id){
                    result.total_items =(await util.searchSql($articleSql.articlesByCategoryIdLength,args.category_id))[0].total;
                    result.rows = await util.searchSql($articleSql.articlesByCategoryId,[args.category_id,limitLeft,args.page_items]);
                }else{
                    result.total_items =(await util.searchSql($articleSql.articleLength))[0].total;
                    result.rows = await util.searchSql($articleSql.articles,[limitLeft,args.page_items]);
                }
                console.log(result);

                return result;
            }
        },
        categories: {
            type: new GraphQLList(Category),
            resolve: async (source) => {
                return await util.searchSql($articleSql.categories);
            }
        }
    },
    mutation:{
        // addUser:{
        //     type:User,
        //     description:'添加用户',
        //     args: {
        //         id:{type: GraphQLInt},
        //         name:{type: new GraphQLNonNull(GraphQLString)},
        //         sex:{type: new GraphQLNonNull(GraphQLString)},
        //         intro:{type: new GraphQLNonNull(GraphQLString)},
        //         skills:{type:new GraphQLList(new GraphQLNonNull(GraphQLString))}
        //     },
        //     resolve:async function (source,{id,name,sex,intro}) {
        //         var user={
        //             name:name,
        //             sex:sex,
        //             intro:intro
        //         };
        //         return await util.searchSql( $sql.addUser,[user.name,user.sex,user.intro]);
        //     }
        // },
        articleAdd:{
            type:ArticleAddInfo,
            description:'新增文章',
            args: {
                articleInfo:{type: ArticleInfo},
            },
            resolve:async function (source,{articleInfo}) {
                //如果存在id,曾更新
                if(articleInfo.art_id){

                }else{
                    //否则新增
                    let insertId = (await util.searchSql($articleSql.articleInsert,
                        [articleInfo.art_title,articleInfo.art_content,articleInfo.art_des,articleInfo.category_id])).insertId;
                    // let relationshipInsertId = (await util.searchSql( $articleSql.relationshipInsert,
                    //     [insertId,articleInfo.category_id])).insertId;
                    return {
                        art_id:insertId,
                        // relationshipInsertId:relationshipInsertId
                    }
                }
            }
        }
    }
};