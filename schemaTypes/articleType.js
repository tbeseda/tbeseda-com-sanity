import { ComposeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Article',
  icon: ComposeIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      validation: (rule) => rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
    }),
    defineField({
      title: 'Published At',
      name: 'publishedAt',
      type: 'datetime',
      validation: (rule) => rule.required(),
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Content',
      name: 'content',
      type: 'array',
      validation: (rule) => rule.required(),
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Image caption',
              description: 'Caption displayed below the image.',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessiblity.',
            },
          ],
        },
        { type: 'code' },
      ],
    }),
    defineField({
      name: 'narrationEnabled',
      type: 'boolean',
      title: 'Narration Enabled',
      description: 'Whether or not to narrate the article.',
    }),
    defineField({
      name: 'narration',
      type: 'file',
      title: 'Narration',
      description: 'Narration file for the article.',
    }),
  ],
})
