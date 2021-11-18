const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

/*
graphql Scalar datatypes: (They store a single value)
    String, Boolean, Int, Float, ID
*/


const users = [{id: "1", name: "David", age: 20, BirthYear: 2001}, {id: "2", name: "Abenezer", age: 22, BirthYear: 1999}, {id: "3", name: "Liza", age: 34, BirthYear: 1988} ];
const posts = [{ id: "1", authorID: "2", title: "Favorite video game", body: "GTA", published: false },{ id: "2", authorID: "3", title: "color", body: "green", published: true },{ id: "3", authorID: "2", title: "fruit", body: "orange", published: false }];

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    type Query {
        greetings(name: String): String!
        add(numbers: [Float!]!): Float!
        users(query: String): [User!]!
        posts: [Post!]!
        me: User!
        post: Post!
    }
    type User{
        id: ID!
        name: String!
        age: Int!
        BirthYear: Int! 
    }
    type Post{
        id: ID!
        author: User!
        title: String!
        body: String!
        published: Boolean!
    }
`);

// The root provides a resolver function for each API endpoint
const rootValue = {
    greetings: ({ name })=>{
        if(name) return `Hello ${name}!`;
        return 'Hello!';
    },
    add: ({ numbers })=>{
        if(numbers.length === 0) return 0;
        return numbers.reduce((accumulator, currentValue) => accumulator + currentValue);
    },
    users: ({ query })=>{
        if(!query) return users;
        return users.filter((user)=>  user.name.toLowerCase().startsWith(query.toLowerCase()));
    },
    posts: ()=>{
        return posts;
    },
    me: ()=>{
        return { name: "Abenezer", age: 22, BirthYear: 1999 };
    },
    post: ()=>{
        return posts[0];
    },
    Post: {
        author: ()=>{

        }
    }

};


app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));

app.listen(4000,()=> console.log('Running a GraphQL API server at http://localhost:4000/graphql'));
