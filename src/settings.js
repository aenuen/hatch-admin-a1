
const servePort = 20370
const adminPort = 20371
const title = '标书制作'
const isDevMode = process.env.NODE_ENV === 'development'
module.exports = {
  port: adminPort, // 项目端口
  title, // 项目名称
  showSettings: false, // 是否显示 showSettings
  tagsView: true, // 是否使用 tagsView
  fixedHeader: false, // 是否启用 fixedHeader
  sidebarLogo: false, // 是否使用 sidebarLog
  errorLog: 'development', // 使用errorLog的模式(可使用数组,如:['development','production'])
  cryptoJsSecretKey: 'SecretKey', // CryptoJs加密Key
  isDevMode,
  apiBaseUrl: isDevMode ? `http://localhost:${servePort}` : `http://localhost:${servePort}`
}
