const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');

const authors = [
    { id: 1, name: 'Stephen King' },
    { id: 2, name: 'J.R.R Tolkien' },
    { id: 3, name: 'George R.R. Martin' }
];

const authorType = new GraphQLObjectType({
    name: 'Author',
    description: 'Author of a Book',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        books: {
            type: new GraphQLList(bookType),
            resolve: (author) => {
                return books.filter(book => book.authorId === author.id);
            }
        }
    })
});

const books = [
    { id: 1, name: 'IT', authorId: 1 },
    { id: 2, name: 'Pet Sematary', authorId: 1 },
    { id: 3, name: 'The Shining', authorId: 1 },
    { id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
    { id: 5, name: 'The Two Towers', authorId: 2 },
    { id: 6, name: 'The Return of the King', authorId: 2 },
    { id: 7, name: 'A Game of Thrones', authorId: 3 },
    { id: 8, name: 'A Clash of Kings', authorId: 3 },
    { id: 9, name: 'A Storm of Swords', authorId: 3 },
    { id: 10, name: 'A Feast For Crows', authorId: 3 },
    { id: 11, name: 'A Dance With Dragons', authorId: 3 }
];

const bookType = new GraphQLObjectType({
    name: 'Book',
    description: 'represents a published book',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
        author: {
            type: authorType,
            resolve: (book) => {
                return authors.find(author => author.id === book.authorId);
            }
        }
    })
});

module.exports = { authors, books, bookType, authorType };