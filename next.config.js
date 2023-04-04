// next.config.js

const isGithubActions = process.env.GITHUB_ACTIONS || false
const isFTPVersion = process.env.ftpVersion || false

let assetPrefix = ''
let basePath = ''

if (isGithubActions && !isFTPVersion) {
  // trim off `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')

  assetPrefix = `/${repo}/`
  basePath = `/${repo}`
}

module.exports = {
  assetPrefix: assetPrefix,
  basePath: basePath,
  images: {
    loader: 'custom',
    loaderFile: '/pages/loader.js',
  },
}