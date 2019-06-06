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

      return blogPlugnOptions
    },
    
    // See: https://vuepress-theme-blog.ulivz.com/#summarylength
    summaryLength: 100,
    
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
      {
        text: 'About',
        link: '/me/',
      },
      {
        text: 'Github',
        link: 'https://github.com/ulivz/',
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
          text: 'Powered by VuePress | ULIVZ © 1994-present',
          link: '',
        },
      ],
    },
  },
}
