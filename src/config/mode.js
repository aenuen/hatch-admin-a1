// 环境
const mode = process.env.NODE_ENV

// 是否开发环境
const isDevMode = process.env.NODE_ENV === 'development'

module.exports = {
  mode,
  isDevMode,
}
