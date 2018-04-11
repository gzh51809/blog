const fs = require('fs')
const GitHub = require('github-api')

const gh = new GitHub()
const issue = gh.getIssues('ulivz', 'blog')

function getBlogs(blogs) {
  return blogs.map(({ title, url, labels }) => {
    const isSuggested = labels.some(label => label.name === '精华')
    const label = labels.find(label => label.name !== '精华').name
    return { title, url, isSuggested, label }
  })
}

function generateString(blogs) {
  const columns = {}

  for (const { title, url, isSuggested, label } of blogs) {
    (columns[label] || (columns[label] = [])).push({
      title, url, isSuggested
    })
  }

  let str = ''
  for (const column of Object.keys(columns)) {
    const blogs = columns[column]
    str += `\n# ${column}\n\n`
    str += blogs.map(({ title, url, isSuggested }) => {
          if (isSuggested) title = title + '🆙'  // 🏆 🎖 🏅 ❤️ 🆙  Which one? 😂
          return `- [**${title}**](${url})`
        }).join('\n') + '\n'
  }

  return str
}

function updateREADME(content) {
  let readme = fs.readFileSync('./README.md', 'utf-8')
  console.log(readme)
  readme = readme.replace(/(<!--START-->)[^]*(<!--END-->)/, (match, start, end) => {
    return start + '\n' + content + '\n' + end
  })
  console.log(readme)
  fs.writeFileSync('./README.md', readme, 'utf-8')
}

console.log(`  > Start to fetch blogs.`)
issue.listIssues()
    .then(({ status, data }) => {
      if (status === 200) {
        console.log(`  > Get blogs, start to parse it.`)
        const blogs = getBlogs(data)
        console.log(`  > Start to generate new content.`)
        const content = generateString(blogs)
        console.log(`  > Start to update REAMDE.`)
        updateREADME(content)
        console.log(`  > REAMDE updated.`)
      } else {
        console.log(`  > Status: ${status}`)
      }
    })
    .catch(error => {
      console.log(error)
    })
