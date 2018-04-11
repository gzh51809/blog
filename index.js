const fs = require('fs')
const GitHub = require('github-api')
const CJson = require('circular-json')

const gh = new GitHub()

const issue = gh.getIssues('ulivz', 'blog')


function getBlogs(blogs) {
  return blogs.map(({ title, url, labels }) => {
    const isSuggested = labels.some(label => label.name === '精华')
    const label = labels.find(label => label.name !== '精华').name
    return { title, url, isSuggested, label }
  })
}

function updateREADME() {
  const readmeStr = fs.readFileSync('./README.md', )
}

issue.listIssues()
    .then(({ status, data }) => {
      if (status === 200) {
        const blogs = getBlogs(data)
      }
      console.log(CJson.stringify(issue))
    })
    .catch(error => {
      console.log(error)
    })
