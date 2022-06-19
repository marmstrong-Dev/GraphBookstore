const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./src/router');

const app = express();

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}));

// Server Init
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Started on Port: ${ port }`);
});
