const { verify, decode } = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    res.status(401).json({ error: 'Access token do not provided.' })
  }

  const [, accessToken] = token.split(' ')

  try {
    verify(accessToken, secret)

    const { id, email } = decode(accessToken)

    req.userId = id
    req.userEmail = email

    return next()
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized user.' })
  }
}
