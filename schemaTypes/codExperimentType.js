import { defineArrayMember, defineField, defineType } from "sanity";
import { CodeBlockIcon } from "@sanity/icons"

export const codeExperiment = defineType({
  type: "document",
  name: "codeExperiment",
  title: "Code Experiment",
  icon: CodeBlockIcon,
  fieldsets: [
    {
      name: "Status",
      title: "Status",
    },
  ],
  fields: [
    defineField({
      type: "string",
      name: "Title",
      title: "Title",
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: "string",
      name: "Path",
      title: "Path",
      validation: (rule) => rule.regex(/^\/.*/),
      placeholder: "/experiments/my-experiment",
    }),
    defineField({
      type: "date",
      name: "PublishDate",
      title: "Publish Date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: "date",
      name: "LastUpdated",
      title: "Last Updated",
    }),
    defineField({
      type: "text",
      name: "Excerpt",
      title: "Excerpt",
      validation: (rule) => rule.required(),
      rows: 3,
    }),
    defineField({
      type: "array",
      name: "Content",
      title: "Content",
      validation: (rule) => rule.required(),
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      type: "array",
      name: "technology",
      title: "Technology",
      of: [{type: "string"}],
      options: {
        layout: "tags"
      }
    }),
    defineField({
      type: "image",
      name: "FeaturedImage",
      title: "Featured Image",
    }),
    defineField({
      type: "boolean",
      name: "WIP",
      title: "Work in Progress",
      initialValue: true,
      fieldset: "Status",
    }),
    defineField({
      type: "boolean",
      name: "Featured",
      title: "Featured",
      initialValue: false,
      fieldset: "Status",
    }),
  ],
});


