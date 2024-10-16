import { CodeBlockIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const codeExperiment = defineType({
  type: 'document',
  name: 'codeExperiment',
  title: 'Code Experiment',
  icon: CodeBlockIcon,
  fieldsets: [
    {
      name: 'Status',
      title: 'Status',
    },
  ],
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
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
      type: 'string',
      name: 'path',
      title: 'Relative Path',
      validation: (rule) => rule.regex(/^\/.*/),
      placeholder: '/experiments/my-experiment',
    }),
    defineField({
      type: 'date',
      name: 'publishedAt',
      title: 'Publish Date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'date',
      name: 'updatedAt',
      title: 'Last Updated',
    }),
    defineField({
      type: 'text',
      name: 'excerpt',
      title: 'Excerpt',
      validation: (rule) => rule.required(),
      rows: 3,
    }),
    defineField({
      type: 'array',
      name: 'content',
      title: 'Content',
      // validation: (rule) => rule.required(),
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({
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
        }),
        defineArrayMember({ type: 'code' }),
      ],
    }),
    defineField({
      type: 'array',
      name: 'technology',
      title: 'Technology',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      type: 'image',
      name: 'image',
      title: 'Featured Image',
    }),
    defineField({
      type: 'boolean',
      name: 'isWIP',
      title: 'Work in Progress',
      initialValue: true,
      fieldset: 'Status',
    }),
    defineField({
      type: 'boolean',
      name: 'isFeatured',
      title: 'Featured',
      initialValue: false,
      fieldset: 'Status',
    }),
    defineField({
      type: 'boolean',
      name: 'isVisible',
      title: 'Visible',
      initialValue: false,
      fieldset: 'Status',
    }),
  ],
})
