import { at, defineMigration, setIfMissing, unset } from 'sanity/migrate'

const pairs = {
  Title: 'title',
  Path: 'path',
  PublishDate: 'publishedAt',
  LastUpdated: 'updatedAt',
  Excerpt: 'excerpt',
  Content: 'content',
  Technology: 'technology',
  FeaturedImage: 'image',
  WIP: 'isWIP',
  Featured: 'isFeatured',
  Visible: 'isVisible',
}

export default defineMigration({
  title: 'Rename codeExperiment fields',
  documentTypes: ['codeExperiment'],

  migrate: {
    document(doc, context) {
      const changes = Object.entries(pairs).map(([from, to]) => {
        return [at(to, setIfMissing(doc[from])), at(from, unset())]
      })
      return changes.flat()
    },
  },
})
