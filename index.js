import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
// data
import db from './_db.js'
//types
import { typeDefs } from './schema.js';
//resolvers
const resolvers={
    Query:{
        games(){
            return db.games
        },
        reviews(){
            return db.reviews
        },
        authors(){
            return db.authors
        },
        //Query variables
        review(_,args){
            //args.id
            return db.reviews.find((review)=>review.id ===args.id)
        },
        game(_,args){
            return db.games.find((game)=>game.id===args.id)
        },
        author(_,args){
            return db.authors.find((author)=>author.id===args.id)
        }
    },
    //Related Data
    Game:{
        reviews(parent){
            return db.reviews.filter((reviews)=>reviews.game_id===parent.id)
        }
    },
    Author:{
        reviews(parent){
            return db.reviews.filter((reviews)=>reviews.author_id===parent.id)
        }
    },
    Review:{
author(parent){
    return db.authors.find(author=>author.id===parent.author_id)
},
game(parent){
    return db.games.find(game=>game.id===parent.game_id)
}
    }
}
//server setup
const server=new ApolloServer({
typeDefs,
resolvers

})

const {url} = await startStandaloneServer(server,{
    listen :{ port:4000}
})

console.log(`Server ready at: ${url}`)