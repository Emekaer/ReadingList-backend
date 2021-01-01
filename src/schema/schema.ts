import * as graphql from "graphql";
import * as _ from "lodash";

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

//dummy data
var books = [
  {
    name: "Things fall apart",
    genre: "Fiction",
    id: "1",
    authorId: "1",
  },
  {
    name: "Purple Hibiscus",
    genre: "Fiction",
    id: "2",
    authorId: "3",
  },
  {
    name: "The Famished Road",
    genre: "Fiction",
    id: "3",
    authorId: "2",
  },
  {
    name: "There was a country",
    genre: "Nigerian History",
    id: "4",
    authorId: "1",
  },
  {
    name: "Americanah",
    genre: "Fiction",
    id: "5",
    authorId: "3",
  },
  {
    name: "Half of a Yellow Sun",
    genre: "Fiction",
    id: "6",
    authorId: "3",
  },
];

var authors = [
  {
    name: "Chinua Achebe",
    age: 79,
    id: "1",
  },
  {
    name: "Ben Okri",
    age: 74,
    id: "2",
  },
  {
    name: "Chimamanda Adichie",
    age: 38,
    id: "3",
  },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    id: { type: GraphQLID },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db/other source
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
    books:{
      type: new GraphQLList(BookType),
      resolve(parent,args){
        return books
      }
    },
      authors:{
        type : new GraphQLList(AuthorType),
        resolve(parent,args){
          return authors
        }
      }
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
