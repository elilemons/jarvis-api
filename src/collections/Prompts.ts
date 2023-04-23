import { CollectionConfig } from 'payload/types'
import { generatePrompt } from '../utils/generatePrompt'
import { Configuration, OpenAIApi } from 'openai'
import payload from 'payload'

const configuration = new Configuration({
   apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const Prompts: CollectionConfig = {
   slug: 'prompts',
   fields: [
      {
         name: 'promptType',
         type: 'select',
         options: ['animalSays', 'animalName'],
      },
      {
         name: 'promptText',
         type: 'text',
      },
      {
         name: 'promptResult',
         type: 'text',
         admin: {
            readOnly: true,
         },
      },
   ],
   hooks: {
      beforeChange: [
         async ({ data, operation }) => {
            const beforeChangeData = data

            if (operation === 'create') {
               const { promptText, promptType } = beforeChangeData
               try {
                  beforeChangeData.promptResult = await openai
                     .createCompletion({
                        model: 'text-davinci-003',
                        prompt: generatePrompt(promptText, promptType),
                        temperature: 0.6,
                     })
                     .then((completion) => completion.data.choices[0].text)
               } catch (error) {
                  await payload.create({
                     collection: 'errors',
                     data: {
                        message: error.response.statusText,
                        code: error.response.status,
                     },
                  })

                  throw error
               }
            }

            return beforeChangeData
         },
      ],
   },
}

export default Prompts
