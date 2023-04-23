import { CollectionConfig } from 'payload/types'

const Errors: CollectionConfig = {
   slug: 'errors',
   admin: {
      useAsTitle: 'message',
   },
   access: {
      read: () => true,
   },
   fields: [
      {
         name: 'message',
         type: 'text',
      },
      {
         name: 'code',
         type: 'text',
      },
   ],
}

export default Errors
