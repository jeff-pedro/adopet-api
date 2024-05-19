function logError(err, req, res, next) {
  console.error(err)
  next(err)
}

function returnError(err, req, res, next) {
  return res.status(err.statusCode || 500).json({ error: err.message })
}

module.exports = {
  logError,
  returnError,
}
