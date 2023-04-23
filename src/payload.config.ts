import { buildConfig } from 'payload/config'
import path from 'path'
import Users from './collections/Users'
import Prompts from './collections/Prompts'
import Errors from './collections/Errors'

export default buildConfig({
   serverURL: `http://localhost:4200`,
   admin: {
      user: Users.slug,
   },
   collections: [Prompts, Errors, Users],
   typescript: {
      outputFile: path.resolve(__dirname, 'payload-types.ts'),
   },
   graphQL: {
      schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
   },
})
