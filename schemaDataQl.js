const {gql}= require('apollo-server')


exports.typeDefs = gql`
  type Game {
    id: ID
    title: String
    platform: [String]
    reviews:[Review!]
  }

  type Author {
    id: ID
    name: String
    verified:Boolean
    reviews:[Review!]
  }
    type Review {
    id: ID!
    content: String!
    rating:Int!
    author_id:String!
    game_id:String!
    game:Game!
    author:Author!
  }

  type Query {
    games: [Game]
    review(id:ID!):Review 
    game(id:ID!):Game
    platform(plat:String!):[Game]
    author(id:ID!):Author
    authors: [Author]
    reviews:[Review]
  }  
  type Mutation{
  addGame(title:String,platform:[String!],author:String!):[Game]
  deleteGame(id:ID!):[Game]

  updateGame(id:ID!,game:editGame):Game
  }

  input  addGameInput{
  title:String!,
  platform:[String!],
  author:String!
  }

  input editGame{
  title:String,
  platform:[String],
  author:String
  }
`;
// : Game in mutation just means that the data we have to send to the client side
//! Static data
// exports.Books = [
//   {
//     id: '1',
//     title: 'The Hobbit',
//     author: { id: '1', name: 'J.R.R. Tolkien', nationality: 'British' },
//     publisher: { id: '1', name: 'George Allen & Unwin', location: 'UK' },
//     reviews: [
//       { id: '1', content: 'Amazing adventure!', rating: 5, reviewer: 'Alice' },
//       { id: '2', content: 'Loved it!', rating: 4, reviewer: 'Bob' },
//     ],
//   },    
//   {
//     id: '2',
//     title: 'Harry Potter and the Sorcerer\'s Stone',
//     author: { id: '2', name: 'J.K. Rowling', nationality: 'British' },
//     publisher: { id: '2', name: 'Bloomsbury', location: 'UK' },
//     reviews: [
//       { id: '3', content: 'A magical experience!', rating: 5, reviewer: 'Charlie' },
//       { id: '4', content: 'Great for all ages.', rating: 4, reviewer: 'Dave' },
//     ],
//   },
// ];


// // Static data for Authors
// exports.Authors = [
//   { id: '1', name: 'J.R.R. Tolkien', nationality: 'British' },
//   { id: '2', name: 'J.K. Rowling', nationality: 'British' },
// ];
