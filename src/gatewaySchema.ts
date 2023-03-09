import { stitchSchemas } from '@graphql-tools/stitch'
import { postsSchema } from './postsSchema'
import { usersSchema } from './usersSchema'

export const gatewaySchema = stitchSchemas({
  subschemas: [
    {
      schema: postsSchema,
      merge: {
        User: {
          fieldName: 'postUserById',
          selectionSet: '{ id }',
          args: originalObject => ({ id: originalObject.id })
        }
      }
    },
    {
      schema: usersSchema,
      merge: {
        User: {
          fieldName: 'userById',
          selectionSet: '{ id }',
          args: originalObject => ({ id: originalObject.id })
        }
      }
    }
  ],
})