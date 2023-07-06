async function pagination(req, res, next) {
  let { limit = 2, page = 1 } = req.query

  console.log(limit, page)

  limit = parseInt(limit)
  page = parseInt(page)

  const offset = (page - 1) * limit 

  const { result } = req

  if (limit > 0 && page > 0) {
    const resultPaginated = await result.findAll({ offset, limit})
    return res.status(200).json(resultPaginated)
  } else {
    res.status(422).send('pagination error')
  }
}

module.exports = pagination
