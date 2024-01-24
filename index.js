import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
//db
import db from './db'
//types
import { typeDefs } from './schema';
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

console.log('Server ready at port ',4000)