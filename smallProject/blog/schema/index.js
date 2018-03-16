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

const articleSchema = require('./article');

const Query=new GraphQLObjectType({
    name: 'BlogQuery',
    description: 'Root of the Blog Schema',
    fields:()=>(Object.assign({},
        articleSchema.query
    )),
});
const Mutation=new GraphQLObjectType({
    name: 'BlogMuaMutationtion',
    description: 'Root of the Blog Schema',
    fields:()=>(Object.assign({},
        articleSchema.mutation
        )),
});
const schema = new GraphQLSchema({
    query: Query,
    mutation:Mutation
});

module.exports = schema;