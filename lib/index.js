export default callback => (req, res, next) => {
  if (req.method === 'GET' && req.accepts('html')) {
    callback(req, res, next)
  } else next()
}
