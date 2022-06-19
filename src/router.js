const { GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString, GraphQLNonNull, GraphQLSchema } = require('graphql');
const { authors, books, authorType, bookType } = require('./data');
//const authorType = require('./author');
//const bookType = require('./book');

const rootQuery = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        book: {
            type: bookType,
            description: 'A Single Book',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => books.find(book => book.id === args.id)
        },
        books: {
            type: new GraphQLList(bookType),
            description: 'List of All Books',
            resolve: () => books
        },
        author: {
            type: authorType,
            description: 'A Single Author',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => authors.find(author => author.id === args.id)
        },
        authors: {
            type: new GraphQLList(authorType),
            description: 'List of All Authors',
            resolve: () => authors
        }
    })
});

const rootMutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addBook: {
            type: bookType,
            description: 'Add a Book',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                authorId: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                const book = { id: books.length + 1, name: args.name, authorId: args.authorId };
                books.push(book);

                return book;
            }
        },
        addAuthor: {
            type: authorType,
            description: 'Add an Author',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                const author = { id: authors.length + 1, name: args.name };
                authors.push(author);
                
                return author;
            }
        }
    })
});

const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
});

module.exports = schema;