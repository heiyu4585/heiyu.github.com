//定义schema

var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var schema = buildSchema(`
    type User{
        name: String!
        sex: String
        intro: String
        skills: [String]!
    }
    input UserInput {
        name: String!
        sex: String
        intro: String
        skills: [String]!
    }
    type Query {
        user(id:Int!):User
        users:[User]
    }
    type Mutation{
        addUser(name:String!,sex:String,intro:String,skills:[String]!):User
        addUserByInput(userInfo:UserInput!):User
    }
`);

module.exports= schema;