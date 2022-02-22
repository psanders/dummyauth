const md5hex = require('md5hex')

function calculateResponse(req, credentials) {
  const a1 = `${credentials.username}:${req.realm}:${credentials.secret}`
  const a2 = `${req.method.toUpperCase()}:${req.uri}`
  const ha1 = md5hex(a1)
  const ha2 = md5hex(a2)

  return req.qop === 'auth' 
    ? md5hex(`${ha1}:${req.nonce}:${req.nonce_count}:${req.c_nonce}:${req.qop}:${ha2}`) 
    : md5hex(`${ha1}:${req.nonce}:${ha2}`)
}

module.exports = calculateResponse
