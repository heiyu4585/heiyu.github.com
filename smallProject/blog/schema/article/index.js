const {
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLEnumType,
    GraphQLNonNull
} = require('graphql');

const _ = require("underscore");

// const AddressList = require("../../data/address");
const $articleSql = require('./articleSqlMapping');
const util = require("../../util/util");
const Article = new GraphQLObjectType({
    name:"Article",
    description:"一个文章",
    fields:()=>({
        id:{
            type:new GraphQLNonNull(GraphQLInt)
        },
        article_title:{
            type:new GraphQLNonNull(GraphQLString)
        },
        category:{
            type:GraphQLString
        },
        content:{
            type:GraphQLString
        },
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
    name:"Mutation",
    description:"增删改数据",
    fields:()=>({
        createAddress:{
            type:AddressContent,
            args:{
                Id:{
                    type:new GraphQLNonNull(GraphQLInt)
                },
                Code:{
                    type:new GraphQLNonNull(GraphQLString)
                },
                Name:{
                    type:new GraphQLNonNull(GraphQLString)
                },
                FirstStr:{
                    type:new GraphQLNonNull(GraphQLString)
                }
            },
            resolve:(source,args)=>{
                let address = Object.assign({},args);//获取数据

                //改为大写
                address.FirstStr = address.FirstStr.toUpperCase();

                let queryData = _.find(AddressList,item=>item.ShortKey===address.FirstStr);//查找的数据

                //检测是否存在FirstStr开头的
                if(queryData){
                    // 有这个数据
                    //存储数据
                    queryData.Content.push(address);
                    // console.log(address)
                    return address;//返回新存储的数据
                }
                else{
                    return null;
                }
            }
        }
    })
})
const Query = new GraphQLObjectType({
    name: 'BlogSchema',
    description: 'Root of the Blog Schema',
    fields: () => ({
        article:{
            type:new GraphQLList(Article),
            args:{
                index:{type:GraphQLInt}
            },
            resolve:(source,args)=>{
                return [PostsList[args.index]]
            }
        },
        articles:{
            type:new GraphQLList(Article),
            resolve: async (source)=>{
                return await util.searchSql($articleSql.queryAll);
            }
        }
    })
});
module.exports = {
    query:{
        user:{
            type:Article,
            description:'根据id查询单个用户',
            args: {
                id: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve:async function (source,{id}) {
                return (await util.searchSql($sql.queryAll))[id];
            }
        },
        users:{
            type:new GraphQLList(User),
            description:'查询全部用户列表',
            resolve:async function () {
                return await util.searchSql($sql.queryAll);
            }
        }
    },
    mutation:{
        addUser:{
            type:User,
            description:'添加用户',
            args: {
                id:{type: GraphQLInt},
                name:{type: new GraphQLNonNull(GraphQLString)},
                sex:{type: new GraphQLNonNull(GraphQLString)},
                intro:{type: new GraphQLNonNull(GraphQLString)},
                skills:{type:new GraphQLList(new GraphQLNonNull(GraphQLString))}
            },
            resolve:async function (source,{id,name,sex,intro}) {
                var user={
                    name:name,
                    sex:sex,
                    intro:intro
                };
                return await util.searchSql( $sql.addUser,[user.name,user.sex,user.intro]);
            }
        },
        addUserByInput:{
            type:User,
            description:'通过Input添加用户',
            args: {
                userInfo:{type: UserInput},
            },
            resolve:async function (source,{userInfo}) {
                return await util.searchSql( $sql.addUser,[userInfo.name,userInfo.sex,userInfo.intro]);
            }
        }
    }
};