import 'dotenv/config'
import process from 'node:process'
import { defineBlueprint, defineDocumentFunction } from '@sanity/blueprints'

const { ELEVENLABS_API_KEY } = process.env
if (typeof ELEVENLABS_API_KEY !== 'string') throw new Error('ELEVENLABS_API_KEY is not defined')

export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      name: 'narrate-article',
      timeout: 120,
      memory: 2,
      env: {
        ELEVENLABS_API_KEY,
      },
    }),
  ],
})
