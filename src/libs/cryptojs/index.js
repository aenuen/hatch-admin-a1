// noinspection JSUnresolvedVariable,JSCheckFunctionSignatures

const CryptoJs = require('crypto-js')
const secret = require('./settings')

const CryptoJsEncode = string => CryptoJs.AES.encrypt(string, secret).toString()

const CryptoJsDecode = string => {
  const bytes = CryptoJs.AES.decrypt(string, secret)
  return bytes.toString(CryptoJs.enc.Utf8)
}

module.exports = {
  CryptoJsEncode,
  CryptoJsDecode
}
