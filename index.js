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
    },
    Mutation:{
        //delete
        deleteGame(_,args){
        db.games=db.games.filter((game)=>game.id!== args.id)
        return db.games
        },
        // deleteAuthor(_,args){
        // db.authors=db.authors.filter(author=>author.id!==args.id)
        // return db.authors
        // },
        // deleteReview(_,args){
        // db.reviews=db.reviews.filter(review=>review.id!==args.id)
        // return db.reviews
        // },
        //add
        addGame(_,args){
           let game={
            ...args.game,
            id:Math.floor(Math.random()*10000).toString()
           } 
           db.games.push(game)
           return game
        },
        // addAuthor(_,args){
        //     let author={
        //      ...args.author,
        //      id:Math.floor(Math.random()*10000).toString()
        //     } 
        //     db.authors.push(author)
        //     return author
        //  },
        //  addReview(_,args){
        //     let review={
        //      ...args.review,
        //      id:Math.floor(Math.random()*10000).toString()
        //     } 
        //     db.reviews.push(review)
        //     return review
        //  }
        updateGame(_,args){
          db.games=db.games.map((game)=>{
          if (game.id ===args.id){
          return {...game,...args.edits}
          }
          return game
})
return db.games.find(game => game.id===args.id)
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