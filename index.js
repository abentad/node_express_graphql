const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

/*
graphql Scalar datatypes: (They store a single value)
    String, Boolean, Int, Float, ID
*/


// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    type Query {
        me: User!
        post: Post!
    }
    type User{
        name: String!
        age: Int!
        BirthYear: Int! 
    }
    type Post{
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`);

// The root provides a resolver function for each API endpoint
const rootValue = {
    me: ()=>{
        return {
            name: "Abenezer",
            age: 22,
            BirthYear: 1999
        }
    },
    post: ()=>{
        return {
            id: "abc123",
            title: "Favorite video game",
            body: "GTA, R6, COD, FIFA",
            published: true
        }
    }
};


app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));

app.listen(4000,()=> console.log('Running a GraphQL API server at http://localhost:4000/graphql'));
