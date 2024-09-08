const { ApolloServer } = require('@apollo/server');
const {Books,typeDefs, Authors} = require('./schemaDataQl')
const { startStandaloneServer} = require('@apollo/server/standalone');
const knex = require('knex')(require('./db/knexfile').development);

// Define your type definitions (schema) using GraphQL schema language


// Define your resolvers
const resolvers = {
  Query: {
    games: async() => knex('games').select('*'),
    authors: async()=> knex('authors').select('*'),
    reviews: async()=> knex('reviews').select('*'),
    review: async(_,args,context)=>{
      console.log(args.id)
      console.log(typeof(args.id))
      return  await knex('reviews').where('id' ,'=', args.id ).first()
    },
    author: async(_,args,context)=>{
      console.log(args.id)
      console.log(typeof(args.id))
      return  await knex('authors').where('id' ,'=', args.id ).first()
    },
    game:async(_,args,context)=>{
      console.log(args.id)
      console.log(typeof(args.id))
      return  await knex('games').where('id' ,'=', args.id ).first()
    } ,
    platform:async(_,args,context)=>{
      console.log(args.plat)
      console.log(typeof(args.plat))
      return  await knex('games').whereRaw('? = ANY(platform)',[args.plat] )
    
    } 
  },
  // resolve fields
Game:{
  reviews(parent){
      return knex('reviews').where('game_id' ,'=', parent.id)
  },

},

Author:{
  reviews(parent){
      return knex('reviews').where('author_id' ,'=', parent.id)
  }
}, // isme  authorID dengay or is author kay reviews mil jaingay 

Review:{
author(parent){
console.log(' in Review ')
  return knex('authors').where('id','=', parent.author_id)[0]
},
game(parent){
  console.log(' in Review ')
    return knex('games').where('id','=', parent.game_id).first()
  },
  // hum author id dengay or hamein uska review miljai ga
} ,
//  Mutations
Mutation:{
async deleteGame(_,args){
  const deletedGame = await knex('games')
  .where('id', '=', args.id)
  .del()  
  .returning(['id', 'title']);

  console.log(deletedGame)

  const updatedList = knex('games').select("*")
return updatedList


},
async addGame(_,args){

console.log("received params",args)
  const data = {...args}
  console.log("arguments",data)
  const addedGame = await knex('games')
  .insert({...data,id:"7"})  
  .returning(['title','platform']);

  console.log(addedGame)
  const updatedList = knex('games').select("*")
return updatedList


},

async updateGame(_,args){
const dataToUpdate = {...args.game}
const gameToUpdate= args.id
const [updatedGame]=  await knex('games').where('id','=' , gameToUpdate).update(dataToUpdate).returning(['id','title','platform','author'])
console.log(updatedGame)

return updatedGame
}

}


};

// Create the Apollo Server instance


// Start the server
const startServer  = async()=>{
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(' Yay! server is started' , url )
}


startServer()

