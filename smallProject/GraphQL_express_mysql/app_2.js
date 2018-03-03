var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//TODO begin
// var mysql = require('mysql');
// var $conf = require('./conf/db');
// var $sql = require('./dao/userSqlMapping');
// var graphqlHTTP = require('express-graphql');
// var { buildSchema } = require('graphql');
// var pool  = mysql.createPool($conf.mysql);
// var util = require('./util/util');
//
// //定义schema
// var schema = buildSchema(`
//     type User{
//         name: String!
//         sex: String
//         intro: String
//     }
//     input UserInput {
//         name: String!
//         sex: String
//         intro: String
//         skills: [String]!
//     }
//     type Query {
//         user(id:Int!):User
//         users:[User]
//     }
//     type Mutation{
//         addUser(name:String!,sex:String,intro:String,skills:[String]!):User
//         addUserByInput(userInfo:UserInput!):User
//     }
// `);
//
// //服务端示例数据
// var users=[
//     {
//         name: 'zhaiqianfeng',
//         sex: '男',
//         intro: '博主，专注于Linux,Java,nodeJs,Web前端:Html5,JavaScript,CSS3',
//         skills: ['Linux','Java','nodeJs','前端'],
//     },
//     {
//         name: 'James',
//         sex: '男',
//         intro: 'zhaiqianfeng的英文名',
//         skills: ['Linux','Java','nodeJs','前端'],
//     },
// ];
//
// //定义resolver
// var root= {
//     // query resolver
//     user:  function ({id}) {
//       console.log(newUser);
//         return users[id];
//     },
//     users: function () {
//         return users;
//     },
//     //mutation resolver
//     addUser:function({name,sex,intro,skills}){
//         var user={
//             name:name,
//             sex:sex,
//             intro:intro,
//             skills:skills
//         };
//         users.push(user);
//         return user;
//     },
//     addUserByInput:function({userInfo}){
//         var user={
//             name:userInfo.name,
//             sex:userInfo.sex,
//             intro:userInfo.intro,
//             skills:userInfo.skills
//         };
//         users.push(user);
//         return user;
//     }
// };
//
// app.use('/graphql', graphqlHTTP({
//     schema: schema,
//     rootValue: root,
//     graphiql: true, //启用GraphiQL
// }));

// var graphql = require('graphql');
// var bodyParser = require('body-parser');
//
// app.use(bodyParser.text({ type: 'application/graphql' }));
// app.get('/graphql', (req, res) => {
//     // execute GraphQL!
//     graphql.graphql(schema, req.body)
//         .then((result) => {
//           console.log(res)
//             res.send(JSON.stringify(result, null, 2));
//         });
// });


//TODO  end


//toDO 1
var mysql = require('mysql');
var $conf = require('./conf/db');
var $sql = require('./dao/userSqlMapping');
var pool = mysql.createPool($conf.mysql);
var graphqlHTTP = require('express-graphql');
var {
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLEnumType,
    GraphQLNonNull,
    GraphQLInterfaceType,
    GraphQLInputObjectType
} = require('graphql');

//服务端示例数据
var animals = [
    {
        name: 'dog',
        legs: 4
    },
    {
        name: 'fish',
        tailColor: 'red'
    },
];

//定义schema及resolver
const Animal = new GraphQLInterfaceType({
    name: 'Animal',
    description: '接口',
    fields: () => ({
        name: {type: new GraphQLNonNull(GraphQLString)},
    }),
});

const Dog = new GraphQLObjectType({
    name: 'Dog',
    interfaces: [Animal],
    description: '狗狗实体',
    fields: () => ({
        name: {type: new GraphQLNonNull(GraphQLString)},
        legs: {type: new GraphQLNonNull(GraphQLInt)},
    }),
    isTypeOf: obj => obj.legs,
});

const Fish = new GraphQLObjectType({
    name: 'Fish',
    interfaces: [Animal],
    description: "鱼儿实体",
    fields: () => {
        return ({
            name: {type: new GraphQLNonNull(GraphQLString)},
            tailColor: {type: new GraphQLNonNull(GraphQLString)},
        });
    },
    isTypeOf: obj => obj.tailColor,
});
var data = async function () {
    await pool.getConnection(function (err, connection) {
        connection.query($sql.queryAll, function (err, result) {
            connection.release();
            if (err) {
                return fail(err)
            }
            return animals;

        });
    });
}

console.log(data)

async function createQuery() {

    return new Promise((succeed, fail) => {
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryAll, function (err, result) {
                connection.release();
                if (err) {
                    return fail(err)
                }
                console.log(result)
                // return succeed(result);
                return succeed([{name: 'xiaoming',legs:4}, {name: '2',tailColor:'red'}, {name: '2333',tailColor:4}]);

            });
        });

        // mySQLConnector.pool.getConnection((err, connection) => {
        //
        //     //If an error was passed getting a connection, fails the promise sending it to the caller
        //     if (err) {
        //         return fail(err)
        //     }
        //
        //     //Runs the query
        //     connection.query(query, params, (err, rows) => {
        //
        //         //Releases the connection
        //         connection.release()
        //
        //         //If an error was passed running the query, fails the promise sending it to the caller
        //         if (err) {
        //             return fail(err)
        //         }
        //
        //         //Fulfills the promise
        //         return succeed(rows)
        //     })
        // })
    })
}

function findAll() {
    return createQuery({
        query: `SELECT * FROM user;`,
        params: [this.TABLE_NAME]
    });
}

const Query = new GraphQLObjectType({
    name: 'AnimalQuery',
    description: '动物信息查询',
    fields: () => {
        return {
            animals: {
                type: new GraphQLList(Animal),
                description: '查询全部动物列表',
                resolve: async function () {

                    // let data = await db.collection('dbo.TBL_NETNODE_INFO').find().limit(1500).sort({ 'ID': 1 }).toArray();
                    var result = await createQuery();
                    result = JSON.parse(JSON.stringify(result))
                    console.log(result)
                        // [
                        // {
                        //     name: 'dog',
                        //     legs: 4
                        // },
                        //     {
                        //         name: 'fish',
                        //         tailColor:'red'
                        //     },
                        // ];

                    return result;
                    // console.log("-----animals")
                    // console.log(animals)
                    // // var data = await  data();
                    // // return await animals;
                    // return await  data();
                }
            }
        };
    },
    // fields:()=>({
    //     animals:{
    //         type:new GraphQLList(Animal),
    //         description:'查询全部动物列表',
    //         // resolve:function () {
    //         //   console.log(animals)
    //         //     return animals;
    //         // }
    //
    //         resolve:function(){
    //             new Promise(function(resolve, reject) {
    //                 userDao.queryAll({
    //                 },function (err, result) {
    //                     console.log("===")
    //                     if(err){
    //                         resolve(result);
    //                         // res.json({status: 500, message: err});
    //                     }else{
    //                         resolve(result);
    //                         // res.json({status: 200, message: "ok", responseList:result});
    //                     }
    //                 })
    //             }).then(function(result) {
    //               console.log(result);
    //               return animals;
    //             });
    //         }
    //     }
    // }),
});
const schema = new GraphQLSchema({
    types: [Dog, Fish, Animal],
    query: Query
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true, //启用GraphiQL
}));
// var graphql = require('graphql');
// var bodyParser = require('body-parser');
//
// app.use(bodyParser.text({ type: 'application/graphql' }));
// app.get('/graphql', (req, res) => {
//     // execute GraphQL!
//     graphql.graphql(schema, req.body)
//         .then((result) => {
//           console.log(res)
//             res.send(JSON.stringify(result, null, 2));
//         });
// });
//TODO 1 end


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
