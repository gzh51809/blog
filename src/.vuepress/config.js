module.exports = {
  title: `ULIVZ`,
  theme: '@vuepress/blog',
  themeConfig: {
    modifyBlogPluginOptions(blogPlugnOptions) {
      const writingDirectoryClassifier = {
        id: 'writing',
        dirname: '_writings',
        path: '/writings/',
        layout: 'IndexWriting',
        itemLayout: 'Writing',
        itemPermalink: '/writings/:year/:month/:day/:slug',
        pagination: {
          perPagePosts: 5,
        },
      }
      blogPlugnOptions.directories.push(writingDirectoryClassifier)

      const archiveDirectoryClassifierIndex = blogPlugnOptions.directories.findIndex(d => d.id === 'archive')
      blogPlugnOptions.directories.splice(archiveDirectoryClassifierIndex, 1)

      console.log(blogPlugnOptions)

      return blogPlugnOptions
    },
    nav: [
      {
        text: 'Blog',
        link: '/',
      },
      {
        text: 'Writings',
        link: '/writings/',
      },
      {
        text: 'Tags',
        link: '/tag/',
      },
    ],
    footer: {
      contact: [
        {
          type: 'github',
          link: 'https://github.com/ulivz',
        },
        {
          type: 'twitter',
          link: 'https://twitter.com/_ulivz',
        },
      ],
      copyright: [
        {
          text: 'Privacy Policy',
          link: 'https://policies.google.com/privacy?hl=en-US',
        },
        {
          text: 'MIT Licensed | Copyright © 2018-present Vue.js',
          link: '',
        },
      ],
    },
  },
}
