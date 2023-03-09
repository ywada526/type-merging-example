import { makeExecutableSchema } from '@graphql-tools/schema'

const usersData = [
  { id: '1', email: 'foo@example.com' },
  { id: '2', email: 'bar@example.com' },
  { id: '3', email: 'baz@example.com' },
]

export const usersSchema = makeExecutableSchema({
  typeDefs: `
    type User {
      id: ID!
      email: String!
    }

    type Query {
      userById(id: ID!): User
    }
  `,
  resolvers: {
    Query: {
      userById: (_, { id }) => usersData.find(user => user.id === id),
    }
  }
})
