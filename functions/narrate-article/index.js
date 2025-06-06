import process from 'node:process'
import { ElevenLabsClient, play } from '@elevenlabs/elevenlabs-js'
import { createClient } from '@sanity/client'
import { documentEventHandler } from '@sanity/functions'

const { ELEVENLABS_API_KEY } = process.env

const isDevMachine = process.env.HOME?.includes('/Users/')

export const handler = documentEventHandler(async ({ context, event: { data } }) => {
  if (!ELEVENLABS_API_KEY) {
    console.error('❌ ELEVENLABS_API_KEY is not set. Bailing...')
    return
  }
  const elevenlabs = new ElevenLabsClient({ apiKey: ELEVENLABS_API_KEY })

  console.log('🔑 ELEVENLABS_API_KEY is set', `${ELEVENLABS_API_KEY.slice(0, 8)}...`)

  // TODO: use a projection for these fields
  const { _id, narrationEnabled, narration, content } = data || {
    _id: Date.now().toString(),
    narrationEnabled: true,
    description: 'The first move is what sets everything in motion.',
  }

  // TODO: these could be negated with a GROQ filter
  if (narration) {
    console.log('✅ Narration already exists. Skipping...')
    return
  }
  if (!narrationEnabled) {
    console.log('😶 Narration not enabled. Skipping...')
    return
  }
  if (!content) {
    console.log('😶 Content is not set. Skipping...')
    return
  }

  const client = createClient({
    ...context.clientOptions,
    apiVersion: '2025-06-05',
  })

  console.log('🚀 Sanity client created')

  const fullContent = content
    .map((block) => block.children.map((child) => child.text).join(''))
    .join('\n')
  console.log('🔍 Full content length:', fullContent.length)

  let audio
  try {
    console.log('💬 Narrating article', _id)
    audio = await elevenlabs.textToSpeech.convert('Bj9UqZbhQsanLzgalpEG', {
      text: fullContent,
      modelId: 'eleven_multilingual_v2',
      outputFormat: 'mp3_44100_128',
    })
  } catch (error) {
    console.error('⛔️ Error narrating article', error)
    return
  }

  if (!audio) {
    console.error('😭 No audio generated')
    return
  }

  if (isDevMachine) await play(audio)
  else {
    const fileName = `narrated-${_id}.mp3`

    const chunks = []
    for await (const chunk of audio) {
      if (chunk) chunks.push(chunk)
    }
    const audioBuffer = Buffer.concat(chunks)

    let assetDocument
    try {
      assetDocument = await client.assets.upload('file', audioBuffer, { filename: fileName })
    } catch (error) {
      console.error('⛔️ Error uploading audio', error)
      return
    }

    let updatedDoc
    try {
      updatedDoc = await client
        .patch(_id)
        .set({
          narration: {
            _type: 'file',
            asset: {
              _type: 'reference',
              _ref: assetDocument._id,
            },
          },
        })
        .commit()
    } catch (error) {
      console.error('⛔️ Failed to update document:', error.message)
    }

    console.log('✅ Document updated with MP3 file:')
    console.log(JSON.stringify(updatedDoc?.narration, null, 2))
  }
})
