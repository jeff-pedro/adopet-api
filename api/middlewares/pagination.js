async function pagination(req, res, next) {
  let { limit = 10, page = 1 } = req.query

  limit = parseInt(limit)
  page = parseInt(page)

  const offset = (page - 1) * limit 

  const { result } = req

  if (limit > 0 && page > 0) {
    const resultPaginated = await result.getAllRecords({ offset, limit})
    return res.status(200).json(resultPaginated)
  } else {
    res.status(422).send('pagination error')
  }
}

module.exports = pagination
