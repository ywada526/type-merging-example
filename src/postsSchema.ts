import { makeExecutableSchema } from '@graphql-tools/schema'

const postsData = [
  { id: '1', message: 'Hello', authorId: '1' },
  { id: '2', message: 'Hi', authorId: '2' },
  { id: '3', message: 'Goodbye', authorId: '2' },
]

export const postsSchema = makeExecutableSchema({
  typeDefs: `
    type Post {
      id: ID!
      message: String!
      author: User!
    }

    type User {
      id: ID!
      posts: [Post]!
    }

    type Query {
      postById(id: ID!): Post
      postUserById(id: ID!): User
    }
  `,
  resolvers: {
    Query: {
      postById: (_, { id }) => postsData.find(post => post.id === id),
      postUserById: (_, { id }) => ({ id })
    },
    User: {
      posts(user) {
        return postsData.filter(post => post.authorId === user.id)
      }
    },
    Post: {
      author: (post) => ({ id: post.id })
    }
  }
})
